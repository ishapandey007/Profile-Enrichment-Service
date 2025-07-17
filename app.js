const express = require("express");
const path = require("path");
const app = express();
const userRoutes = require("./routes/userRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

app.use(express.json());
app.use("/users", userRoutes);


app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api`);
});
