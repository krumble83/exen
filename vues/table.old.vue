<template>
	<table class="table" :style="stylez">
		<tr class="header">
			<th v-for="col in cols"
				scope="col"
				:style="'width: ' + (col.width ? col.width : 'auto')"
			>
				{{col.label}}
			</th>
			<slot name="header" />
		</tr>
		<tbody ref="body">
			<tr 
				v-for="(row, index) in cData"
				v-show="storeFilter ? storeFilter(row) : true"
				tabindex="-1"
				@keydown="moveCursor"
			>
				<td 
					v-for="col in cols"
					
				>{{row[col.id]}}
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
		stylez: String,
		store: Object, //searchCustomers
		storeGetter: String,
		storeFilter: Function,
		cols: {type: Array, default: function(){return []}},
	},
	
	computed: {
		cData: function(){
			console.log(this.getter, this.store.storeGetter);
			return this.store.getters[this.storeGetter];
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
		this.$parent.$on('show', this.update);
	},
	
	beforeDestroy: function(){
		this.$parent.$off('show', this.update);
	},
	
	methods: {
		update: function(){
			//console.log('ok', this.$refs.body.querySelector('td'));
			const me = this
				, first = me.$refs.body.querySelector('tr:not([style*="display: none;"])');
			setTimeout(function(){
				if(first)
					first.focus();
			}, 100);
			this.$forceUpdate();   
		},
		
		search: function(str){
			
		},
		
		moveCursor: function(evt){
			switch(evt.keyCode){
				case 40: //down
					if(evt.srcElement.nextElementSibling)
						evt.srcElement.nextElementSibling.focus();
					break;
					
				case 38: //up
					if(evt.srcElement.previousElementSibling)
						evt.srcElement.previousElementSibling.focus();
					break;
					
				case 13: //enter
					//console.log('select');
					this.$parent.$emit('select', evt, evt.srcElement);
					break;
				
				case 27: // esc
					this.$parent.cancel();
			}
		},
		
		alert: function(){
			console.log('alert');
		}
	},
}

</script>

<style>

	.table {
		width:100%;
		background-color:#3e3e3e		
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

	.table > th > td {
		padding: 1px 5px 1px 5px;
	}
	
	.table > tbody > tr:focus{
		background-color: #f00;
	}

</style>