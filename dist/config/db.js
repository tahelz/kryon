"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const todo_list_1 = require("./../models/todo-list");
const user_1 = require("./../models/user");
const users_1 = require("./users");
const todoLists_1 = require("./todoLists");
const todoListItems_1 = require("./todoListItems");
const uuid_1 = require("uuid");
const cache_1 = require("./cache");
class DB {
    constructor() {
        this.users = users_1.users;
        this.todoListItems = todoListItems_1.todoListItems;
        this.todoLists = todoLists_1.todoLists;
    }
    findUser(name) {
        let user = this.users.find((user) => {
            return user.name === name;
        });
        return user;
    }
    createUser(name, encryptedPassword) {
        let user = new user_1.User((0, uuid_1.v4)(), name, encryptedPassword);
        this.users.push(user);
        return user;
    }
    getFilteredLists(filters) {
        return this.filter(todoLists_1.todoLists, filters);
    }
    getSortedList(sortBy, order) {
        return this.sort(this.todoLists, sortBy, order);
    }
    sort(arr, sortBy, order) {
        if (order === "asc") {
            return arr.sort((a, b) => a[sortBy] - b[sortBy]);
        }
        else {
            return arr.sort((a, b) => b[sortBy] - a[sortBy]);
        }
    }
    getSortedItems(listId, sortBy, order) {
        let items = this.getItems(listId);
        return this.sort(items, sortBy, order);
    }
    filterListItems(listId, filters) {
        filters["deleted"] = false;
        return this.filter(this.getItems(listId), filters);
    }
    getItems(listId) {
        let list = todoLists_1.todoLists.find((list) => list.id === listId);
        let items = [];
        for (const itemId in list.itemsIds) {
            let item = cache_1.Cache.find((item) => {
                return item.id === list.itemsIds[itemId];
            });
            if (item && !item.deleted) {
                items.push(item);
            }
            else {
                let currentItem = this.todoListItems.find((item) => item.id === list.itemsIds[itemId]);
                if (!currentItem.deleted) {
                    items.push(currentItem);
                    cache_1.Cache.push(currentItem);
                }
            }
        }
        return items;
    }
    filter(arr, filters) {
        const filteredObjects = arr.filter((obj) => {
            let isValid = true;
            for (const key in filters) {
                isValid = isValid && obj[key] == filters[key];
            }
            return isValid;
        });
        return filteredObjects;
    }
    createItem(item) {
        this.todoListItems.push(item);
        return item;
    }
    createlist(name) {
        let list = new todo_list_1.TodoList((0, uuid_1.v4)(), name, []);
        this.todoLists.push(list);
        return list;
    }
    updateItem(id, item) {
        let currentItem = cache_1.Cache.find((item) => item.id === id);
        if (!currentItem) {
            currentItem = this.todoListItems.find((item) => item.id === id);
            cache_1.Cache.push(currentItem);
        }
        currentItem = item;
    }
    updateList(id, list) {
        let currentList = this.todoLists.find((list) => list.id === id);
        currentList = list;
    }
    deleteItem(id) {
        let currentItem = cache_1.Cache.find((item) => item.id === id);
        if (!currentItem) {
            currentItem = this.todoListItems.find((item) => item.id === id);
        }
        if (currentItem) {
            currentItem.deleted = true;
        }
        else {
            throw Error;
        }
    }
    deleteList(id) {
        let list = this.todoLists.find((list) => list.id === id);
        if (list) {
            let index = this.todoLists.indexOf(list);
            this.todoLists.splice(index, 1);
        }
        else {
            throw Error;
        }
    }
}
exports.DB = DB;
//# sourceMappingURL=db.js.map