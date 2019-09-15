
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

