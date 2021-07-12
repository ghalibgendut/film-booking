const bcrypt = require('bcrypt')
const conn = require('../../config/database/index')


class AdminController {

    static adminRegistration = (req, res) => {
        const sql = `INSERT INTO admin SET ?`
        const data = req.body

        data.password = bcrypt.hashSync(data.password, 10)

        conn.query(sql, data, (err, result)=> {
            if (err) return res.status(500).json(err)

            return res.status(200).json(result)
        })
    }

    static adminLogin = (req, res) => {
        const {email, password} = req.body
        const sql = `SELECT * FROM admin WHERE email = '${email}'`

        conn.query(sql, (err, result)=> {
            if (err) return res.status(500).json(err)

            let user = result[0]
            let pass = bcrypt.compareSync(password, user.password)

            if((!user && !email) || !pass) return res.status(404).json({message: `email atau password salah!`})

            return res.status(200).json({message: `Login berhasil`, user})
        })

    }


}

module.exports = AdminController