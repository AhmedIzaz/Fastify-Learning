"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginReqRespValidator = exports.loginReqValidator = void 0;
exports.loginReqValidator = {
    $id: "loginReqBody",
    type: "object",
    properties: {
        email: { type: "string" },
        password: { type: "string" },
        username: { type: "string" },
    },
    required: ["email", "password"],
};
exports.loginReqRespValidator = {
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
};
