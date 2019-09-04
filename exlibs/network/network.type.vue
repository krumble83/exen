<template>
	<package id="network.type">
		<structure id="ip" label="IP Address Structure" color="#0057c8">
			<member id="a" type="core.type.int" label="A" />
			<member id="b" type="core.type.int" label="B" />
			<member id="c" type="core.type.int" label="C" />
			<member id="d" type="core.type.int" label="D" />
		</structure>
	</package>
</template>

<script>
	import * as comps from '../default.export.js';
	
	const exp = {
		components: comps
	}
	export default exp;

	import App from '../../ui-vues/project.vue';
	App.components['libNetworkType'] = exp;
</script>