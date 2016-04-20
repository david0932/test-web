var express = require('express');
var app = express();

app.configure(function(){
	// 設定靜態檔案所在目錄
	app.use(express.static(__dirname + '/node'));
	// 啟動路由機制
	app.use(app.router);
	 
	app.set('views',__dirname+ '/views');
	//app.set('view engine', 'jade');
	app.set('view engine', 'ejs');
});

app.get('/',function(req,res){
	//res.render('mypage',{ msg1:'Hello Jade Template'});
	var list = ['Apple','Orange','Banana'];
	res.render('mypage',{ title: 'Hi EJS',list});
});

// GET 方法的路由，用來處理「/myroute」路徑
app.get('/myroute',function(req,res){
	res.send('This is GET method');
	res.end();
});

// POST方法的路由，用來處理「/」路徑
app.post('/myroute',function(reg,res){
	// 傳送字串回瀏覽器
	res.send('This is POST method');
	res.end();
});

// http://localhost:12345/mydir/hello?name=David&country=Taiwan
app.get('/mydir/hello',function(req,res){
	console.log(req.query.name);
	console.log(req.query.country);

	res.send('<p>Hello '+ req.query.name+'<p>You are from '+req.query.country);
	res.end();
});

app.listen(12345);