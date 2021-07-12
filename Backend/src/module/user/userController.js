const bcrypt = require('bcrypt')
const conn = require('../../config/database/index')

class UserController {

    static userRegister = (req, res) => {
        const sql = `INSERT INTO user SET ?`
        const data = req.body

        data.password = bcrypt.hashSync(data.password, 10)

        conn.query(sql, data, (err, result)=> {
            if (err) return res.status(500).json(err)

            return res.status(200).json(result)
        })
    }

    static userLogin = (req, res) => {
        const {username, password} = req.body
        const sql = `SELECT * FROM user WHERE username = '${username}'`

        conn.query(sql, (err, result)=> {
            if (err) return res.status(500).json(err)

            let user = result[0]
            let pass = bcrypt.compareSync(password, user.password)

            if((!user && !username) || !pass) return res.status(404).json({message: `username atau password salah!`})

            return res.status(200).json({message: `Login berhasil`, user})
        })

    }


}

module.exports = UserController