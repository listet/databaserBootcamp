import database from "../db/database.js";
import bcrypt from "bcrypt";

const getUsers = (req, res) => {
    database.find({}, (err, data) => {
        if (err) {
            return res.status(500).send({ error: "Error finding users" });
        }
        const usernames = data.map((user) => user.username);
        res.status(200).json(usernames);
    });
};

const getUser = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        const error = new Error(`You must add a username and a password`);
        error.status = 400;
        return next(error)
    }

    database.findOne({ username }, (err, user) => {
        if (err) {
            return res.status(500).send({ error: "Error finding user" })
        }
        if (!user) {
            const error = new Error(`Username does not exist`)
            error.status = 404;
            return next(error)
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password)

        if (!isPasswordCorrect) {
            const error = new Error("Username or password is incorrect")
            error.status = 401;
            return next(error)
        }
        res.status(200).json(user)
    })
}

const newUser = (req, res, next) => {
    const { username, password } = req.body


    if (!username || !password) {
        const error = new Error(`You must add a username and a password`);
        error.status = 400;
        return next(error)
    }

    database.findOne({ username }, (err, existingUser) => {
        if (err) {
            return res.status(500).send({ error: "This is an error" })
        }

        if (existingUser) {
            const error = new Error(`Username already exists`)
            error.status = 409;
            return next(error);
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        database.insert(
            { username, password: hashedPassword },
            (err, newUser) => {
                if (err) {
                    return res.status(500).send({ error: "Error creating user" })
                }
                res.status(201).json(newUser)
            }
        )
    })

}

export { getUsers, getUser, newUser }