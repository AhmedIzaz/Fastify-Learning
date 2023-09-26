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
            const loggedIn = jsonwebtoken_1.default.verify(req.headers.authorization, process.env.JWT_SECRET_KEY || "", {
                ignoreExpiration: false,
            });
            if (loggedIn) {
                req.userId = loggedIn === null || loggedIn === void 0 ? void 0 : loggedIn.userId;
                return done();
            }
        }
        throw new Error("Unauthorized");
    }
    catch (err) {
        return reply.code(401).send({ message: "Unauthorized" });
    }
};
exports.isLoggedIn = isLoggedIn;
const notLoggedIn = (req, reply, done) => {
    try {
        if (req.headers.authorization) {
            const notExpired = jsonwebtoken_1.default.verify(req.headers.authorization, process.env.JWT_SECRET_KEY || "", {
                ignoreExpiration: false,
            });
            if (notExpired)
                reply.code(401).send({ message: "Already Looged In" });
        }
        done();
    }
    catch (err) {
        done();
    }
};
exports.notLoggedIn = notLoggedIn;
