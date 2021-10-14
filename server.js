const path = require('path');
const express = require('express');

const app = express();

app.use(require ('cors') ());
app.use(express.json());


const upload = require('multer')();
app.post('/send', upload.single('annex'), (req, res, next) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const message = req.body.message;    
    const annex = req.file;

    require('./src/services/mailServe')(email, nome, message, annex)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
    
    res.json({
      nome,
      email,
      message,
      annex
    });

})

app.use(express.static(path.join(__dirname, 'build')))

app.listen(3000, () => {
    console.log('server start');

})


