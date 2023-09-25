import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
export const isLoggedIn = (
  req: FastifyRequest,
  reply: FastifyReply,
  done: any
) => {
  try {
    if (req.headers.authorization) {
      const hasExpired = jwt.verify(req.headers.authorization, "secret", {
        ignoreExpiration: false,
      });
      if (!hasExpired)
        reply.code(401).send({
          message: "Token expired",
        });
      done();
    }
    throw new Error("Unauthorized");
  } catch (err) {
    reply.code(401).send({ message: "Unauthorized" });
  }
};

export const notLoggedIn = (
  req: FastifyRequest,
  reply: FastifyReply,
  done: any
) => {
  try {
    if (req.headers.authorization) {
      const hasExpired = jwt.verify(req.headers.authorization, "secret", {
        ignoreExpiration: false,
      });
      if (!hasExpired) done();
      reply.code(401).send({ message: "Already Looged In" });
    }
    done();
  } catch (err) {
    done();
  }
};
