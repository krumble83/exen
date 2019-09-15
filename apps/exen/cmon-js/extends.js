
import {uid, flag, hasFlag, capitalize} from './utils.js';

/*
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
*/

Vue.mixin({
	methods: {
		$uid: uid,		
		$flag: flag,
		$hasFlag: hasFlag,
		$capitalize: capitalize,
	}
});