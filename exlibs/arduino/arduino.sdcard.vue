<template>
	<package id="arduino.sdcard">
		<category id="Arduino/SD Card">
			<enum id="openmode" color="#8000FF" :inherits="['core.type.enum']" tooltip="Enum" label="OpenMode">
				<editor id="select">
					<value id="FILE_READ" />
					<value id="FILE_WRITE" />
				</editor>
			</enum>
			<class id="sdcard" label="Arduino SD Card object" color="#55f" :inherits="['core.object']">
				<method id="begin" title="SD.Begin()" color="#87663f" symbol="exlibs/img/arduino.png" keywords="sd card begin,sd begin">
					<entry /><exit />
					<in id="csPin" datatype="arduino.io.digital.dpin" tooltip="SPI Chip Select Pin" />
				</method>
				<method id="open" title="SD.open()" color="#87663f" symbol="exlibs/img/arduino.png">
					<entry />
					<in id="path" datatype="core.type.string" />
					<in id="mode" datatype="openmode" />
					<in id="success" datatype="core.exec" />
					<in id="fail" datatype="core.exec" />
					<in id="fileObject" datatype="os.file.fileObject" />
				</method>
				<method id="exists" title="SD.exists()" color="#aaeea0" symbol="exlibs/img/function.png" keywords="file exists,dir exists,path exists">
					<in id="path" datatype="core.type.string" />
					<in id="exists" datatype="core.type.bool" />
				</method>
				<method id="mkdir" title="SD.mkdir()" color="#87663f" symbol="exlibs/img/arduino.png" keywords="make directory, directory make">
					<entry />
					<in id="path" datatype="core.type.string" />
					<in id="success" datatype="core.exec" />
					<in id="fail" datatype="core.exec" />
				</method>
				<method id="rmdir" title="SD.rmdir()" color="#87663f" symbol="exlibs/img/arduino.png" keywords="remove directory,delete directory,directory remove,directory delete">
					<entry /><exit />
					<in id="path" datatype="core.type.string" />
					<in id="success" datatype="core.exec" />
					<in id="fail" datatype="core.exec" />
				</method>
				<method id="remove" title="SD.remove()" color="#87663f" symbol="exlibs/img/arduino.png" keywords="remove file,delete file,file remove,file delete">
					<entry /><exit />
					<in id="file" datatype="core.type.string" />
					<in id="success" datatype="core.exec" />
					<in id="fail" datatype="core.exec" />
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
	App.components['libArduinoSdcard'] = exp;
</script>