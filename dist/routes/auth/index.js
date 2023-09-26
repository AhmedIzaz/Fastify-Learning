"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../../controllers/authController");
const authMiddlewares_1 = require("../../middlewares/authMiddlewares");
const authValidation_1 = require("../../validation/authValidation");
exports.default = (fastify, _, done) => {
    fastify.addSchema(authValidation_1.loginReqValidator);
    fastify.post("/login", {
        schema: authValidation_1.loginReqRespValidator,
        preHandler: [authMiddlewares_1.notLoggedIn],
    }, authController_1.loginController);
    fastify.post("/signup", {
        schema: {
            body: {
                $ref: "loginReqBody",
            },
        },
        preHandler: [authMiddlewares_1.notLoggedIn],
    }, authController_1.signupController);
    done();
};
