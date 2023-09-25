"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = __importDefault(require("../routes"));
const app = (0, fastify_1.default)();
exports.prisma = new client_1.PrismaClient();
app.register(routes_1.default);
app.listen({
    port: 5000,
    host: "0.0.0.0",
}, (err) => {
    if (err)
        console.log(err);
    console.log("server is listening on port 5000");
});
