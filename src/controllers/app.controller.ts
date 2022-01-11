import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { DB } from "../config/db";

let db = new DB();

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    if (!(password && name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser: User = await db.findUser(name);

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    let encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user: User = await db.createUser(name, encryptedPassword);

    const token = jwt.sign({ user_id: user.id }, process.env.TOKEN_KEY, {
      expiresIn: "24h",
    });

    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    res.sendStatus(500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    if (!(name && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user: User = await db.findUser(name);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user.id }, process.env.TOKEN_KEY, {
        expiresIn: "24h",
      });

      user.token = token;
      res.json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

export const getTodoLists = async (req: Request, res: Response) => {
  const filters = req.query;

  try {
    let list = await db.getFilteredLists(filters);
    return res.status(200).json(list);
  } catch (err) {
    res.sendStatus(500);
  }
};

export const getSortedTodoLists = async (req: Request, res: Response) => {
  const { sortBy, order } = req.query;

  try {
    return res.json(db.getSortedList(sortBy.toString(), order.toString()));
  } catch (err) {
    res.sendStatus(500);
  }
};

export const getSortedItems = async (req: Request, res: Response) => {
  const { listId, sortBy, order } = req.query;

  try {
    return res.json(
      db.getSortedItems(listId.toString(), sortBy.toString(), order.toString())
    );
  } catch (err) {
    res.sendStatus(500);
  }
};

export const filterListItems = async (req: Request, res: Response) => {
  const listId = req.params.listId;
  const filters = req.query;

  try {
    return res.json(db.filterListItems(listId, filters));
  } catch (err) {
    res.sendStatus(500);
  }
};

export const createTodoItem = async (req: Request, res: Response) => {
  try {
    const todoItem = await db.createItem(req.body);
    return res.json({ created: todoItem.id });
  } catch (err) {
    res.sendStatus(500);
  }
};

export const createTodoList = async (req: Request, res: Response) => {
  try {
    let todoList = await db.createlist(req.params.name);
    return res.json({ created: todoList.id });
  } catch (err) {
    res.sendStatus(500);
  }
};

export const updateTodoItem = async (req: Request, res: Response) => {
  try {
    await db.updateItem(req.params.id, req.body);
    return res.json({ updated: req.params.id });
  } catch (err) {
    res.sendStatus(500);
  }
};

export const updateTodoList = async (req: Request, res: Response) => {
  try {
    await db.updateList(req.params.id, req.body);
    return res.json({ updated: req.params.id });
  } catch (err) {
    res.sendStatus(500);
  }
};

export const deleteTodoItem = async (req: Request, res: Response) => {
  try {
    // the delete is only logical => setting the deleted field to true;
    await db.deleteItem(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    res.sendStatus(500);
  }
};

export const deleteTodoList = async (req: Request, res: Response) => {
  try {
    await db.deleteList(req.params.id);
    return res.status(200).json({ deleted: req.params.id });
  } catch (err) {
    res.sendStatus(500);
  }
};
