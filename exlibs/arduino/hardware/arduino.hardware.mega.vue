<template>
	<package id="arduino.hardware">
		<hardware id="mega" label="Arduino Mega Board" category="Arduino">
			<provide platform="cpp" />
			<provide platform="arduino" />
			<provide platform="arduino.mega" />
			
			<provide type="core.type.int" />
			<provide type="core.type.string" />
			
			<provide library="arduino.base" />
			<provide device="arduino.sdcard" />
			<provide device="arduino.serial.port" />
			<provide device="arduino.io.dpin" />
			<provide device="arduino.io.apin" />
			<provide device="arduino.io.spi" />
			<provide device="arduino.io.twi" />
			<provide device="arduino.io.i2c" />
			
			<category name="Serial Ports">
				<device id="serial" label="Serial Port">
					<require device="di0" />
					<require device="di1" />
					<require device="do0" />
					<require device="do1" />
				</device>
				<device id="serial1" label="Serial Port 1">
					<require device="di19" />
					<require device="do19" />
					<require device="di18" />
					<require device="do18" />
				</device>
				<device id="serial2" label="Serial Port 2">
					<require device="di16" />
					<require device="di17" />
					<require device="do16" />
					<require device="do17" />
				</device>
				<device id="serial3" label="Serial Port 3">
					<require device="di14" />
					<require device="di15" />
					<require device="do14" />
					<require device="do15" />
				</device>
			</category>
			<category name="Digital Inputs">
				<device id="di0" label="Digital Input D0">
					<require device="do0" />
				</device>
				<device id="di1" label="Digital Input D1">
					<require device="do1" />
				</device>
				<device id="di2" label="Digital Input D2">
					<require device="do2" />
				</device>
				<device id="di3" label="Digital Input D3">
					<require device="do3" />
				</device>
				<device id="di4" label="Digital Input D4">
					<require device="do4" />
				</device>
				<device id="di5" label="Digital Input D5">
					<require device="do5" />
				</device>
				<device id="di6" label="Digital Input D6">
					<require device="do6" />
				</device>
				<device id="di7" label="Digital Input D7">
					<require device="do7" />
				</device>
				<device id="di8" label="Digital Input D8">
					<require device="do8" />
				</device>
				<device id="di9" label="Digital Input D9">
					<require device="do9" />
				</device>
				<device id="di10" label="Digital Input D10">
					<require device="do10" />
				</device>
				<device id="di11" label="Digital Input D11">
					<require device="do11" />
				</device>
				<device id="di12" label="Digital Input D12">
					<require device="do12" />
				</device>
				<device id="di13" label="Digital Input D13">
					<require device="do13" />
				</device>
				<device id="di14" label="Digital Input D14">
					<require device="do14" />
				</device>
				<device id="di15" label="Digital Input D15">
					<require device="do15" />
				</device>
				<device id="di16" label="Digital Input D16">
					<require device="do16" />
				</device>
				<device id="di17" label="Digital Input D17">
					<require device="do17" />
				</device>
				<device id="di18" label="Digital Input D18">
					<require device="do18" />
				</device>
				<device id="di19" label="Digital Input D19">
					<require device="do19" />
				</device>
				<device id="di20" label="Digital Input D20">
					<require device="do20" />
				</device>
				<device id="di21" label="Digital Input D21">
					<require device="do21" />
				</device>
				<device id="di22" label="Digital Input D22">
					<require device="do22" />
				</device>
				<device id="di23" label="Digital Input D23">
					<require device="do23" />
				</device>
				<device id="di24" label="Digital Input D24">
					<require device="do24" />
				</device>
				<device id="di25" label="Digital Input D25">
					<require device="do25" />
				</device>
				<device id="di26" label="Digital Input D26">
					<require device="do26" />
				</device>
				<device id="di27" label="Digital Input D27">
					<require device="do27" />
				</device>
				<device id="di28" label="Digital Input D28">
					<require device="do28" />
				</device>
				<device id="di29" label="Digital Input D29">
					<require device="do29" />
				</device>
				<device id="di30" label="Digital Input D30">
					<require device="do30" />
				</device>
				<device id="di31" label="Digital Input D31">
					<require device="do31" />
				</device>
				<device id="di32" label="Digital Input D32">
					<require device="do32" />
				</device>
				<device id="di33" label="Digital Input D33">
					<require device="do33" />
				</device>
				<device id="di34" label="Digital Input D34">
					<require device="do34" />
				</device>
				<device id="di35" label="Digital Input D35">
					<require device="do35" />
				</device>
				<device id="di36" label="Digital Input D36">
					<require device="do36" />
				</device>
				<device id="di37" label="Digital Input D37">
					<require device="do37" />
				</device>
				<device id="di38" label="Digital Input D38">
					<require device="do38" />
				</device>
				<device id="di39" label="Digital Input D39">
					<require device="do39" />
				</device>
				<device id="di40" label="Digital Input D40">
					<require device="do40" />
				</device>
				<device id="di41" label="Digital Input D41">
					<require device="do41" />
				</device>
				<device id="di42" label="Digital Input D42">
					<require device="do42" />
				</device>
				<device id="di43" label="Digital Input D43">
					<require device="do43" />
				</device>
				<device id="di44" label="Digital Input D44">
					<require device="do44" />
				</device>
				<device id="di45" label="Digital Input D45">
					<require device="do45" />
				</device>
				<device id="di46" label="Digital Input D46">
					<require device="do46" />
				</device>
				<device id="di47" label="Digital Input D47">
					<require device="do47" />
				</device>
				<device id="di48" label="Digital Input D48">
					<require device="do48" />
				</device>
				<device id="di49" label="Digital Input D49">
					<require device="do49" />
				</device>
				<device id="di50" label="Digital Input D50">
					<require device="do50" />
				</device>
				<device id="di51" label="Digital Input D51">
					<require device="do51" />
				</device>
				<device id="di52" label="Digital Input D52">
					<require device="do52" />
				</device>
				<device id="di53" label="Digital Input D53">
					<require device="do53" />
				</device>
			</category>
			<category name="Digital Outputs">
				<device id="do0" label="Digital Output D0">
					<require device="di0" />
				</device>
				<device id="do1" label="Digital Output D1">
					<require device="di1" />
				</device>
				<device id="do2" label="Digital Output D2">
					<require device="di2" />
				</device>
				<device id="do3" label="Digital Output D3">
					<require device="di3" />
				</device>
				<device id="do4" label="Digital Output D4">
					<require device="di4" />
				</device>
				<device id="do5" label="Digital Output D5">
					<require device="di5" />
				</device>
				<device id="do6" label="Digital Output D6">
					<require device="di6" />
				</device>
				<device id="do7" label="Digital Output D7">
					<require device="di7" />
				</device>
				<device id="do8" label="Digital Output D8">
					<require device="di8" />
				</device>
				<device id="do9" label="Digital Output D9">
					<require device="di9" />
				</device>
				<device id="do10" label="Digital Output D10">
					<require device="di10" />
				</device>
				<device id="do11" label="Digital Output D11">
					<require device="di11" />
				</device>
				<device id="do12" label="Digital Output D12">
					<require device="di12" />
				</device>
				<device id="do13" label="Digital Output D13">
					<require device="di13" />
				</device>
				<device id="do14" label="Digital Output D14">
					<require device="di14" />
				</device>
				<device id="do15" label="Digital Output D15">
					<require device="di15" />
				</device>
				<device id="do16" label="Digital Output D16">
					<require device="di16" />
				</device>
				<device id="do17" label="Digital Output D17">
					<require device="di17" />
				</device>
				<device id="do18" label="Digital Output D18">
					<require device="di18" />
				</device>
				<device id="do19" label="Digital Output D19">
					<require device="di19" />
				</device>
				<device id="do20" label="Digital Output D20">
					<require device="di20" />
				</device>
				<device id="do21" label="Digital Output D21">
					<require device="di21" />
				</device>
				<device id="do22" label="Digital Output D22">
					<require device="di22" />
				</device>
				<device id="do23" label="Digital Output D23">
					<require device="di23" />
				</device>
				<device id="do24" label="Digital Output D24">
					<require device="di24" />
				</device>
				<device id="do25" label="Digital Output D25">
					<require device="di25" />
				</device>
				<device id="do26" label="Digital Output D26">
					<require device="di26" />
				</device>
				<device id="do27" label="Digital Output D27">
					<require device="di27" />
				</device>
				<device id="do28" label="Digital Output D28">
					<require device="di28" />
				</device>
				<device id="do29" label="Digital Output D29">
					<require device="di29" />
				</device>
				<device id="do30" label="Digital Output D30">
					<require device="di30" />
				</device>
				<device id="do31" label="Digital Output D31">
					<require device="di31" />
				</device>
				<device id="do32" label="Digital Output D32">
					<require device="di32" />
				</device>
				<device id="do33" label="Digital Output D33">
					<require device="di33" />
				</device>
				<device id="do34" label="Digital Output D34">
					<require device="di34" />
				</device>
				<device id="do35" label="Digital Output D35">
					<require device="di35" />
				</device>
				<device id="do36" label="Digital Output D36">
					<require device="di36" />
				</device>
				<device id="do37" label="Digital Output D37">
					<require device="di37" />
				</device>
				<device id="do38" label="Digital Output D38">
					<require device="di38" />
				</device>
				<device id="do39" label="Digital Output D39">
					<require device="di39" />
				</device>
				<device id="do40" label="Digital Output D40">
					<require device="di40" />
				</device>
				<device id="do41" label="Digital Output D41">
					<require device="di41" />
				</device>
				<device id="do42" label="Digital Output D42">
					<require device="di42" />
				</device>
				<device id="do43" label="Digital Output D43">
					<require device="di43" />
				</device>
				<device id="do44" label="Digital Output D44">
					<require device="di44" />
				</device>
				<device id="do45" label="Digital Output D45">
					<require device="di45" />
				</device>
				<device id="do46" label="Digital Output D46">
					<require device="di46" />
				</device>
				<device id="do47" label="Digital Output D47">
					<require device="di47" />
				</device>
				<device id="do48" label="Digital Output D48">
					<require device="di48" />
				</device>
				<device id="do49" label="Digital Output D49">
					<require device="di49" />
				</device>
				<device id="do50" label="Digital Output D50">
					<require device="di50" />
				</device>
				<device id="do51" label="Digital Output D51">
					<require device="di51" />
				</device>
				<device id="do52" label="Digital Output D52">
					<require device="di52" />
				</device>
				<device id="do53" label="Digital Output D53">
					<require device="di53" />
				</device>
			</category>
			<category name="Analog Inputs">
				<device id="a0" label="Analog Input A0" />
				<device id="a1" label="Analog Input A1" />
				<device id="a2" label="Analog Input A2" />
				<device id="a3" label="Analog Input A3" />
				<device id="a4" label="Analog Input A4" />
				<device id="a5" label="Analog Input A5" />
				<device id="a6" label="Analog Input A6" />
				<device id="a7" label="Analog Input A7" />
				<device id="a8" label="Analog Input A8" />
				<device id="a9" label="Analog Input A9" />
				<device id="a10" label="Analog Input A10" />
				<device id="a11" label="Analog Input A11" />
				<device id="a12" label="Analog Input A12" />
				<device id="a13" label="Analog Input A13" />
				<device id="a14" label="Analog Input A14" />
				<device id="a15" label="Analog Input A15" />
			</category>
			<category name="Pulse Width Modulation (PWM)">
				<device id="pwm2" label="PWM Output on D2">
					<require device="di2" />
					<require device="do2" />
				</device>
				<device id="pwm3" label="PWM Output on D3">
					<require device="di3" />
					<require device="do3" />
				</device>
				<device id="pwm4" label="PWM Output on D4">
					<require device="di4" />
					<require device="do4" />
				</device>
				<device id="pwm5" label="PWM Output on D5">
					<require device="di5" />
					<require device="do5" />
				</device>
				<device id="pwm6" label="PWM Output on D6">
					<require device="di6" />
					<require device="do6" />
				</device>
				<device id="pwm7" label="PWM Output on D7">
					<require device="di7" />
					<require device="do7" />
				</device>
				<device id="pwm8" label="PWM Output on D8">
					<require device="di8" />
					<require device="do8" />
				</device>
				<device id="pwm9" label="PWM Output on D9">
					<require device="di9" />
					<require device="do9" />
				</device>
				<device id="pwm10" label="PWM Output on D10">
					<require device="di10" />
					<require device="do10" />
				</device>
				<device id="pwm11" label="PWM Output on D11">
					<require device="di11" />
					<require device="do11" />
				</device>
				<device id="pwm12" label="PWM Output on D12">
					<require device="di12" />
					<require device="do12" />
				</device>
				<device id="pwm13" label="PWM Output on D13">
					<require device="di13" />
					<require device="do13" />
				</device>
				<device id="pwm44" label="PWM Output on D44">
					<require device="di44" />
					<require device="do44" />
				</device>
				<device id="pwm45" label="PWM Output on D45">
					<require device="di45" />
					<require device="do45" />
				</device>
				<device id="pwm46" label="PWM Output on D46">
					<require device="di46" />
					<require device="do46" />
				</device>
			</category>
			<category name="Other Ports">
				<device id="spi0" label="SPI Port">
					<require device="di50" />
					<require device="do50" />
					<require device="di51" />
					<require device="do51" />
					<require device="di52" />
					<require device="do52" />
					<require device="di53" />
					<require device="do53" />
				</device>
				<device id="twi0" label="TWI Port">
					<require device="di20" />
					<require device="do20" />
					<require device="di21" />
					<require device="do21" />
				</device>
				<device id="i2c" label="I²c Port">
					<require device="a4" />
					<require device="a5" />
				</device>
			</category>
		</hardware>
	</package>
</template>

<script>
	import * as comps from '../../default.export.js';
	
	const exp = {
		components: comps
	}
	export default exp;

	import App from '../../../ui-vues/project.vue';
	App.components['arduino.hardware.mega'] = exp;
</script>
