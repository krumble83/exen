<template>
	<package id="arduino.io.analog" color="#aaeea0" symbol="exlibs/arduino/arduino.png" >
		<datatype name="apin" label="Arduino Analog Pin Component" color="#ff0" />
		<category name="Arduino/Analog IO Pin">
			<function name="analogRead" title="analogRead()" keywords="read analog">
				<entry /><exit />
				<in name="pin" datatype="apin" label="Analog Pin" />
				<out name="value" datatype="core.type.int" tooltip="int(0 to 1023)" />
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