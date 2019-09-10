<template>
	<package id="arduino.stream" symbol="exlibs/arduino/arduino.png">
		<category id="Arduino/Stream">			
			<enum id="lookAheadMode">
				<value id="SKIP_ALL" />
				<value id="SKIP_NONE" />
				<value id="SKIP_WHITESPACE" />
			</enum>
		
			<class id="stream" label="Arduino Stream Object">
				<method id="available" title="available" keywords="available">					
					<out id="bytes" datatype="core.type.int" />
				</method>
				<method id="read" title="read">
					<entry /><exit />
					<out id="byte" datatype="core.type.int" />
				</method>
				<method id="flush" title="flush">
					<entry /><exit />
				</method>
				<method id="find" title="find">
					<entry /><exit />
					<in id="query" datatype="core.type.string" />
					<out id="found" datatype="core.type.bool" />
				</method>
				<method id="findUntil" title="findUntil">
					<entry /><exit />
					<in id="query" datatype="core.type.string" />
					<in id="terminator" datatype="core.type.string" />
					<out id="found" datatype="core.type.bool" />
				</method>
				<method id="peek" title="peek">
					<entry /><exit />
					<out id="byte" datatype="core.type.int" />
				</method>
				<method id="readBytes" title="readBytes">
					<entry /><exit />
					<in id="buffer" datatype="core.type.byte[]" />
					<in id="length" datatype="core.type.int" />
					<out id="bytesRead" datatype="core.type.int" />
				</method>
				<method id="readBytesUntil" title="readBytesUntil">
					<entry /><exit />
					<in id="terminator" datatype="core.type.string" />
					<in id="buffer" datatype="core.type.byte[]" />
					<in id="length" datatype="core.type.int" />
					<out id="bytesRead" datatype="core.type.int" />
				</method>
				<method id="readString" title="readString">
					<entry /><exit />
					<out id="string" datatype="core.type.string" />
				</method>
				<method id="readStringUntil" title="readStringUntil">
					<entry /><exit />
					<in id="terminator" datatype="core.type.string" />
					<out id="string" datatype="core.type.string" />
				</method>
				<method id="parseInt" title="parseInt">
					<entry /><exit />
					<in id="lookahead" datatype="lookAheadMode" :optional="true" />
					<in id="ignore" datatype="core.type.string" :optional="true" />
					<out id="int" datatype="core.type.int" />
				</method>
				<method id="parseFloat" title="parseFloat">
					<entry /><exit />
					<in id="lookahead" datatype="lookAheadMode" :optional="true" />
					<in id="ignore" datatype="core.type.string" :optional="true" />
					<out id="float" datatype="core.type.float" />
				</method>
				<method id="setTimeout" title="setTimeout">
					<entry /><exit />
					<in id="timeout" datatype="core.type.int" />
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
