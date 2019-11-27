const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const leaderboard = require('./routes/leaderboard');

const app = express();
app.use(bodyParser.json())
app.use(cors());

app.use('/leaderboard', leaderboard);


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});