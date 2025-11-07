import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
const hashPassword = async (password) => {
  const hashP = await hash(password, 12);
  return hashP;
};

const generateAccessToken = (data) => {
  const token = sign(data, process.env.JWT_SECRET, { expiresIn: "60s" });
  return token;
};

const generateRefreshToken = (data) => {
  const token = sign(data, process.env.JWT_SECRET_REFRESH, {
    expiresIn: "15d",
  });
  return token;
};

export { hashPassword, generateAccessToken, generateRefreshToken };
