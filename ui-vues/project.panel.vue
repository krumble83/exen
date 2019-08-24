<template>
	<div>Project</div>
</template>

<script>

	const ProjectPanel = {
		//components: {Library,Package,Datatype,Class,Function,Input,Output,Method,Entry,Exit,Category,Editor,Enum,Value,Structure,Member},
		
		data: function(){
			return {
				childss: [
					{
						_ctor: 'datatype',
						id: 'zezette',
					}
				],
			}
		},
				
		mounted: function(){
		},
	}

	import tab from './tabs.tab.vue';
	tab.components.ProjectPanel = ProjectPanel;
	
	export default ProjectPanel;
	
</script>