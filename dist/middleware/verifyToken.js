"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var verifyToken = function (req, res, next) {
    var authorizationHeader = req.headers.authorization; // OR req.header("authorization")
    var token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ")[1];
    if (!token) {
        return res.status(401).send("Access denied. Token missing.");
    }
    try {
        jsonwebtoken_1["default"].verify(token, TOKEN_SECRET);
        next();
    }
    catch (err) {
        res.status(400).send("Invalid token");
        return;
    }
};
exports["default"] = verifyToken;
