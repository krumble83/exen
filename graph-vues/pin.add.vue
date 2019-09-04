
<script>

	import ExPin from './pin.vue';
	
	export default {
		extends : ExPin,
		
		props: {
			target: String,
		},
		
		data: function() {
			return {
				classObject: {
					linkable: false,
					pinadd: true,
				},
				mAddGroup: false,
			}
		},
		
		created: function(){
			var me = this
			, def = {
				props: {is: 'pattern',id: 'pinAddPattern',x: '0',y: '0',width: '11',height: '11', patternUnits: 'userSpaceOnUse'},
				childs: [
					{props: {is: 'rect',width: '3', height:'11',x: '4', y:'0', fill:'#fff'}},
					{props: {is: 'rect',width: '11', height:'3',x: '0', y:'4', fill:'#fff'}},
				]
			}
			me.addSvgDef(def);

			me.$on('mouse:click', this._onClick);

			if(me.startDrawLink)
				me.$off('mouse:leftdown', me.startDrawLink);
			if(me.finishLink)
				me.$off('mouse:leftup', me.finishLink);
			if(me.showContextMenu)
				this.$off('mouse:cmenu', me.showContextMenu);
			
			me._updatePinGroup();
		},
		
		beforeDestroy: function(){
			this.$off('mouse:click', this._onClick);			
		},

		methods: {
			
			_updatePinGroup: function(){
				const me = this
					, group = me.Node.getPinGroup(me.target);
				var a = 0;
				group.forEach(function(pin){
					pin.mLabel = pin.label + ' [' + a + ']';
					a++;
				});				
			},
			
			_onClick: function(evt){
				const me = this
					, group = me.Node.getPinGroup(me.target)
					, firstPin = group[0]
					, node = me.Worksheet.store.getters.getNode(me.Node.name)
					, pin = (firstPin.isInput()) ? node.inputs.find(it => it.name == firstPin.name) : node.outputs.find(it => it.name == firstPin.name)
				
				var clone = JSON.parse(JSON.stringify(pin));
				clone.name += '_' + group.length;
				
				node.outputs.splice(node.outputs.indexOf(pin)+1, 0, clone);
				
				//node.outputs.push(clone);
				
				this.$nextTick(function(){
					me._updatePinGroup();
				});
				
				
				console.log(clone);
			}
			
		},
	};

</script>

<style>
	.exWorksheet .exNode .exPin.pinadd{
		pointer-events : all;
		cursor: pointer;
	}

</style>
