<template>
	<package id="arduino.io.digital" color="#87663f" symbol="exlibs/arduino/arduino.png">
		<datatype id="dpin" label="Arduino Digital Pin Component" color="#ff0" />
		<enum id="pinmode" label="Arduino Digital Pin Mode Enum">
			<value id="INPUT" />
			<value id="OUTPUT" />
			<value id="INPUT_PULLUP" />
		</enum>

		<category id="Arduino/Digital IO Pin">
			<function id="pinMode" title="pinMode" keywords="arduino pinmode pin mode">
				<entry /><exit />
				<in id="pin" datatype="dpin" label="Digital Pin" />
				<in id="mode" datatype="pinmode" />
			</function>
			<function id="digitalWrite" title="digitalWrite" keywords="arduino digitalwrite digital pin write">
				<entry /><exit />
				<in id="pin" datatype="dpin" label="Digital Pin" />
				<in id="value" datatype="core.type.bool" label="LOW/HIGH" />
			</function>
			<function id="digitalRead" title="digitalRead" keywords="arduino digitalread digital pin read">
				<entry /><exit />
				<in id="pin" datatype="dpin" label="Digital Pin" />
				<out id="value" datatype="core.type.bool" />
			</function>
			<function id="pulseIn" title="pulseIn" keywords="arduino pulse pulsein digital pin">
				<entry /><exit />
				<in id="pin" datatype="dpin" />
				<in id="value" datatype="core.type.bool" label="LOW/HIGH" />
				<in id="timeout" datatype="core.type.int" />
				<out id="pulseLength" datatype="core.type.int" />
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
	App.components['arduino.io.digital'] = exp;
</script>