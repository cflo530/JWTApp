const express = require('express');
const app = express();
const jwt  = require('jsonwebtoken');
const PORT = 5000;
const secret = "supERdupERBigsEcreT";

app.use(express.json());

app.post('/sign-token', (req, res) => {
    const payload = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        id: req.body.id
    };

    const expiry = 36000;

    jwt.sign(payload, secret, {expiresIn: expiry}, (err, token) => {
        if(err){
            return res.status(500).json({err});
        }
        else{
            return res.status(200).json({token});
        }
    });
});

app.get('/decode-token', (req, res) =>{
    console.log(req.headers);

    if(!req.headers.authorization){
        return res.status(403).json({message: 'Authentication token is required'});
    }

    const authHeader = req.headers.authorization;

    const splittedStr = authHeader.split(' ');
    const token = splittedStr[1];

    jwt.verify(token, secret, (err, decodedToken) => {
        if(err){
            return res.status(500).json({err});
        }
        else{
            return res.status(200).json({user: decodedToken});
        }
    });
});

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});