var express = require('express');
var uuid = require('uuid');

var app = express();
var id = uuid.v4();
var port = 4000;

app.get('/', (req, res) => {
    let id = uuid.v4();
    console.log('API:' + id);

   res.status(200).json({ sever: 'API', id: uuid.v4() });
});

app.listen(port, () => {
    console.log(`API-server app listening on port: ${port}`);
});