<template>
	<package id="arduino.eeprom">
		<category id="Arduino/EEPROM">
			<function id="read" title="EEPROM.read()" color="#9c39da" symbol="exlibs/img/arduino.png" keywords="eeprom read" tooltip="Reads a byte from the EEPROM. Locations that have never been written to have the value of 255.">
				<in id="address" datatype="core.type.int" tooltip="the location to read from, starting from 0 (int)" />
				<out id="value" datatype="core.type.byte" tooltip="the value stored in that location (byte)" />
			</function>
			<function id="write" title="EEPROM.write()" color="#9c39da" symbol="exlibs/img/arduino.png" keywords="eeprom write" tooltip="Write a byte to the EEPROM.">
				<entry /><exit />
				<in id="address" datatype="core.type.int" tooltip="the location to write to, starting from 0 (int)" />
				<in id="value" datatype="core.type.byte" tooltip="the value to write, from 0 to 255 (byte)" />
			</function>
			<function id="put" title="EEPROM.put()" color="#9c39da" symbol="exlibs/img/arduino.png" keywords="eeprom put" tooltip="Write any data type or object to the EEPROM.">
				<entry /><exit />
				<in id="address" datatype="core.type.int" tooltip="the location to write to, starting from 0 (int)" />
				<in id="value" datatype="core.wildcards" tooltip="The variable to fill EEPROM with" />
			</function>
			<function id="length" title="EEPROM Size" color="#9c39da" symbol="exlibs/img/arduino.png" keywords="eeprom write" tooltip="Return the Size of the Arduino integrated EEPROM.">
				<out id="length" datatype="core.type.int" tooltip="Size of the Arduino integrated EEPROM." />
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
	App.components['libArduinoEeprom'] = exp;
</script>