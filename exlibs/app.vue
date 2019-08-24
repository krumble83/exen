<template>
	<package id="App">
	</package>
</template>

<script>

	import * as comps from './default.export.js';
	
	const exp = {
		components: comps
	}
	export default exp;

	import App from '../ui-vues/project.vue';
	App.components['App'] = exp;
</script>