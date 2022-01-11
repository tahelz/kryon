"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestRouter = void 0;
const express_1 = require("express");
const app_controller_1 = require("../controllers/app.controller");
exports.guestRouter = (0, express_1.Router)();
exports.guestRouter.get("/list", app_controller_1.getTodoLists);
exports.guestRouter.get("/sortedList", app_controller_1.getSortedTodoLists);
exports.guestRouter.get("/list/sortedItems", app_controller_1.getSortedItems);
exports.guestRouter.get("/:listId", app_controller_1.filterListItems);
//# sourceMappingURL=guest.route.js.map