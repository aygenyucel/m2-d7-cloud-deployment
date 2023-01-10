import express from "express";
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./api/authors/index.js";
import blogPostsRouter from "./api/blogPosts/index.js";
import cors from "cors";
import { notFoundHandler } from "./errorHandlers.js";

const server = express();
// server waits for request

const port = 3001;

// ************************* MIDDLEWARES ****************************
//order matters
//global middlewares needs to be displaying before endpoints
const loggerMiddleWare = (req, res, next) => {
  console.log("req.header:", req.headers);
  console.log(
    `Request method ${req.method} -- url ${req.url} -- ${new Date()}`
  );
  console.log("req.user:", req.user);

  req.user = "Riccardo";
  console.log("req.user:", req.user);
  console.log("xxxxxxxxxx", req);

  next(); //gives the control to whom is coming next (either another middleware or route handler)
};

// const policeOfficerMiddleware = (req, res, next) => {
//   console.log("Current user:", req.user);
//   if (req.user === "Riccardo") {
//     res.status(403).send({ message: "Riccardos are not allowed" });
//   } else {
//     next();
//   }
// };

server.use(loggerMiddleWare);
// server.use(policeOfficerMiddleware);
// Just to let FE communicate with BE successfully
server.use(cors());
// If you do not add this line here BEFORE the endpoints, all req.body will be UNDEFINED
server.use(express.json());

// ************************** ENDPOINTS *****************************
server.use("/authors", authorsRouter);
server.use("/blogPosts", blogPostsRouter);

// ************************** ERROR HANDLERS ************************
server.use(notFoundHandler); //404

// **************************************************
server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log("Server is running on port:", port);
});
