<script>
	import ExPin from './pin.vue';
	
	export default {
		extends : ExPin,
		inject: ['Store'],
		
		data: function() {
			return {
				classObject: {
					pinstructure: true,
				},
				mStructurePinSplitted: false,
			}
		},
		
		created: function(){
			const me = this;
				
			me.$on('cmenu', function(menu, evt){
				console.log('menuz');
				menu.addItem({id: 'splitstruct', title: 'Split Structure Pin', desc: 'Split this pin', callback: me.splitStructurePin});
			});
		},
		
		beforeDestroy: function(){
			
		},

		//this.$once('hook:beforeDestroy', function () {


		methods: {
			splitStructurePin: function(){
				const me = this
				, node = me.Store.getters.getNode(me.Node.uid)
				, dtype = me.Library.getDatatype(me.datatype);
				
				console.log('split', dtype);
				me.classObject.hidden = true;
				dtype.$children.forEach(function(child){
					var clone = child.toObject();
					clone.flags = (clone.flags || 0) + (me.isInput() ? F_INPUT : F_OUTPUT);
					clone.name += '[' + clone.name + ']';
					clone.label = '[' + me.cLabel + '] ' + clone.label;
					me.Store.commit('addNodeIo', {node: node.uid, pos: node.outputs.indexOf(me.name), props: clone});
				});
			},
			
			recombineStructurePin: function(){
				
			}
			
		},
	};

</script>
