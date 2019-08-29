<template>
	<package id="arduino.serial">
		<datatype id="connection" label="Arduino Serial Connection object" color="#55f" :inherits="['core.object']" />
		<datatype id="port" label="Arduino Serial Port Component Component" color="#ff0" :inherits="['core.component']" />

		<category id="Arduino/Serial">
			<function id="available" title="Serial.available()" color="#aaeea0" symbol="exlibs/img/arduino.png" keywords="serial available">
				<in id="serialConnection" datatype="connection" />
				<out id="bytes" datatype="core.type.int" />
			</function>
			<function id="begin" title="Serial.begin()" color="#78c8fe" symbol="exlibs/img/arduino.png" keywords="serial available">
				<entry /><exit />
				<in id="serialPort" datatype="port" />
				<in id="bauds" datatype="core.type.int" />
				<out id="serialConnection" datatype="connection" />
			</function>
			<function id="writeByte" title="Serial Write Byte" color="#78c8fe" symbol="exlibs/img/arduino.png" keywords="serial write byte">
				<entry /><exit />
				<in id="serialConnection" datatype="connection" />
				<in id="byte" datatype="core.type.byte" />
			</function>
			<function id="writeBytes" title="Serial Write Bytes Array" color="#78c8fe" symbol="exlibs/img/arduino.png" keywords="serial write byte">
				<entry /><exit />
				<in id="serialConnection" datatype="connection" />
				<in id="byte" datatype="core.type.byte[]" />
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
	App.components['libArduinoSerial'] = exp;
</script>