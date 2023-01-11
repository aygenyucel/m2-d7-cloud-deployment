import express from "express";
import { pipeline } from "stream";
import { getPdfReadableStream } from "../lib/pdf-tools.js";

const filesRouter = express.Router();

filesRouter.get("/pdf", (req, res, next) => {
  console.log("jkdfhfjksdjf");
  res.setHeader("Content-Disposition", "attachment; filename=blogPost.pdf");

  const source = getPdfReadableStream();
  const destination = res;
  pipeline(source, destination, (err) => {
    console.log(err);
  });
});

export default filesRouter;
