import Vue from "vue";

export const stateMerge = function(state, value, propName, ignoreNull) {
	if (
		Object.prototype.toString.call(value) === "[object Object]" &&
		(propName == null || state.hasOwnProperty(propName))
	) {
		const o = propName == null ? state : state[propName];
		for (var prop in value) {
			stateMerge(o, value[prop], prop, ignoreNull);
		}
		return;
	}
	if (!ignoreNull || value !== null){
		if(propName == 'flags'){
			//console.log(propName, state[propName], value);
			Vue.set(state, propName, (state[propName]) ? (state[propName] + value) : value);
		}
		else
			Vue.set(state, propName, value);
	}
};

export default stateMerge;
