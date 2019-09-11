<template>
	<package id="arduino.wifi" symbol="exlibs/arduino/arduino.png" >
		<category id="Arduino/WiFi">
			<enum id="status" label="Arduino Wifi Status Enum">
				<editor id="select">
					<value id="WL_CONNECTED" />
					<value id="WL_NO_SHIELD" />
					<value id="WL_IDLE_STATUS" />
					<value id="WL_NO_SSID_AVAIL" />
					<value id="WL_SCAN_COMPLETED" />
					<value id="WL_CONNECT_FAILED" />
					<value id="WL_CONNECTION_LOST" />
					<value id="WL_DISCONNECTED" />
				</editor>
			</enum>
			<class id="Connection" label="Arduino WiFi Network Object">
				<method name="begin" title="WiFi.begin()" keywords="arduino wifi connect">
					<entry /><exit />
					<in id="ssid" datatype="core.type.string" />
					<in id="password" datatype="core.type.string" />
					<out id="status" datatype="status" />
				</method>
				<method name="localip" title="WiFi.localIP()" keywords="arduino wifi ip local">
					<out id="localip" datatype="network.type.ip" label="WiFi local IP" />
				</method>
			</class>
			<class id="WiFiClient" label="Arduino WiFi Client Object">
				<method name="connect" title="WiFiClient.connect() (url)" keywords="arduino wifi">
					<entry /><exit />
					<in id="target" datatype="WiFiClient" :flags="4194304" />
					<in id="host" datatype="core.type.string" />
					<in id="port" datatype="core.type.int" />
					<out id="success" datatype="core.type.bool" />
				</method>
				<method name="connectip" title="WiFiClient.connect() (ip)" keywords="arduino wifi connect ip">
					<entry /><exit />
					<in id="target" datatype="WiFiClient" :flags="4194304" />
					<in id="host" datatype="network.type.ip" />
					<in id="port" datatype="core.type.int" />
					<out id="success" datatype="core.type.bool" />
				</method>
				<method name="connected" title="WiFiClient.connected()" keywords="arduino wifi">
					<in id="target" datatype="WiFiClient" :flags="4194304" />
					<out id="connected" datatype="core.type.bool" />
				</method>
				<method name="stop" title="WiFiClient.stop()" keywords="arduino wifi">
					<entry /><exit />
					<out id="target" datatype="WiFiClient" :flags="4194304" />
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
	App.components['arduino.wifi'] = exp;
</script>