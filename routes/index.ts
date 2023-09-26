import { FastifyInstance, FastifyPluginOptions } from "fastify";
import authRoutes from "./auth";
import postRoutes from "./post";
export default (
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: any
) => {
  fastify.register(authRoutes, {
    prefix: "/auth",
  });
  fastify.register(postRoutes, {
    prefix: "/post",
  });
  done();
};
