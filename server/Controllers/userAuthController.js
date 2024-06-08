const db = require("../Modules/dataBase.js");
const bcrypt = require("bcrypt")

async function insertUser(username, email, password){
    const newUser = await db.query(`INSERT INTO register (username, email, password) VALUES ($1, $2, $3) RETURNING *`, [username, email, password]);
    return newUser.rows[0]
}

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = await insertUser(username, email, hashpassword);
        res.cookie("username", username);
        res.json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred" });
    }
};

async function checkusersGoogleAccont(email){
    const google = await db.query("SELECT * FROM users WHERE email = $1", [email])
    return google.rows[0]
}


async function login(email, password){
    try {
        const user = await db.query(`SELECT * FROM register WHERE email = $1`, [email]);
        if(user.rows[0].length > 0 && bcrypt.compareSync(password, user.rows[0].password)){
            return user.rows[0];
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}
    

const loginHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        const currentUser = await login(email, password);
        if(currentUser && bcrypt.compareSync(password, currentUser.password)){
            res.cookie("username", currentUser.username);
            res.json({ message: "User logged in successfully", user: currentUser });
        } else {
            res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred" });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        const hashpassword = await bcrypt.hash(password, 10);
        const updateUser = await db.query(`UPDATE register SET username = $1, password = $2 WHERE id = $3 RETURNING *`,[username, hashpassword, id]);
        res.json({ message: "User updated successfully", user: updateUser.rows[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const {id} = req.params
    try {
        const deleteUser = await db.query(`DELETE FROM register WHERE id = $1 RETURNING *`, [id])
        res.json({ message: "User deleted successfully", user: deleteUser.rows[0] })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred" });
    }
}

module.exports = { register, loginHandler, updateUser, deleteUser };

