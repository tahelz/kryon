export class TodoListItem {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  deleted: boolean;

  constructor(
    id: string,
    title: string,
    description: string,
    dueDate: Date,
    completed: boolean,
    deleted: boolean
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.completed = completed;
    this.deleted = deleted;
  }
}
