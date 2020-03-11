const db = require('../../config/db')
const date = require('../../lib/utils')

module.exports = {
  index(callback) {
    const query = `SELECT * FROM chefs`
    db.query(query, function(err, results) {
      if (err) throw `Database Error! ${err}`
      callback(results.rows)
    })
  },
  create(data, callback) {
    const query = `
    INSERT INTO chefs (
      name,
      avatar_url,
      created_at
      ) VALUES ($1, $2, $3)
    RETURNING id
    `
    
    const values = [
      data.name,
      data.avatar_url,
      date(Date.now()).iso
    ]

    db.query(query, values, function(err, results) {
      if (err) throw `Database Error! ${err}`
      callback(results.rows[0])
    })
  },
  find(id, callback) {
    db.query(`
    SELECT *
    FROM chefs
    WHERE id = $1`, [id], function(err, results) {
      if (err) throw `Database Error! ${err}`
      callback(results.rows[0])
    })
  }




  
}