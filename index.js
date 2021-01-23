var http = require('http');
const host = 'localhost';
const port = 3000;
const fs = require('fs');
let rawdata = fs.readFileSync('notes.json');
let notes = JSON.parse(rawdata)["notes"];

let str = '';
for (let i = 0; i < notes.length; i++) {
       str += 
       `<li>
            <span>Title : </span> ${notes[i]["title"]} 
            <span>Description : </span>${notes[i]["desc"]}  
            <span>Status : </span>${notes[i]["status"]}
      </li>`;
}
let str2 = `<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
    <style>
        li{
            background-color: aqua; 
            padding:10px; 
            margin: 10px; 
            font-size: 20px
        }
        span{
            font-size: 24px; 
            color: blue; 
            margin:5px;
        }
    </style>
</head>
<body>
    <ul>
        ${str}
    </ul>
</body>
</html>`;

let str3 = 
`<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
   
</head>
<body>
    <img src='img.png'>
</body>
</html>`

const server = http.createServer(function (req, res) {
    console.log(req.url);
    res.setHeader('Content-Type', 'text/html');
    if (req.url === "/") {
        res.write(str2);
        res.statusCode = 200;
    }else if(req.url === "/img.png"){
        res.setHeader('Content-Type', 'image/png');
        res.write(fs.readFileSync("./img.png"));
        res.statusCode = 200;
    }
    else {
        res.write(str3);
        res.statusCode = 404;
    }
    res.end();
});
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
