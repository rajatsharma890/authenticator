import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import toast from "react-hot-toast";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    interface DecodedToken {
      id: string;
      username: string;
      email: string;
    }
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as DecodedToken;
    return decodedToken.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};
