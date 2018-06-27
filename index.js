var request = require("request");
const express = require('express')
const data = require("./model/profile.json")
const app = express()
const port = process.env.PORT || 3000

function verifyToken(req, res, next) {
    let auth = req.headers.authorization
    if (auth) {
        auth = auth.split(' ')[1]
        let options = {
            method: 'POST',
            url: 'http://comp-ms-auth.herokuapp.com:80/api/verify',
            headers:
                { Authorization: 'Bearer ' + auth }
        }
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            body = JSON.parse(body)
            if (body.loged) {
                req.payload = body
            }
            next()
        })
    } else {
        next()
    }
}

app.get('/', function (req, res) {
    res.send("Hello")
})

app.put('/api/newprofile', function (req, res) {
    console.log("Iniciado /api/newuser");
    console.log("Criação de um novo usuario");
    let newuser = {
        "uuid": req.uuid,
        "gender": req.gender,
        "title": req.title,
        "first": req.first,
        "last": req.last,
        "email": req.emailuuid,
        "phone": req.phone,
        "cep": req.cep,
        "thumbnail": req.thumbnail
    };
    console.log("novo usuario: " + newuser);

})

app.listen(port, function () {
    console.log("Rodando na porta:", port)
})