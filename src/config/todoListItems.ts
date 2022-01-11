import { TodoListItem } from "./../models/todo-list-item";
export let todoListItems: TodoListItem[] = [
  {
    id: "1",
    title: "a",
    description: "desc",
    dueDate: new Date(),
    completed: false,
    deleted: false,
  },
  {
    id: "2",
    title: "b",
    description: "desc",
    dueDate: new Date(),
    completed: false,
    deleted: false,
  },
  {
    id: "3",
    title: "c",
    description: "desc",
    dueDate: new Date(),
    completed: false,
    deleted: false,
  },
  {
    id: "4",
    title: "d",
    description: "desc",
    dueDate: new Date(),
    completed: true,
    deleted: true,
  },
];
