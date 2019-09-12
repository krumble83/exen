<template>
	<package id="arduino.sdcard" symbol="exlibs/arduino/arduino.png" >
		<category name="Arduino/SD Card">
			<enum name="openmode" label="Arduino SDCard OpenMode">
				<editor id="select">
					<value name="FILE_READ" />
					<value name="FILE_WRITE" />
				</editor>
			</enum>
			<class name="sdcard" label="Arduino SDCard object" label="Arduino SDCard">
				<method name="begin" title="SD.Begin()" keywords="sd card begin,sd begin">
					<entry /><exit />
					<in name="csPin" datatype="arduino.io.digital.dpin" tooltip="SPI Chip Select Pin" />
				</method>
				<method name="open" title="SD.open()" >
					<entry /><exit />
					<in name="path" datatype="core.type.string" />
					<in name="mode" datatype="openmode" />
					<out name="success" datatype="core.type.bool" />
					<out name="fileObject" datatype="os.file.fileObject" />
				</method>
				<method name="exists" title="SD.exists()" keywords="file exists,dir exists,path exists">
					<in name="path" datatype="core.type.string" />
					<out name="exists" datatype="core.type.bool" />
				</method>
				<method name="mkdir" title="SD.mkdir()" keywords="make directory, directory make">
					<entry /><exit />
					<in name="path" datatype="core.type.string" />
					<out name="success" datatype="core.type.bool" />
				</method>
				<method name="rmdir" title="SD.rmdir()" keywords="remove directory,delete directory,directory remove,directory delete">
					<entry /><exit />
					<in name="path" datatype="core.type.string" />
					<out name="success" datatype="core.type.bool" />
				</method>
				<method name="remove" title="SD.remove()" keywords="remove file,delete file,file remove,file delete">
					<entry /><exit />
					<in name="file" datatype="core.type.string" />
					<out name="success" datatype="core.type.bool" />
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