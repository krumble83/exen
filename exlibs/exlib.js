Vue.config.ignoredElements = [];


const SplitPackageName = {
	methods : {
		splitPackageName: function(string){
			return string.split(/\.(?=[^\.]+$)/);
		}
	}
}

export const Base = {
	//components: {},
	mixins: [],
	props: {
		id: {type: String, required: true},
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
				if(key.startsWith('_'))
					ret[key.slice(1)] = this.$data[key];
				else
					ret[key] = this.$props[key];
			}
			/*
			this.$data.forEach(function(prop){
				if(prop.startsWith('__')
					return;
				if(prop.startsWith('_')
					ret[prop
				ret[prop.name] = prop.value;
			});
			*/
			return ret;
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
			_id: this.id,
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
		
	template: '<component :is="__ctor" v-bind="properties">{{value}}<component v-for="child in childs" :is="child.__ctor" v-bind="child" /><slot /></component>'
}

function test(){
	return (new DOMParser()).parseFromString("<library/>", 'text/xml');
}

export const Library = {
	extends: Base,
	mixins: [SplitPackageName],
	props: {
		__ctor: {type: String, default: 'library'},
		id: {type: String, default: ''},
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
			var name = me.splitPackageName(id);
			return me.$el.querySelector('package[id="' + name[0] + '"] hardware[id="' + name[1] + '"]').__vue__;			
		},
		
		getNodesByQuery: function(query){
			//console.log(query);
			const me = this;
			var qs = ['[isfunction="true"]']
				, ret = [];
			
			if(query && query.id){
				//console.log('queryyyyy', query);
				var name = me.splitPackageName(query.id);
				return me.$el.querySelector('package[id="' + name[0] + '"] [isfunction="true"][id="' + name[1] + '"]').__vue__;
			}

			if(query && query.searchString){
				qs.push(qs[0] + '[id*="' + query.searchString + '"]');
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
					, dtypeid = me.isArrayDatatype(query.inputDatatype) ? dtype.id + '[]' : dtype.id
					, pack = dtype.Package;
				ret = Array.from(ret).filter(function(it){
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
					, dtypeid = me.isArrayDatatype(query.outputDatatype) ? dtype.id + '[]' : dtype.id
					, pack = dtype.Package;
					
				ret = Array.from(ret).filter(function(it){
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
			var name = this.splitPackageName(id);
			//console.log(id, name, 'package[id="' + name[0] + '"] [isdatatype="true"][id="' + name[1] + '"]');
			return this.$el.querySelector('package[id="' + name[0] + '"] [isdatatype="true"][id="' + name[1] + '"]').__vue__;
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

export const Package = {
	extends: Base,
	mixins: [],
	props: {
		__ctor: {type: String, default: 'package'},
		categories: {type: Array, default: function(){return []}},
		label: String,
		color: String,
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


export const Category = {
	extends: Base,
	inject: {
		Library: {default: false},
		Package: {default: false},
	},
	mixins: [],
	
	provide: function(){
		const me = this;
		return {
			Category: me,
		}
	},
	
	props: {
		__ctor: {type: String, default: 'category'},
		symbol: String,
		color: String,
	},
	
	computed: {
		fullPath: function(){
			var ret = this.id
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


export const Node = {
	extends: Base,
	mixins: [],
	inject: {
		Library: {default: false},
		Package: {default: false},
		Category: {default: false},
	},
	//mixins: [IdPackageId],
	
	props: {
		__ctor: {type: String, default: 'node'},
		title: String,
		subtitle: String,
		keywords: String, //{type: Array, default: function(){return []}},
		description: String,
		//categories: {type: Array, default: function(){return []}},
		flags: Number,
		color: {type: String, default: function(){return this.Category.color}},
		symbol: {type: String, default: function(){return this.Category.symbol}},
		x: Number,
		y: Number,
	},
	
	data: function(){
		return {
			_symbol: this.symbol,
			_title: this.title,
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

export const Function = {
	extends: Node,
	mixins: [],
	
	props: {
		__ctor: {type: String, default: 'function'},
		isfunction: {type: Boolean, default: true},
		private:  {type: Boolean, default: false},
	}
}
Vue.config.ignoredElements.push('function');

export const Datatype = {
	extends: Base,
	mixins: [],
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
		private: {type: Boolean, default: false},
		ctor: String,
		pinctor: String,
		color: {type: String, required: true},
		inherits: String,
		description: String,
		label: String,
		isdatatype: {type: Boolean, default: true},
	},
	
	data: function(){
		return {
			//fullpath: this.Package.fullPath + '.' + this.id,
		}
	},
	
	methods: {
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




export const Pin = {
	extends: Base,
	mixins: [],
	inject: ['Library', 'Package'],
	
	props: {
		__ctor: {type: String, default: 'pin'},
		isio: {type: Boolean, default: true},
		isarray: {type: Boolean, default: false},
		optional: Boolean,
		label: String,
		ctor: String,
		pinctor: String,
		datatype: {type: String, required: true},
		keywords: {type: Array, default: function(){return []}},
		description: String,
		group: String,
		required: {type: Boolean, default: false},
		target: String,
	},
	
	data: function(){
		return {
			_required: this.required,
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
		flags: {type: Number, default: F_INPUT},
	}
}
Vue.config.ignoredElements.push('in');

export const Out = {
	extends: Pin,
	mixins: [],
	
	props: {
		__ctor: {type: String, default: 'out'},
		flags: {type: Number, default: F_OUTPUT},
	},
}
Vue.config.ignoredElements.push('out');

export const Entry = {
	extends: In,
	mixins: [],
	
	props: {
		id:{type: String, default: '@entry'},
		datatype: {type: String, default: 'core.exec'},
	},
}
Vue.config.ignoredElements.push('entry');

export const Exit = {
	extends: Out,
	mixins: [],
	
	props: {
		id:{type: String, default: '@exit'},
		datatype: {type: String, default: 'core.exec'},
	},
}
Vue.config.ignoredElements.push('exit');



export const Editor = {
	extends: Base,
	mixins: [],
	inject: ['Library', 'Package'],
	
	props: {
		__ctor: {type: String, default: 'editor'},
		ctor: String,
	}
}
Vue.config.ignoredElements.push('editor');

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


export const Enum = {
	extends: Datatype,
	mixins: [],
	
	props: {
		__ctor: {type: String, default: 'enum'},
		color: {type: String, default: '#8000FF'},
	},
	
	mounted: function(){
		if(this.private)
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

export const Value = {
	extends: Base,
	mixins: [],
	
	props: {
		__ctor: {type: String, default: 'value'},
		value: Number,
	},
}
Vue.config.ignoredElements.push('value');

export const Structure = {
	extends: Datatype,
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
	mixins: [],
	
	props: {
		__ctor: {type: String, default: 'class'},
		color: {type: String, default: '#00f'},
	},

}
Vue.config.ignoredElements.push('class');


export const Interface = {
	extends: Class,
	mixins: [],
	
	props: {
		__ctor: {type: String, default: 'interface'},
	},

}
Vue.config.ignoredElements.push('interface');


export const Method = {
	extends: Function,
	mixins: [],
	
	props: {
		__ctor: {type: String, default: 'method'},
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


