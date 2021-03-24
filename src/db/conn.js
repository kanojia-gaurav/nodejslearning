
const mongoose = require("mongoose");

//mongoose.connect("mongodb://localhost:27017/nodeloginandsignup");

const url = ("mongodb://localhost:27017/nodeloginandsignup");


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology:true, createIndexes:true }, (err) => {
    console.log('mongo db connection', err)
})