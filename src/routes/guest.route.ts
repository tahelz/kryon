import { Router } from "express";
import {
  getTodoLists,
  getSortedTodoLists,
  filterListItems,
  getSortedItems,
} from "../controllers/app.controller";

export const guestRouter = Router();

guestRouter.get("/list", getTodoLists);
guestRouter.get("/sortedList", getSortedTodoLists);
guestRouter.get("/list/sortedItems", getSortedItems);
guestRouter.get("/:listId", filterListItems);
