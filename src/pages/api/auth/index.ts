import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { SignInResponse } from "../../../types";
import jwt from "jsonwebtoken";

const AuthHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<SignInResponse>
) => {
  const { username, password } = req.body;
  const secretKey = process.env.SECRET_KEY;

  const user = await prisma.user.findFirst({
    where: { OR: [{ nickname: username }, { email: username }] },
  });

  if (!user) return res.json({ success: false, msg: "User not found!" });

  if (user.password !== password)
    return res.json({ success: false, msg: "Incorrect password!" });

  const token = jwt.sign({ id: user.id }, secretKey);

  return res.json({ success: true, user, token });
};

export default AuthHandler;
