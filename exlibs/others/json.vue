<template>
	<package id="json">
		<category id="Json">
			<datatype id="json.jsonobject" label="JSON Object object" datatype="scalar" ctor="Pin" color="#55f" />
			
			<function id="fromstring" title="JSON Parse String" color="#78c8fe" symbol="lib/img/function.png">
				<out id="exit" datatype="core.exec" />
				<in id="entry" datatype="core.exec" />
				<in id="string" datatype="core.type.string" />
				<out id="jsonObject" datatype="json.jsonobject" />
				<out id="success" datatype="core.type.bool" />
			</function>
			<function id="stringify" title="JSON Stringify" color="#78c8fe" symbol="lib/img/function.png">
				<in id="jsonObject" datatype="json.jsonobject" />
				<out id="string" datatype="core.type.string" />
			</function>
			<function id="tojson" title="To JSON Object" color="#78c8fe" symbol="lib/img/function.png">
				<in id="input" datatype="core.wildcards" />
				<out id="output" datatype="json.jsonobject" />
				<out id="success" datatype="core.type.bool" />
			</function>
			<function id="exists" title="JSON Key Exists" color="#78c8fe" symbol="lib/img/function.png">
				<in id="key" datatype="core.type.string" />
				<out id="success" datatype="core.type.bool" />
			</function>
			<function id="getjson" title="JSON Get as JSON" color="#aaeea0" symbol="lib/img/function.png">
				<in id="json" datatype="json.jsonobject" />
				<in id="key" datatype="core.type.string" />
				<out id="jsonObject" datatype="json.jsonobject" />
				<out id="success" datatype="core.type.bool" />
			</function>
			<function id="getarray" title="JSON Get as Array" color="#aaeea0" symbol="lib/img/function.png">
				<in id="json" datatype="json.jsonobject" />
				<in id="key" datatype="core.type.string" />
				<out id="jsonObject" datatype="json.jsonobject[]" />
				<out id="success" datatype="core.type.bool" />
			</function>
			<function id="getstring" title="JSON Get as String" color="#aaeea0" symbol="lib/img/function.png">
				<in id="json" datatype="json.jsonobject" />
				<in id="key" datatype="core.type.string" />
				<out id="string" datatype="core.type.string" />
				<out id="success" datatype="core.type.bool" />
			</function>
			<function id="getint" title="JSON Get as Integer" color="#aaeea0" symbol="lib/img/function.png">
				<in id="json" datatype="json.jsonobject" />
				<in id="key" datatype="core.type.string" />
				<out id="int" datatype="core.type.int" />
				<out id="success" datatype="core.type.bool" />
			</function>
			<function id="getfloat" title="JSON Get as Float" color="#aaeea0" symbol="lib/img/function.png">
				<in id="json" datatype="json.jsonobject" />
				<in id="key" datatype="core.type.string" />
				<out id="float" datatype="core.type.float" />
			</function>
			<function id="getbool" title="JSON Get as Bool" color="#aaeea0" symbol="lib/img/function.png">
				<in id="json" datatype="json.jsonobject" />
				<in id="key" datatype="core.type.string" />
				<out id="bool" datatype="core.type.bool" />
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
	App.components['libJson'] = exp;
</script>