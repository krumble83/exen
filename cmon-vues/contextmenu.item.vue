<template>
	<li 
		:class="classObject" 
		:title="desc" 
		@click.capture="click" 
		:data-shortcut="shortcut"
	>
		<a><img v-if="icon != null" :src="icon" />{{title}}</a>
		<slot>
			<ul v-for="(item, idx) in items" :key="idx"
				:is="item.ctor ? item.ctor : 'uimenu'"
				ref="items"
				sub="true"
				v-bind="item"
			></ul>
		</slot>
	</li>
</template>

<script>

	
	export default {
		props: {
			classObject: {
				disabled: false,
			},
			title: String,
			desc: String,
			shortcut: String,
			icon: String,
			callback: {},
			emit: String,
			action: String,
			ctor: {},
		},
		
		data: function(){
			return {
				id: this.$uid(),
				items: []
			}
		},

		methods: {
			click: function(evt){
				console.log('menu click');
				evt.stopPropagation();
				if(this.action && typeof this.$root[this.action] === 'function')
					this.$root[this.action]();
				if(typeof this.callback === 'function')
					this.callback();
				if(this.emit)
					this.$root.$emit(this.emit);
				
				// if no items are available, close the menu
				if(!this.$el.querySelector('ul')){
					this.$el.blur();
					this.$parent.close();
				}
			},
		}
	};

</script>