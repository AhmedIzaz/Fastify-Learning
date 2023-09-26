import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { deletePostById, getPostById } from "../../controllers/postController";
import { getPostByIdRouteValidation } from "../../validation/postRoutesValidation";
import { isLoggedIn } from "../../middlewares/authMiddlewares";

export default (
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: any
) => {
  fastify.get(
    "/",
    {
      schema: getPostByIdRouteValidation,
      preHandler: [isLoggedIn],
    },
    getPostById
  );

  fastify.delete(
    "/delete",
    {
      schema: getPostByIdRouteValidation,
      preHandler: [isLoggedIn],
    },
    deletePostById
  );
  done();
};
