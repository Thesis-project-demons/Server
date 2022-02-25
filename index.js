const express = require("express");
const cors = require("cors");
var product = require("./data-base/connection");
const logger = require("morgan");
const app = express();
const PORT = 5000 
const adminroutes = require("./routes/admin.routes");
const userroutes = require("./routes/user.routes")  ; 
const mechanic = require ("./routes/mechanic.routes")
app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use("/mechanic", mechanic);
app.use("/admin", adminroutes);
app.use("/user", userroutes);
app.listen(PORT, function () {
    console.log("listening on port 5000!");
  });
