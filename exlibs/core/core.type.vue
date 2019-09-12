<template>
	<package id="core.type">

		<datatype name="bool" label="Boolean" color="#940000" >
			<editor id="bool" />
		</datatype>
		
		<datatype name="int" label="Integer" color="#1edfab" tooltip="Any non floating number">
			<editor id="input" ctor="input">
				<value id="pattern">/^[+-]?\d+(\.\d+)?$/</value>
				<value id="default">0</value>
			</editor>
		</datatype>
		
		<datatype name="float" label="Float" color="#9FFF44" tooltip="Any floating number">
			<editor id="input" ctor="input">
				<value id="pattern">/^[+-]?\d+$/</value>
				<value id="default">0</value>
			</editor>
		</datatype>
		
		<datatype name="byte" color="#016e64" label="Byte">
			<editor id="input" ctor="input" />
		</datatype>
		
		<datatype name="string" label="String" color="#f0f" tooltip="Any sequence of characters">
			<editor id="input" ctor="input" />
		</datatype>
			
		<structure name="date" label="DateTime Structure">
			<member id="year" datatype="core.type.int" label="Year" />
			<member id="month" datatype="core.type.int" label="Month" />
			<member id="day" datatype="core.type.int" label="Day" />
			<member id="hour" datatype="core.type.int" label="Hour" />
			<member id="minutes" datatype="core.type.int" label="Minute" />
			<member id="seconds" datatype="core.type.int" label="Seconds" />
		</structure>
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
