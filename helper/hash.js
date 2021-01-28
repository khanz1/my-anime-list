const bcrypt = require('bcryptjs');
const hashing = (password) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash
}

const compare = (userPassword, passwordHashed) => {
    return bcrypt.compareSync(userPassword, passwordHashed)
}

module.exports = { hashing, compare }