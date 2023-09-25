"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notLoggedIn = exports.isLoggedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isLoggedIn = (req, reply, done) => {
    try {
        if (req.headers.authorization) {
            const hasExpired = jsonwebtoken_1.default.verify(req.headers.authorization, "secret", {
                ignoreExpiration: false,
            });
            if (!hasExpired)
                reply.code(401).send({
                    message: "Token expired",
                });
            done();
        }
        reply.code(401).send({ message: "Unauthorized" });
    }
    catch (err) {
        reply.code(401).send({ message: "Unauthorized" });
    }
};
exports.isLoggedIn = isLoggedIn;
const notLoggedIn = (req, reply, done) => {
    try {
        if (req.headers.authorization) {
            const hasExpired = jsonwebtoken_1.default.verify(req.headers.authorization, "secret", {
                ignoreExpiration: false,
            });
            if (!hasExpired)
                done();
            reply.code(401).send({ message: "Already Looged In" });
        }
        done();
    }
    catch (err) {
        done();
    }
};
exports.notLoggedIn = notLoggedIn;
