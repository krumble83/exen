<template>
	<package id="arduino.io.analog" color="#aaeea0" symbol="exlibs/arduino/arduino.png" >
		<datatype id="apin" label="Arduino Analog Pin Component" color="#ff0" />
		<category id="Arduino/Analog IO Pin">
			<function id="analogRead" title="analogRead()" keywords="read analog">
				<entry /><exit />
				<in id="pin" datatype="apin" label="Analog Pin" />
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
	App.components['arduino.io.analog'] = exp;
</script>