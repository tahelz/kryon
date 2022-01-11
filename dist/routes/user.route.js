"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const app_controller_1 = require("../controllers/app.controller");
const auth_1 = require("../middlewares/auth");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/login", app_controller_1.login);
exports.userRouter.post("/signup", app_controller_1.signup);
exports.userRouter.get("/list", auth_1.verifyToken, app_controller_1.getTodoLists);
exports.userRouter.get("/sortedList", auth_1.verifyToken, app_controller_1.getSortedTodoLists);
exports.userRouter.get("/list/sortedItems", auth_1.verifyToken, app_controller_1.getSortedItems);
exports.userRouter.get("/:listId", auth_1.verifyToken, app_controller_1.filterListItems);
exports.userRouter.post("/item", auth_1.verifyToken, app_controller_1.createTodoItem);
exports.userRouter.post("/list", auth_1.verifyToken, app_controller_1.createTodoList);
exports.userRouter.put("/item/:id", auth_1.verifyToken, app_controller_1.updateTodoItem);
exports.userRouter.put("/list/:id", auth_1.verifyToken, app_controller_1.updateTodoList);
exports.userRouter.delete("/item/:id", auth_1.verifyToken, app_controller_1.deleteTodoItem);
exports.userRouter.delete("/list/:id", auth_1.verifyToken, app_controller_1.deleteTodoList);
//# sourceMappingURL=user.route.js.map