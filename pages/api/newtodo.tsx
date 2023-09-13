import { errorHandler } from "@/middleware/error";
import prisma from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { checkAuth } from "./checkAuth";

export interface FormDataValue {
  title: string;
  text: string;
  userId: string | null;
  create: Date;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { title, text } = JSON.parse(req.body);

    // Not Exist Mehthod == POST Condition
    if (req.method !== "POST") {
      return errorHandler(res, 400, "ONLY POST METHOD IS ALLOWED");
    }

    const isLoginUser = await checkAuth(req, res);

    // const todo = await prisma.todo.create({
    //   data: {
    //     title: title,
    //     text: text,
    //     createAt: new Date(),
    //     userId: "123asds21123asd3",
    //   },
    // });

    return res
      .status(200)
      .json({ success: true, message: "Todo Create Successfully" });

  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;
