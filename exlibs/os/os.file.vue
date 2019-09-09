<template>
	<package id="os.file">
		<category id="Operating System/Files">
			<class id="fileObject" label="File Object" color="#55f" inherits="core.object">
				<method id="name" title="File.name()" color="#aaeea0" symbol="exlibs/img/function.png">
					<in id="target" datatype="fileObject" :flags="4194304" />
					<out id="name" datatype="core.type.string" />
				</method>
				<method id="close" title="File.close()">
					<entry /><exit />
					<in id="target" datatype="fileObject" :flags="4194304" />
				</method>
				<method id="position" title="File.position()" color="#aaeea0" symbol="exlibs/img/function.png">
					<in id="target" datatype="fileObject" :flags="4194304" />
					<out id="position" datatype="core.type.int" />
				</method>
				<method id="printstring" title="File.print() (string)">
					<entry /><exit />
					<in id="target" datatype="fileObject" :flags="4194304" />
					<in id="string" datatype="core.type.string" />
					<out id="byte" datatype="core.type.int" tooltip="number of bytes written" />
				</method>
				<method id="seek" title="File.seek()">
					<entry /><exit />
					<in id="target" datatype="fileObject" :flags="4194304" />
					<in id="position" datatype="core.type.int" />
					<out id="success" datatype="core.exec" />
					<out id="fail" datatype="core.exec" />
				</method>
				<method id="size" title="File.size()" color="#aaeea0" symbol="exlibs/img/function.png" keywords="file size,size file">
					<in id="target" datatype="fileObject" :flags="4194304" />
					<out id="size" datatype="core.type.int" />
				</method>
				<method id="isDirectory" title="File.isDirectory()" color="#aaeea0" symbol="exlibs/img/function.png">
					<in id="target" datatype="fileObject" :flags="4194304" />
					<out id="isDirectory" datatype="core.type.bool" />
				</method>
				<method id="openNextFile" title="File.openNextFile()">
					<entry /><exit />
					<in id="target" datatype="fileObject" :flags="4194304" />
					<out id="nextFile" datatype="fileObject" />
				</method>
				<method id="rewindDirectory" title="File.rewindDirectory()">
					<entry /><exit />
					<in id="target" datatype="fileObject" :flags="4194304" />
				</method>
			</class>
			
			<function id="splitPath" title="Split Path" color="#aaeea0" symbol="exlibs/img/function.png">
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