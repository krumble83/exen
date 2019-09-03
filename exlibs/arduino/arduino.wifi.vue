<template>
	<package id="arduino.wifi">
		<category id="Arduino/WiFi">
			<enum id="status" color="#8000FF" inherits="core.type.enum" label="Arduino Wifi Status Enum">
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
			<class id="Connection" label="Arduino WiFi Network Object" color="#55f" inherits="core.object">
				<method id="begin" title="WiFi.begin()" color="#87663f" symbol="lib/img/esp8266.png" keywords="wifi connect,connect wifi">
					<entry /><exit />
					<in id="ssid" datatype="core.type.string" />
					<in id="password" datatype="core.type.string" />
					<out id="status" datatype="status" />
				</method>
				<method id="localip" title="WiFi.localIP()" color="#87663f" symbol="lib/img/esp8266.png" keywords="wifi ip,ip wifi,local ip">
					<out id="localip" datatype="network.type.ip" label="WiFi local IP" />
				</method>
			</class>
			<class id="WiFiClient" label="Arduino WiFi Client Object" color="#55f" inherits="core.object">
				<method id="connect" title="WiFiClient.connect() (url)" color="#87663f" symbol="lib/img/esp8266.png" keywords="wifi,connect">
					<entry /><exit />
					<in id="target" datatype="WiFiClient" :flags="4194304" />
					<in id="host" type="core.type.string" />
					<in id="port" type="core.type.int" />
					<out id="success" type="core.type.bool" />
				</method>
				<method id="connectip" title="WiFiClient.connect() (ip)" color="#87663f" symbol="lib/img/esp8266.png" keywords="wifi,connect">
					<entry /><exit />
					<in id="target" datatype="WiFiClient" :flags="4194304" />
					<in id="host" type="network.type.ip" />
					<in id="port" type="core.type.int" />
					<out id="success" type="core.type.bool" />
				</method>
				<method id="connected" title="WiFiClient.connected()" color="#aaeea0" symbol="lib/img/function.png" keywords="wifi,connected">
					<in id="target" datatype="WiFiClient" :flags="4194304" />
					<out id="connected" datatype="core.type.bool" />
				</method>
				<method id="stop" title="WiFiClient.stop()" color="#87663f" symbol="lib/img/esp8266.png" keywords="wifi,stop">
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
	App.components['libArduinoWifi'] = exp;
</script>