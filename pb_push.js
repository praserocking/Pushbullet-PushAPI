
var PB = PB || {
	
	base_url: "https://api.pushbullet.com/v2",
	push_url: "/pushes",
	tokens: new Array(),
	
	init: function(token_array){
		if(token_array === undefined)
			return null;
		else if(token_array.constructor === Array){
			this.tokens = this.tokens.concat(token_array);
			return this;
		}
	},
	
	add_token: function(token){
		this.tokens.push(token);
	},
	
	push_note: function(header,message){
		data = {
			type: "note",
			title: header,
			body: message
		};
		return this.api_request(this.push_url,data);
	},
	
	push_link: function(header,message,link){
		data = {
			type: "link",
			title: header,
			body: message,
			url: link
		};
		return this.api_request(this.push_url,data);
	},

	api_request: function(url,send_data){
		url = this.base_url + url;

		var xhrs = this.tokens.map(function(token){

			return new Promise(function(resolve,reject){

				var xhr = new XMLHttpRequest();
				xhr.setRequestHeader('Authorization', 'Bearer '+token); 
				//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded') ** I guess not need , it follows XMLHttpRequest 2**
				xhr.open('POST',url,!0);
				xhr.responseType = 'text';

				xhr.onload  = function(){ (this.status === 200) && (resolve(this.response)) };
				xhr.onerror = function(){ reject(new Error('bad luck !')) };

				xhr.send(JSON.stringify(send_data));
			})

		});


		Promise.all(xhrs).then(function(data){

			console.log(data); //data is array
		})
		.catch(function(e){

			console.log('Error !')
		})

	}
};
