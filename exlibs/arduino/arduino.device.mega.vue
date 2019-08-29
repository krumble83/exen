<template>
	<package id="arduino.device">
		<device id="arduino.device.mega.beginer" label="Arduino Mega Board (Beginer)" category="Arduino">
			<provide platform="arduino" />
			<provide platform="arduino.mega" />
			
			<provide type="core.type.int" />
			<provide type="core.type.string" />
			
			<provide library="arduino.base" />
			<provide library="arduino.sdcard" />
			
			<category id="Serial Ports">
				<provide component="arduino.serial.port" />
				<component id="serial" label="Serial Port">
					<require component="di0" />
					<require component="di1" />
					<require component="do0" />
					<require component="do1" />
				</component>
				<component id="serial1" label="Serial Port 1">
					<require component="di19" />
					<require component="do19" />
					<require component="di18" />
					<require component="do18" />
				</component>
				<component id="serial2" label="Serial Port 2">
					<require component="di16" />
					<require component="di17" />
					<require component="do16" />
					<require component="do17" />
				</component>
				<component id="serial3" label="Serial Port 3">
					<require component="di14" />
					<require component="di15" />
					<require component="do14" />
					<require component="do15" />
				</component>
			</category>
			<category id="Digital Inputs">
				<provide component="arduino.io.dpin" />
				<component id="di0" label="Digital Input D0">
					<require component="do0" />
					<provide component="arduino.io.dpin" />
				</component>
				<component id="di1" label="Digital Input D1">
					<require component="do1" />
				</component>
				<component id="di2" label="Digital Input D2">
					<require component="do2" />
				</component>
				<component id="di3" label="Digital Input D3">
					<require component="do3" />
				</component>
				<component id="di4" label="Digital Input D4">
					<require component="do4" />
				</component>
				<component id="di5" label="Digital Input D5">
					<require component="do5" />
				</component>
				<component id="di6" label="Digital Input D6">
					<require component="do6" />
				</component>
				<component id="di7" label="Digital Input D7">
					<require component="do7" />
				</component>
				<component id="di8" label="Digital Input D8">
					<require component="do8" />
				</component>
				<component id="di9" label="Digital Input D9">
					<require component="do9" />
				</component>
				<component id="di10" label="Digital Input D10">
					<require component="do10" />
				</component>
				<component id="di11" label="Digital Input D11">
					<require component="do11" />
				</component>
				<component id="di12" label="Digital Input D12">
					<require component="do12" />
				</component>
				<component id="di13" label="Digital Input D13">
					<require component="do13" />
				</component>
				<component id="di14" label="Digital Input D14">
					<require component="do14" />
				</component>
				<component id="di15" label="Digital Input D15">
					<require component="do15" />
				</component>
				<component id="di16" label="Digital Input D16">
					<require component="do16" />
				</component>
				<component id="di17" label="Digital Input D17">
					<require component="do17" />
				</component>
				<component id="di18" label="Digital Input D18">
					<require component="do18" />
				</component>
				<component id="di19" label="Digital Input D19">
					<require component="do19" />
				</component>
				<component id="di20" label="Digital Input D20">
					<require component="do20" />
				</component>
				<component id="di21" label="Digital Input D21">
					<require component="do21" />
				</component>
				<component id="di22" label="Digital Input D22">
					<require component="do22" />
				</component>
				<component id="di23" label="Digital Input D23">
					<require component="do23" />
				</component>
				<component id="di24" label="Digital Input D24">
					<require component="do24" />
				</component>
				<component id="di25" label="Digital Input D25">
					<require component="do25" />
				</component>
				<component id="di26" label="Digital Input D26">
					<require component="do26" />
				</component>
				<component id="di27" label="Digital Input D27">
					<require component="do27" />
				</component>
				<component id="di28" label="Digital Input D28">
					<require component="do28" />
				</component>
				<component id="di29" label="Digital Input D29">
					<require component="do29" />
				</component>
				<component id="di30" label="Digital Input D30">
					<require component="do30" />
				</component>
				<component id="di31" label="Digital Input D31">
					<require component="do31" />
				</component>
				<component id="di32" label="Digital Input D32">
					<require component="do32" />
				</component>
				<component id="di33" label="Digital Input D33">
					<require component="do33" />
				</component>
				<component id="di34" label="Digital Input D34">
					<require component="do34" />
				</component>
				<component id="di35" label="Digital Input D35">
					<require component="do35" />
				</component>
				<component id="di36" label="Digital Input D36">
					<require component="do36" />
				</component>
				<component id="di37" label="Digital Input D37">
					<require component="do37" />
				</component>
				<component id="di38" label="Digital Input D38">
					<require component="do38" />
				</component>
				<component id="di39" label="Digital Input D39">
					<require component="do39" />
				</component>
				<component id="di40" label="Digital Input D40">
					<require component="do40" />
				</component>
				<component id="di41" label="Digital Input D41">
					<require component="do41" />
				</component>
				<component id="di42" label="Digital Input D42">
					<require component="do42" />
				</component>
				<component id="di43" label="Digital Input D43">
					<require component="do43" />
				</component>
				<component id="di44" label="Digital Input D44">
					<require component="do44" />
				</component>
				<component id="di45" label="Digital Input D45">
					<require component="do45" />
				</component>
				<component id="di46" label="Digital Input D46">
					<require component="do46" />
				</component>
				<component id="di47" label="Digital Input D47">
					<require component="do47" />
				</component>
				<component id="di48" label="Digital Input D48">
					<require component="do48" />
				</component>
				<component id="di49" label="Digital Input D49">
					<require component="do49" />
				</component>
				<component id="di50" label="Digital Input D50">
					<require component="do50" />
				</component>
				<component id="di51" label="Digital Input D51">
					<require component="do51" />
				</component>
				<component id="di52" label="Digital Input D52">
					<require component="do52" />
				</component>
				<component id="di53" label="Digital Input D53">
					<require component="do53" />
				</component>
			</category>
			<category id="Digital Outputs">
				<provide component="arduino.io.dpin" />
				<component id="do0" label="Digital Output D0">
					<require component="di0" />
				</component>
				<component id="do1" label="Digital Output D1">
					<require component="di1" />
				</component>
				<component id="do2" label="Digital Output D2">
					<require component="di2" />
				</component>
				<component id="do3" label="Digital Output D3">
					<require component="di3" />
				</component>
				<component id="do4" label="Digital Output D4">
					<require component="di4" />
				</component>
				<component id="do5" label="Digital Output D5">
					<require component="di5" />
				</component>
				<component id="do6" label="Digital Output D6">
					<require component="di6" />
				</component>
				<component id="do7" label="Digital Output D7">
					<require component="di7" />
				</component>
				<component id="do8" label="Digital Output D8">
					<require component="di8" />
				</component>
				<component id="do9" label="Digital Output D9">
					<require component="di9" />
				</component>
				<component id="do10" label="Digital Output D10">
					<require component="di10" />
				</component>
				<component id="do11" label="Digital Output D11">
					<require component="di11" />
				</component>
				<component id="do12" label="Digital Output D12">
					<require component="di12" />
				</component>
				<component id="do13" label="Digital Output D13">
					<require component="di13" />
				</component>
				<component id="do14" label="Digital Output D14">
					<require component="di14" />
				</component>
				<component id="do15" label="Digital Output D15">
					<require component="di15" />
				</component>
				<component id="do16" label="Digital Output D16">
					<require component="di16" />
				</component>
				<component id="do17" label="Digital Output D17">
					<require component="di17" />
				</component>
				<component id="do18" label="Digital Output D18">
					<require component="di18" />
				</component>
				<component id="do19" label="Digital Output D19">
					<require component="di19" />
				</component>
				<component id="do20" label="Digital Output D20">
					<require component="di20" />
				</component>
				<component id="do21" label="Digital Output D21">
					<require component="di21" />
				</component>
				<component id="do22" label="Digital Output D22">
					<require component="di22" />
				</component>
				<component id="do23" label="Digital Output D23">
					<require component="di23" />
				</component>
				<component id="do24" label="Digital Output D24">
					<require component="di24" />
				</component>
				<component id="do25" label="Digital Output D25">
					<require component="di25" />
				</component>
				<component id="do26" label="Digital Output D26">
					<require component="di26" />
				</component>
				<component id="do27" label="Digital Output D27">
					<require component="di27" />
				</component>
				<component id="do28" label="Digital Output D28">
					<require component="di28" />
				</component>
				<component id="do29" label="Digital Output D29">
					<require component="di29" />
				</component>
				<component id="do30" label="Digital Output D30">
					<require component="di30" />
				</component>
				<component id="do31" label="Digital Output D31">
					<require component="di31" />
				</component>
				<component id="do32" label="Digital Output D32">
					<require component="di32" />
				</component>
				<component id="do33" label="Digital Output D33">
					<require component="di33" />
				</component>
				<component id="do34" label="Digital Output D34">
					<require component="di34" />
				</component>
				<component id="do35" label="Digital Output D35">
					<require component="di35" />
				</component>
				<component id="do36" label="Digital Output D36">
					<require component="di36" />
				</component>
				<component id="do37" label="Digital Output D37">
					<require component="di37" />
				</component>
				<component id="do38" label="Digital Output D38">
					<require component="di38" />
				</component>
				<component id="do39" label="Digital Output D39">
					<require component="di39" />
				</component>
				<component id="do40" label="Digital Output D40">
					<require component="di40" />
				</component>
				<component id="do41" label="Digital Output D41">
					<require component="di41" />
				</component>
				<component id="do42" label="Digital Output D42">
					<require component="di42" />
				</component>
				<component id="do43" label="Digital Output D43">
					<require component="di43" />
				</component>
				<component id="do44" label="Digital Output D44">
					<require component="di44" />
				</component>
				<component id="do45" label="Digital Output D45">
					<require component="di45" />
				</component>
				<component id="do46" label="Digital Output D46">
					<require component="di46" />
				</component>
				<component id="do47" label="Digital Output D47">
					<require component="di47" />
				</component>
				<component id="do48" label="Digital Output D48">
					<require component="di48" />
				</component>
				<component id="do49" label="Digital Output D49">
					<require component="di49" />
				</component>
				<component id="do50" label="Digital Output D50">
					<require component="di50" />
				</component>
				<component id="do51" label="Digital Output D51">
					<require component="di51" />
				</component>
				<component id="do52" label="Digital Output D52">
					<require component="di52" />
				</component>
				<component id="do53" label="Digital Output D53">
					<require component="di53" />
				</component>
			</category>
			<category id="Analog Inputs">
				<provide component="arduino.io.apin" />
				<component id="a0" label="Analog Input A0" />
				<component id="a1" label="Analog Input A1" />
				<component id="a2" label="Analog Input A2" />
				<component id="a3" label="Analog Input A3" />
				<component id="a4" label="Analog Input A4" />
				<component id="a5" label="Analog Input A5" />
				<component id="a6" label="Analog Input A6" />
				<component id="a7" label="Analog Input A7" />
				<component id="a8" label="Analog Input A8" />
				<component id="a9" label="Analog Input A9" />
				<component id="a10" label="Analog Input A10" />
				<component id="a11" label="Analog Input A11" />
				<component id="a12" label="Analog Input A12" />
				<component id="a13" label="Analog Input A13" />
				<component id="a14" label="Analog Input A14" />
				<component id="a15" label="Analog Input A15" />
			</category>
			<category id="Pulse Width Modulation (PWM)">
				<provide component="arduino.io.apin" />
				<component id="pwm2" label="PWM Output on D2">
					<require component="di2" />
					<require component="do2" />
				</component>
				<component id="pwm3" label="PWM Output on D3">
					<require component="di3" />
					<require component="do3" />
				</component>
				<component id="pwm4" label="PWM Output on D4">
					<require component="di4" />
					<require component="do4" />
				</component>
				<component id="pwm5" label="PWM Output on D5">
					<require component="di5" />
					<require component="do5" />
				</component>
				<component id="pwm6" label="PWM Output on D6">
					<require component="di6" />
					<require component="do6" />
				</component>
				<component id="pwm7" label="PWM Output on D7">
					<require component="di7" />
					<require component="do7" />
				</component>
				<component id="pwm8" label="PWM Output on D8">
					<require component="di8" />
					<require component="do8" />
				</component>
				<component id="pwm9" label="PWM Output on D9">
					<require component="di9" />
					<require component="do9" />
				</component>
				<component id="pwm10" label="PWM Output on D10">
					<require component="di10" />
					<require component="do10" />
				</component>
				<component id="pwm11" label="PWM Output on D11">
					<require component="di11" />
					<require component="do11" />
				</component>
				<component id="pwm12" label="PWM Output on D12">
					<require component="di12" />
					<require component="do12" />
				</component>
				<component id="pwm13" label="PWM Output on D13">
					<require component="di13" />
					<require component="do13" />
				</component>
				<component id="pwm44" label="PWM Output on D44">
					<require component="di44" />
					<require component="do44" />
				</component>
				<component id="pwm45" label="PWM Output on D45">
					<require component="di45" />
					<require component="do45" />
				</component>
				<component id="pwm46" label="PWM Output on D46">
					<require component="di46" />
					<require component="do46" />
				</component>
			</category>
			<category id="Other Ports">
				<component id="spi0" label="SPI Port">
					<provide type="arduino.io.spi" />
					<require component="di50" />
					<require component="do50" />
					<require component="di51" />
					<require component="do51" />
					<require component="di52" />
					<require component="do52" />
				</component>
				<component id="twi0" label="TWI Port">
					<provide type="arduino.io.twi" />
					<require component="di20" />
					<require component="do20" />
					<require component="di21" />
					<require component="do21" />
				</component>
				<component id="i2c" label="I²c Port">
					<provide type="arduino.io.i2c" />
					<require component="a4" />
					<require component="a5" />
				</component>
			</category>
		</device>
	</package>
</template>

