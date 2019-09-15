export const uid = function(prefix){
	prefix = prefix || 'uid';
	return prefix + 'xxxxxxxxxxxxxxxx'.replace(/./g, function(c) {
		var r = Math.random() * 16 | 0;
		return r.toString(16);
	});
}

export const loadScript = function(){
	var args = Array.prototype.slice.call(arguments);

	function loaded(src){
		var scripts = document.getElementsByTagName("script");
		for(var i = 0; i < scripts.length; i++) 
		   if(scripts[i].getAttribute('src') == src) 
			   return true;
		return false;
	}


	if(args.length === 0)
		return;
	
	var tok = args.shift();
	if(typeof tok === 'string'){
		if(loaded(tok)){
			Vue.options.methods.$loadScript.apply(this, args);
			return;
		}
		var script = document.createElement('script');
		script.type = "text\/javascript";
		script.onload = function () {
			Vue.options.methods.$loadScript.apply(this, args);
		};
		(document.head || document.getElementsByTagName("head")[0]).appendChild(script);
		script.src = tok;
	}
	else if(typeof tok === 'function'){
		if(tok.apply(this, args) === false)
			return;
		Vue.options.methods.$loadScript.apply(this, args);
	}
	else if(tok instanceof Array){
		Vue.options.methods.$loadScript.apply(this, tok.concat(args));
	}
	else{
		console.log('loadScript: Argument ignored (not string or function)');
		Vue.options.methods.$loadScript.apply(this, args);
	}
}		

export const loadCss = function(){
	var args = Array.prototype.slice.call(arguments);

	function loaded(src){
		var links = document.getElementsByTagName("link");
		for(var i = 0; i < links.length; i++) 
		   if(links[i].getAttribute('href') == src) 
			   return true;
		return false;
	}

	if(args.length === 0)
		return;

	var tok = args.shift();
	if(typeof tok === 'string'){
		if(loaded(tok)){
			loadCss.apply(this, args);
			return;
		}
		var link  = document.createElement('link');
		link.rel  = 'stylesheet';
		link.type = 'text/css';
		link.href = tok;
		link.media = 'all';
		link.onload = function () {
			loadCss.apply(this, args);
		};
		(document.head || document.getElementsByTagName('head')[0]).appendChild(link);	
	}
	else if(typeof tok === 'function'){
		if(tok.apply(this, args) === false)
			return;
		loadCss.apply(this, args);
	}
	else{
		console.log('loadCss: Argument ignored (not string)');
		loadCss.apply(this, args);
	}
}

export const getQueryParam = function (variable) {
	var query = window.location.search.substring(1)
		, vars = query.split("&");
	
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable)
			return pair[1];
	} 
	return false;
}