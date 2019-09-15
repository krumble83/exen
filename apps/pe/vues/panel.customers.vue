<template>
	<div style="padding: 20px" class="customersList">
		<label for="">Compte : </label><input :v-model="customerUid" @keydown="_onAccountSelect" ref="accountId">
		<Dialog :visible="false" :resizable="true" ref="clientSelect" title="Selection des adresses">
			<Table 
				:childs="cCustommers" 
				:colFilter="function(name){return name != 'uid'}"
				:rowFilter="_filterCustomers"
				@keydown="_onCustomersListKeyDown" 
				indexKey="uid" 
				ref="customersList"
			>
				<th slot="cols" colid="rs">Raison Sociale</th>
				<th slot="cols" colid="gsm">Tél. mobile</th>
				<th slot="cols" colid="postal">CP</th>
				<th slot="cols" colid="city">Ville</th>
			</Table>
		</Dialog>
	</div>	
</template>

<script>

	import {uid} from '../../../cmon-js/utils';

	import Dialog from '../../../vues/dialog.vue';
	import Table from '../../../vues/table.vue';

	const exp = {
		components: {Dialog, Table},
		inject: ['App'],
		
		data: function(){
			return {
				uid: uid(),
				account: String,
				customerUid: false,
				customers: [
					{uid: "0", rs: 'BOURET Didier', mobile: '07 86 38 25 49', cp: '83310', city: 'Cogolin'},
					{uid: "1", rs: 'MARTIN Dominique', mobile: '06 88 14 04 05', cp: '83550', city: 'Gonfaron'},
				],
			}
		},
		
		computed: {
			cCustommers: function(){
				console.log('update');
				return this.customers;
			}
		},
				
		methods: {
			_onCustomersListKeyDown: function(evt, row){
				switch(evt.keyCode){
					case 13: //enter
						console.log('select', row);
						evt.preventDefault();
						break;
				}
			},
			
			_onAccountSelect: function(evt){
				const me = this;
				switch(evt.keyCode){
					case 13: //enter
					case 113: // F2
						this.$refs.clientSelect.show();
						this.$refs.customersList.select(0);
						this.$refs.clientSelect.$once('cancel', function(){
							me.$refs.accountId.focus();
						});
						break;
				}
				this.$forceUpdate();
				
			},
			
			_filterCustomers: function(row){
				return true; //return row.rs.startsWith(this.$refs.accountId.value);
			}

		},
	}

	
	import Tab from './tabs.tab.vue';
	Tab.components['CustomersPanel'] = exp;

	export default exp;
	
</script>

<style>

</style>
