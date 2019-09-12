<template>
	<package id="arduino.io.digital" color="#87663f" symbol="exlibs/arduino/arduino.png">
		<datatype name="dpin" label="Arduino Digital Pin Component" color="#ff0" />
		<enum name="pinmode" label="Arduino Digital Pin Mode Enum">
			<value id="INPUT" />
			<value id="OUTPUT" />
			<value id="INPUT_PULLUP" />
		</enum>

		<category id="Arduino/Digital IO Pin">
			<function name="pinMode" title="pinMode" keywords="arduino pinmode pin mode">
				<entry /><exit />
				<in name="pin" datatype="dpin" label="Digital Pin" />
				<in name="mode" datatype="pinmode" />
			</function>
			<function name="digitalWrite" title="digitalWrite" keywords="arduino digitalwrite digital pin write">
				<entry /><exit />
				<in name="pin" datatype="dpin" label="Digital Pin" />
				<in name="value" datatype="core.type.bool" label="LOW/HIGH" />
			</function>
			<function name="digitalRead" title="digitalRead" keywords="arduino digitalread digital pin read">
				<entry /><exit />
				<in name="pin" datatype="dpin" label="Digital Pin" />
				<out name="value" datatype="core.type.bool" />
			</function>
			<function name="pulseIn" title="pulseIn" keywords="arduino pulse pulsein digital pin">
				<entry /><exit />
				<in name="pin" datatype="dpin" />
				<in name="value" datatype="core.type.bool" label="LOW/HIGH" />
				<in name="timeout" datatype="core.type.int" />
				<out name="pulseLength" datatype="core.type.int" />
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