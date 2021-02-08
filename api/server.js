import config from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express'
import employeeRoutes from "./server/routes/EmployeeRoutes";
import departmentRoutes from "./server/routes/DepartmentRoutes";
import filesUploadRoutes from "./server/routes/FilesRoutes";
import cors from "cors";
var swaggerDocument = require("./swagger/swagger.json")

global.__basedir = __dirname;

config.config();

const app = express();



const corsOptions = {
  origin:"http://localhost:8081"
}


app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use(cors(corsOptions));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



const port = process.env.PORT || 8000;

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/departments", departmentRoutes);
app.use("/api/v1/upload", filesUploadRoutes);

// when a random route is inputed
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to this API.",
  })
);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
