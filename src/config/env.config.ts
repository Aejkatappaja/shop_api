import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export default {
  port: process.env.PORT || 4000,
};
