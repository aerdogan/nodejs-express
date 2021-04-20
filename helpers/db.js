require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection
    .on("open", () => {
        console.log("Mongodb bağlantısı kuruldu");
    })
    .on("error", (err) => {
        console.log(`Mongodb bağlantı hatası : ${err.message}`);
    });