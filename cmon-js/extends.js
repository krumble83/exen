

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

String.prototype.capitalize = function(firstOnly) {
	if(firstOnly)
		return this.charAt(0).toUpperCase() + this.slice(1);
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}


Vue.mixin({
	methods: {
		$uid: function(prefix){
			prefix = prefix || 'uid';
			return prefix + 'xxxxxxxxxxxxxxxx'.replace(/./g, function(c) {
				var r = Math.random() * 16 | 0;
				return r.toString(16);
			});
		},
		
		$flag: function(flag){
			return (typeof flag == 'string') ? eval(flag) : flag;
		},
		
		$hasFlag: function(flag){
			flag = (typeof flag == 'string') ? eval(flag) : flag;
			return ((this.flags & flag) == flag);			
		},
		
		$capitalize: function(str){
			if(!str)
				return;
			return str.charAt(0).toUpperCase() + str.slice(1);
		},
		
		$loadScript(){
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
		
		
	}
});