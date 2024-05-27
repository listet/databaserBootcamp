import express from "express";
// import path from "path";
// import cors from "cors";
// import { fileUrlToPath } from "url";
import users from "./routes/users.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";

const PORT = 8000;
const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
    })
)
app.use(express.json());
// app.use(express.urlencoded({ extended: false }))

// const __filename = fileUrlToPath(import.meta.url)
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, "public")))

//Routes
app.use("/api/users", users)

//Middleware
app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server is running on port 8000...`)
});