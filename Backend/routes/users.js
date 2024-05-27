import express from "express"
import { getUsers, getUser, newUser } from "../controllers/usersController.js";
const router = express();

router.get("/", getUsers)


router.post("/login/", getUser)

router.post("/signup", newUser)

export default router;