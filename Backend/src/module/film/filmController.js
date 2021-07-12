const path = require('path')
const sharp = require('sharp')
const conn = require('../../config/database/index')



class FilmController {
    static addFilm = async(req, res) => {
        
        const filmPictDir = path.join(__dirname, '../../assets/picture')
       
        const sql = `INSERT INTO film_list SET ?`
        const data = {...req.body}
        conn.query(sql, data, async(err, result)=> {
                if (err) return res.status(500).json(result)
            
            const filmPicture = `${req.body.filmName}-picture.png`
            await sharp(req.file.buffer).resize(200).png().toFile(`${filmPictDir}/${filmPicture}`)
            const updatePict = `UPDATE film_list SET filmPicture = ? WHERE id = ?`
            const dataUpdate = [filmPicture, result.insertId];

            conn.query(updatePict, dataUpdate, (err, result)=> {
                if (err) return res.status(500).json({message: `error saat upload gambar`, err})

                return res.status(200).json({message: `Film Berhasil di tambah`, result})
            })

        })
    }

    static editFilm = async(req, res) => {
        const filmPictDir = path.join(__dirname, '../../assets/picture')
       
        const sql = `UPDATE film_list SET ? WHERE id = ?`
        const data = [req.body, req.params.id]
        conn.query(sql, data, async(err, result)=> {
                if (err) return res.status(500).json(result)
            
            const filmPicture = `${req.body.filmName}-picture.png`
            await sharp(req.file.buffer).resize(200).png().toFile(`${filmPictDir}/${filmPicture}`)
            const updatePict = `UPDATE film_list SET filmPicture = ? WHERE id = ?`
            const dataUpdate = [filmPicture, result.insertId];

            conn.query(updatePict, dataUpdate, (err, result)=> {
                if (err) return res.status(500).json({message: `error saat upload gambar`, err})

                return res.status(200).json({message: `Film Berhasil di edit`, result})
            })

        })
    }

    static showFilms = (req, res) => {
        const sql = `SELECT filmName, filmPicture FROM film_list`
        conn.query(sql, (err, result)=> {
            if (err) return res.status(500).json(err)

            return res.status(200).json(result)
        })
    }

    static deleteFilm = (req, res) => {
        const sql = `DELETE FROM film_list WHERE id = ?`
        const data = req.params.id

        conn.query(sql, data, (err, result) => {
            if (err) return res.status(500).json(err)

            return res.status(200).json(result)
        })
    }

    static detailFilm = (req, res) => {
        const sql = `SELECT * FROM film_list WHERE id = ?`
        const data = req.params.id

        conn.query(sql, data,(err, result)=> {
            if (err) return res.status(500).json(err)

            return res.status(200).json(result)
        })
    }


    static bookFilm = (req, res) => {
        const sql = `INSERT INTO bookinglist SET ?`
        const data = req.body

        conn.query(sql, data, (err,result)=> {
            if (err) return res.status(500).json(err)

            return res.status(200).json(result)
        })
        
    }

    static changeBookingStatus = (req, res) => {
        const sql = `UPDATE bookinglist SET status = ? WHERE id = ?`
        const data = req.params.id

        conn.query(sql, data, (err, result) => {
            if (err) return res.status(500).json(err)

            return res.status(200).json(result)
        })
    }

    static bookingList = (req, res) => {
        const sql = `SELECT name, filmName, filmPicture, price, status FROM user JOIN bookinglist JOIN film_list`

        conn.query(sql, (err, result)=> {
            if(err) return res.status(500).json(err)

            return res.status(200).json(result)
        })

    }

}


module.exports = FilmController