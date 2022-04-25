const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/",(req,res)=>{
    res.send("starts new nodejs project");

});

app.listen(5000, () => console.log("listening on post 5000"));