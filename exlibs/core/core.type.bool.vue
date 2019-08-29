<template>
	<package id="core.bool">
		<category id="Boolean">
			<function id="makeliteral" title="Make literal (Boolean )" color="#aaeea0" symbol="exlibs/img/function.png" keywords="make Boolean ">
				<in id="in" datatype="core.type.bool" />
				<out id="value" datatype="core.type.bool" label="Boolean " />
			</function>
			<function id="toint" title="Bool To Integer" color="#555" keywords="bool to int,to int">
				<in id="bool" datatype="core.type.bool" />
				<out id="integer" datatype="core.type.int" tooltip="Value = 0 for False, 1 for True" />
			</function>
			<function id="fromint" title="Bool From Integer" color="#555" keywords="bool from int,from int">
				<in id="integer" datatype="core.type.int" />
				<out id="bool" datatype="core.type.bool" />
			</function>
			<function id="buildstring" title="BuildString (Boolean)" color="#aaeea0" keywords="build string, bool to string, to string, tostring">
				<in id="prefix" datatype="core.type.string" />
				<in id="boolean" datatype="core.type.bool" />
				<in id="suffix" datatype="core.type.string" />
				<out id="out" datatype="core.type.string" label="Return Value" />
			</function>
		</category>
		
		<category id="Boolean/Bitwise Operators">
			<function id="not" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.not.png" keywords="not,!" subtitle="NOT" title="Bool NOT Bool">
				<in id="a" datatype="core.type.bool" label=" " />
				<out id="output" datatype="core.type.bool" />
			</function>
			<function id="and" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.and.png" keywords="and,&amp;" subtitle="AND" title="Bool AND Bool">
				<in id="a" datatype="core.type.bool" label=" " />
				<in id="b" datatype="core.type.bool" label=" " />
				<out id="output" datatype="core.type.bool" />
			</function>
			<function id="nand" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.nand.png" keywords="nand" subtitle="NAND" title="Bool NAND Bool">
				<in id="a" datatype="core.type.bool" label=" " />
				<in id="b" datatype="core.type.bool" label=" " />
				<out id="output" datatype="core.type.bool" />
			</function>
			<function id="or" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.or.png" keywords="or,|" subtitle="OR" title="Bool OR Bool">
				<in id="a" datatype="core.type.bool" label=" " />
				<in id="b" datatype="core.type.bool" label=" " />
				<out id="output" datatype="core.type.bool" />
			</function>
			<function id="nor" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.nor.png" subtitle="NOR" title="Bool NOR Bool">
				<in id="a" datatype="core.type.bool" label=" " />
				<in id="b" datatype="core.type.bool" label=" " />
				<out id="output" datatype="core.type.bool" />
			</function>
			<function id="xor" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.xor.png" subtitle="XOR" title="Bool XOR Bool">
				<in id="a" datatype="core.type.bool" label=" " />
				<in id="b" datatype="core.type.bool" label=" " />
				<out id="output" datatype="core.type.bool" />
			</function>
			<function id="xnor" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.xnor.png" subtitle="XNOR" title="Bool XNOR Bool">
				<in id="a" datatype="core.type.bool" label=" " />
				<in id="b" datatype="core.type.bool" label=" " />
				<out id="output" datatype="core.type.bool" />
			</function>
		</category>
		
		<category id="Boolean/Comparators">
			<function id="eq" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.eq.png" keywords="==,equal" subtitle="==" title="Boolean == Boolean (equal)">
				<in id="a" datatype="core.type.bool" />
				<in id="b" datatype="core.type.bool" />
				<out id="output" datatype="core.type.bool" tooltip="True if a = b" />
			</function>
			<function id="neq" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.neq.png" keywords="!=,<>,not equal,different" subtitle="!=" title="Boolean != Boolean (not equal)">
				<in id="a" datatype="core.type.bool" />
				<in id="b" datatype="core.type.bool" />
				<out id="output" datatype="core.type.bool" tooltip="True if a != b" />
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