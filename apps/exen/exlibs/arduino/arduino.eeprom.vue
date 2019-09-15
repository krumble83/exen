<template>
	<package id="arduino.eeprom" color="#9c39da" symbol="exlibs/arduino/arduino.png">
		<category name="Arduino/EEPROM">
			<function name="read" title="EEPROM.read()" keywords="eeprom read" tooltip="Reads a byte from the EEPROM. Locations that have never been written to have the value of 255.">
				<in name="address" datatype="core.type.int" tooltip="the location to read from, starting from 0 (int)" />
				<out name="value" datatype="core.type.byte" tooltip="the value stored in that location (byte)" />
			</function>
			<function name="write" title="EEPROM.write()" keywords="eeprom write" tooltip="Write a byte to the EEPROM.">
				<entry /><exit />
				<in name="address" datatype="core.type.int" tooltip="the location to write to, starting from 0 (int)" />
				<in name="value" datatype="core.type.byte" tooltip="the value to write, from 0 to 255 (byte)" />
			</function>
			<function name="put" title="EEPROM.put()" keywords="eeprom put" tooltip="Write any data type or object to the EEPROM.">
				<entry /><exit />
				<in name="address" datatype="core.type.int" tooltip="the location to write to, starting from 0 (int)" />
				<in name="value" datatype="core.wildcards" tooltip="The variable to fill EEPROM with" />
			</function>
			<function name="length" title="EEPROM Size" keywords="eeprom write" tooltip="Return the Size of the Arduino integrated EEPROM.">
				<out name="length" datatype="core.type.int" tooltip="Size of the Arduino integrated EEPROM." />
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
	App.components['arduino.eeprom'] = exp;
</script>