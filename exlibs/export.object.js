
import {Function, In, Out} from './default.export.js';


Function.mixins.push({
	methods: {
		toObject: function(parent){
			const me = this
				, exp = ['title', 'subtitle', 'flags', 'color', 'symbol', 'x', 'y'];
			parent = parent || {};
			parent.name = this.fullpath;
			
			exp.forEach(function (id){
				if(me[id] != undefined)
					parent[id] = me[id];
			});
			
			this.$children.forEach(function(it){
				if(it.toObject)
					it.toObject(parent);
			});
			return parent;
		}
	}
});


In.mixins.push({
	methods: {
		toObject: function(parent){
			const me = this
				, exp = ['label', 'description', 'flags', 'color', 'datatype', 'ctor', 'pinctor', 'optional', 'isarray', 'group', 'target']
				, ret = {name: me.id}

			parent.inputs = parent.inputs || [];

			exp.forEach(function (id){
				if(me[id] != undefined)
					ret[id] = me[id];
			});
			
			parent.inputs.push(ret);
		}
	}
});


Out.mixins.push({
	methods: {
		toObject: function(parent){
			const me = this
				, exp = ['label', 'description', 'flags', 'color', 'datatype', 'ctor', 'pinctor', 'optional', 'isarray', 'group', 'target']
				, ret = {name: me.id}

			parent.outputs = parent.outputs || [];

			exp.forEach(function (id){
				if(me[id] != undefined)
					ret[id] = me[id];
			});
			
			parent.outputs.push(ret);
		}
	}
});
