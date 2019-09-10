<template>
	<package id="core">
		<datatype id="object" label="Object" color="#55f" />
		<datatype id="device" label="Device" color="#00f" />
		<datatype id="component" label="Component" color="#ff0" />
		<datatype id="exec" label="Exec" pinctor="PinExec" color="#fff" :private="true" />
		<datatype id="wildcards" :private="true" label="Wildcards" ctor="PinWildcards" color="#666" />
		
		<datatype id="scalar" label="Scalar Value" color="fff" />
		
		<function id="entryPoint" :private="true" ctor="NodeEntrypoint" symbol="exlibs/img/start.png"	color="#7f2197">
			<exit />
		</function>
		
		<function id="returnNode" :private="true" symbol="exlibs/img/start.png"	color="#7f2197">
			<entry />
		</function>
		
		<function id="rerouteNode" title="Add reroute Node..." ctor="NodeReroute" />
		
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