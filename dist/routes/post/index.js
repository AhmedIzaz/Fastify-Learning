"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postController_1 = require("../../controllers/postController");
const postRoutesValidation_1 = require("../../validation/postRoutesValidation");
const authMiddlewares_1 = require("../../middlewares/authMiddlewares");
exports.default = (fastify, _, done) => {
    fastify.get("/", {
        schema: postRoutesValidation_1.getPostByIdRouteValidation,
        preHandler: [authMiddlewares_1.isLoggedIn],
    }, postController_1.getPostById);
    fastify.delete("/delete", {
        schema: postRoutesValidation_1.getPostByIdRouteValidation,
        preHandler: [authMiddlewares_1.isLoggedIn],
    }, postController_1.deletePostById);
    done();
};
