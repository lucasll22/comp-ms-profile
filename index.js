var request = require("request");
const express = require('express')
var fs = require('fs')
const data = require("./model/profile.json")
const app = express()
const port = process.env.PORT || 3000

console.log(data);

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

app.put('/api/profile', verifyToken, function (req, res) {
    let auth = req.headers.authorization
    if (auth) {
        const data = require("./model/profile.json")
        
        console.log("Iniciado /api/profile");
        console.log("Criação de um novo usuario");
            
        let newuser = {
            "uuid": req.headers.uuid,
            "gender": req.headers.gender,
            "title": req.headers.title,
            "first": req.headers.first,
            "last": req.headers.last,
            "email": req.headers.emailuuid,
            "phone": req.headers.phone,
            "cep": req.headers.cep,
            "thumbnail": req.headers.thumbnail
        };
        data.push(newuser)   
        fs.writeFile("./model/profile.json", JSON.stringify(data, false, 2), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
        res.status(200).send("sucesso");
    }
    else
    {
        res.status(401).send("Acesso negado");
    }
})

app.delete('/api/profile', function (req, res) {
    const data = require("./model/profile.json")
    
    console.log("Iniciado /api/profile");
    console.log("remoção de usuario");
        
    let user = req.headers.uuid

    console.log("recebido usuario: " + user)
    
    
}
)
    

app.listen(port, function () {
    console.log("Rodando na porta:", port)
})