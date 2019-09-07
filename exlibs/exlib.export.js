
import {Function, In, Out, Member} from './default.export.js';


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
				//console.log(id, me[id], (me[id] && me[id].search) ? me[id].search('/.') == -1 : '');
				if(id == 'datatype' && (me[id].indexOf('.') == -1)){
					ret[id] = me.Package.fullpath + '.' + me[id];
					return;
				}
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
				if(id == 'datatype' && (me[id].indexOf('.') == -1)){
					ret[id] = me.Package.fullpath + '.' + me[id];
					return;
				}
				if(me[id] != undefined)
					ret[id] = me[id];
			});
			
			parent.outputs.push(ret);
		}
	}
});

Member.mixins.push({
	methods: {
		toObject: function(parent){
			const me = this
				, exp = ['label', 'description', 'flags', 'datatype', 'isarray']
				, ret = {name: me.id}

			exp.forEach(function (id){
				if(id == 'datatype' && (me[id].indexOf('.') == -1)){
					ret[id] = me.Package.fullpath + '.' + me[id];
					return;
				}
				if(me[id] != undefined)
					ret[id] = me[id];
			});
			
			return ret;
		}
	}
});