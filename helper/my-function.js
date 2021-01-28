const { User } = require("../models")
const nodemailer = require("nodemailer");

class MyFunction {

    static sendRegistrationEmail(email, userId) {
            let transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user: "my.xavierbot@outlook.com",
                    pass: "Anggaz117",
                },
            });

            const option = {
                from: 'my.xavierbot@outlook.com',
                to: email,
                subject: "You have created an account from MyAnimeList by Angga. ^_^",
                text: `To verify please this link http://localhost:4004/user/${userId}/verified`
            }
            return new Promise((resolve, reject) => {
                transporter.sendMail(option, (err, info) => {
                    if(err) { reject(err) }
                    else { resolve(info); }
                })
            })
    }

    static loginValidate(username, password) {
        let errors = [];
        if(username === '' || password === '') {
            errors.push(new Error("username atau password tidak boleh kosong"))
        }
        return new Promise((resolve, reject) => {
            if(errors.length > 0) {
                reject(errors[0])
            } else {
                resolve()
            }
        })
    }

    static getAge(birth_date) {
        let birthYear = birth_date.toISOString().substr(0, 4)
        let now = new Date().toISOString().substr(0, 4)
        return now - birthYear
    }
}

module.exports = MyFunction;