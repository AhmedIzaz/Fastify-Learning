"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostByIdRouteValidation = void 0;
exports.getPostByIdRouteValidation = {
    querystring: {
        type: "object",
        properties: {
            id: {
                type: "number",
            },
        },
        required: ["id"],
    },
};
