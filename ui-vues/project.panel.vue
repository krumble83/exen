<template>
	<form style="padding:15px;color:#fff" class="devis form">
		<table>
			<tr>
				<td>Devis N° : <input class="uid" disabled></td>
				<td>Date : <input class="date" value="29/08/2019" disabled></td>
				<td>Saisie par : <input class="auteur" disabled></td>
				<td><input type="button" value="Historique"></td>
			</tr>
		</table>
		<br />
		<table>
			<tr>
				<td>Compte : </td>
				<td><input class="compte" @change="onCompteChange"></td>
				<td rowspan="4">Adresse: <br /><textarea class="adresse"></textarea></td>
			</tr>
			<tr>
				<td>Chantier : </td>
				<td><input class="chantier" /></td>
				<td></td>
			</tr>
			<tr>
				<td>Validité : </td>
				<td><input class="validite" /></td>
				<td></td>
			</tr>
			<tr>
				<td>Compte rem. : </td>
				<td><input class="cptremise" /></td>
				<td></td>
			</tr>
		</table>
		<Dialog>
			<table style="width:100%">
				<th>
					<td>Nom court</td>
					<td>N° compte</td>
					<td>Nom</td>
					<td>Téléphone</td>
					<td>Mobile</td>
					<td>C.P</td>
					<td>Ville</td>
				</th>
				<tbody>
				
				</tbody>
			</table>		
		</Dialog>
	</form>
	
</template>

<script>

	import Dialog from './dialog.vue';

	const ProjectPanel = {
		components: {Dialog},
		
		data: function(){
			return {
				childss: [
					{
						_ctor: 'datatype',
						id: 'zezette',
					}
				],
			}
		},
				
		mounted: function(){
		},
		
		methods: {
			onCompteChange: function(evt){
				alert('s');
			}
		}
	}

	import tab from './tabs.tab.vue';
	tab.components.ProjectPanel = ProjectPanel;
	
	export default ProjectPanel;
	
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
