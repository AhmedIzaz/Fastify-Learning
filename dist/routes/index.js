"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const post_1 = __importDefault(require("./post"));
exports.default = (fastify, _, done) => {
    fastify.register(auth_1.default, {
        prefix: "/auth",
    });
    fastify.register(post_1.default, {
        prefix: "/post",
    });
    done();
};
