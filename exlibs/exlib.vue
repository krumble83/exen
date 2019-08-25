<script type="text/x-template" id="library-tpl">
	<component :is="__ctor" v-bind="properties">{{value}}<slot /></component>
</script>

<script>
	Vue.config.ignoredElements = [];
	//Vue.config.ignoredElements = ['datatype', 'Datatype', 'Class', 'class', 'package', 'Package'];



	/*
	function componentFactory(slot) {
		return new Promise((resolve, reject) => {
			window.setTimeout(() => { // Asynchronous fetching
				resolve({ // Return the actual component
					template: `<div>
						${slot}
					 </div>`,
					methods: {
						submit() {
							console.log('hello');
						}
					}
				});
			}, 1000);
		});
	}

	componentFactory('<button @click="submit">OK</button>') // Build the component
	  .then(component => {
		new Vue({ // Instantiate vue
		  el: '#app',
		  components: {
			builtComponent: component
		  }
		});
	  });

	*/


	function Extend(){
		var args = Array.prototype.slice.call(arguments);
		
		if(args.length === 1)
			return;

		var tok = args.shift()
			, name = args[args.length - 1];
		var ret = {methods: {}};
		var f = function(obj){
			if(!obj)
				return this._create(name,{});
			var id = (typeof obj == 'string') ? obj : obj.id;
			obj = (typeof obj == 'string') ? {id: obj} : obj;
			//console.log('----', obj, name);
			//console.assert(obj.id, 'YOU MUST PROVIDE ID');
			return this.$children.find(it => it.id == id) || this._create(name, obj);
			//return this._create(name, obj);
		}
		ret.methods[name] = f;
		tok.mixins.push(ret)
		Extend.apply(this, args);
	}



	const IdPackageId = {
		created: function(){
			//console.log('**', this.Package);
			this._id = this.Package.id + '.' + this.id;
		}	
	}

	const SplitPackageName = {
		methods : {
			splitPackageName: function(string){
				return string.split(/\.(?=[^\.]+$)/);
			}
		}
	}

	//const ignoreImports = ['id', 'childs'];




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
					return this.Package.id + '.' + this.id;
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
				var test = document.createElement('component');
				this.$el.appendChild(test);
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
			
			Id: function(){
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
			
		template: '<component :is="__ctor" v-bind="properties">{{value}}<slot /></component>'
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
					category: false,
					searchString: '',
					inputDatatype: '',
					outputDatatype: '',
					private: false,
				}
			},
			
			select: function(selector){
				return this.$el.querySelectorAll(selector).__vue__ || false;
			},
			
			arePinCompatible: function(input, outpout){
				
			},

			getPackage: function(id){
				var ret = false;
				return this.$children.find(it => it.id == id && it.$el.tagName == 'PACKAGE');
				return ret;
			},
			
			getNodesByQuery: function(query){
				var q = '[isfunction="true"]';
				if(query && !query.private)
					q += ':not([private="true"])'
				return this.$el.querySelectorAll(q);			
			},
			
			getDatatype: function(id){
				var name = this.splitPackageName(id);
				//console.log(id, name, this.$el.querySelector('package[id="' + name[0] + '"] datatype[id="' + name[1] + '"]'));
				return this.$el.querySelector('package[id="' + name[0] + '"] datatype[id="' + name[1] + '"]').__vue__;
			},
			
			getNode: function(id){
				if(!id)
					return this.getNodesByQuery(this.createQuery());
				else if(typeof id == 'object')
					return this.getNodesByQuery(id);

				var name = this.splitPackageName(id);
				return this.$el.querySelector('package[id="' + name[0] + '"] [isfunction="true"][id="' + name[1] + '"]');
			},
			
			getCategory: function(id){
				return this.$el.querySelector('category[id="' + id + '"]');
			}
				
		},
		
		render: function(createElement){
			return createElement(
				'library',
				createElement('slot')
			);
		}
	}
	Vue.config.ignoredElements.push('library');

	export const Package = {
		extends: Base,
		mixins: [],
		props: {
			__ctor: {type: String, default: 'package'},
			categories: {type: Array, default: function(){return []}},
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
	Extend(Library, 'Package');
	Vue.config.ignoredElements.push('package');


	export const Category = {
		extends: Base,
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
	}
	Extend(Package, 'Category');
	Vue.config.ignoredElements.push('category');


	export const Node = {
		extends: Base,
		mixins: [],
		inject: {
			Library: 'Library',
			Package: 'Package',
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
			pos: String,
			color: {type: String, default: function(){return this.Category.color}},
			symbol: {type: String, default: function(){return this.Category.symbol}},
		},
		
		methods: {
			
		}
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
		},
	}
	Extend(Package, Category, 'Function');
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
			color: {type: String, required: true},
			inherits: {type: Array, default: function(){return []}},
			description: String,
			label: String,
		},
		
		methods: {
			Color: function(){
				return this.color;
			},
			
			Label: function(){
				return this.label;
			},
		}
	}
	Extend(Package, Category, 'Datatype');
	Vue.config.ignoredElements.push('datatype');




	export const Pin = {
		extends: Base,
		mixins: [],
		inject: ['Library', 'Package'],
		
		props: {
			__ctor: {type: String, default: 'pin'},
			isio: {type: Boolean, default: true},
			optional: {type: Boolean, default: false},
			label: String,
			datatype: {type: String, required: true},
			keywords: {type: Array, default: function(){return []}},
			description: String,
			group: Number,
			required: {type: Boolean, default: false},
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

	export const Input = {
		extends: Pin,
		mixins: [],
		
		props: {
			__ctor: {type: String, default: 'input'},
		},
		
		tpl: '#library-tpl',
	}
	Extend(Node, Function, 'Input');
	//Vue.config.ignoredElements.push('input');

	export const Output = {
		extends: Pin,
		mixins: [],
		
		props: {
			__ctor: {type: String, default: 'ex-output'},
		},
	}
	Extend(Node, Function, 'Output');
	//Vue.config.ignoredElements.push('output');

	export const Entry = {
		extends: Input,
		mixins: [],
		
		props: {
			id:{type: String, default:'entry'},
			datatype: {type: String, default: 'core.exec'},
		},
	}
	Extend(Node, 'Entry');
	Vue.config.ignoredElements.push('entry');

	export const Exit = {
		extends: Output,
		mixins: [],
		
		props: {
			id:{type: String, default:'exit'},
			datatype: {type: String, default: 'core.exec'},
		},
	}
	Extend(Node, 'Exit');
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
	Extend(Pin, Datatype, 'Editor');
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
	Extend(Package, Category, Editor, 'Pattern');
	Vue.config.ignoredElements.push('pattern');


	export const Enum = {
		extends: Datatype,
		mixins: [],
		
		props: {
			__ctor: {type: String, default: 'enum'},
			color: {type: String, default: '#0ff'},
		},
	}
	Extend(Package, Category, 'Enum');
	Vue.config.ignoredElements.push('enum');

	export const Value = {
		extends: Base,
		mixins: [],
		
		props: {
			__ctor: {type: String, default: 'value'},
			value: Number,
		},
	}
	Extend(Enum, Editor, 'Value');
	Vue.config.ignoredElements.push('value');

	export const Structure = {
		extends: Datatype,
		mixins: [],
		
		props: {
			__ctor: {type: String, default: 'class'},
			color: {type: String, default: '#f0f'},
		},
	}
	Extend(Package, Category, 'Structure');
	Vue.config.ignoredElements.push('structure');

	export const Class = {
		extends: Structure,
		mixins: [],
		
		props: {
			__ctor: {type: String, default: 'class'},
			color: {type: String, default: '#00f'},
		},

	}
	Extend(Package, Category, 'Class');
	Vue.config.ignoredElements.push('class');

	export const Method = {
		extends: Function,
		mixins: [],
		
		props: {
			__ctor: {type: String, default: 'method'},
		},
	}
	Extend(Class, 'Method');
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
	Extend(Class, Structure, 'Member');
	Vue.config.ignoredElements.push('member');
</script>

