"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const user_route_1 = require("./routes/user.route");
const guest_route_1 = require("./routes/guest.route");
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.use("/api/guest", guest_route_1.guestRouter);
exports.router.use("/api/users", user_route_1.userRouter);
exports.router.use("*", (req, res) => {
    res.status(404).send("Invalid Route");
});
//# sourceMappingURL=routes.js.map