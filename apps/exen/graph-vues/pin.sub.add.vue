<script>
	import ExPin from './pin.vue';
	
	export default {
		extends : ExPin,
		//inject: ['Store'],
		
		props: {
			target: String,
		},
		
		data: function() {
			return {
				classObject: {
					linkable: false,
					pinadd: true,
				},
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
					, regex = new RegExp('^' + me.target + '(\[[0-9]+\])*$')
					, pins = me.Node.getPin(function(pin){return regex.test(pin.name)});
				var a = 0;
				pins.forEach(function(pin){
					pin.mLabel = pin.label + ' [' + a + ']';
					a++;
				});				
			},
			
			_onClick: function(evt){
				const me = this
					, node = me.Node.storeGet('getNode')
					, target = me.Node.storeGet('getPin', me.target)
					//, target = node.inputs.find(it => it.name == me.target) || node.outputs.find(it => it.name == me.target)
					, regex = new RegExp('^' + me.target + '(\[[0-9]+\])*$')
					, pins = me.Node.getPin(function(pin){return regex.test(pin.name)})
					, lastPin = pins[pins.length-1]

				var clone = JSON.parse(JSON.stringify(target));
				//clone.name = clone.name.replace(/\[[0-9]+\]/, ''); 
				var a = 1;
				while(me.Node.storeGet('getPin', clone.name + '[' + a + ']'))
					a++;
				
				clone.name = clone.name + '[' + a + ']';
				
				if((target.flags & F_INPUT) == F_INPUT)
					me.Node.storeCommit('addPin', {pos: node.inputs.indexOf(lastPin), props: clone});
				else
					me.Node.storeCommit('addPin', {pos: node.outputs.indexOf(lastPin), props: clone});

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
