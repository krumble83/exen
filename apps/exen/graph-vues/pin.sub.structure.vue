<script>
	import ExPin from './pin.vue';
	
	const changeDatatype = function(){
		console.log('change datatype');
	}
	
	const getChildPins = function(){
		const me = this
			, regex = new RegExp('^' + '\\[' + me.name + '\\].+$');
		return this.Node.getPin(function(pin){
			return regex.test(pin.name);
		});
	}
	
	export default {
		extends : ExPin,
		
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
				//console.log('menuz');
				menu.addSeparator();
				menu.addItem({id: 'splitstruct', title: 'Split Structure Pin', desc: 'Split this pin', callback: me.splitStructurePin});
				if(me.getLink().length > 0)
					menu.getItem('splitstruct').classObject.disabled = true;
			});
			
			me.$on('datatype:change', changeDatatype);
		},
		
		beforeDestroy: function(){
			console.log('destroy');
			const me = this;
			
			me.$off('datatype:change', changeDatatype);
			getChildPins.call(this).forEach(function(pin){
				me.Node.storeCommit('removePin', pin.name);
			});
			me.Node.update(true);
		},

		//this.$once('hook:beforeDestroy', function () {


		methods: {
			splitStructurePin: function(){
				const me = this
				, node = me.Node.storeGet('getNode')
				, dtype = me.Library.getDatatype(me.datatype);
				
				//console.log('split', dtype);
				me.classObject.hidden = true;
				dtype.$children.forEach(function(child){
					var clone = child.toObject();
					clone.flags = (clone.flags || 0) + (me.isInput() ? F_INPUT : F_OUTPUT);
					clone.name = '' + '[' + me.name + ']' + clone.name;
					clone.label = '[' + me.cLabel + '] ' + (clone.label || clone.name);
					//console.log(node.outputs.indexOf(me.name)+1);
					me.Node.storeCommit('addPin', {pos: node.outputs.indexOf(me)+1, props: clone});
				});

			},
			
			recombineStructurePin: function(){
				
			}
			
		},
	};

</script>
