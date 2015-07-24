
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
		this.tokens.forEach(function(token){
			$.ajax({
				url: this.base_url + url,
				headers:{
					'Authorization':'Bearer '+token
				},
				method: "POST",
				data: send_data
			}).done(function(response){
				return response;
			}).fail(function(response){
				return response;
			});
		});
	}
};
