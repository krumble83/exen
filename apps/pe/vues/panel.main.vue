<template>
	<div style="padding: 20px">
		<form>
			<fieldset>
				<legend>Clients</legend>
				<input type="button" value="Mailing" @click="startMailing" /><br /><br />
				<input type="button" value="Consultation" @click="openCustomers" />
			</fieldset>
		</form>
	</div>
	
</template>

<script>

	import './panel.customers.vue';

	const exp = {
		components: {},
		inject: ['App'],
		
		data: function(){
			return {
			}
		},
				
		mounted: function(){
		},
		
		methods: {
			startMailing: function(){
				this.App.addTab({name: 'Mailing', panelCtor: 'MailingPanel', closable: true, selected: true}, function(tab){
					console.log(tab);
				});
			},
			
			openCustomers: function(){
				const c = this.App.Tabs.get('Clients');
				if(c){
					c.select();
					return;
				}
				this.App.addTab({name: 'Clients', panelCtor: 'CustomersPanel', closable: true, selected: true}, function(tab){
					//console.log(tab);
				});
			}
		},
	}
	
	import Tab from './tabs.tab.vue';
	Tab.components['MainPanel'] = exp;

	export default exp;
	
</script>

<style>

	.uid, 
	.date,
	.auteur {
		width: 80px;
		border-radius: 15px;
		padding-left: 5px;
	}

	.uid {
		width: 100px;
	}

	.auteur {
		width: 130px;
	}

	.adresse {
		height: 75px;
		width: 210px;
	}


	table th td {
		border: 1px solid;
		padding: 1px 5px 1px 5px;
	}
	
</style>
