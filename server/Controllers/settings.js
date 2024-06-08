const db = require("../Modules/dataBase.js");

async function getSettings() {
    const setting = await db.query("SELECT pomofocus, long_break, short_break FROM settings");
    return setting.rows[0];
}
  

const getDefaultSettings = async (req, res) => {
    try {
        const setting = await getSettings()
        res.status(200).json({ message: "Settings fetched successfully", setting: setting })
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
        console.log(error);
    }
};

async function updateSetting(pomofocus, long_break, short_break, username, id) {
    const update = await db.query(`UPDATE settings SET pomofocus = $1, long_break = $2, short_break = $3 WHERE username = $4 AND id = $5 RETURNING *`, [pomofocus, long_break, short_break, username, id])
    return update.rows[0]
}

async function insertSetting(pomofocus, long_break, short_break, username) {
    const insert = await db.query(`INSERT INTO settings (pomofocus, long_break, short_break, username) VALUES ($1, $2, $3, $4) RETURNING *`, [pomofocus, long_break, short_break, username])
    return insert.rows[0]
}

const InsertSettings = async (req, res) => {
    const { pomofocus, long_break, short_break } = req.body
    const { username } = req.cookies
    try {
        const insert = await insertSetting(pomofocus, long_break, short_break, username)
        res.status(200).json({ message: "Settings inserted successfully", setting: insert })
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
        console.log(error);
    }
}


const updateSettings = async (req, res) => {
    const { pomofocus, long_break, short_break } = req.body
    const {id} = req.params
    const { username } = req.cookies
    try {
        const update = await updateSetting(pomofocus, long_break, short_break, username, id)
        res.status(200).json({ message: "Settings updated successfully", setting: update })
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
        console.log(error);
    }
}

const deleteSetting = async (req, res) => {
    const {id} = req.params
    const { username } = req.cookies
    try {
        const deleteSetting = await db.query(`DELETE FROM settings WHERE username = $1 AND id = $2 RETURNING *`, [username, id])
        res.json({ message: "Settings deleted successfully", setting: deleteSetting.rows[0] })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred" })
    }
}


module.exports = {
    getDefaultSettings,
    InsertSettings,
    updateSettings,
    deleteSetting
}