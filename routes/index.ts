import { FastifyInstance, FastifyPluginOptions } from "fastify";
import authRoutes from "./auth";
export default (
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: any
) => {
  fastify.register(authRoutes, {
    prefix: "/auth",
  });
  done();
};
