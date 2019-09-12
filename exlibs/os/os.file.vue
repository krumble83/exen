<template>
	<package id="os.file">
		<category name="Operating System/Files">
			<class name="fileObject" label="File Object" >
				<method name="name" title="File.name()">
					<in name="target" datatype="fileObject" :flags="4194304" />
					<out name="name" datatype="core.type.string" />
				</method>
				<method name="close" title="File.close()">
					<entry /><exit />
					<in name="target" datatype="fileObject" :flags="4194304" />
				</method>
				<method name="position" title="File.position()">
					<in name="target" datatype="fileObject" :flags="4194304" />
					<out name="position" datatype="core.type.int" />
				</method>
				<method name="printstring" title="File.print() (string)">
					<entry /><exit />
					<in name="target" datatype="fileObject" :flags="4194304" />
					<in name="string" datatype="core.type.string" />
					<out name="byte" datatype="core.type.int" tooltip="number of bytes written" />
				</method>
				<method name="seek" title="File.seek()">
					<entry /><exit />
					<in name="target" datatype="fileObject" :flags="4194304" />
					<in name="position" datatype="core.type.int" />
					<out name="success" datatype="core.exec" />
					<out name="fail" datatype="core.exec" />
				</method>
				<method name="size" title="File.size()" keywords="file size">
					<in name="target" datatype="fileObject" :flags="4194304" />
					<out name="size" datatype="core.type.int" />
				</method>
				<method name="isDirectory" title="File.isDirectory()">
					<in name="target" datatype="fileObject" :flags="4194304" />
					<out name="isDirectory" datatype="core.type.bool" />
				</method>
				<method name="openNextFile" title="File.openNextFile()">
					<entry /><exit />
					<in name="target" datatype="fileObject" :flags="4194304" />
					<out name="nextFile" datatype="fileObject" />
				</method>
				<method name="rewindDirectory" title="File.rewindDirectory()">
					<entry /><exit />
					<in name="target" datatype="fileObject" :flags="4194304" />
				</method>
			</class>
			
			<function name="splitPath" title="Split Path">
				<in name="inPath" datatype="core.type.string" />
				<out name="path" datatype="core.type.string" />
				<out name="fileName" datatype="core.type.string" />
				<out name="extension" datatype="core.type.string" />
				<out name="drive" datatype="core.type.string" :optional="true" description="Available only on windows system" />
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
	App.components['os_file'] = exp;
</script>