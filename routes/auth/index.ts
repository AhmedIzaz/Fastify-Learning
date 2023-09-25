import { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
  loginController,
  signupController,
} from "../../controllers/authController";
import { notLoggedIn } from "../../middlewares/authMiddlewares";
import { loginReqValidator } from "../../validation/authValidation";

export default (
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: any
) => {
  fastify.addSchema(loginReqValidator);
  fastify.post(
    "/login",
    {
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
        notLoggedIn(req, rep, done);
      },
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
      preHandler: (req, reply, done) => {
        notLoggedIn(req, reply, done);
      },
    },
    signupController
  );
  done();
};
