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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupController = exports.loginController = void 0;
const app_1 = require("../../src/app");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginController = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        const user = yield app_1.prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (!user)
            return reply.code(409).send("User dont exists");
        const passwordMatched = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatched)
            return reply.code(401).send("Unauthorized Access");
        const token = jsonwebtoken_1.default.sign({
            userId: user === null || user === void 0 ? void 0 : user.id,
            email: user === null || user === void 0 ? void 0 : user.email,
            username: user === null || user === void 0 ? void 0 : user.username,
        }, process.env.JWT_SECRET_KEY || "", {
            expiresIn: 60,
        });
        return reply.code(200).send({
            message: "Login successfull",
            token,
        });
    }
    catch (error) {
        return reply.send(error === null || error === void 0 ? void 0 : error.message).status(500);
    }
});
exports.loginController = loginController;
const signupController = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        const userExist = yield app_1.prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (userExist)
            return reply.code(409).send("User already exists");
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield app_1.prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
        });
        return reply.code(201).send("User created successfully");
    }
    catch (error) {
        return reply.send(error === null || error === void 0 ? void 0 : error.message).status(500);
    }
});
exports.signupController = signupController;
