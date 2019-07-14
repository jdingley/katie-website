var AuhorizeNet = require('/home/node_modules/authorize-net');
var client = new AuthorizeNet({
	API_LOGIN_ID: '2VLX5Zd8Ke98',
	TRANSACTION_KEY: '25dwZz5wD3H9G58W'
}); 
console.log(client);