<template>
	<package id="arduino.spi" color="#87663f" symbol="exlibs/arduino/arduino.png" >
		<enum id="dataorder" label="Arduino SPI Data Order Enum">
			<value id="MSBFIRST" />
			<value id="LSBFIRST" />
		</enum>
		<enum id="datamode" color="#8000FF" label="Arduino SPI Data Mode Enum">
			<value id="SPI_MODE0" />
			<value id="SPI_MODE1" />
			<value id="SPI_MODE2" />
			<value id="SPI_MODE3" />
		</enum>
		<enum id="interruptmode" color="#8000FF" label="Arduino SPI Interrupt Mode Enum">
			<value id="LOW" />
			<value id="CHANGE" />
			<value id="RISING" />
			<value id="FALLING" />
			<value id="HIGH" />
		</enum>

		<structure id="setting" label="Arduino SPI Setting Structure">
			<member id="speedMaximum" datatype="core.type.int" label="BUS Max Speed" />
			<member id="dataOrder" datatype="arduino.spi.dataorder" label="DataOrder" />
			<member id="dataMode" datatype="arduino.spi.datamode" label="SPI DataMode" />
		</structure>

		<category id="Arduino/SPI">
			<function id="begintransaction" title="SPI.Begin()" keywords="spi begin transaction">
				<entry /><exit />
				<in id="spisetting" datatype="setting" label="SPI Settings" />
			</function>
			<function id="end" title="SPI.end()" keywords="spi end">
				<entry /><exit />
			</function>
			<function id="endtransaction" title="SPI.End()" keywords="spi end transaction">
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