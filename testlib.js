
Vue.config.ignoredElements = ['Datatype', 'datatype', 'Class', 'class', 'package', 'Package'];

export const Base = {
	//components: {},
	mixins: [],
	props: {
		id: String,
		_ctor: {type: String, default: 'base'},
		childs: {type: Array, default: function(){return []}},
	},
	
	computed: {
		preperties: function(){
			var ret = {};
			for (var key in this.$props) {
				if (!this.$props.hasOwnProperty(key))
					continue;
				if(key.startsWith('_') || key == 'childs')
					continue
				ret[key] = this.$props[key];
			}
			return ret;
		},
	},
		
	template: '<component :is="_ctor" v-bind="preperties"><slot /></component>'
}

export const Package = {
	extends: Base,
	props: {
		_ctor: {type: String, default: 'package'},
	},
}

export const Datatype = {
	extends: Base,
	
	//components: ['Package'],
	
	props: {
		_ctor: {type: String, default: 'datatype'},
		type: String,
		isdatatype: {type: Boolean, default: true},
		private: Boolean,
		ctor: String,
		color: String,
		inherits: String,
		description: String,
		label: String,
	},
		
	template: '<component :is="_ctor" v-bind="$props"><slot /></component>'
}
Base.mixins.push({components:{Datatype}});

export const Class = {
	extends: Datatype,
	
	props: {
		_ctor: {type: String, default: 'class'},
		toto: {type: String, default:'ok'},
	},
		
	template: '<component :is="_ctor" v-bind="$props"><slot /></component>'
}
Base.mixins.push({components:{Class}});
//Base.components.Class = Class;
