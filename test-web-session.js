var express = require('express');
var app = express();

app.configure(function(){
	// 啟用cookie解析
	app.use(express.cookieParser());
	// 啟用session
	//app.use(express.session({ secret: 'HelloExpressSESSION'}));
	// 啟用cookie-based session
	app.use(express.cookieSession({
		key: 'node',
		secret: 'HelloExpressSESSION'
	}));
	// 啟用body解析器
	app.use(express.bodyParser());
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
app.get('/myroute/get',function(req,res){
	res.send('This is GET method');
	res.end();
});

// POST方法的路由，用來處理「/」路徑
app.post('/myroute/post',function(reg,res){
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

//cookie-based session
app.get('/login_page',function(req,res){
	// 檢查是否已經登入
	if(req.session.logined){
		// 已經登入
		res.send('<a href=\"/logout\">立即登出</a>');
		res.end();
		return;
	}
	// 未登入，顯示登入表單
	res.writeHead(200, {"Content-Type":"text/html"});
	res.write('<form action=\"/login\" method=\"POST\">');
	res.write('<input type=\"text\" name=\"username\">');
	res.write('<br/>');
	res.write('<input type=\"password\" name=\"password\">');
	res.write('<br/>');
	res.write('<input type=\"submit\" value="\Login\">');
	res.write('</form>');
	res.end();
});

app.post('/login',function(req,res){
	// check username and password
	if (req.body.username != 'user' ||
		req.body.password != '1234567') {
		// display login error
		res.send('帳號或密碼錯誤，請重新登入。');
		res.end();
		return;
	}
	// auth pass
	req.session.logined = true;
	
	// redirest to login_page
	res.redirect('/login_page');
	res.end();
});

app.post('/logout',function(req,res){
	// 將session的logined標記為未登入
	req.session.logined = false;
	//重新導向回 login_page 頁面
	req.redirect('/login_page');
	res.end();
});

app.listen(12345);