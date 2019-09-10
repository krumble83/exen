<template>
	<package id="arduino.sdcard" symbol="exlibs/arduino/arduino.png" >
		<category id="Arduino/SD Card">
			<enum id="openmode" label="Arduino SDCard OpenMode">
				<editor id="select">
					<value id="FILE_READ" />
					<value id="FILE_WRITE" />
				</editor>
			</enum>
			<class id="sdcard" label="Arduino SDCard object" label="Arduino SDCard">
				<method id="begin" title="SD.Begin()" keywords="sd card begin,sd begin">
					<entry /><exit />
					<in id="csPin" datatype="arduino.io.digital.dpin" tooltip="SPI Chip Select Pin" />
				</method>
				<method id="open" title="SD.open()" >
					<entry /><exit />
					<in id="path" datatype="core.type.string" />
					<in id="mode" datatype="openmode" />
					<out id="success" datatype="core.type.bool" />
					<out id="fileObject" datatype="os.file.fileObject" />
				</method>
				<method id="exists" title="SD.exists()" keywords="file exists,dir exists,path exists">
					<in id="path" datatype="core.type.string" />
					<out id="exists" datatype="core.type.bool" />
				</method>
				<method id="mkdir" title="SD.mkdir()" keywords="make directory, directory make">
					<entry /><exit />
					<in id="path" datatype="core.type.string" />
					<out id="success" datatype="core.type.bool" />
				</method>
				<method id="rmdir" title="SD.rmdir()" keywords="remove directory,delete directory,directory remove,directory delete">
					<entry /><exit />
					<in id="path" datatype="core.type.string" />
					<out id="success" datatype="core.type.bool" />
				</method>
				<method id="remove" title="SD.remove()" keywords="remove file,delete file,file remove,file delete">
					<entry /><exit />
					<in id="file" datatype="core.type.string" />
					<out id="success" datatype="core.type.bool" />
				</method>
			</class>
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
	App.components['arduino.sdcard'] = exp;
</script>