
/**
 * Module dependencies.
 */
require('./config/template');
var express = require('express');
var routes = {
	index: require('./routes/index'),
	record: require('./routes/record'),
	user: require('./routes/user')
};
var path = require('path');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/record/index', routes.record.index);
app.get('/record/list', routes.record.list);

app.get('/', routes.index.index);
app.get('/index.tmpl', routes.index.tmpl)

app.get('/record', routes.record.index);
app.get('/record/add', routes.record.add);
app.get('/record/remove/:id?', routes.record.remove);

app.get('/user/list', routes.user.list);
app.get('/user/add/:name?', routes.user.add);
app.get('/user/remove/:id?', routes.user.remove);
app.get('/user/edit/:id/:name', routes.user.edit);

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
