<template>
	<package id="core.type">
		<datatype id="scalar" color="#000" :private="true" />
		<structure id="core.type.struct" ctor="PinStructure" color="#0057c8" :inherits="['core.type.struct']" label="Structure" :private="true" />

		<datatype id="int" label="Integer " color="#1edfab" tooltip="Any non floating number" :inherits="['core.type.scalar']">
			<editor id="input" ctor="input">
				<value id="pattern">/^[+-]?\d+(\.\d+)?$/</value>
				<value id="default">0</value>
			</editor>
		</datatype>
		<datatype id="float" label="Float" color="#9FFF44" tooltip="Any floating number" :inherits="['core.type.scalar']">
			<editor id="input" ctor="input">
				<value id="pattern">/^[+-]?\d+$/</value>
				<value id="default">0</value>
			</editor>
		</datatype>
		<datatype id="bool" label="Boolean" color="#940000" tooltip="True or False" :inherits="['core.type.scalar']">
			<editor id="bool" />
		</datatype>
		<datatype id="string" label="String" color="#f0f" tooltip="Any sequence of characters" :inherits="['core.type.scalar']">
			<editor id="input" ctor="input" />
		</datatype>
		<datatype id="core.type.byte" color="#016e64" label="Byte">
			<editor id="input" ctor="input" />
		</datatype>
		
		
		<structure id="core.type.date" label="DateTime Structure" ctor="PinStructure" color="#0057c8" :inherits="['core.type.struct']">
			<member id="year" datatype="core.type.int" label="Year" />
			<member id="month" datatype="core.type.int" label="Month" />
			<member id="day" datatype="core.type.int" label="Day" />
			<member id="hour" datatype="core.type.int" label="Hour" />
			<member id="minutes" datatype="core.type.int" label="Minute" />
			<member id="seconds" datatype="core.type.int" label="Seconds" />
		</structure>


		<enum id="enum" color="#8000FF">
			<editor id="select" />
		</enum>
		<category id="Utilities/Enum">
			<function id="intToEnum" title="Int To Enum" color="#aaeea0" symbol="exlibs/img/function.png">
				<in id="int" datatype="core.type.int" />
				<out id="value" datatype="core.type.enum" />
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
	App.components['libCoreDatatype'] = exp;
	
</script>
