const express = require("express");
const app = express();
const path = require("path");

console.log("express server")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/v1", require("./routs/api"))

app.get("/", async(req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})
app.listen(6969, () => {
  console.log(`App running in port 6969`)
})
