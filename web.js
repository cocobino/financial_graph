var express = require('express');
var app = express();

// router 설정
var indexRouter = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view 경로 설정
app.set('views', __dirname + '/views');

// 화면 engine을 ejs로 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// 기본 path를 /public으로 설정(css, javascript 등의 파일 사용을 위해)
app.use(express.static(__dirname + '/views'));

app.listen(8001, function() {
console.log('server open...')
});

app.use('/', indexRouter);
module.exports = app;