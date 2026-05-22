const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function(req, file, cb) {

        const uniqueName =
            Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage
});

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/public/index.html");
});

app.post("/upload", upload.single("image"), function(req, res) {

    const imageUrl =
    req.protocol + "://" +
    req.get("host") +
    "/uploads/" +
    req.file.filename;

res.send(imageUrl);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {

    console.log("Server dang chay");
});