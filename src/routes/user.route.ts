import { Router } from "express";
import {
  login,
  signup,
  getTodoLists,
  getSortedTodoLists,
  filterListItems,
  getSortedItems,
  createTodoItem,
  createTodoList,
  updateTodoItem,
  updateTodoList,
  deleteTodoItem,
  deleteTodoList,
} from "../controllers/app.controller";
import { verifyToken as auth } from "../middlewares/auth";

export const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);

userRouter.get("/list", auth, getTodoLists);
userRouter.get("/sortedList", auth, getSortedTodoLists);
userRouter.get("/list/sortedItems", auth, getSortedItems);
userRouter.get("/:listId", auth, filterListItems);

userRouter.post("/item", auth, createTodoItem);
userRouter.post("/list", auth, createTodoList);

userRouter.put("/item/:id", auth, updateTodoItem);
userRouter.put("/list/:id", auth, updateTodoList);

userRouter.delete("/item/:id", auth, deleteTodoItem);
userRouter.delete("/list/:id", auth, deleteTodoList);
