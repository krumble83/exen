<template>
	<package id="json">
		<category id="Json">
			<datatype name="json.jsonobject" label="JSON Object object" datatype="scalar" ctor="Pin" color="#55f" />
			
			<function name="fromstring" title="JSON Parse String" color="#78c8fe" symbol="lib/img/function.png">
				<out name="exit" datatype="core.exec" />
				<in name="entry" datatype="core.exec" />
				<in name="string" datatype="core.type.string" />
				<out name="jsonObject" datatype="json.jsonobject" />
				<out name="success" datatype="core.type.bool" />
			</function>
			<function name="stringify" title="JSON Stringify" color="#78c8fe" symbol="lib/img/function.png">
				<in name="jsonObject" datatype="json.jsonobject" />
				<out name="string" datatype="core.type.string" />
			</function>
			<function name="tojson" title="To JSON Object" color="#78c8fe" symbol="lib/img/function.png">
				<in name="input" datatype="core.wildcards" />
				<out name="output" datatype="json.jsonobject" />
				<out name="success" datatype="core.type.bool" />
			</function>
			<function name="exists" title="JSON Key Exists" color="#78c8fe" symbol="lib/img/function.png">
				<in name="key" datatype="core.type.string" />
				<out name="success" datatype="core.type.bool" />
			</function>
			<function name="getjson" title="JSON Get as JSON" color="#aaeea0" symbol="lib/img/function.png">
				<in name="json" datatype="json.jsonobject" />
				<in name="key" datatype="core.type.string" />
				<out name="jsonObject" datatype="json.jsonobject" />
				<out name="success" datatype="core.type.bool" />
			</function>
			<function name="getarray" title="JSON Get as Array" color="#aaeea0" symbol="lib/img/function.png">
				<in name="json" datatype="json.jsonobject" />
				<in name="key" datatype="core.type.string" />
				<out name="jsonObject" datatype="json.jsonobject[]" />
				<out name="success" datatype="core.type.bool" />
			</function>
			<function name="getstring" title="JSON Get as String" color="#aaeea0" symbol="lib/img/function.png">
				<in name="json" datatype="json.jsonobject" />
				<in name="key" datatype="core.type.string" />
				<out name="string" datatype="core.type.string" />
				<out name="success" datatype="core.type.bool" />
			</function>
			<function name="getint" title="JSON Get as Integer" color="#aaeea0" symbol="lib/img/function.png">
				<in name="json" datatype="json.jsonobject" />
				<in name="key" datatype="core.type.string" />
				<out name="int" datatype="core.type.int" />
				<out name="success" datatype="core.type.bool" />
			</function>
			<function name="getfloat" title="JSON Get as Float" color="#aaeea0" symbol="lib/img/function.png">
				<in name="json" datatype="json.jsonobject" />
				<in name="key" datatype="core.type.string" />
				<out name="float" datatype="core.type.float" />
			</function>
			<function name="getbool" title="JSON Get as Bool" color="#aaeea0" symbol="lib/img/function.png">
				<in name="json" datatype="json.jsonobject" />
				<in name="key" datatype="core.type.string" />
				<out name="bool" datatype="core.type.bool" />
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