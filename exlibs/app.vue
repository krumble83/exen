<template>
	<package id="App">
		<value id="defaultBpName">NewBlueprint</value>
		<value id="defaultFunctionName">NewFunction</value>
	</package>
</template>

<script>

	import * as comps from './default.export.js';
	
	const splitPackageName = function(string){
		return string.split(/\.(?=[^\.]+$)/);
	}

	comps.Library.mixins.push({
		methods: {
			getVarById: function(id, deflt){
				var name = splitPackageName(id)
					, el = this.$el.querySelector('package[id="' + name[0] + '"] value[id="' + name[1] + '"]');
				return el.innerText || deflt;
			}
		}
	});
	
	const exp = {
		components: comps
	}
	export default exp;

	import App from '../ui-vues/project.vue';
	App.components['App'] = exp;
</script>