<template>
	<path 
		:id="gid" 
		:stroke="cColor" 
		:class="classObject"
		:d="'M' + dc1.x + ',' + dc1.y + ' C' + (dp1.x) + ',' + dp1.y + ' ' + (dp2.x) + ',' + dp2.y + ' ' + dc2.x + ',' + dc2.y" 
		fill="none" 
		@contextmenu.prevent.stop="$emit('mouse:context', $event)"
	/>
	<!--<line :id="id" :x1="dc1.x" :y1="dc1.y" :x2="dc2.x" :y2="dc2.y" :stroke="color" :class="classObject" :datatype="mDatatype" />-->
</template>

<script>

	export default {
		mixins: [],
		//mixins: [WorksheetHelpers, ContextMenu],
		props: {
			id: String,
			datatype: {type: String, default: 'totoType'},
			color: String,

			inputPin: Object,
			outputPin: Object,	

			input: {
				node: String,
				pin: String
			},
			output: {
				node: String,
				pin: String
			},
		},
		
		computed: {
			cColor: function(){
				return this.color || ((this.Library) ? this.Library.getDatatype(this.datatype).Color() : '#000');
			},
		},

		data: function(){
			return {
				gid: this.id || this.$uid(),
				classObject: {
					exLink: true,
					invalid: false,
				},
				mInputPin: this.inputPin,
				mOutputPin: this.outputPin,
				mWatchers: {input: [], output: []},
				mDatatype: this.datatype,
				
				dc1: {x: 0, y:0},
				dc2: {x: 0, y:0},
				dp1: {x: 0, y:0},
				dp2: {x: 0, y:0},
				intermediateRange: 100,
			}
		},
		
		watch: {			
			mInputPin: {
				immediate: true,
				handler: function(val, old){
					if(!val)
						return;
					//console.log('watch input ', val, old);
					
					this.mWatchers.input.push(val.$watch('datatype', this._datatypeChange));
					
					this.mWatchers.input.push(val.Node.$watch('mX', this.update));
					this.mWatchers.input.push(val.Node.$watch('mY', this.update));
					val.Node.$once('remove', this.remove);
					if(old){
						this.mWatchers.input.forEach(function(el){
							el();
						});
						old.Node.$off('remove', this.remove);
					}
				}
			},
			
			mOutputPin: {
				immediate: true,
				handler: function(val, old){
					if(!val)
						return;
					//console.log('watch output', this.mOutputPin);

					this.mWatchers.output.push(val.$watch('datatype', this._datatypeChange));
					
					this.mWatchers.output.push(val.Node.$watch('mX', this.update));
					this.mWatchers.output.push(val.Node.$watch('mY', this.update));
					val.Node.$once('remove', this.remove);
					if(old){
						this.mWatchers.output.forEach(function(el){
							el();
						});
						old.Node.$off('remove', this.remove);
					}
				}
			},
		},
		
		created: function(){
			return;
			var def = {
				props: {is: 'filter',id: 'link_blur',x: 0,y: 0},
				childs: [
					{props: {is: 'feGaussianBlur', in:'SourceGraphic', stdDeviation:0.7}}
				]
			}
			this.$worksheet.addDef(def);
			
		},
		
		mounted: function(){
			if(this.input){
				var n = this.$worksheet.getNode(this.input.node);
				console.assert(n);
				var p = n.getInput(this.input.pin, true);
				console.assert(p);
				this.mInputPin = p;
			}
			if(this.output){
				var n = this.$worksheet.getNode(this.output.node);
				console.assert(n);
				var p = n.getOutput(this.output.pin, true);
				console.assert(p);
				this.mOutputPin = p;
			}
		},
		
		beforeDestroy: function(){
			//this.$worksheet.startSequence();
			this.$emit('remove');
			//this.$worksheet.$emit('link:remove', this);
			this.mWatchers.input.forEach(function(el){
				el();
			});
			this.mWatchers.output.forEach(function(el){
				el();
			});

			if(this.mInputPin)
				this.mInputPin.Node.$off('remove', this.remove);
			if(this.mOutputPin)
				this.mOutputPin.Node.$off('remove', this.remove);
			//this.$worksheet.stopSequence();
		},
		
		methods: {
			
			isPinLinkable: function(pin){
				var ret = {code: 0, label: '<img src="img/linkok.png"> Place a new Link'};
				var oPin = (this.mInputPin) ? this.mInputPin : this.mOutputPin;
				
				if(oPin.isarray !== pin.isarray) // ARRAY WITH NON-ARRAY
					ret = {code: ret.code + 32, label: '<div><img src="img/none.png"> Pins are not same type (Array vs Non-Array)' + ' (' + (ret.code + 32) + ')'};

				if(oPin.datatype != pin.datatype) // WRONG DATATYPE
					ret = {code: ret.code + 16, label: '<div><img src="img/none.png"> Wrong datatype (' + pin.datatype + ' vs ' + oPin.datatype + ')' + ' (' + (ret.code + 16) + ')'};
				
				if(oPin.type == pin.type) // SAME PIN TYPE
					ret = {code: ret.code + 8, label: '<div><img src="img/none.png"> Pins are same type (inputs or outputs)' + ' (' + (ret.code + 8) + ')'};
				
				if(oPin.Node == pin.Node) // SAME NODE
					ret = {code: ret.code + 4, label: '<div><img src="img/none.png"> Can\'t link pins on same node' + ' (' + (ret.code + 4) + ')'};
				
				if(oPin == pin) // SAME PIN
					ret = {code: ret.code + 2, label: '<div><img src="img/none.png"> Same Pin' + ' (' + (ret.code + 2) + ')'};
					
				if(!oPin.classObject.linkable) // PIN NOT LINKABLE
					ret = {code: ret.code + 1, label: '<div><img src="img/none.png"> Pin is not linkable' + ' (' + (ret.code + 1) + ')'};

				return ret;
			},
			
			_datatypeChange: function(newVal, oldVal){
				console.log('pin datatype change', arguments);
				if(this.mInputPin && this.mOutputPin){
					if(this.getInput().datatype == this.getOutput().datatype){
						this.mDatatype = this.getInput().datatype;
						this.classObject.invalid = false;
					}
					else
						this.classObject.invalid = true;
				}
				else if(newVal != this.datatype)
					this.classObject.invalid = true;
				else
					this.classObject.invalid = false;
			},
			
					
			update: function(evt){
				var me = this;
				if(me.mInputPin){
					me.dc1.x = me.mInputPin.getCenter().x;
					me.dc1.y = me.mInputPin.getCenter().y;
					me.dp1.x = me.dc1.x - this.intermediateRange;
					me.dp1.y = me.dc1.y;
				}
				if(me.mOutputPin){
					me.dc2.x = me.mOutputPin.getCenter().x;
					me.dc2.y = me.mOutputPin.getCenter().y;
					me.dp2.x = me.dc2.x + this.intermediateRange;
					me.dp2.y = me.dc2.y;
				}
				//me.updateIntermediatePoints();
			},
			
			addPin: function(pin){
				if(pin.isInput())
					this.mInputPin = pin;
				else if(pin.isOutput())
					this.mOutputPin = pin;
				else
					console.assert(false, 'unknown pin type');
			},
			
			getInput: function(){
				return this.mInputPin;
			},
			
			getOutput: function(){
				return this.mOutputPin;
			},
			/*
			updateIntermediatePoints: function(){
				var me = this;
				if(this.mInputPin){
					this.dp1.x = this.dc1.x - 200;
					this.dp1.y = this.dc1.y;
				}
				if(this.mOutputPin){
					this.dp2.x = this.dc2.x + 200;
					this.dp2.y = this.dc2.y;
				}
			
			},
			*/
			remove: function(){
				//console.log('remove');
				this.$worksheet.removeLink(this.id);
			}
		},
	}
	
</script>

<style>
	.exLink {
		stroke-width: 2;
		pointer-events: all;
	}
	
	.exLink.invalid {
		stroke-dasharray: 5;
		stroke-width: 4;
	}
	
	.exLink:hover {
		stroke-width: 4;
		pointer-events: all;
	}


	.exWorksheet.drawlinkevent .exLink:not(.draw){
		pointer-events: none;
		opacity: 0.3;
	}

	.exLink.draw {
		pointer-events: none;
	}
	
</style>