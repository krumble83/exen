<template>
	<package id="core.bool">
		<category name="Boolean">
			<function name="makeliteral" title="Make literal (Boolean )" color="#aaeea0" symbol="exlibs/img/function.png" keywords="make Boolean ">
				<in name="in" datatype="core.type.bool" />
				<out name="value" datatype="core.type.bool" label="Boolean " />
			</function>
			<function name="toint" title="Bool To Integer" color="#555" keywords="bool to int,to int">
				<in name="bool" datatype="core.type.bool" />
				<out name="integer" datatype="core.type.int" tooltip="Value = 0 for False, 1 for True" />
			</function>
			<function name="fromint" title="Bool From Integer" color="#555" keywords="bool from int,from int">
				<in name="integer" datatype="core.type.int" />
				<out name="bool" datatype="core.type.bool" />
			</function>
			<function name="buildstring" title="BuildString (Boolean)" color="#aaeea0" keywords="build string, bool to string, to string, tostring">
				<in name="prefix" datatype="core.type.string" />
				<in name="boolean" datatype="core.type.bool" />
				<in name="suffix" datatype="core.type.string" />
				<out name="out" datatype="core.type.string" label="Return Value" />
			</function>
		</category>
		
		<category name="Boolean/Bitwise Operators">
			<function name="not" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.not.png" keywords="!" subtitle="NOT" title="NOT (Bool)">
				<in name="a" datatype="core.type.bool" label=" " />
				<out name="output" datatype="core.type.bool" />
			</function>
			<function name="and" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.and.png" keywords="&amp;" subtitle="AND" title="AND (Bool)">
				<in name="a" datatype="core.type.bool" label=" " />
				<in name="b" datatype="core.type.bool" label=" " />
				<out name="output" datatype="core.type.bool" />
			</function>
			<function name="nand" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.nand.png" subtitle="NAND" title="NAND (Bool)">
				<in name="a" datatype="core.type.bool" label=" " />
				<in name="b" datatype="core.type.bool" label=" " />
				<out name="output" datatype="core.type.bool" />
			</function>
			<function name="or" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.or.png" keywords="|" subtitle="OR" title="OR (Bool)">
				<in name="a" datatype="core.type.bool" label=" " />
				<in name="b" datatype="core.type.bool" label=" " />
				<out name="output" datatype="core.type.bool" />
			</function>
			<function name="nor" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.nor.png" subtitle="NOR" title="NOR (Bool)">
				<in name="a" datatype="core.type.bool" label=" " />
				<in name="b" datatype="core.type.bool" label=" " />
				<out name="output" datatype="core.type.bool" />
			</function>
			<function name="xor" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.xor.png" subtitle="XOR" title="XOR (Bool)">
				<in name="a" datatype="core.type.bool" label=" " />
				<in name="b" datatype="core.type.bool" label=" " />
				<out name="output" datatype="core.type.bool" />
			</function>
			<function name="xnor" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.xnor.png" subtitle="XNOR" title="XNOR (Bool)">
				<in name="a" datatype="core.type.bool" label=" " />
				<in name="b" datatype="core.type.bool" label=" " />
				<out name="output" datatype="core.type.bool" />
			</function>
		</category>
		
		<category name="Boolean/Comparators">
			<function name="eq" ctor="NodeOp" color="#555" title="Boolean == Boolean (equal)" symbol="exlibs/core/img/op.eq.png" keywords="==,equal" subtitle="==">
				<in name="a" datatype="core.type.bool" />
				<in name="b" datatype="core.type.bool" />
				<out name="output" datatype="core.type.bool" tooltip="True if a = b" />
			</function>
			<function name="neq" ctor="NodeOp" color="#555" title="Boolean != Boolean (not equal)" symbol="exlibs/core/img/op.neq.png" keywords="!=,<>,not equal,different" subtitle="!=">
				<in name="a" datatype="core.type.bool" />
				<in name="b" datatype="core.type.bool" />
				<out name="output" datatype="core.type.bool" tooltip="True if a != b" />
			</function>
		</category>

		<category name="Utilities/Flow Control">
			<function name="selectBool" title="Select (Bool)" color="#C3C3C3" keywords="select bool" symbol="exlibs/core/img/select.png">
				<in name="a" datatype="core.wildcards" group="1" />
				<in name="b" datatype="core.wildcards" group="1" />
				<in name="pickA" datatype="core.type.bool" />
				<out name="returnValue" datatype="core.wildcards" group="1" />
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
	App.components['libCoreTypeBool'] = exp;
</script>