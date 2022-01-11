"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoList = exports.deleteTodoItem = exports.updateTodoList = exports.updateTodoItem = exports.createTodoList = exports.createTodoItem = exports.filterListItems = exports.getSortedItems = exports.getSortedTodoLists = exports.getTodoLists = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
let db = new db_1.DB();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        if (!(password && name)) {
            res.status(400).send("All input is required");
        }
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = yield db.findUser(name);
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        let encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create user in our database
        const user = yield db.createUser(name, encryptedPassword);
        const token = jsonwebtoken_1.default.sign({ user_id: user.id }, process.env.TOKEN_KEY, {
            expiresIn: "24h",
        });
        user.token = token;
        res.status(201).json(user);
    }
    catch (err) {
        res.sendStatus(500);
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        if (!(name && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = yield db.findUser(name);
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            const token = jsonwebtoken_1.default.sign({ user_id: user.id }, process.env.TOKEN_KEY, {
                expiresIn: "24h",
            });
            user.token = token;
            res.json(user);
        }
        else {
            res.status(400).send("Invalid Credentials");
        }
    }
    catch (err) {
        res.sendStatus(500);
    }
});
exports.login = login;
const getTodoLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = req.query;
    try {
        let list = yield db.getFilteredLists(filters);
        return res.status(200).json(list);
    }
    catch (err) {
        res.sendStatus(500);
    }
});
exports.getTodoLists = getTodoLists;
const getSortedTodoLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sortBy, order } = req.query;
    try {
        return res.json(db.getSortedList(sortBy.toString(), order.toString()));
    }
    catch (err) {
        res.sendStatus(500);
    }
});
exports.getSortedTodoLists = getSortedTodoLists;
const getSortedItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { listId, sortBy, order } = req.query;
    try {
        return res.json(db.getSortedItems(listId.toString(), sortBy.toString(), order.toString()));
    }
    catch (err) {
        res.sendStatus(500);
    }
});
exports.getSortedItems = getSortedItems;
const filterListItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listId = req.params.listId;
    const filters = req.query;
    try {
        return res.json(db.filterListItems(listId, filters));
    }
    catch (err) {
        res.sendStatus(500);
    }
});
exports.filterListItems = filterListItems;
const createTodoItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoItem = yield db.createItem(req.body);
        return res.json({ created: todoItem.id });
    }
    catch (err) {
        res.sendStatus(500);
    }
});
exports.createTodoItem = createTodoItem;
const createTodoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let todoList = yield db.createlist(req.params.name);
        return res.json({ created: todoList.id });
    }
    catch (err) {
        res.sendStatus(500);
    }
});
exports.createTodoList = createTodoList;
const updateTodoItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.updateItem(req.params.id, req.body);
        return res.json({ updated: req.params.id });
    }
    catch (err) {
        res.sendStatus(500);
    }
});
exports.updateTodoItem = updateTodoItem;
const updateTodoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.updateList(req.params.id, req.body);
        return res.json({ updated: req.params.id });
    }
    catch (err) {
        res.sendStatus(500);
    }
});
exports.updateTodoList = updateTodoList;
const deleteTodoItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // the delete is only logical => setting the deleted field to true;
        yield db.deleteItem(req.params.id);
        return res.json({ deleted: req.params.id });
    }
    catch (err) {
        res.sendStatus(500);
    }
});
exports.deleteTodoItem = deleteTodoItem;
const deleteTodoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.deleteList(req.params.id);
        return res.status(200).json({ deleted: req.params.id });
    }
    catch (err) {
        res.sendStatus(500);
    }
});
exports.deleteTodoList = deleteTodoList;
//# sourceMappingURL=app.controller.js.map