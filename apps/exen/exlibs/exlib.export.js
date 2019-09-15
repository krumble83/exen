
import {Datatype, Class, Function, In, Out, Entry, Exit, Member, Editor} from './default.export.js';


Function.mixins.push({
	methods: {
		toObject: function(parent, full){
			const me = this;
				//, exp = ['id', 'title', 'subtitle', 'flags', 'color', 'symbol', 'x', 'y', 'ctor', 'name']
			
			parent = parent || {};
			parent.name = me.$props.name;

			for (var key in me.properties) {
				if (!me.properties.hasOwnProperty(key) || key == 'name')
					continue;
				parent[key] = me.properties[key];
			}
			if(full){
				parent.__ctor = me.__ctor;
				parent.childs = parent.childs || [];
			}
			else {
				parent.outputs = [];
				parent.inputs = [];				
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
				, ret = {name: me.$props.name};

			for (var key in me.properties) {
				if (!me.properties.hasOwnProperty(key) || key == 'name')
					continue;
				if(key == 'datatype' && (me.properties[key].indexOf('.') == -1)){
					//console.log(me.$parent.fullPath, me.properties[key]);
					if(me.Class)
						ret[key] = me.Class.fullPath + '.' + me.properties[key];
					else
						ret[key] = me.Package.fullPath + '.' + me.properties[key];
				}
				else
					ret[key] = me.properties[key];
			}

			if(full){
				ret.__ctor = me.__ctor;
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
				, ret = {name: me.$props.name};


			for (var key in me.properties) {
				if (!me.properties.hasOwnProperty(key) || key == 'name')
					continue;
				if(key == 'datatype' && (me.properties[key].indexOf('.') == -1)){
					if(me.Class)
						ret[key] = me.Class.fullPath + '.' + me.properties[key];
					else
						ret[key] = me.Package.fullPath + '.' + me.properties[key];
				}
				else
					ret[key] = me.properties[key];
			}

			if(full){
				ret.__ctor = me.__ctor;
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
		toObject: function(parent, full){
			const me = this
				, ret = {name: me.$props.name};

			//console.log('zzzzz', me.$props.name);

			for (var key in me.properties) {
				if (!me.properties.hasOwnProperty(key) || key == 'name')
					continue;
				ret[key] = me.properties[key];
			}

			if(full){
				ret.__ctor = me.__ctor;
				ret.childs = ret.childs || [];
			}

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


Editor.mixins.push({
	methods: {
		toObject: function(parent, full){			
			const me = this
				, ret = {name: me.$props.name};
				
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
			
			//console.log('zzzzz2', me.$props.name);
			
			/*
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
			*/
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