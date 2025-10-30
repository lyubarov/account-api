import type { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../config/db.ts";
import { Account, CreateAccountPayload, UpdateAccountPayload } from "../schemas/accountSchema.ts";

export const createAccount = async(req: Request, res: Response) => {
  try {
    const payload: CreateAccountPayload = req.body;

    const db = getDB();
    const accounts = db.collection<Account>("accounts");

    const newAccount = {
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const { insertedId } = await accounts.insertOne(newAccount);
    
    const result = await accounts.findOne({ _id: insertedId });

    return res.status(201).json({
      message: "Account created successfully",
      account: result,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message } );
  }
};

export const updateAccount = async(req: Request, res: Response) => {
    try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const payload: UpdateAccountPayload = req.body;

    const newAccount = { ...payload, updatedAt: new Date() };
    const db = getDB();
    const accounts = db.collection<Account>("accounts");

    const account = await accounts.findOne({ _id: new ObjectId(id) });

    if(!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    const result = await accounts.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: newAccount },
      { returnDocument: "after" }
    );

    if(!result) {
      throw new Error("Failed to update account");
    }

    return res.json({ account: result });
  } catch (error: any) {
    return res.status(500).json({ error: error.message } );
  }
};

export const getStats = async (req: Request, res: Response) => {
    try {
    const db = getDB();
    const accounts = db.collection<Account>("accounts");

    const agg = await accounts.aggregate([
      { $group: { _id: "$scope", count: { $sum: 1 } } }
    ]).toArray();

    const stats = { accounts: 0, prospects: 0, children: 0 };
    agg.forEach((r: any) => {
      if (r._id === "account") { 
        stats.accounts = r.count;
      }
      if (r._id === "prospect") { 
        stats.prospects = r.count;
      }
      if (r._id === "child") { 
        stats.children = r.count;
      }
    });

    return res.json(stats);
  } catch (error: any) {
    return res.status(500).json({ error: error.message } );
  }
};
