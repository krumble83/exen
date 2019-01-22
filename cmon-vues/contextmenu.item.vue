<template>
	<li :id="id" :class="classObject" :title="desc" :shortcut="shortcut" @mousedown.stop="click">
		<a>{{title}}</a>
		<component is="ex-contextmenu" v-if="classObject.sub" ref="submenu"></component>
	</li>
</template>

<script>

	//import ContextMenu from './contextmenu.vue';
	import {genUid} from '../utils';
	
	export default {
		//components: {ContextMenu},
		props: {
			id: {type: String, default: genUid()},
			classObject: {
				disabled: false,
			},
			title: String,
			desc: String,
			shortcut: String,
			callback: {},
			ctor: {},
		},
		
		beforeDestroy: function(){
			console.log('destroy');
			//this.items = [];
		},

		methods: {
			click: function(evt){				
				evt.stopPropagation();
				if(typeof this.callback === 'function')
					this.callback();
			},
		}
	};

</script>