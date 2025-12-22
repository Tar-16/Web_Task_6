// Node.js server entry point
const express = require("express");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
