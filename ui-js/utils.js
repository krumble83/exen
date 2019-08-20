

export const Observable = function(obj, name, callback){
	const oVal = obj[name];
	//console.log('------->', oVal);
	Object.defineProperty(obj, name, {
		val: undefined,
		get : function(){ 
			return this.val;
		},
		set : function(val){ 
			this.val = val;
			if(typeof callback == 'function')
				callback(val);
		},
		enumerable : true,
		configurable : true,
	});
	obj[name] = oVal;
}