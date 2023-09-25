"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginReqValidator = void 0;
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
