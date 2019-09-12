<template>
	<package id="core">
		<datatype name="object" label="Object" color="#55f" />
		<datatype name="device" label="Device" color="#00f" />
		<datatype name="component" label="Component" color="#ff0" />
		<datatype name="exec" label="Exec" pinctor="PinExec" color="#fff" :private="true" />
		<datatype name="wildcards" :private="true" label="Wildcards" ctor="PinWildcards" color="#666" />
		
		<datatype name="scalar" label="Scalar Value" color="fff" />
		
		<function name="entryPoint" :private="true" ctor="NodeEntrypoint" symbol="exlibs/img/start.png"	color="#7f2197" flags="F_READ_ONLY|F_NO_CLIPBOARD">
			<exit />
		</function>
		
		<function name="returnNode" :private="true" symbol="exlibs/img/start.png"	color="#7f2197">
			<entry />
		</function>
		
		<function name="rerouteNode" title="Add reroute Node..." ctor="NodeReroute" />
		
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
