<template>
	<package id="arduino.spi">
		<enum id="dataorder" color="#8000FF" tooltip="Enum" label="Arduino SPI Data Order Enum">
			<editor id="select">
				<value id="MSBFIRST" />
				<value id="LSBFIRST" />
			</editor>
		</enum>
		<enum id="datamode" color="#8000FF" tooltip="Enum" label="Arduino SPI Data Mode Enum">
			<editor id="select">
				<value id="SPI_MODE0" />
				<value id="SPI_MODE1" />
				<value id="SPI_MODE2" />
				<value id="SPI_MODE3" />
			</editor>
		</enum>
		<enum id="interruptmode" color="#8000FF" tooltip="Enum" label="Arduino SPI Interrupt Mode Enum">
			<editor id="select">
				<value id="LOW" />
				<value id="CHANGE" />
				<value id="RISING" />
				<value id="FALLING" />
				<value id="HIGH" />
			</editor>
		</enum>
		<structure id="setting" label="Arduino SPI Setting Structure" color="#0057c8">
			<member id="speedMaximum" datatype="core.type.int" label="BUS Max Speed" />
			<member id="dataOrder" datatype="arduino.spi.dataorder" label="DataOrder" />
			<member id="dataMode" datatype="arduino.spi.datamode" label="SPI DataMode" />
		</structure>

		<category id="Arduino/SPI">
			<function id="begintransaction" title="SPI.Begin()" color="#87663f" symbol="exlibs/img/arduino.png" keywords="spi begin transaction">
				<entry /><exit />
				<in id="spisetting" datatype="setting" label="SPI Settings" />
			</function>
			<function id="end" title="SPI.end()" color="#87663f" symbol="exlibs/img/arduino.png" keywords="spi end">
				<entry /><exit />
			</function>
			<function id="endtransaction" title="SPI.End()" color="#87663f" symbol="exlibs/img/arduino.png" keywords="spi end transaction">
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