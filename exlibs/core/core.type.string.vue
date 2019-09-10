<template>
	<package id="core.string">
		<enum id="searchcase" label="SearchCase Enum">
			<value id="ignorecase">IgnoreCase</value>
			<value id="casesentitive">CaseSentitive</value>
		</enum>

		<category id="String">
			<function id="makeliteral" title="Make literal (String )" color="#aaeea0" symbol="exlibs/img/function.png" keywords="make String ">
				<in id="in" datatype="core.type.string" />
				<out id="value" datatype="core.type.string" label="String " />
			</function>
			<function id="split" title="Split string" color="#aaeea0" symbol="exlibs/img/function.png" keywords="break,explode">
				<in id="source" datatype="core.type.string" />
				<in id="separator" datatype="core.type.string" tooltip="The delimiter string" />
				<out id="result" datatype="core.type.string[]" />
			</function>
			<function id="join" title="Join strings" color="#aaeea0" symbol="exlibs/img/function.png" keywords="join,merge,combine">
				<in id="source" datatype="core.type.string[]" />
				<in id="separator" datatype="core.type.string" tooltip="The delimiter string" />
				<out id="result" datatype="core.type.string" />
			</function>
			<function id="replace" title="Replace in strings" color="#aaeea0" symbol="exlibs/img/function.png" keywords="replace">
				<in id="source" datatype="core.type.string" />
				<in id="search" datatype="core.type.string" />
				<in id="replace" datatype="core.type.string" />
				<in id="usecase" datatype="core.type.bool" label="Case Sensitive" />
				<out id="result" datatype="core.type.string" />
			</function>
			<function id="contains" title="Contains string" color="#aaeea0" symbol="exlibs/img/function.png">
				<in id="source" datatype="core.type.string" />
				<in id="search" datatype="core.type.string" />
				<in id="usecase" datatype="core.type.bool" label="Case Sensitive" />
				<in id="start" datatype="core.type.int" :optional="true" tooltip="Start search from this position." />
				<in id="end" datatype="core.type.int" :optional="true" tooltip="Stop search at this position." />
				<out id="result" datatype="core.type.bool" />
			</function>
			<function id="length" title="String Length" color="#aaeea0" symbol="exlibs/img/function.png" keywords="size,count">
				<in id="string" datatype="core.type.string" />
				<out id="length" datatype="core.type.int" />
			</function>
			<function id="tolower" title="To Lower" color="#aaeea0" symbol="exlibs/img/function.png" keywords="lower,tolower">
				<in id="input" datatype="core.type.string" />
				<out id="output" datatype="core.type.string" />
			</function>
			<function id="toupper" title="To Upper" color="#aaeea0" symbol="exlibs/img/function.png" keywords="upper,toupper">
				<in id="input" datatype="core.type.string" />
				<out id="output" datatype="core.type.string" />
			</function>
			<function id="toint" title="To Int" color="#aaeea0" symbol="exlibs/img/function.png">
				<in id="input" datatype="core.type.string" />
				<out id="integer" datatype="core.type.int" />
			</function>
			<function id="eq" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.eq.png" keywords="==,equal" subtitle="==" title="String == String (equal)">
				<in id="a" datatype="core.type.string" />
				<in id="b" datatype="core.type.string" />
				<out id="output" datatype="core.type.bool" tooltip="True if a = b" />
			</function>
			
			
			<function id='c_str' title="c_str">
				<in id="string" datatype="core.type.string" />
				<out id="out" datatype="core.type.byte[]" />
			
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