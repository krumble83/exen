
export const uid = function(prefix){
	prefix = prefix || 'uid';
	return prefix + 'xxxxxxxxxxxxxxxx'.replace(/./g, function(c) {
		var r = Math.random() * 16 | 0;
		return r.toString(16);
	});
}

export const flag = function(flag){
	return (typeof flag == 'string') ? eval(flag) : flag;
}

export const hasFlag = function(flag, target){
	flag = (typeof flag == 'string') ? eval(flag) : flag;
	return target ? ((target & flag) == flag) : ((this.flags & flag) == flag);
}

export const capitalize = function(str){
	if(!str)
		return;
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export const splitPackageName = function(string){
	// TODO: optimize this function
	const split = string.split(/\.(?=[^\.]+$)/);
	if(split[1].indexOf('@') > -1){
		var s = split[1].split('@');
		split[1] = s[0];
		split[2] = s[1];
	}
	return {package: split[0], name: split[1], class: split[2]};
}

export const splitCamelCase = function(str){
	if(!str)
		return '';
	return str
		// insert a space between lower & upper
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		// space before last upper in a sequence followed by lower
		.replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
		// uppercase the first character
		.replace(/^./, function(str){ return str.toUpperCase(); })
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
