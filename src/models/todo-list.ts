import { TodoListItem } from "./todo-list-item";
export class TodoList {
  id: string;
  name: string;
  itemsIds: string[];

  constructor(id: string, name: string, itemsIds: string[]) {
    this.id = id;
    this.name = name;
    this.itemsIds = itemsIds;
  }
}
