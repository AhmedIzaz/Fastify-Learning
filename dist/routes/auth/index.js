"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../../controllers/authController");
const authMiddlewares_1 = require("../../middlewares/authMiddlewares");
const authValidation_1 = require("../../validation/authValidation");
exports.default = (fastify, _, done) => {
    fastify.addSchema(authValidation_1.loginReqValidator);
    fastify.post("/login", {
        schema: {
            body: {
                $ref: "loginReqBody",
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                        },
                        token: {
                            type: "string",
                        },
                    },
                },
                500: {
                    type: "string",
                },
            },
        },
        preHandler: (req, rep, done) => {
            (0, authMiddlewares_1.notLoggedIn)(req, rep, done);
        },
    }, authController_1.loginController);
    fastify.post("/signup", {
        schema: {
            body: {
                $ref: "loginReqBody",
            },
        },
        preHandler: (req, reply, done) => {
            (0, authMiddlewares_1.notLoggedIn)(req, reply, done);
        },
    }, authController_1.signupController);
    done();
};
