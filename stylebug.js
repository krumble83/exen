
var debugStyle = ['tree']

const loadVue = function(){
	
	var args = Array.prototype.slice.call(arguments);

	if(args.length === 0)
		return;
	
	var tok = args.shift();
	if(typeof tok === 'string'){

		var xhr = getXMLHttpRequest();
		xhr.responseType = 'text';
		xhr.open('GET', 'ui-vues/' + tok + '.vue', true);
		xhr.send(null);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
				parseVue(xhr.responseText, tok);
				loadVue.apply(this, args);
			}
		};
	}
	else if(typeof tok === 'function'){
		if(tok.apply(this, args) === false)
			return;
		loadVue.apply(this, args);
	}
	else if(tok instanceof Array){
		loadVue.apply(this, tok.concat(args));
	}
	else{
		console.log('loadScript: Argument ignored (not string or function)');
		loadVue.apply(this, args);
	}
		
};

const parseVue = function(data, name){
	var div = document.createElement('div');
	div.innerHTML = data;
	
	if(div.querySelector('style')){
		var script = document.createElement('style');
		script.innerHTML = div.querySelector('style').innerHTML;
		(document.head || document.getElementsByTagName("head")[0]).appendChild(script);
	}
};

const getXMLHttpRequest = function() {
	var xhr = null;	
	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest(); 
		}
	} else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}
	
	return xhr;
}

//loadVue(debugStyle);