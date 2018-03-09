let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let index = require('./routes/index');
let account = require('./routes/account');
let myCampaignsPage = require('./routes/myCampaignsPage')
let campaigns = require('./routes/api/campaigns');
let pendingCampaigns = require('./routes/api/pendingCampaigns');
let userInfo = require('./routes/api/userInfo');
let myCampaigns = require('./routes/api/myCampaigns');
let myContributions = require('./routes/api/myContributions');
let createCampaign = require('./routes/api/createCampaign');
let terminateCampaign = require('./routes/api/terminateCampaign');
let cancelCampaign = require('./routes/api/cancelCampaign');

let app = express();

// view engine setup
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/account', account);
app.use('/my-campaigns', myCampaignsPage)
app.use('/api/campaigns', campaigns);
app.use('/api/userInfo', userInfo);
app.use('/api/pendingCampaigns', pendingCampaigns);
app.use('/api/myCampaigns', myCampaigns);
app.use('/api/myContributions', myContributions);
app.use('/api/createCampaign', createCampaign);
app.use('/api/terminateCampaign', terminateCampaign);
app.use('/api/cancelCampaign', cancelCampaign);

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/tether', express.static(__dirname + '/node_modules/tether/dist/'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/umd'));
app.use('/font-awesome', express.static(__dirname + '/node_modules/font-awesome/'));
app.use('/bootstrap-datepicker', express.static(__dirname + '/node_modules/bootstrap-datepicker/dist'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(__dirname  + '/error.html');
});

module.exports = app;
