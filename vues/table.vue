<template>
	<table class="table">
		<tr class="header" ref="cols">
			<th v-for="col in cols"
				scope="col"
				:colid="col.colid"
				:style="'width: ' + (col.width ? col.width : 'auto')"
			>
				{{col.label}}
			</th>
			<slot name="cols" />
		</tr>
		<tbody ref="body">
			<tr 
				v-for="row in cData" :key="row[indexKey]"
				v-show="rowFilter ? rowFilter(row) : true"
				tabindex="-1"
				@keydown="_onKeyDown($event, row)"
				@click="$emit('click', row, $event)"
				@dblclick="$emit('dblclick', row, $event)"
			>
				<td 
					v-for="(value, name) in row"
					v-show="colFilter ? colFilter(name, row) : true"
					
				>{{value}}</td>
			</tr>
			<slot />
		</tbody>
		<tfoot>
			<tr>
				<slot name="footer" />
			</tr>
		</tfoot>
	</table>
</template>

<script>

export default {
	
	props: {
		childs: {type: Array, default: function(){return []}},
		store: Object,
		storeGetter: String,
		rowFilter: Function,
		colFilter: Function,
		cols: {type: Array, default: function(){return []}},
		indexKey: {String, required: true},
	},
	
	computed: {
		cData: function(){
			//console.log(this.getter, this.store.storeGetter);
			if(this.store)
				return this.store.getters[this.storeGetter];
			else
				return this.childs;
		}
	},
	
	watch: {
		cData: function(){
			this.nextTick(function(){
				me.$refs.body.querySelector('tr:not([style*="display: none;"])').focus();
			})
		},
	},
	
	mounted: function(){
		//this.$refs.body.querySelector('tr:not([style*="display: none;"])').focus();
	},
	
	beforeDestroy: function(){
	},
	
	methods: {
		_onKeyDown: function(evt, row){
			switch(evt.keyCode){
				case 40: //down
					if(evt.srcElement.nextElementSibling)
						evt.srcElement.nextElementSibling.focus();
					break;
					
				case 38: //up
					if(evt.srcElement.previousElementSibling)
						evt.srcElement.previousElementSibling.focus();
					break;
				default:
					this.$emit('keydown', evt, row);
					break;
			}
		},
		
		select: function(index){
			const me = this;
			if(typeof index == 'number'){
				this.$nextTick(function(){
					const el = me.$refs.body.querySelector('tr:not([style*="display: none;"])');
					if(el)
						el.focus();
				})
			}
		}
	},
}

</script>

<style>

	.table {
		width:100%;
		background-color:#3e3e3e;
		border-spacing : 0;
		border-collapse : collapse;
	}


	.table > .header {
		background: #2e2e2e; /* Old browsers */
		background: -moz-linear-gradient(top,  #2e2e2e 0%, #1a1a1a 50%, #1f1f1f 100%); /* FF3.6-15 */
		background: -webkit-linear-gradient(top,  #2e2e2e 0%,#1a1a1a 50%,#1f1f1f 100%); /* Chrome10-25,Safari5.1-6 */
		background: linear-gradient(to bottom,  #2e2e2e 0%,#1a1a1a 50%,#1f1f1f 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2e2e2e', endColorstr='#1f1f1f',GradientType=0 ); /* IE6-9 */
		border: 1px solid #191919;
	}
	
	.table > tr > th {
		
	}

	.table tbody > tr > td {
		padding: 2px 5px 2px 5px;
		font-size: var(--text-size);
		font-family: var(--text-font-family);
	}
	
	.table > tbody > tr:focus{
		background-color: var(--focused-bg-color);
		color: var(--focused-text-color);
		outline: none;
	}

</style>