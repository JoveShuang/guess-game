const http = require('http');
const fs = require('fs');
const path = require('url');
const ws = require('ws');
// const io = require('socket.io')(app);

var wss = new ws({
    port: 5173
});

function createServer(port,html_url) {
    http.createServer(function (req, res) {
        var pathname = path.parse(req.url, true).pathname;
        fs.readFile(pathname,
        //读取异常输出错误
        function (err,data) {
            if(err){
                res.writeHead(500);
                return res.end('读取文件失败');
            }
            //设置返回吗
            res.writeHead(200);
            //结束时,输出返回信息
            res.end(data);
        });
    }).listen(port);
    console.log('server open succeed');
}
//l建立连接
// io.on('connection', function (socket) {
//     //返回数据
//     socket.emit('news', { hello: 'world' });
//     socket.on('my other event', function (data) {
//         console.log(data);
//     });
// });

module.exports = {
    createServer: createServer
}