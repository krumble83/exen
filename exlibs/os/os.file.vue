<template>
	<package id="os.file">
		<category id="Operating System/Files">
			<class id="fileObject" label="File Object" >
				<method name="name" title="File.name()">
					<in id="target" datatype="fileObject" :flags="4194304" />
					<out id="name" datatype="core.type.string" />
				</method>
				<method name="close" title="File.close()">
					<entry /><exit />
					<in id="target" datatype="fileObject" :flags="4194304" />
				</method>
				<method name="position" title="File.position()">
					<in id="target" datatype="fileObject" :flags="4194304" />
					<out id="position" datatype="core.type.int" />
				</method>
				<method name="printstring" title="File.print() (string)">
					<entry /><exit />
					<in id="target" datatype="fileObject" :flags="4194304" />
					<in id="string" datatype="core.type.string" />
					<out id="byte" datatype="core.type.int" tooltip="number of bytes written" />
				</method>
				<method name="seek" title="File.seek()">
					<entry /><exit />
					<in id="target" datatype="fileObject" :flags="4194304" />
					<in id="position" datatype="core.type.int" />
					<out id="success" datatype="core.exec" />
					<out id="fail" datatype="core.exec" />
				</method>
				<method name="size" title="File.size()" keywords="file size">
					<in id="target" datatype="fileObject" :flags="4194304" />
					<out id="size" datatype="core.type.int" />
				</method>
				<method name="isDirectory" title="File.isDirectory()">
					<in id="target" datatype="fileObject" :flags="4194304" />
					<out id="isDirectory" datatype="core.type.bool" />
				</method>
				<method name="openNextFile" title="File.openNextFile()">
					<entry /><exit />
					<in id="target" datatype="fileObject" :flags="4194304" />
					<out id="nextFile" datatype="fileObject" />
				</method>
				<method name="rewindDirectory" title="File.rewindDirectory()">
					<entry /><exit />
					<in id="target" datatype="fileObject" :flags="4194304" />
				</method>
			</class>
			
			<function name="splitPath" title="Split Path">
				<in id="inPath" datatype="core.type.string" />
				<out id="path" datatype="core.type.string" />
				<out id="fileName" datatype="core.type.string" />
				<out id="extension" datatype="core.type.string" />
				<out id="drive" datatype="core.type.string" :optional="true" description="Available only on windows system" />
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