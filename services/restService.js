var rp = require('request-promise');

async function callApi(_ctx, url, params, method, accept = 'application/json'){
    console.log('[->' + Koa.config.appName + '<-] <RestService>:callApi')
	let options = {
		method: method,
		uri: url,
		body: params,
		json: true, // Automatically stringifies the body to JSON
		resolveWithFullResponse: true,
		headers: {
			accept: accept,
			'content-Type': 'application/json'
		}
	};
    console.log("opts:", options);
    
    let Response;
    try {
        Response = await new Promise((resolve, reject) => {
        rp(options)
            .then(function(result) {
                resolve(result.body);
            })
            .catch(function(err) {
                reject(err);
            });
        });
    } catch (error) {//ERROR DEL SERVICIO
        Response = {
            codResp: error.statusCode,
            glosaResp: JSON.stringify(error)
        };
    }
}

module.exports = {
    callApi
}