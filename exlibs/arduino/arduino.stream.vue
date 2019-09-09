<template>
	<package id="arduino.stream">
		<category id="Arduino/Stream">
			<class id="stream">
				<method id="available" title="available" color="#aaeea0" symbol="exlibs/img/arduino.png" keywords="available">
					
					<out id="bytes" datatype="core.type.int" />
				</method>
			</class>
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
	App.components['arduino.stream'] = exp;
</script>
