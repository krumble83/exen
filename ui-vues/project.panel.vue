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
		<div class="dialog">
			<div class="title">Client P.Elec</div>
			<div class="content">
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
			</div>
		</div>
	</form>
</template>

<script>

	const ProjectPanel = {
		//components: {Library,Package,Datatype,Class,Function,Input,Output,Method,Entry,Exit,Category,Editor,Enum,Value,Structure,Member},
		
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

.dialog {
	margin: 0 auto;
	width: 800px;
	height: 400px;
	background-color: #555;
	border-radius: 5px;
	border: 3px outset;
}

.dialog > .title {
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	padding: 2px;
	padding-left: 10px;
	background-color: #777;
	border-bottom: 1px solid #000;
	cursor: move;
}


table th td {
	border: 1px solid;
	padding: 1px 5px 1px 5px;
}
</style>
