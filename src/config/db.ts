import { TodoListItem } from "./../models/todo-list-item";
import { TodoList } from "./../models/todo-list";
import { User } from "./../models/user";
import { users } from "./users";
import { todoLists } from "./todoLists";
import { todoListItems } from "./todoListItems";
import { v4 as uuidv4 } from "uuid";
import { Cache } from "./cache";

export class DB {
  users: User[];
  todoLists: TodoList[];
  todoListItems: TodoListItem[];

  constructor() {
    this.users = users;
    this.todoListItems = todoListItems;
    this.todoLists = todoLists;
  }

  async findUser(name: string): Promise<User> {
    let user = this.users.find((user) => {
      return user.name === name;
    });

    return user;
  }

  async createUser(name: string, encryptedPassword: string): Promise<User> {
    let user = new User(uuidv4(), name, encryptedPassword);
    this.users.push(user);
    return user;
  }

  async getFilteredLists(filters: any): Promise<TodoList[]> {
    return this.filter(todoLists, filters);
  }

  async getSortedList(sortBy: string, order: string): Promise<TodoList[]> {
    return this.sort(this.todoLists, sortBy, order);
  }

  private sort(arr, sortBy, order) {
    if (order === "asc") {
      return arr.sort((a, b) => a[sortBy] - b[sortBy]);
    } else {
      return arr.sort((a, b) => b[sortBy] - a[sortBy]);
    }
  }

  getSortedItems(
    listId: string,
    sortBy: string,
    order: string
  ): TodoListItem[] {
    let items = this.getItems(listId);
    return this.sort(items, sortBy, order);
  }

  filterListItems(listId: string, filters): TodoListItem[] {
    filters["deleted"] = false;
    return this.filter(this.getItems(listId), filters);
  }

  private getItems(listId: string): TodoListItem[] {
    let list = todoLists.find((list) => list.id === listId);
    let items: TodoListItem[] = [];

    for (const itemId in list.itemsIds) {
      let item = Cache.find((item) => {
        return item.id === list.itemsIds[itemId];
      });

      if (item && !item.deleted) {
        items.push(item);
      } else {
        let currentItem = this.todoListItems.find(
          (item) => item.id === list.itemsIds[itemId]
        );

        if (!currentItem.deleted) {
          items.push(currentItem);
          Cache.push(currentItem);
        }
      }
    }

    return items;
  }

  private filter(arr, filters) {
    const filteredObjects = arr.filter((obj) => {
      let isValid = true;

      for (const key in filters) {
        isValid = isValid && obj[key] == filters[key];
      }
      return isValid;
    });

    return filteredObjects;
  }

  createItem(item: TodoListItem): TodoListItem {
    this.todoListItems.push(item);
    return item;
  }

  createlist(name: string): TodoList {
    let list = new TodoList(uuidv4(), name, []);
    this.todoLists.push(list);
    return list;
  }

  updateItem(id: string, item: TodoListItem) {
    let currentItem = Cache.find((item) => item.id === id);
    if (!currentItem) {
      currentItem = this.todoListItems.find((item) => item.id === id);
      Cache.push(currentItem);
    }

    currentItem = item;
  }

  updateList(id: string, list: TodoList) {
    let currentList = this.todoLists.find((list) => list.id === id);
    currentList = list;
  }

  deleteItem(id: string) {
    let currentItem = Cache.find((item) => item.id === id);
    if (!currentItem) {
      currentItem = this.todoListItems.find((item) => item.id === id);
    }

    if (currentItem) {
      currentItem.deleted = true;
    } else {
      throw Error;
    }
  }

  deleteList(id: string) {
    let list = this.todoLists.find((list) => list.id === id);
    if (list) {
      let index = this.todoLists.indexOf(list);
      this.todoLists.splice(index, 1);
    } else {
      throw Error;
    }
  }
}
