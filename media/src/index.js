var express = require('express');
var uuid = require('uuid');

var app = express();
var id = uuid.v4();
var port = 5000;

app.get('/', (req, res) => {
    let id = uuid.v4();
    console.log('Media:' + id);

    res.status(200).json({ sever: 'MEDIA', id: uuid.v4() });
});

app.listen(port, () => {
    console.log(`MEDIA-server app listening on port: ${port}`);
});