import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
export const isLoggedIn = <Tb, Tq, Tp>(
  req: FastifyRequest<{
    Body?: Tb;
    Querystring?: Tq;
    Params?: Tp;
  }>,
  reply: FastifyReply,
  done: any
) => {
  try {
    if (req.headers.authorization) {
      const loggedIn = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET_KEY || "",
        {
          ignoreExpiration: false,
        }
      );
      if (loggedIn) {
        (req as any).userId = (loggedIn as any)?.userId;
        return done();
      }
    }
    throw new Error("Unauthorized");
  } catch (err) {
    return reply.code(401).send({ message: "Unauthorized" });
  }
};

export const notLoggedIn = <Tb, Tq, Tp>(
  req: FastifyRequest<{
    Body?: Tb;
    Querystring?: Tq;
    Params?: Tp;
  }>,
  reply: FastifyReply,
  done: any
) => {
  try {
    if (req.headers.authorization) {
      const notExpired = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET_KEY || "",
        {
          ignoreExpiration: false,
        }
      );
      if (notExpired) reply.code(401).send({ message: "Already Looged In" });
    }
    done();
  } catch (err) {
    done();
  }
};
