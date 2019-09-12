<template>
	<package id="core.math" symbol="exlibs/img/function.png" color="#aaeea0">	
		<category id="Math">
			<function name="pi">
				<out name="pi" datatype="core.type.float" />
			</function>
			<function name="sin">
				<in name="in" datatype="core.type.float" />
				<out name="out" datatype="core.type.float" />
			</function>
			<function name="cos">
				<in name="in" datatype="core.type.float" />
				<out name="out" datatype="core.type.float" />
			</function>
			<function name="acos">
				<in name="in" datatype="core.type.float" />
				<out name="out" datatype="core.type.float" />
			</function>
			<function name="abs">
				<in name="in" datatype="core.type.float" />
				<out name="out" datatype="core.type.float" />
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
	App.components['core.math'] = exp;
</script>