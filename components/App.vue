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
