<template>
	<package id="arduino.core" symbol="exlibs/arduino/arduino.png" color="#87663f" >
		<category id="Arduino">
			<function id="freememory" title="freeMemory()" keywords="free memory" tooltip="Get Arduino Free RAM">
				<out id="freemem" datatype="core.type.int" label="Free Memory" />
			</function>
			<function id="delay" title="delay()" subtitle="target is me!!" keywords="delay,pause" tooltip="Pause program for x ms">
				<entry /><exit />
			</function>
			<function id="delaymicroseconds" title="delayMicroseconds()" keywords="delay,pause" tooltip="Pauses the program for the amount of time (in microseconds) specified as parameter. There are a thousand microseconds in a millisecond, and a million microseconds in a second.">
				<entry /><exit />
				<in id="time" datatype="core.type.int" label="Time in ms" tooltip="the number of microseconds to pause (unsigned int)" />
			</function>
			<function id="millis" title="millis()" keywords="millis" tooltip="Pause program for x ms">
				<out id="time" datatype="core.type.int" label="Time in ms" tooltip="Number of milliseconds since the program started (unsigned long)" />
			</function>
			<function id="micros" title="micros()" keywords="micros" tooltip="Returns the number of microseconds since the Arduino board began running the current program. This number will overflow (go back to zero), after approximately 70 minutes.">
				<out id="time" datatype="core.type.int" label="Time in µs" tooltip="Number of microseconds since the program started (unsigned long)" />
			</function>
			<function id="isgraph" title="isGraph()" keywords="is graph" tooltip="Analyse if a char is printable with some content (space is printable but has no content). Returns true if thisChar is printable.">
				<in id="input" datatype="core.type.int" label="Char" />
				<out id="isChar" datatype="core.type.bool" tooltip="Number of milliseconds since the program started (unsigned long)" />
			</function>
			<function id="randomseed" title="randomSeed()" keywords="random seed,seed" tooltip="randomSeed() initializes the pseudo-random number generator, causing it to start at an arbitrary point in its random sequence. This sequence, while very long, and random, is always the same.">
				<entry /><exit />
				<in id="seed" datatype="core.type.int" />
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
	App.components['arduino.core'] = exp;
</script>