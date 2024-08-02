const { fetchData } = require("../utils/postgres")

const getUsers = async(req, res) => {
    try {
        const users = await fetchData("SELECT * FROM users");

        if(users){
            res.send({
                success: true,
                data: users
            })
        } else{
            res.send({
                success: true,
                data: {}
            })
        }
    } catch (error) {
        res.status(error.status || 400).send({
            success: false,
            message: error.message
        })
    }
}

const createUser = async(req, res) => {
    try {
        const { full_name, age, job } = req.body;

        await fetchData("INSERT INTO users(full_name, age, job) VALUES($1, $2, $3)", full_name, age, job);

        res.send({
            success: true,
            message: "Created!"
        });
    } catch (error) {
        res.status(error.status || 400).send({
            success: false,
            message: error.message
        })
    }
}

const updateUsers = async(req, res) => {
    try {
        const { id } = req.params;
        const { full_name, age, job } = req.body;
        const users = await fetchData("SELECT * FROM users");
        const user = users.find(el => el.id == id);

        if(user){
            await fetchData("UPDATE users SET full_name = $1, age = $2, job = $3 WHERE id = $4", full_name || user.full_name, age || user.age, job || user.job, id);

            res.send({
                success: true,
                message: "Updated!"
            })
        } else{
            res.status(404).send({
                success: false,
                message: `Cannot found user with id ${id}`
            })
        }
    } catch (error) {
        res.status(error.status || 400).send({
            success: false,
            message: error.message
        })
    }
}

const deleteUsers = async(req, res) => {
    try {
        const { id } = req.params;
        const users = await fetchData("SELECT * FROM users");
        const user = users.find(el => el.id == id);

        if(user){
            await fetchData("DELETE FROM users WHERE id = $1", id);

            res.send({
                success: true,
                message: "Deleted!"
            })
        } else{
            res.status(404).send({
                success: false,
                message: `Cannot found user with id ${id}`
            })
        }
    } catch (error) {
        res.status(error.status || 400).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUsers,
    deleteUsers
}