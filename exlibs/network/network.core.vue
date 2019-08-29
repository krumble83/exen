<template>
	<package id="network.core">
		<category id="Network">
			<function id="ipmake" title="Make IP Address Structure" keywords="make IP Address Structure" symbol="lib/core/img/make.png" color="#00f">
				<in id="ip-a" datatype="core.type.int" label="A" />
				<in id="ip-b" datatype="core.type.int" label="B" />
				<in id="ip-c" datatype="core.type.int" label="C" />
				<in id="ip-d" datatype="core.type.int" label="D" />
				<out id="out" datatype="ip" label="IP Address Structure" />
			</function>
			<function id="ipbreak" title="Break IP Address Structure" keywords="break IP Address Structure" symbol="lib/core/img/break.png" color="#00f">
				<in id="in" datatype="ip" label="IP Address Structure" />
				<out id="ip-a" datatype="core.type.int" label="A" />
				<out id="ip-b" datatype="core.type.int" label="B" />
				<out id="ip-c" datatype="core.type.int" label="C" />
				<out id="ip-d" datatype="core.type.int" label="D" />
			</function>
			<function id="ping" title="Ping">
				<entry /><exit />
				<in id="target" datatype="ip" />
				<in id="retry" datatype="core.type.int" optional="true" />
				<out id="success" datatype="core.type.bool" />
			</function>
			<function id="iptostring" title="Ip to String" color="#aaeea0" symbol="lib/img/function.png">
				<in id="target" datatype="ip" />
				<out id="ipstring" datatype="core.type.string" label="IP String" />
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