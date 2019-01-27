<template>
	<li :id="id" :class="classObject" :title="desc" :shortcut="shortcut" @mousedown.stop="click" :data-shortcut="shortcut">
		<a>{{title}}</a>
		<slot>
			<ul v-for="(item, idx) in items" :key="idx"
				:is="item.ctor ? item.ctor : 'uimenu'"
				ref="items"
				v-bind="item"
			></ul>
		</slot>
	</li>
</template>

<script>

	//import uimenu from './contextmenu.vue';
	import {genUid} from '../utils';
	
	export default {
		//components: {Menu},
		props: {
			id: {type: String, default: genUid()},
			classObject: {
				disabled: false,
			},
			title: String,
			desc: String,
			shortcut: String,
			callback: {},
			emit: String,
			action: String,
			ctor: {},
		},
		
		data: function(){
			return {
				items: []
			}
		},

		methods: {
			click: function(evt){
				console.log(this.$options);
				evt.stopPropagation();
				if(typeof this.callback === 'function')
					this.callback();
				if(this.emit)
					this.$root.$emit(this.emit);
				if(this.action && typeof this.$root[this.action] === 'function')
					this.$root[this.action]();
			},
		}
	};

</script>