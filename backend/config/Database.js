import { Sequelize } from "sequelize";
const db = new Sequelize("resto_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
export default db;
