<template>
	<ExWorksheet ref="worksheet" class="exWorksheet">
		<ExTitleBar :title="title" slot="front" :toolbuttons="toolbuttons" :doToolbarAction="doToolbarAction" />
	</ExWorksheet>
</template>

<script>

	import store from '../store'
	import ExTitleBar from './titlebar.vue';
	import ExWorksheet from './worksheet.vue';

	export default {
		components: { ExWorksheet, ExTitleBar },
		mixins: [],
		

		provide: function() {
			var me = this;
			return {
				camelCaseToLabel: function(str){
					if(!str)
						return '';
					return str
						// insert a space between lower & upper
						.replace(/([a-z])([A-Z])/g, '$1 $2')
						// space before last upper in a sequence followed by lower
						.replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
						// uppercase the first character
						.replace(/^./, function(str){ return str.toUpperCase(); })
				},
			}
		},


		store,
		
		data: function(){
			return {
				toolbuttons: [],
				title: '',
			}
		},
		
		mounted: function(){
			this.$store.commit('addTodo', 'toto');
		},
		
		methods: {
			doToolbarAction(id){
				if(this.toolbuttons[id] && typeof this.toolbuttons[id].action === 'function')
					this.toolbuttons[id].action();
			},
			
			addNode: function(data){
				this.$refs.worksheet.addNode(data);
			},
			
		},
		
		computed: {
			
		},
		
		el: '#app'
	}

</script>
