const db = require('../../routes/pgExport')

const getAllUsers = async () => {
  const users = await db.any('SELECT * FROM users')
  return users
}

const addNewUser = async (body) => {
  const insertQuery = 'INSERT INTO users(username, password_digest, img_url) VALUES($1, $2, $3) RETURNING id, username'
  const newUser = await db.one(insertQuery, [body.username, body.password, body.img_url])
  return newUser
}

const getUserByUsername = async (username) => {
  const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username])
  return user
}

module.exports = {
  getAllUsers: getAllUsers,
  addNewUser: addNewUser,
  getUserByUsername: getUserByUsername
}
