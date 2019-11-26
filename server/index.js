const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json())
app.use(cors());

app.get("/heroes/:id/image", (req, res) => {
    const id = req.params.id;
    axios.get(`https://superheroapi.com/api/1009646569375444/${id}/image`)
        .then((response) => {
            res.json(response.data);
        })
        .catch(err => {
            console.error('Deu pau ', err);
        });
});

const port = 3001;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});