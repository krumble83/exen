<template>
	<package id="arduino.serial" color="#aaeea0" symbol="exlibs/arduino/arduino.png" >
		<datatype id="connection" label="Arduino Serial Connection object" color="#55f" />
		<datatype id="port" label="Arduino Serial Port Component Component" color="#ff0" />

		<category id="Arduino/Serial">
			
			<enum id="serialConfig" label="Arduino Serial Configuration Enum">
				<value id="SERIAL_5N1" /><value id="SERIAL_6N1" /><value id="SERIAL_7N1" /><value id="SERIAL_8N1" :default="true" /><value id="SERIAL_5N2" />
				<value id="SERIAL_6N2" /><value id="SERIAL_7N2" /><value id="SERIAL_8N2" /><value id="SERIAL_5E1" /><value id="SERIAL_6E1" /><value id="SERIAL_7E1" />
				<value id="SERIAL_8E1" /><value id="SERIAL_5E2" /><value id="SERIAL_6E2" /><value id="SERIAL_7E2" /><value id="SERIAL_8E2" /><value id="SERIAL_5O1" />
				<value id="SERIAL_6O1" /><value id="SERIAL_7O1" /><value id="SERIAL_8O1" /><value id="SERIAL_5O2" /><value id="SERIAL_6O2" /><value id="SERIAL_7O2" />
				<value id="SERIAL_8O2" />
			</enum>
		
			<class id="serial" label="Arduino Serial Connection" inherits="arduino.stream.stream">
				<method name="availableForWrite" title="availableForWrite (serial)">
					<out id="out" datatype="core.type.int" />
				</method>
				<method name="begin" title="Serial.begin()" keywords="arduino serial available">
					<entry /><exit />
					<in id="serialPort" datatype="port" />
					<in id="bauds" datatype="core.type.int" />
					<out id="serialConnection" datatype="connection" />
				</method>
				<method name="end" title="end (Serial)" >
					<entry /><exit />
					<in id="serialConnection" datatype="connection" />
				</method>
				<method name="ifSerial" title="if (Serial)" >
					<in id="serialConnection" datatype="connection" />
					<out id="out" datatype="core.type.bool" />			
				</method>
				<method name="writeByte" title="Serial Write Byte" keywords="arduino serial write byte">
					<entry /><exit />
					<in id="serialConnection" datatype="connection" />
					<in id="byte" datatype="core.type.byte" />
				</method>
				<method name="writeBytes" title="Serial Write Bytes Array" keywords="arduino serial write byte">
					<entry /><exit />
					<in id="serialConnection" datatype="connection" />
					<in id="byte" datatype="core.type.byte[]" />
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
	App.components['arduino.serial'] = exp;
</script>
