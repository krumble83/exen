<template>
	<package id="network.core">
		<category id="Network">
			<function name="ipmake" title="Make IP Address Structure" keywords="make IP Address Structure" symbol="lib/core/img/make.png" color="#00f">
				<in name="ip-a" datatype="core.type.int" label="A" />
				<in name="ip-b" datatype="core.type.int" label="B" />
				<in name="ip-c" datatype="core.type.int" label="C" />
				<in name="ip-d" datatype="core.type.int" label="D" />
				<out name="out" datatype="ip" label="IP Address Structure" />
			</function>
			<function name="ipbreak" title="Break IP Address Structure" keywords="break IP Address Structure" symbol="lib/core/img/break.png" color="#00f">
				<in name="in" datatype="ip" label="IP Address Structure" />
				<out name="ip-a" datatype="core.type.int" label="A" />
				<out name="ip-b" datatype="core.type.int" label="B" />
				<out name="ip-c" datatype="core.type.int" label="C" />
				<out name="ip-d" datatype="core.type.int" label="D" />
			</function>
			<function name="ping" title="Ping">
				<entry /><exit />
				<in name="target" datatype="ip" />
				<in name="retry" datatype="core.type.int" optional="true" />
				<out name="success" datatype="core.type.bool" />
			</function>
			<function name="iptostring" title="Ip to String" color="#aaeea0" symbol="lib/img/function.png">
				<in name="target" datatype="ip" />
				<out name="ipstring" datatype="core.type.string" label="IP String" />
			</function>
		</category>
	</package>
</template>

<script>
	import * as comps from '../default.export.js';
	
	const exp = {
		components: comps
	}
	export default exp;

	import App from '../../ui-vues/project.vue';
	App.components['libNetworkCore'] = exp;
</script>