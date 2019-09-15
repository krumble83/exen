<template>
	<div style="margin:20px;height:100%" class="mailing">
		<form style="height:100%">
			<fieldset style="height:100%">
				<legend>Mailing</legend>	
				<label :for="uid + '_client'">Clients : </label><br />
				<Chips :childs="customers" label="rs" /><br />			
				<label :for="uid + '_object'">Objet : </label><input :id="uid + '_object'">
			</fieldset>
		</form>
		<Dialog :visible="true" :resizable="true" ref="clientSelect" title="Selection des adresses">
			<input slot="buttons" type="button" value="Ok" @click="_onDoCustumers" />
			<input slot="buttons" type="button" value="cancel" @click="_onCloseCustumers" />		
		</Dialog>
	</div>	
</template>

<script>

	import {uid} from '../../../cmon-js/utils';

	import Dialog from '../../../vues/dialog.vue';
	import Chips from '../../../vues/chips.vue';

	const exp = {
		components: {Dialog, Chips},
		inject: ['App'],
		
		data: function(){
			return {
				uid: uid(),
				customers: [
					{rs: 'BOURET Didier'}
				],
			}
		},
				
		mounted: function(){
		},
		
		methods: {
			_onCloseCustumers: function(){
				this.$refs.clientSelect.close();
			},
			
			_onDoCustumers: function(){
				
			}
		},
	}

	
	import Tab from './tabs.tab.vue';
	Tab.components['MailingPanel'] = exp;

	export default exp;
	
</script>

<style>

</style>
