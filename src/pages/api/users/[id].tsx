import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import jwt from "jsonwebtoken";

const getUser = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { id, token } = req.query;
  const secretKey = process.env.SECRET_KEY;

  const queryId = (() => {
    if (!token) return String(id);

    try {
      const payload = jwt.verify(String(id), secretKey) as { id: string };

      return payload.id;
    } catch {
      return null;
    }
  })();

  if (!queryId) return res.json(null);

  const user = await prisma.user.findFirst({ where: { id: queryId } });

  return res.json(user);
};

export default getUser;
