<template>
	<package id="core.string">
		<category name="String">
			<function name="makeliteral" title="Make literal (String )" color="#aaeea0" symbol="exlibs/img/function.png" keywords="make String ">
				<in name="in" datatype="core.type.string" />
				<out name="value" datatype="core.type.string" label="String " />
			</function>
			<function name="split" title="Split string" color="#aaeea0" symbol="exlibs/img/function.png" keywords="break,explode">
				<in name="source" datatype="core.type.string" />
				<in name="separator" datatype="core.type.string" tooltip="The delimiter string" />
				<out name="result" datatype="core.type.string[]" />
			</function>
			<function name="join" title="Join strings" color="#aaeea0" symbol="exlibs/img/function.png" keywords="join,merge,combine">
				<in name="source" datatype="core.type.string[]" />
				<in name="separator" datatype="core.type.string" tooltip="The delimiter string" />
				<out name="result" datatype="core.type.string" />
			</function>
			<function name="replace" title="Replace in strings" color="#aaeea0" symbol="exlibs/img/function.png" keywords="replace">
				<in name="source" datatype="core.type.string" />
				<in name="search" datatype="core.type.string" />
				<in name="replace" datatype="core.type.string" />
				<in name="usecase" datatype="core.type.bool" label="Case Sensitive" />
				<out name="result" datatype="core.type.string" />
			</function>
			<function name="contains" title="Contains string" color="#aaeea0" symbol="exlibs/img/function.png">
				<in name="source" datatype="core.type.string" />
				<in name="search" datatype="core.type.string" />
				<in name="usecase" datatype="core.type.bool" label="Case Sensitive" />
				<in name="start" datatype="core.type.int" :optional="true" tooltip="Start search from this position." />
				<in name="end" datatype="core.type.int" :optional="true" tooltip="Stop search at this position." />
				<out name="result" datatype="core.type.bool" />
			</function>
			<function name="length" title="String Length" color="#aaeea0" symbol="exlibs/img/function.png" keywords="size,count">
				<in name="string" datatype="core.type.string" />
				<out name="length" datatype="core.type.int" />
			</function>
			<function name="tolower" title="To Lower" color="#aaeea0" symbol="exlibs/img/function.png" keywords="lower,tolower">
				<in name="input" datatype="core.type.string" />
				<out name="output" datatype="core.type.string" />
			</function>
			<function name="toupper" title="To Upper" color="#aaeea0" symbol="exlibs/img/function.png" keywords="upper,toupper">
				<in name="input" datatype="core.type.string" />
				<out name="output" datatype="core.type.string" />
			</function>
			<function name="toint" title="To Int" color="#aaeea0" symbol="exlibs/img/function.png">
				<in name="input" datatype="core.type.string" />
				<out name="integer" datatype="core.type.int" />
			</function>
			<function name="eq" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.eq.png" keywords="==,equal" subtitle="==" title="String == String (equal)">
				<in name="a" datatype="core.type.string" />
				<in name="b" datatype="core.type.string" />
				<out name="output" datatype="core.type.bool" tooltip="True if a = b" />
			</function>
			
			
			<function name='c_str' title="c_str">
				<in name="string" datatype="core.type.string" />
				<out name="out" datatype="core.type.byte[]" />
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
	App.components['libCoreTypeString'] = exp;
</script>