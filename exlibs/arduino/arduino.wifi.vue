<template>
	<package id="arduino.wifi" symbol="exlibs/arduino/arduino.png" >
		<category name="Arduino/WiFi">
			<enum name="status" label="Arduino Wifi Status Enum">
				<editor id="select">
					<value name="WL_CONNECTED" />
					<value name="WL_NO_SHIELD" />
					<value name="WL_IDLE_STATUS" />
					<value name="WL_NO_SSID_AVAIL" />
					<value name="WL_SCAN_COMPLETED" />
					<value name="WL_CONNECT_FAILED" />
					<value name="WL_CONNECTION_LOST" />
					<value name="WL_DISCONNECTED" />
				</editor>
			</enum>
			<class name="Connection" label="Arduino WiFi Network Object">
				<method name="begin" title="WiFi.begin()" keywords="arduino wifi connect">
					<entry /><exit />
					<in name="ssid" datatype="core.type.string" />
					<in name="password" datatype="core.type.string" />
					<out name="status" datatype="status" />
				</method>
				<method name="localip" title="WiFi.localIP()" keywords="arduino wifi ip local">
					<out name="localip" datatype="network.type.ip" label="WiFi local IP" />
				</method>
			</class>
			<class name="WiFiClient" label="Arduino WiFi Client Object">
				<method name="connect" title="WiFiClient.connect() (url)" keywords="arduino wifi">
					<entry /><exit />
					<in name="target" datatype="WiFiClient" :flags="4194304" />
					<in name="host" datatype="core.type.string" />
					<in name="port" datatype="core.type.int" />
					<out name="success" datatype="core.type.bool" />
				</method>
				<method name="connectip" title="WiFiClient.connect() (ip)" keywords="arduino wifi connect ip">
					<entry /><exit />
					<in name="target" datatype="WiFiClient" :flags="4194304" />
					<in name="host" datatype="network.type.ip" />
					<in name="port" datatype="core.type.int" />
					<out name="success" datatype="core.type.bool" />
				</method>
				<method name="connected" title="WiFiClient.connected()" keywords="arduino wifi">
					<in name="target" datatype="WiFiClient" :flags="4194304" />
					<out name="connected" datatype="core.type.bool" />
				</method>
				<method name="stop" title="WiFiClient.stop()" keywords="arduino wifi">
					<entry /><exit />
					<out name="target" datatype="WiFiClient" :flags="4194304" />
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