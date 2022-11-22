import { Sequelize } from "sequelize-typescript";

import Token from "../models/token-model";
import User from "../models/user-model";

const sequelize = new Sequelize({
  database: "studydb",
  dialect: "mysql",
  username: "root",
  password: "password",
  define: {
    timestamps: false,
  },
  models: [User, Token],
});

export default sequelize;
