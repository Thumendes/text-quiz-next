import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { CommonResponse } from "../../../types";

const createUser = async (
  req: NextApiRequest,
  res: NextApiResponse<CommonResponse>
) => {
  const payload = req.body;

  const userUnique = await prisma.user.findFirst({
    where: {
      OR: [{ nickname: payload.nickname, email: payload.email }],
    },
  });

  if (userUnique)
    return res.json({
      success: false,
      msg:
        userUnique.nickname === payload.nickname
          ? "Already exists user with this Nickname!"
          : "Already exists user with this E-mail!",
    });

  await prisma.user.create({
    data: payload,
  });

  return res.json({ success: true });
};

export default createUser;
