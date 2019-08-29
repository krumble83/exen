<template>
	<package id="arduino.io.analog">
		<datatype id="apin" label="Arduino Analog Pin Component" color="#ff0" :inherits="['core.component']" />
		<category id="Arduino/Analog IO Pin">
			<function id="analogRead" title="analogRead()" color="#aaeea0" symbol="exlibs/img/function.png" keywords="read analog">
				<in id="pin" datatype="arduino.io.ai.apin" label="Analog Pin" />
				<out id="value" datatype="core.type.int" tooltip="int(0 to 1023)" />
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
	App.components['libArduinoIoAnalog'] = exp;
</script>