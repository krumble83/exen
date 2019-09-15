<template>
		<div>
			<ButtonGroup selectionMode="single">
				<LinkButton>Ajouter</LinkButton>
				<LinkButton>Mailing</LinkButton>
			</ButtonGroup>
			<DataGrid :data="data" style="height:100%" selectionMode="single" @keydown="_onKeyDown" idField="uid" @rowClick="_onRowClick" tabindex='-1'>
				<GridColumn field="rs" title="Raison Sociale"></GridColumn>
				<GridColumn field="gsm" title="Tél. Mobile"></GridColumn>
				<GridColumn field="pc" title="Code Postal"></GridColumn>
				<GridColumn field="city" title="Ville"></GridColumn>
			</DataGrid>
		</div>
</template>

<script>


export default {
	inject: ['App'],
		
		props: {
			
		},
		
		data: function(){
			return {
				data: [
					{uid: '0', rs: 'BOURET Didier', gsm: '07 86 38 25 49', pc: '83310', city: 'Cogolin'},
					{uid: '1', rs: 'MARTIN Dominique', gsm: '06 09 78 45 12', pc: '83550', city: 'Gonfaron'}
				]
			}
		},
		rendered: function(){
			this.$el.setAttribute('tabindex', '-1');
		},

		methods: {
			_onKeyDown: function(){
				console.log('ok');
			},
			
			_onRowClick: function(row){
				console.log(row);
				this.$el.setAttribute('tabindex', '-1');
				this.$nextTick(function(){
					//this.$el.querySelector('.datagrid-row.datagrid-row-selected').setAttribute('tabindex', '-1');
				});
			}
		}
}
</script>