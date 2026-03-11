const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();

app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/pdf-to-word", upload.single("file"), (req, res) => {

  const inputPath = req.file.path;
  const outputDir = "uploads/";

  exec(`libreoffice --headless --convert-to docx ${inputPath} --outdir ${outputDir}`, (err) => {

    if (err) {
      return res.status(500).send("Conversion error");
    }

    const outputFile = inputPath + ".docx";

    res.download(outputFile, "converted.docx", () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputFile);
    });

  });

});

app.get("/", (req,res)=>{
res.send("PDF API Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
console.log("Server running on port " + PORT);
});