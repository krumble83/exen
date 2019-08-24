<template>
	<package id="core">
		<datatype id="object" label="object" color="#55f" />
		<datatype id="device" label="Device" color="#00f" />
		<datatype id="component" label="Component" color="#ff0" />
		<datatype id="exec" label="Exec" ctor="PinExec" color="#fff" :private="true" />
		<datatype id="wildcards" label="Wildcards" ctor="PinWildcards" color="#666" />

		<function id="core.operator" ctor="NodeOp" color="#555" :private="true" />
	</package>
</template>

<script>

	import * as comps from '../default.export.js';
	
	const exp = {
		components: comps
	}
	export default exp;

	import App from '../../ui-vues/project.vue';
	App.components['libCore'] = exp;
</script>