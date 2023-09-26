import { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
  loginController,
  signupController,
} from "../../controllers/authController";
import { notLoggedIn } from "../../middlewares/authMiddlewares";
import {
  loginReqValidator,
  loginReqRespValidator,
} from "../../validation/authValidation";

export default (
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: any
) => {
  fastify.addSchema(loginReqValidator);
  fastify.post(
    "/login",
    {
      schema: loginReqRespValidator,
      preHandler: [notLoggedIn],
    },
    loginController
  );
  fastify.post(
    "/signup",
    {
      schema: {
        body: {
          $ref: "loginReqBody",
        },
      },
      preHandler: [notLoggedIn],
    },
    signupController
  );
  done();
};
