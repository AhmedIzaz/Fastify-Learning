import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../src/app";

export const getPostById = async (
  req: FastifyRequest<{
    Querystring: {
      id: number;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.query;
    const post = await prisma.post.findUnique({
      where: { id },
    });
    return reply.status(400).send(post);
  } catch (error: Error | any) {
    return reply.send(error?.message).status(500);
  }
};

export const deletePostById = async (
  req: FastifyRequest<{
    Querystring: {
      id: number;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.query;
    const userId = (req as any)?.userId;
    const post = await prisma.post.delete({ where: { id, createdBy: userId } });
    return reply.status(400).send(post.title + " Deleted Successfully");
  } catch (error: Error | any) {
    return reply.send("Cant deleted!").status(500);
  }
};
