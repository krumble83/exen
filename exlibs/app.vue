<template>
	<package id="App">
		<value name="defaultBpName">NewBlueprint</value>
		<value name="defaultFunctionName">NewFunction</value>
	</package>
</template>

<script>

	import * as comps from './default.export.js';
	import {splitPackageName} from '../cmon-js/utils.js';

	comps.Library.mixins.push({
		methods: {
			getVarById: function(id, deflt){
				var name = splitPackageName(id)
					, el = this.$el.querySelector('package[id="' + name.package + '"] value[name="' + name.name + '"]');
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