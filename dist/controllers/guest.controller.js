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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodoLists = void 0;
const db_1 = require("../config/db");
let db = new db_1.DB();
const getTodoLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = req.query;
    try {
        return res.json(yield db.getFilteredLists(filters));
    }
    catch (err) {
        res.sendStatus(500);
    }
});
exports.getTodoLists = getTodoLists;
//# sourceMappingURL=guest.controller.js.map