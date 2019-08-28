<template>
	<package id="core.string">
		<enum datatype="scalar" ctor="Pin" color="#8000FF" inherits="|core.type.enum|core.type.enum|" tooltip="Enum" label="SearchCase Enum" id="core.string.searchcase" values="[&quot;IgnoreCase&quot;,&quot;CaseSentitive&quot;]">
			<editor id="select"></editor>
		</enum>

		<category id="String"></category>
			<function id="makeliteral" title="Make literal (String )" color="#aaeea0" symbol="lib/img/function.png" keywords="make String ">
				<input id="in" datatype="core.type.string"></input>
				<output id="value" datatype="core.type.string" label="String "></output>
			</function>
			<function id="split" title="Split string" color="#aaeea0" symbol="lib/img/function.png" keywords="break,explode">
				<input id="source" datatype="core.type.string"></input>
				<input id="separator" datatype="core.type.string" tooltip="The delimiter string"></input>
				<output id="result" datatype="core.type.string[]"></output>
			</function>
			<function id="join" title="Join strings" color="#aaeea0" symbol="lib/img/function.png" keywords="join,merge,combine">
				<input id="source" datatype="core.type.string[]"></input>
				<input id="separator" datatype="core.type.string" tooltip="The delimiter string"></input>
				<output id="result" datatype="core.type.string"></output>
			</function>
			<function id="replace" title="Replace in strings" color="#aaeea0" symbol="lib/img/function.png" keywords="replace">
				<input id="source" datatype="core.type.string"></input>
				<input id="search" datatype="core.type.string"></input>
				<input id="replace" datatype="core.type.string"></input>
				<input id="usecase" datatype="core.type.bool" label="Case Sensitive"></input>
				<output id="result" datatype="core.type.string"></output>
			</function>
			<function id="contains" title="Contains" color="#aaeea0" symbol="lib/img/function.png">
				<input id="source" datatype="core.type.string"></input>
				<input id="search" datatype="core.type.string"></input>
				<input id="usecase" datatype="core.type.bool" label="Case Sensitive"></input>
				<input id="start" datatype="core.type.int" optional="true" tooltip="Start search from this position."></input>
				<input id="end" datatype="core.type.int" optional="true" tooltip="Stop search at this position."></input>
				<output id="result" datatype="core.type.bool"></output>
			</function>
			<function id="length" title="String Length" color="#aaeea0" symbol="lib/img/function.png" keywords="size,count">
				<input id="string" datatype="core.type.string"></input>
				<output id="length" datatype="core.type.int"></output>
			</function>
			<function id="tolower" title="To Lower" color="#aaeea0" symbol="lib/img/function.png" keywords="lower,tolower">
				<input id="input" datatype="core.type.string"></input>
				<output id="output" datatype="core.type.string"></output>
			</function>
			<function id="toupper" title="To Upper" color="#aaeea0" symbol="lib/img/function.png" keywords="upper,toupper">
				<input id="input" datatype="core.type.string"></input>
				<output id="output" datatype="core.type.string"></output>
			</function>
			<function id="toint" title="To Int" color="#aaeea0" symbol="lib/img/function.png">
				<input id="input" datatype="core.type.string"></input>
				<output id="integer" datatype="core.type.int"></output>
			</function>
			<function id="eq" ctor="NodeOp" color="#555" symbol="lib/core/img/op.eq.png" keywords="==,equal" subtitle="==" title="String == String (equal)">
				<input id="a" datatype="core.type.string"></input>
				<input id="b" datatype="core.type.string"></input>
				<output id="output" datatype="core.type.bool" tooltip="True if a = b"></output>
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