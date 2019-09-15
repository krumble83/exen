Vue.config.ignoredElements = [];

import {splitPackageName,splitCamelCase} from '../cmon-js/utils.js';


const PropName = {
	inject: ['Package'],
	
	props: {
		name: {type: String, required: true},
	},

	data: function(){
		return {
			_name: this.$props.name,
		}
	},
	
	computed: {
		fullPath: function(){
			return this.Package.id + '.' + this.$props.name;
		}
	}
}

export const Base = {
	//components: {},
	mixins: [],
	props: {
		//id: {type: String, required: false},
		__ctor: {type: String, default: 'base'},
		childs: {type: Array, default: function(){return []}},
		inherits: {type: Array, default: function(){return []}},
		import: {type: Array, default: function(){return []}},
		value: String,
	},

	computed: {
		properties: function(){
			var ret = {};
			for (var key in this.$props) {
				if (!this.$props.hasOwnProperty(key))
					continue;
				//console.log(this[key]);
				if(key.startsWith('_') 
					|| key == 'childs' 
					|| this[key] === undefined 
					|| (Array.isArray(this[key]) && this[key].length == 0)
				)
					continue;
				if(typeof this['_' + key] != 'undefined')
					ret[key] = this['_' + key];
				else
					ret[key] = this.$props[key];
			}
			
			
			for (var key in this.$data) {
				if (!this.$data.hasOwnProperty(key))
					continue;

				if(key.startsWith('__')) 
					continue;
				if(key.startsWith('_')){
					ret[key.slice(1)] = this.$data[key];
				}
			}
			
			return ret;
		},
		
		fullPath: function(){
			if(this.Package)
				return this.Package.fullPath + '.' + this.id;
			return this.id;
		},
		
		fullpath: function(){
			if(this.Package)
				return this.Package.fullpath + '.' + this.id;
			return this.id;
		},
	},
	
	data: function(){
		return {
			importedProperties: [],
			//_id: this.id,
			ignoreImports: ['id', 'childs', 'import'],
		}
	},
	
	mounted: function(){
		this.parseImports();
	},

	methods: {
		
		_create: function(type, data){
			//console.log('create', this.$el);
			const me = this;
			
			var test = document.createElement('component');
			if(me.$el)
				me.$el.appendChild(test);
			var ComponentClass = Vue.extend(eval(type));
			var instance = new ComponentClass({propsData: data, parent: this, el: test});
			instance.$mount(test);
			return instance;
		},
		
		_mergeAttributes: function(src, destObject){
			for (var key in src.$props){
				if (!src.$props.hasOwnProperty(key) || (!destObject && this.ignoreImports.indexOf(key) != -1))
					continue;
				if(key.startsWith('_') 
					|| (Array.isArray(src[key]) && src[key].length == 0)
				)
					continue;
				if(destObject)
					destObject[key] = src[key];
				else
					this.importedProperties.push({name: key, value: src[key]});
			}			
		},
		
		Id: function(id){
			if(id)
				this._id = id;
			return this.id;
		},
		
		Import: function(data){
			const me = this;

			if(typeof data == 'string'){
				var name = data.split(/\.(?=[^\.]+$)/)
				, pack = false;
				//check if node is in same package (assume no '.' in id property)
				if(name.length == 1)
					pack = me.Package;
				else if(name.length == 2)
					pack = me.Library.getPackage(name[0]);
				else
					return console.assert(false, 'invalid @import id');
				
				console.assert(pack, 'PACKAGE "' + name[0] + '" NOT FOUND');
				
				var ret = pack.getNode(name[1] || data);
				console.assert(ret, 'NODE "' + (name[1] || data) + '" NOT FOUND');
				return this.Import(ret);
			}

			this._mergeAttributes(data);
			data.$children.forEach(function(child){
				//console.dir(child.$el);
				var nodename = child.$el.localName.charAt(0).toUpperCase() + child.$el.localName.slice(1);
				var attrs = {};
				child._mergeAttributes(child, attrs);
				var node = me._create(eval(nodename), attrs);
				node.Import(child);
			});			
		},
		
		isValidProperty: function(key){
			return !(key.startsWith('_') 
					|| key == 'childs' 
					|| this[key] === undefined 
					|| (Array.isArray(this[key]) && this[key].length == 0));
		},
		
		parseImports: function(){
			const me = this;
			if(this.import.length > 0){
				this.import.forEach(function(imp){
					me.Import(imp)
				});
				
				//console.log('000000', eval('Base'));
				
			}
		}
	},
		
	template: 	'<component :is="__ctor" v-bind="properties">{{value}}<component v-for="child in childs" v-bind:key="child.id" :is="child.__ctor" v-bind="child" /><slot /></component>',
}



export const Node = {
	extends: Base,
	mixins: [PropName],
	inject: {
		Library: {default: false},
		Package: {default: false},
		Category: {default: false},
	},
	
	props: {
		__ctor: {type: String, default: 'node'},
		ctor: String,
		title: String,
		subtitle: String,
		keywords: String,
		description: String,
		flags: {type: [String, Number], default: 0},
		color: {type: String, default: function(){return this.Category ? this.Category.color : this.Package.symbol || '#f00'}},
		symbol: {type: String, default: function(){return this.Category ? this.Category.symbol : this.Package.symbol || 'exlibs/img/function.png'}},
		x: Number,
		y: Number,
	},
	
	data: function(){
		return {
			_symbol: this.symbol,
			_title: this.title,
			_flags: (typeof this.flags == 'string') ? eval(this.flags) : this.flags,
			_id: this.Package.fullpath + '.' + this.$props.name,
		}
	},
	
	methods: {
		Symbol: function(str){
			this._symbol = str;
		},
		
		Title: function(str){
			if(str){
				this._title = str;
				return this;
			}
			return this._title;
		}

	},
}
Vue.config.ignoredElements.push('node');
//Extend(Node, 'Category');


/*
export const Pattern = {
	extends: Base,
	mixins: [],
	inject: ['Library', 'Package'],
	
	props: {
		__ctor: {type: String, default: 'editor'},
		flags: {type: String},
	}
}
Vue.config.ignoredElements.push('pattern');
*/
export const Value = {
	extends: Base,
	mixins: [PropName],
	
	props: {
		__ctor: {type: String, default: 'value'},
		default: {type: Boolean, default: false},
		value: Number,
	},
	
}
Vue.config.ignoredElements.push('value');



export const Editor = {
	extends: Base,
	components: {Value},
	mixins: [],
	inject: ['Library', 'Package'],
	
	props: {
		__ctor: {type: String, default: 'editor'},
		ctor: String,
	}
}
Vue.config.ignoredElements.push('editor');



export const Pin = {
	extends: Base,
	components: {Editor},
	mixins: [PropName],
	inject: ['Library', 'Package'],
	
	props: {
		__ctor: {type: String, default: 'pin'},
		isio: {type: Boolean, default: true},
		isarray: {type: Boolean, default: false},
		optional: Boolean,
		label: String,
		flags: {type: [String, Number], default: 0},
		ctor: String,
		pinctor: String,
		datatype: {type: String, required: true},
		maxlink: {type: Number, default: -1},
		keywords: {type: Array, default: function(){return []}},
		description: String,
		group: String,
		required: {type: Boolean, default: false},
		target: String,
	},
	
	data: function(){
		return {
			_required: this.required,
			_flags: (typeof this.flags == 'string') ? eval(this.flags) : this.flags,
			_id: this.Package.id + '.' + this.$props.name,
		}
	},
	
	methods: {
		Required: function(req){
			this.required = req;
		}
	}
}
Vue.config.ignoredElements.push('pin');

export const In = {
	extends: Pin,
	mixins: [],
	
	props: {
		__ctor: {type: String, default: 'in'},
		flags: {type: [String, Number], default: F_INPUT},
		maxlink: {type: Number, default: 1},
	},
	
	data: function(){
		return  {
			_flags: ((typeof this.flags == 'string') ? eval(this.flags) : this.flags) | F_INPUT,
		}
	},
}
Vue.config.ignoredElements.push('in');

export const Out = {
	extends: Pin,
	mixins: [],
	
	props: {
		__ctor: {type: String, default: 'out'},
		flags: {type: [String, Number], default: F_OUTPUT},
	},
	
	data: function(){
		return  {
			_flags: ((typeof this.flags == 'string') ? eval(this.flags) : this.flags) | F_OUTPUT,
		}
	},
}
Vue.config.ignoredElements.push('out');

export const Entry = {
	extends: In,
	mixins: [],
	
	props: {
		name:{type: String, default: '@entry'},
		datatype: {type: String, default: 'core.exec'},
		maxlink: {type: Number, default: -1},
	},
}
Vue.config.ignoredElements.push('entry');

export const Exit = {
	extends: Out,
	mixins: [],
	
	props: {
		name:{type: String, default: '@exit'},
		datatype: {type: String, default: 'core.exec'},
		maxlink: {type: Number, default: 1},
	},
}
Vue.config.ignoredElements.push('exit');

export const Function = {
	extends: Node,
	components: {In, Out, Entry, Exit},
	mixins: [],
	
	props: {
		__ctor: {type: String, default: 'function'},
		isfunction: {type: Boolean, default: true},
		private:  {type: Boolean, default: false},
	},
}
Vue.config.ignoredElements.push('function');




export const Datatype = {
	extends: Base,
	components: {Editor},
	mixins: [PropName],
	inject: {
		Library: 'Library',
		Package: 'Package',
		Category: {
			from: 'Category',
			default: undefined
		},
	},
	//mixins: [IdPackageId],
	
	props: {
		__ctor: {type: String, default: 'datatype'},
		label: String,
		description: String,
		private: {type: Boolean, default: false},
		ctor: String,
		pinctor: String,
		color: {type: String, required: true},
		inherits: String,
		isdatatype: {type: Boolean, default: true},
	},
	
	computed: {
		fullPath: function(){
			return this.Package.fullPath + '.' + this.$props.name;
		}
	},
	
	data: function(){
		return {
			_id: this.Package.id + '.' + this.$props.name,
			_inherits: this.inherits ? this.Package.id + '.' + this.$props.name + ' ' + this.inherits : undefined,
			_color: this.color,
			_ctor: this.ctor,
			_pinctor: this.pinctor,
			_label: this.label,
			_description: this.description,
		}
	},
	
	mounted: function(){
		this._parseInherits();
	},
	
	methods: {
		
		_parseInherits: function(){
			const me = this;
			
			if(!me.inherits)
				return;


			const inherits = me.inherits.split(' ');
			var base = me.Library.getDatatype(inherits[0]);
			console.assert(base);
			const exp = base.toObject(null, true);
			
			for (var key in exp) {
				if (!exp.hasOwnProperty(key) || ['isdatatype', 'inherits', '__ctor'].indexOf(key) > -1)
					continue;
				if(typeof me[key] == 'undefined')
					me['_' + key] = exp[key];
			}
		},
		
		Color: function(){
			return this.color;
		},
		
		Label: function(){
			return this.label;
		},
		
		Editor: function(data){
			if(!data)
				return this.$children.find(it => it.__ctor == "editor");
			return this._create('editor', data);
		}
	}
}
Vue.config.ignoredElements.push('datatype');



export const Convertor = {
	extends: Base,
	components: {In, Out},
	mixins: [],
	
	props: {
		__ctor: {type: String, default: 'datatype'},
	},
	
	data: function(){
		//console.log(this.name);
		return {
			
		}
	},
	
}
Vue.config.ignoredElements.push('convertor');






export const Enum = {
	extends: Datatype,
	components: {Value},
	mixins: [],
	
	props: {
		__ctor: {type: String, default: 'enum'},
		color: {type: String, default: '#8000FF'},
	},
	
	mounted: function(){
		if(this.private)
			return;
		return;
		const cat = this.Package.Category('Utilities/Enum')
			, make = cat.Function({id: 'makeLiteralEnum' + this.id, title: 'Make literal ' + this.label || this.id})
			, eq = cat.Function({id: 'eqEnum' + this.id, title: 'Equal (' + (this.label || this.id) + ')'});
			
		make.In({id: 'enum', datatype: this.id});
		make.Out({id: 'returnValue', datatype: this.id});

		eq.In({id: 'in1', datatype: this.id});
		eq.In({id: 'in2', datatype: this.id});
		eq.Out({id: 'out', datatype: 'core.type.bool'});

	},
}
Vue.config.ignoredElements.push('enum');




export const Method = {
	extends: Function,
	mixins: [],
	inject: {
		Class: 'Class',
		Package: 'Package',
		Category: {
			from: 'Category',
			default: undefined
		},
	},
	
	props: {
		__ctor: {type: String, default: 'method'},
		subtitle: {type: String, default: function(){ return 'Target is ' + splitCamelCase(this.$parent.$props.name)}},
		color: {type: String, default: function(){return this.Class.color}},
		childs: {type: Array, default: function(){return [{__ctor: 'in', name: 'target', datatype: this.$parent.$props.name}]}},
		overide: String,
		overload: String,
	},
	
	computed: {
		fullPath: function(){
			return this.Class.fullPath + '.' + this.$props.name;
		}
	},
	
	data: function(){
		return {
			_id: this.Package.fullpath + '.' + this.$props.name + '@' + this.Class.$props.name,
		}
	},
}
Vue.config.ignoredElements.push('method');

export const Member = {
	extends: Base,
	mixins: [],
	inject: ['Library', 'Package'],
	
	props: {
		__ctor: {type: String, default: 'member'},
		label: String,
		datatype: {type: String, required: true},
		static: {type: Boolean, default: false},
	},
}
Vue.config.ignoredElements.push('member');

export const Structure = {
	extends: Datatype,
	components: {Member},
	mixins: [],
	
	props: {
		__ctor: {type: String, default: 'structure'},
		color: {type: String, default: '#0057c8'},
		ctor: {type: String, default: "PinStructure"},
	},
}
Vue.config.ignoredElements.push('structure');

export const Class = {
	extends: Structure,
	components: {Method, Member},
	mixins: [],
	
	provide: function(){
		const me = this;
		return {
			Class: me,
		}
	},
	
	props: {
		__ctor: {type: String, default: 'class'},
		color: {type: String, default: '#078bc4'},
		symbol: {type: String, default: function(){return this.Category ? this.Category.symbol : this.Package.symbol}},
	},
	
	data: function(){
		return {
			//_inherits: this.inherits ? this.Package.id + '.' + this.$props.name + ' ' + this.inherits : undefined,
		}
	},
	
	methods: {		
		_parseInherits: function(){
			const me = this;

			if(!this.inherits)
				return;
			const inherits = this.inherits.split(' ');
			var base = this.Library.getDatatype(inherits[0]);
			console.assert(base);

			const exp = base.toObject(null, true);
			//console.log(me);
			exp.childs.forEach(function(child){
				if(child.__ctor == 'method'){
					//child.derived = true;
					child.id = me.Package.fullPath + '.' + child.name + '@' + me.$props.name;
					//child.subtitle = 'Target is ' + splitCamelCase(me.name);
					//child.childs.find(it => it.name == 'target').datatype = me._data._id;
				}
				me.childs.unshift(child);
			});
		},
		
		_isOverload: function(src){
			
		}
	}

}
Vue.config.ignoredElements.push('class');

export const Interface = {
	extends: Class,
	mixins: [],
	provide: function(){
		const me = this;
		return {
			Class: me,
		}
	},	
	props: {
		__ctor: {type: String, default: 'interface'},
	},

}
Vue.config.ignoredElements.push('interface');






export const Provide = {
	extends: Base,
	mixins: [],
	inject: ['Library', 'Package'],
	
	props: {
		__ctor: {type: String, default: 'provide'},
		platform: String,
		type: String,
		library: String,
		device: String,
	},
}
Vue.config.ignoredElements.push('provide');

export const Require = {
	extends: Base,
	mixins: [],
	inject: ['Library', 'Package'],
	
	props: {
		__ctor: {type: String, default: 'require'},
		device: String,
	},
}
Vue.config.ignoredElements.push('require');

export const Hardware = {
	extends: Base,
	mixins: [],
	inject: ['Library', 'Package'],
	
	props: {
		__ctor: {type: String, default: 'hardware'},
	},
}
Vue.config.ignoredElements.push('hardware');

export const Device = {
	extends: Base,
	mixins: [],
	inject: ['Library', 'Package'],
	
	props: {
		__ctor: {type: String, default: 'device'},
		label: String,
	},
}
Vue.config.ignoredElements.push('device');



export const Category = {
	extends: Base,
	components: {Datatype, Function, Class, Convertor, Structure, Enum, Device, Hardware, Interface},
	inject: {
		Library: {default: false},
		Package: {default: false},
	},
	mixins: [PropName],
	
	provide: function(){
		const me = this;
		return {
			Category: me,
		}
	},
	
	props: {
		__ctor: {type: String, default: 'category'},
		symbol: {type: String, default: function(){return this.Package.symbol}},
		color: {type: String, default: function(){return this.Package.color}},
	},
	
	computed: {
		fullPath: function(){
			var ret = this.$props.name
				, parent = this.$parent;
				
			while(parent && parent.$el.tagName != 'PACKAGE'){
				if(parent.$el.tagName == 'CATEGORY'){
					ret = parent.fullPath + '/' + ret;
					break;
				}
				parent = parent.$parent;
			}
			return ret;
		},
	}
}
Vue.config.ignoredElements.push('category');

export const Package = {
	extends: Base,
	components: {Category, Datatype, Function, Class, Convertor, Structure, Enum, Device, Hardware, Interface, Value},
	mixins: [],
	props: {
		__ctor: {type: String, default: 'package'},
		id: {type: String, required: true},
		//categories: {type: Array, default: function(){return []}},
		label: String,
		color:  {type: String, default: '#f00'},
		symbol: String,
	},
	provide: function(){
		const me = this;
		return {
			Package: me,
		}
	},
	methods: {
		getNode: function(id){
			return this.$children.find(it => it.id == id);
		}
	}
}
Vue.config.ignoredElements.push('package');

export const Library = {
	extends: Base,
	components: {Package},
	mixins: [],
	props: {
		__ctor: {type: String, default: 'library'},
		id: {type: String, default: ''},
	},
	
	computed: {
		fullPath: function(){
			return this.id;
		}
	},
	
	provide: function(){
		const me = this;
		return {
			Library: me,
		}
	},
	
	methods: {

		createQuery: function(){
			return {
				id: false,
				category: false,
				searchString: false,
				inputDatatype: false,
				outputDatatype: false,
				private: false,
				context: false,
			}
		},
		
		getPackage: function(id){
			var ret = false;
			return this.$children.find(it => it.id == id && it.$el.tagName == 'PACKAGE');
			return ret;
		},
		
		getHardware: function(id){
			var name = splitPackageName(id);
			return me.$el.querySelector('package[id="' + name.package + '"] hardware[id="' + name.name + '"]').__vue__;
		},
		
		getNodesByQuery: function(query){
			//console.log(query);
			const me = this;
			var qs = ['[isfunction="true"]']
				, ret = [];
			
			if(query && query.id){
				return me.$el.querySelector('[isfunction="true"][id="' + query.id + '"]').__vue__;
			}

			if(query && query.searchString){
				qs.push(qs[0] + '[name*="' + query.searchString + '"]');
				qs.push(qs[0] + '[keywords*="' + query.searchString + '"]');
				qs[0] += '[title*="' + query.searchString + '"]';
			}
			
			if(query && !query.private){
				qs.forEach(function(it, id){
					qs[id] += ':not([private="true"])';
				});
			}
			ret = Array.from(me.$el.querySelectorAll(qs.join(',')));
			//console.log(ret);
			
			if(query.inputDatatype){
				var dtype = me.getDatatype(query.inputDatatype)
					, dtypeid = me.isArrayDatatype(query.inputDatatype) ? dtype.$props.name + '[]' : dtype.$props.name
					, pack = dtype.Package;
					
				//console.log(dtypeid, pack.id);
					
				ret = ret.filter(function(it){
					if(it.querySelector('out[datatype="' + pack.id + '.' + dtypeid + '"], out[datatype="' + me.getWildcardsDatatype(me.isArrayDatatype(query.inputDatatype)) + '"]'))
						return true;
					var res = false;
					it.querySelectorAll('out[datatype="' + dtypeid + '"]').forEach(function (it){
						if(it.__vue__.Package.id == pack.id)
							res = true;
					});
					return res;
				});
			}

			else if(query.outputDatatype){
				var dtype = me.getDatatype(query.outputDatatype)
					, dtypeid = me.isArrayDatatype(query.outputDatatype) ? dtype.$props.name + '[]' : dtype.$props.name
					, pack = dtype.Package;
					
				ret = ret.filter(function(it){
					if(it.querySelector('in[datatype="' + pack.id + '.' + dtypeid + '"], in[datatype="' + me.getWildcardsDatatype(me.isArrayDatatype(query.outputDatatype)) + '"]'))
						return true;
					var res = false;
					it.querySelectorAll('in[datatype="' + dtypeid + '"]').forEach(function (it){
						if(it.__vue__.Package.id == pack.id)
							res = true;
					});
					return res;
				});
			}
			me.$emit('getNodesByQuery', ret, query);
			return ret;
		},
		
		getDatatype: function(id){
			if(!id)
				return this.$el.querySelectorAll('[isdatatype="true"]:not([private="true"])');
			id = id.replace('[]', '');
			//var name = splitPackageName(id);
			//console.log(id, name, 'package[id="' + name[0] + '"] [isdatatype="true"][id="' + name[1] + '"]');
			return this.$el.querySelector('[isdatatype="true"][id="' + id + '"]').__vue__;
		},
		
		getNode: function(id){
			if(!id)
				return this.getNodesByQuery(this.createQuery());
			else if(typeof id == 'object')
				return this.getNodesByQuery(id);
			else if(typeof id == 'string'){
				var q = this.createQuery();
				q.id = id;
				return this.getNodesByQuery(q);
			}
			console.assert(false, 'unknown query');
		},
		
		getNodeById: function(id){
			var q = this.createQuery();
			q.id = id;
			return this.getNodesByQuery(q);
		},
		
		getCategory: function(id){
			return this.$el.querySelector('category[id="' + id + '"]');
		},	

		getWildcardsDatatype: function(asArray){
			return asArray ? 'core.wildcards[]' : 'core.wildcards';
		},

		isArrayDatatype: function(datatype){
			return datatype.endsWith('[]');
		},
			
	},
}
Vue.config.ignoredElements.push('library');


