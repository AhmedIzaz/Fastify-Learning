import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../src/app";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ISignUp } from "../../types/authTypes";
export const loginController = async (
  request: FastifyRequest<{
    Body: ISignUp;
  }>,
  reply: FastifyReply
) => {
  try {
    const { email, password } = request.body;
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) return reply.code(409).send("User dont exists");
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) return reply.code(401).send("Unauthorized Access");
    const token = jwt.sign(
      {
        userId: user?.id,
        email: user?.email,
        username: user?.username,
      },
      process.env.JWT_SECRET_KEY || "",
      {
        expiresIn: 60,
      }
    );
    return reply.code(200).send({
      message: "Login successfull",
      token,
    });
  } catch (error: Error | any) {
    return reply.send(error?.message).status(500);
  }
};

export const signupController = async (
  req: FastifyRequest<{
    Body: ISignUp;
  }>,
  reply: FastifyReply
) => {
  try {
    const { email, username, password } = req.body;
    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (userExist) return reply.code(409).send("User already exists");
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    return reply.code(201).send("User created successfully");
  } catch (error: Error | any) {
    return reply.send(error?.message).status(500);
  }
};
