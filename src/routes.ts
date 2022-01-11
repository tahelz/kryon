import { userRouter } from "./routes/user.route";
import { guestRouter } from "./routes/guest.route";
import { Router } from "express";

export const router = Router();

router.use("/api/guest", guestRouter);
router.use("/api/users", userRouter);
router.use("*", (req, res) => {
  res.status(404).send("Invalid Route");
});
