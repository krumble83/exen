
import {uid} from '../../cmon-js/utils.js';
import img from '../../ui-img/function.png';

export const newNode = function (){
	return {
		uid: uid('node'),
		name: '',
		flags: 0,
		x: 200,
		y: 200,
		inputs: [],
		outputs: [],
	}
};

export const newPin = function(){
	return {
		name: 'default',
		flags: 0,
		datatype: 'core.type.bool', 
		optional: false,
	}
}

export const newLink = function(){
	return {
		uid: uid('link'),
	}
}

export const newFunctionStore = function(){
	return {
		uid: uid(),
		datas: {
			type: F_FUNCTION,
			flags: F_DRAGGABLE | F_CLOSABLE,
			panelCtor: 'functionfile',
			symbol: img,
			inputs: [],
			outputs: [],
		},
		watchers: [],
		library: false,
		nodes: [],
		links: [],
	};
}