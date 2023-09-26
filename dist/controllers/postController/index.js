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
exports.deletePostById = exports.getPostById = void 0;
const app_1 = require("../../src/app");
const getPostById = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const post = yield app_1.prisma.post.findUnique({
            where: { id },
        });
        return reply.status(400).send(post);
    }
    catch (error) {
        return reply.send(error === null || error === void 0 ? void 0 : error.message).status(500);
    }
});
exports.getPostById = getPostById;
const deletePostById = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const userId = req === null || req === void 0 ? void 0 : req.userId;
        const post = yield app_1.prisma.post.delete({ where: { id, createdBy: userId } });
        return reply.status(400).send(post.title + " Deleted Successfully");
    }
    catch (error) {
        return reply.send("Cant deleted!").status(500);
    }
});
exports.deletePostById = deletePostById;
