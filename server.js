let express = require('express');
let app = express();

app.use(express.static('./'))

app.get('/', function (req, res) {
    res.sendFile(__dirname+'/index.html');
});

let server = app.listen(5000, function () {
    console.log('Node server is running..');
});
