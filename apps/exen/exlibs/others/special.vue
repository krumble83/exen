<template>
	<package id="special">
		<datatype name="add" ctor="PinAdd" pinctor="PinAdd" color="#fff" />
	</package>
</template>

<script>

	import * as comps from '../default.export.js';
	
	const exp = {
		components: comps
	}
	export default exp;

	import App from '../../ui-vues/project.vue';
	App.components['libSpecial'] = exp;
</script>