export const loginReqValidator = {
  $id: "loginReqBody",
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
    username: { type: "string" },
  },
  required: ["email", "password"],
};
