<template>
	<form style="padding:15px;color:#fff;height:100%" class="quotation form">
		<table>
			<tr>
				<td>Devis N° : <input class="uid" disabled :value="cQuotationId"></td>
				<td>Date : <input class="date" value="29/08/2019" disabled></td>
				<td>Saisie par : <input class="auteur" disabled></td>
				<td><input type="button" value="Historique"></td>
			</tr>
		</table>
		<br />
		<table>
			<tr>
				<td>Compte : </td>
				<td>
					<input 
						tabindex="1" 
						ref="accountid" 
						class="compte" 
						@keyup="onAccountKeyup" 
						@keypress="onAccountKeypress"
						autofocus
					>
				</td>
				<td rowspan="4">Adresse: <br /><textarea tabindex="5" ref="address" class="address"></textarea></td>
			</tr>
			<tr>
				<td>Chantier : </td>
				<td>
					<input 
						tabindex="2" 
						ref="site" 
						class="site" 
						@keyup="onSiteKeyup" 
					/>
				</td>
				<td></td>
			</tr>
			<tr>
				<td>Validité : </td>
				<td>
					<input 
						ref="validity" 
						tabindex="-1" 
						class="validite" 
						@keyup="onValidityKeyup"
					/>
				</td>
				<td></td>
			</tr>
			<tr>
				<td>Compte rem. : </td>
				<td>
					<input 
						tabindex="4" 
						class="cptremise" 
						ref="discountaccount"
					/>
				</td>
				<td></td>
			</tr>
		</table>
		<br />
		<Table 
			stylez=""
			:cols="quotationCols"
			:store="store"
			storeGetter="getProducts"
		>
			<tr>
				<td><RowEditor name="qte" stylez="width:40px" pattern="^([0-9]+)?$" value=""></td>
				<td><RowEditor name="ref" stylez="width:100px" ></td>
				<td><RowEditor name="designation" stylez="width:99%" ></td>
				<td><RowEditor name="rawprice" stylez="width:60px" pattern="^([0-9]+(\.[0-9]+)?)?$"></td>
				<td><RowEditor name="discount" stylez="width:60px" pattern="^([0-9]+(\.[0-9]+)?)?$" required="required" value="0" ></td>
				<td><RowEditor name="price" stylez="width:60px" disabled  ></td>
			</tr>
			<td slot="tfoot">ok</td>
		</Table>
		<Dialog ref="accountsDialog" title="Selectionner un client">
			<Table 
				ref="accountsTable"
				:cols="accountsDialogCols" 
				:store="App.$store"
				storeGetter="getCustomers"
				:storeFilter="filterCustomers"
			/>
		</Dialog>
		<Dialog ref="productsDialog">
			<Table 
				ref="productsTable"
				:cols="productsDialogCols" 
				:store="store"
				storeGetter="getContents"
				storeGetterFilter=""
			/>
		
		</Dialog>
	</form>
	
</template>

<script>

	import Dialog from '../ui-vues/dialog.vue';
	import Table from '../ui-vues/table.vue';
	import RowEditor from './editor.text.vue';

	const QuotationPanel = {
		components: {Dialog, Table, RowEditor},
		inject: ['App'],
		
		props: {
			quotationid: Number,
		},
		
		computed: {
			cQuotationId : function(){
				return this.quotationid;
			}
		},
		
		data: function(){
			return {
				store: false,
				accountsDialogCols: [
					{label: 'Nom court', id: 'shortname'},
					{label: 'N° compte', id: 'uid'},
					{label: 'Nom', id: 'name'},
					{label: 'Téléphone', id: 'phone'},
					{label: 'Mobile', id: 'mobile'},
					{label: 'CP', id: 'postalcode'},
					{label: 'Ville', id: 'city'}
				],
				
				productsDialogCols: [
				],
				
				quotationCols: [
					{label: 'Qté', id: 'qte', width: '1%'},
					{label: 'Référence', id: 'reference', width: '1%'},
					{label: 'Désignation', id: 'designation'},				
					{label: 'P.U Brut', id: 'rawprice', width: '1%'},
					{label: 'Remise', id: 'discount', width: '1%'},
					{label: 'P.U Net', id: 'price', width: '1%'},
					{label: 'U.V', id: 'uv'},
					{label: 'X', id: 'price'},				
				],
			}
		},
		
		created: function(){
			this.store = this.App.$store.getters.createQuotation;
		},
		
		mounted: function(){
		},
		
		methods: {
			filterCustomers: function(row){
				console.log(row.shortname, this.$refs.accountid.value);
				if(row.shortname.toLowerCase().includes(this.$refs.accountid.value.toLowerCase()) || row.name.toLowerCase().includes(this.$refs.accountid.value.toLowerCase()))
					return true;
				return false;
			},
			
			onAccountKeypress: function(){
				this.$refs.address.readOnly = false;
				this.$refs.address.value = '';				
			},
			
			onAccountKeyup: function(evt){
				const me = this;
				
				function select(ev, account){
					console.log('ee');
					me.$refs.accountsDialog.hide();
					me.setCustomer(account.children[1].innerText);
					//me.$refs.accountid.value = account.children[1].innerText;
					//me.$refs.address.value = account.children[2].innerText;
					setTimeout(function(){
						me.$refs.site.focus();
					},100);
					
				}
				
				switch (evt.keyCode){
					case 13: //enter
						if(me.$refs.accountid.value == ''){
							me.$refs.site.focus();
							return;
						}
					case 113: // F2
						evt.preventDefault();
						if(me.App.$store.getters.getCustomerById(me.$refs.accountid.value)){
							me.setCustomer(me.$refs.accountid.value);
							setTimeout(function(){
								me.$refs.site.focus();
							},100);
							return;
						}
						me.$refs.accountsDialog.$once('select', select);
						me.$refs.accountsDialog.$once('cancel', function(){
							me.$refs.accountsDialog.$off('select', select);
							me.$refs.accountid.focus();
						});
						this.$refs.accountsTable.update();
						this.$refs.accountsDialog.show();
						break;
					
						me.$refs.accountsDialog.$once('select', select);
						me.$refs.accountsDialog.$once('cancel', function(){
							me.$refs.accountsDialog.$off('select', select);
							me.$refs.accountid.focus();
						});
						this.$refs.accountsTable.update();
						this.$refs.accountsDialog.show();
						break;
				}
			},
			
			setCustomer: function(id){
				const me = this
					, customer = me.App.$store.getters.getCustomerById(id);
					
				if(customer){
					me.$refs.accountid.value = customer.uid;
					me.$refs.address.value = customer.name;
					me.$refs.address.readOnly = true;
				}
				else
					me.$refs.address.readOnly = false;
				
			},
			/*
			onDialogSelectAccount: function(evt, account){
				console.dir(account);
				const me = this;
				this.$refs.accountsDialog.hide();
				this.$refs.accountid.value = account.children[1].innerText;
				this.$refs.address.value = account.children[2].innerText;
				this.$refs.address.readOnly = true;
				evt.preventDefault();
				evt.stopPropagation();
				setTimeout(function(){
					me.$refs.site.focus();
				},100);
			},
			*/
			
			onSiteKeyup: function(evt){
				switch (evt.keyCode){
					case 113: // F2
						evt.preventDefault();
						this.$refs.accountsDialog.show();
						break;
					
					case 13: //enter
						//this.$refs.accountsDialog.show();
						this.$refs.discountaccount.focus();
						break;
				}				
			},
			
			onValidityKeyup: function(evt){
				switch (evt.keyCode){
					case 113: // F2
						evt.preventDefault();
						this.$refs.accountsDialog.show();
						break;
					
					case 13: //enter
						//this.$refs.accountsDialog.show();
						this.$refs.discountaccount.focus();
						break;
				}				
			},
			
			onRowKeyup: function(evt){
				console.log('keyup');
				switch(evt.keyCode){
					case 13: // enter
						evt.srcElement.nextElementSibling.focus();
						break;
				}
			},
			
		}
	}

	import tab from '../ui-vues/tabs.tab.vue';
	tab.components.QuotationPanel = QuotationPanel;
	
	export default QuotationPanel;
	
</script>

<style>

	.table .editor:invalid {
		background-color: #f00;
	}

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

	.address {
		height: 75px;
		width: 210px;
	}


	
</style>
