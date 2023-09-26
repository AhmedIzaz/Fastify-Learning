import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import routes from "../routes";
const app = fastify();
export const prisma = new PrismaClient();

app.register(routes);

const PORT = +(process.env.PORT || 5000);

app.listen(
  {
    port: PORT,
    host: "0.0.0.0",
  },
  (err) => {
    if (err) console.log(err);
    console.log(`server is listening on port ${PORT}`);
  }
);
