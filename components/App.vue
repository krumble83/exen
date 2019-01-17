<template>
	<ExWorksheet ref="worksheet" class="exWorksheet">
		<ExTitleBar :title="title" slot="front">
			<image v-for="(button,idx) in toolbuttons"  :key="idx" 
				width="32" 
				:href="button.img" 
				height="32" 
				x="10" 
				y="3" 
				class="button"
				:class="button.classObject" 
				:style="button.styleObject" 
				slot="buttons"
				@mousedown.left.stop=""
				@click="doToolbarAction(idx)"
			>
				<title>{{button.title}}</title>
			</image>
		</ExTitleBar>
	</ExWorksheet>
</template>

<script>

	import ExTitleBar from './titlebar.vue';
	import ExWorksheet from './worksheet.vue';
	
	export default {
		components: { ExWorksheet, ExTitleBar },
		mixins: [],
		
		data: function(){
			return {
				toolbuttons: [],
			}
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
			title: function(){return this.$parent.title}
		}
	}
</script>
