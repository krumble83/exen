<template>
	<package id="special">
		<datatype id="add" ctor="PinAdd" color="#fff" />
		<function id="reroutenode" title="Add reroute Node..." ctor="RereouteNode">
			<in id="in" datatype="core.wildcards" group="1" />
			<out id="out" datatype="core.wildcards" group="1" />
			<in id="inout" datatype="core.wildcards" group="1" ctor="PinReroute" />
		</function>
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