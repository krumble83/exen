<template>
	<package id="arduino.io.digital">
		<datatype id="dpin" label="Arduino Digital Pin Component" color="#ff0" inherits="core.component" />
		<enum id="pinmode" color="#8000FF" inherits="core.type.enum" tooltip="Enum" label="Arduino Digital Pin Mode Enum">
			<editor id="select">
				<value id="INPUT" />
				<value id="OUTPUT" />
				<value id="INPUT_PULLUP" />
			</editor>
		</enum>
		<category id="Arduino/Digital IO Pin">
			<function id="pinmode" title="pinMode()" color="#87663f" symbol="exlibs/img/arduino.png" keywords="pinmode, pin mode">
				<entry /><exit />
				<in id="pin" datatype="dpin" label="Digital Pin" />
				<in id="mode" datatype="pinmode" />
			</function>
			<function id="digitalwrite" title="digitalwrite()" color="#87663f" symbol="exlibs/img/arduino.png" keywords="digitalwrite">
				<entry /><exit />
				<in id="pin" datatype="dpin" label="Digital Pin" />
				<in id="value" datatype="core.type.bool" />
			</function>
			<function id="digitalread" title="digitalRead()" color="#87663f" symbol="exlibs/img/arduino.png" keywords="digitalread,read">
				<entry /><exit />
				<in id="pin" datatype="dpin" label="Digital Pin" />
				<out id="value" datatype="core.type.bool" />
			</function>
			<function id="pulseIn" title="pulseIn()" color="#87663f" symbol="exlibs/img/arduino.png">
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