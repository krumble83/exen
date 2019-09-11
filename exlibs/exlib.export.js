
import {Datatype, Class, Function, In, Out, Entry, Exit, Member} from './default.export.js';


Function.mixins.push({
	methods: {
		toObject: function(parent, full){
			const me = this
				, exp = ['title', 'subtitle', 'flags', 'color', 'symbol', 'x', 'y', 'ctor', 'name'];
			parent = parent || {};
			//parent.name = this.fullpath;
			
			exp.forEach(function (id){
				if(me[id] != undefined)
					parent[id] = me[id];
			});
			
			if(full){
				parent.__ctor = me.__ctor;
				parent.id = me.id;
				parent.childs = parent.childs || [];
			}
			else {
				parent.outputs = [];
				parent.outputs = [];				
			}
			
			this.$children.forEach(function(it){
				if(it.toObject)
					it.toObject(parent, full);
			});
			return parent;
		}
	}
});


In.mixins.push({
	methods: {
		toObject: function(parent, full){
			const me = this
				, exp = ['label', 'description', 'flags', 'color', 'datatype', 'ctor', 'pinctor', 'optional', 'isarray', 'group', 'target', 'maxlink']
				, ret = {name: me.id}

			exp.forEach(function (id){
				if(id == 'datatype' && (me[id].indexOf('.') == -1)){
					ret[id] = me.Package.fullpath + '.' + me[id];
					return;
				}
				if(me[id] != undefined)
					ret[id] = me[id];
			});

			if(full){
				ret.__ctor = me.__ctor;
				ret.id = me.id;
			}
			
			if(parent && full){
				parent.childs = parent.childs || [];
				parent.childs.push(ret);				
			}
			else if(parent){
				parent.inputs = parent.inputs || [];
				parent.inputs.push(ret);
			}
			return ret;
		}
	}
});


Out.mixins.push({
	methods: {
		toObject: function(parent, full){
			const me = this
				, exp = ['label', 'description', 'flags', 'color', 'datatype', 'ctor', 'pinctor', 'optional', 'isarray', 'group', 'target', 'maxlink']
				, ret = {name: me.id}

			exp.forEach(function (id){
				if(id == 'datatype' && (me[id].indexOf('.') == -1)){
					ret[id] = me.Package.fullpath + '.' + me[id];
					return;
				}
				if(me[id] != undefined)
					ret[id] = me[id];
			});
			
			if(full){
				ret.__ctor = me.__ctor;
				ret.id = me.id;
			}
			
			if(parent && full){
				parent.childs = parent.childs || [];
				parent.childs.push(ret);				
			}
			else if(parent){
				parent.outputs = parent.outputs || [];
				parent.outputs.push(ret);
			}
			return ret;
		}
	}
});

Entry.mixins.push({
	methods: {
		toObject: function(parent, full){
			const me = this
				, ret = In.mixins.find(it => it.methods && it.methods.toObject).methods.toObject.call(this, null, full);

			if(parent && full){
				parent.childs = parent.childs || [];
				parent.childs.unshift(ret);
			}
			else if(parent){
				parent.inputs = parent.inputs || [];
				parent.inputs.unshift(ret);				
			}
			return ret;
		}
	}
});

Exit.mixins.push({
	methods: {
		toObject: function(parent, full){
			const me = this
				, ret = Out.mixins.find(it => it.methods && it.methods.toObject).methods.toObject.call(this, null, full);

			if(parent && full){
				parent.childs = parent.childs || [];
				parent.childs.unshift(ret);
			}
			else if(parent){
				parent.outputs = parent.outputs || [];
				parent.outputs.unshift(ret);
			}
			return ret;
		}
	}
});

Datatype.mixins.push({
	methods: {
		toObject: function(parent){
			const me = this
				, exp = ['label', 'description', 'flags', 'private', 'ctor', 'pinctor', 'color', 'inherits']
				, ret = {name: me.id}

			exp.forEach(function (id){
				if(me[id] != undefined)
					ret[id] = me[id];
			});
			
			return ret;
		}
	}
});

Class.mixins.push({
	methods: {
		toObject: function(parent, full){
			const me = this
				, exp = ['symbol']
				, ret = Datatype.mixins.find(it => it.methods && it.methods.toObject).methods.toObject.call(this, null, full);
			
			ret.name = me.name;
			ret.childs = ret.childs || [];
			exp.forEach(function (id){
				if(me[id] != undefined)
					ret[id] = me[id];
			});
			
			if(parent && full){
				parent.childs = parent.childs || [];
				parent.childs.push(ret);				
			}
			
			me.$children.forEach(function(it){
				if(!it.toObject)
					return;
				
				if(full)
					ret.childs.push(it.toObject(null, full));
			});

			return ret;
		}
	}
});

Member.mixins.push({
	methods: {
		toObject: function(parent){
			const me = this
				, exp = ['label', 'description', 'flags', 'datatype', 'isarray', 'name']
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