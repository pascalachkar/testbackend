import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import configJson from "../config/config";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";

const config = configJson[env];

console.log("this is the environment: ", env);

const db = {};

let sequelize;
if (config.environment === "production") {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "postgres",
      dialectOption: {
        ssl: true,
        native: true,
      },
      logging: true,
    }
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Employee = require("./employee.js")(sequelize, Sequelize);
db.Department = require("./department.js")(sequelize, Sequelize);
db.Salary = require("./salary.js")(sequelize, Sequelize);
db.JobTitle = require("./jobtitle.js")(sequelize, Sequelize);

db.Department.hasMany(db.Employee, {
  foreignKey: "department_id",
});

db.Employee.belongsTo(db.Department, {
  foreignKey: "department_id",
});

db.Employee.hasOne(db.Salary, {
  foreignKey: "employee_id",
});
db.Salary.belongsTo(db.Employee, {
  foreignKey: "employee_id",
});

db.Employee.hasOne(db.JobTitle, {
  foreignKey: "employee_id",
});
db.JobTitle.belongsTo(db.Employee, {
  foreignKey: "employee_id",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
