import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import router from "./routes";
import sequelize from "./config/database";

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);
app.use("/api", router);

const start = async () => {
  try {
    await sequelize.sync({
      force: true,
      logging: false,
    });

    app.listen(PORT, () => console.log(`Server started on PORT=${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
