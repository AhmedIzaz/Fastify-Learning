import { PrismaClient } from "@prisma/client";
import fastify, { FastifyInstance } from "fastify";
import routes from "../routes";
const app = fastify();
export const prisma = new PrismaClient();

app.register(routes);

app.listen(
  {
    port: 5000,
    host: "0.0.0.0",
  },
  (err) => {
    if (err) console.log(err);
    console.log("server is listening on port 5000");
  }
);
