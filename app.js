
/**
 * Module dependencies.
 */
// 初始化生成模板
require('./config/template');

var lessMiddleware = require('less-middleware');
var express = require('express');
var routes = {
	home: require('./routes/home'),
	record: require('./routes/record'),
	user: require('./routes/user')
};
var path = require('path');


var app = express();

// all environments
app.set('port', process.env.PORT || 9090);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// less support
app.use(lessMiddleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.home.index);
app.get('/v1', routes.home.v1.index);
app.get('/home.tmpl', routes.home.tmpl);
app.get('/editRecord.tmpl', routes.home.editRecord);

app.get('/record/index', routes.record.index);
app.get('/record/list', routes.record.list);

app.get('/record', routes.record.index);
app.get('/record/add', routes.record.add);
app.get('/record/remove/:id?', routes.record.remove);
app.post('/record/edit', routes.record.edit);

app.get('/user/list', routes.user.list);
app.get('/user/add/:name?', routes.user.add);
app.get('/user/remove/:id?', routes.user.remove);
app.get('/user/edit/:id/:name', routes.user.edit);

app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
