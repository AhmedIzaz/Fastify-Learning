export const getPostByIdRouteValidation = {
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
