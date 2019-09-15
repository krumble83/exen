<template>
		<div>
			<p><LinkButton @click="_onMailingClick">Mailing</LinkButton></p>
			<p><LinkButton @click="_onCustumerClick">Clients</LinkButton></p>
		</div>
</template>

<script>


export default {
	inject: ['App'],
	methods: {
		_onMailingClick: function(){
			const me = this;
			this.App.addTab({title: 'Mailing', closable: true, selected: true}, function(tab){
				me.App.selectTab(tab);
			});
			
			console.log('ok');
		},
		
		_onCustumerClick: function(){
			const me = this;
			this.App.addTab({title: 'Clients', closable: true, selected: true, panelCtor: 'CustomersPanel'}, function(tab){
				me.App.selectTab(tab);
			});			
		}
	}
}
</script>