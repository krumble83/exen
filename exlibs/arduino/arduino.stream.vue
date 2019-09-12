<template>
	<package id="arduino.stream" symbol="exlibs/arduino/arduino.png">
		<category name="Arduino/Stream">			
			<enum name="lookAheadMode">
				<value name="SKIP_ALL" />
				<value name="SKIP_NONE" />
				<value name="SKIP_WHITESPACE" />
			</enum>
		
			<class name="stream" label="Arduino Stream Object">
				<method name="available" keywords="available">					
					<out name="bytes" datatype="core.type.int" />
				</method>
				<method name="read">
					<entry /><exit />
					<out name="byte" datatype="core.type.int" />
				</method>
				<method name="flush">
					<entry /><exit />
				</method>
				<method name="find">
					<entry /><exit />
					<in name="query" datatype="core.type.string" />
					<out name="found" datatype="core.type.bool" />
				</method>
				<method name="findUntil">
					<entry /><exit />
					<in name="query" datatype="core.type.string" />
					<in name="terminator" datatype="core.type.string" />
					<out name="found" datatype="core.type.bool" />
				</method>
				<method name="peek">
					<entry /><exit />
					<out name="byte" datatype="core.type.int" />
				</method>
				<method name="readBytes">
					<entry /><exit />
					<in name="buffer" datatype="core.type.byte[]" />
					<in name="length" datatype="core.type.int" />
					<out name="bytesRead" datatype="core.type.int" />
				</method>
				<method name="readBytesUntil">
					<entry /><exit />
					<in name="terminator" datatype="core.type.string" />
					<in name="buffer" datatype="core.type.byte[]" />
					<in name="length" datatype="core.type.int" />
					<out name="bytesRead" datatype="core.type.int" />
				</method>
				<method name="readString">
					<entry /><exit />
					<out name="string" datatype="core.type.string" />
				</method>
				<method name="readStringUntil">
					<entry /><exit />
					<in name="terminator" datatype="core.type.string" />
					<out name="string" datatype="core.type.string" />
				</method>
				<method name="parseInt">
					<entry /><exit />
					<in name="lookahead" datatype="lookAheadMode" :optional="true" />
					<in name="ignore" datatype="core.type.string" :optional="true" />
					<out name="int" datatype="core.type.int" />
				</method>
				<method name="parseFloat">
					<entry /><exit />
					<in name="lookahead" datatype="lookAheadMode" :optional="true" />
					<in name="ignore" datatype="core.type.string" :optional="true" />
					<out name="float" datatype="core.type.float" />
				</method>
				<method name="setTimeout">
					<entry /><exit />
					<in name="timeout" datatype="core.type.int" />
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
	App.components['arduino.stream'] = exp;
</script>
