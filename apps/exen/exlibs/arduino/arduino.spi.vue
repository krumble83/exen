<template>
	<package id="arduino.spi" color="#87663f" symbol="exlibs/arduino/arduino.png" >
		<enum name="dataorder" label="Arduino SPI Data Order Enum">
			<value name="MSBFIRST" />
			<value name="LSBFIRST" />
		</enum>
		<enum name="datamode" color="#8000FF" label="Arduino SPI Data Mode Enum">
			<value name="SPI_MODE0" />
			<value name="SPI_MODE1" />
			<value name="SPI_MODE2" />
			<value name="SPI_MODE3" />
		</enum>
		<enum name="interruptmode" color="#8000FF" label="Arduino SPI Interrupt Mode Enum">
			<value name="LOW" />
			<value name="CHANGE" />
			<value name="RISING" />
			<value name="FALLING" />
			<value name="HIGH" />
		</enum>

		<structure name="setting" label="Arduino SPI Setting Structure">
			<member id="speedMaximum" datatype="core.type.int" label="BUS Max Speed" />
			<member id="dataOrder" datatype="arduino.spi.dataorder" label="DataOrder" />
			<member id="dataMode" datatype="arduino.spi.datamode" label="SPI DataMode" />
		</structure>

		<category name="Arduino/SPI">
			<function name="begintransaction" title="SPI.Begin()" keywords="spi begin transaction">
				<entry /><exit />
				<in name="spisetting" datatype="setting" label="SPI Settings" />
			</function>
			<function name="end" title="SPI.end()" keywords="spi end">
				<entry /><exit />
			</function>
			<function name="endtransaction" title="SPI.End()" keywords="spi end transaction">
				<entry /><exit />
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
	App.components['arduino.spi'] = exp;
</script>