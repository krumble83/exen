<template>
	<path 
		:id="uid" 
		:stroke="cColor" 
		:class="classObject"
		:d="'M' + dc1.x + ',' + dc1.y + ' C' + (dp1.x) + ',' + dp1.y + ' ' + (dp2.x) + ',' + dp2.y + ' ' + dc2.x + ',' + dc2.y" 
		@contextmenu.prevent.stop="$emit('mouse:context', $event)"
		@dblclick="$emit('mouse:dblclick', $event)"
	/>
</template>

<script>


	const findMousePoint = function(e, resolution){
		var me = this
			//, doc = me.doc()
			, screenPoint = me.Worksheet.mouseToSvg(e)
			, len = me.$el.getTotalLength()
			, bestMatch
			, pt;
		
		resolution = resolution || 200;
		
		for(var a=1; a < resolution; a++){
			pt = me.$el.getPointAtLength((len/(resolution+1))*a);
			var l = pt.x - screenPoint.x;
			if(bestMatch && Math.abs(pt.x - screenPoint.x) > Math.abs(bestMatch.distance))
				return bestMatch;
			if(!bestMatch || Math.abs(pt.x - screenPoint.x) < Math.abs(bestMatch.distance))
				bestMatch = {distance: pt.x - screenPoint.x, length: (len/(resolution+1))*a, point: {x: pt.x, y: pt.y}};
		}
		return bestMatch;
	}
/*
	const findMousePoint = function(e, resolution){
		var me = this
			, doc = me.doc()
			, screenPoint = me.parent(exSVG.Worksheet).point(e)
			, len = me.length()
			, bestMatch
			, pt;
		
		resolution = resolution || 100;
		
		for(var a=1; a < resolution; a++){
			pt = me.pointAt((len/(resolution+1))*a);
			var l = pt.x - screenPoint.x;
			if(bestMatch && Math.abs(pt.x - screenPoint.x) > Math.abs(bestMatch.distance))
				return bestMatch;
			if(!bestMatch || Math.abs(pt.x - screenPoint.x) < Math.abs(bestMatch.distance))
				bestMatch = {distance: pt.x - screenPoint.x, length: (len/(resolution+1))*a, point: {x: pt.x, y: pt.y}};
		}
		return bestMatch;
	}
*/

	export default {
		mixins: [],
		inject: ['Worksheet', 'Library', 'Store'],
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
				uid: this.id || this.$uid('link'),
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
					
					//val.mLinkCount++;
					val.addLink(this);
					
					this.mWatchers.input.push(val.Node.$watch('mX', this.update));
					this.mWatchers.input.push(val.Node.$watch('mY', this.update));
					//val.Node.$on('resize', this.update);
					val.Node.$once('remove', this.remove);
					val.Node.$on('update', this.update);
					if(old){
						this.mWatchers.input.forEach(function(el){
							el();
						});
						old.Node.$off('remove', this.remove);
						old.Node.$off('update', this.update);
						old.removeLink(this);
						//old.mLinkCount--;
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
					
					//val.mLinkCount++;
					val.addLink(this);

					this.mWatchers.output.push(val.Node.$watch('mX', this.update));
					this.mWatchers.output.push(val.Node.$watch('mY', this.update));
					//val.Node.$on('resize', this.update);
					val.Node.$once('remove', this.remove);
					val.Node.$on('update', this.update);
					if(old){
						this.mWatchers.output.forEach(function(el){
							el();
						});
						old.Node.$off('remove', this.remove);
						old.Node.$off('update', this.update);
						old.removeLink(this);
						//old.mLinkCount--;
					}
				}
			},
		},
		
		created: function(){
			const me = this;
			/*
			var def = {
				props: {is:'filter', id:'link_blur', x:0, y:0},
				childs: [
					{props: {is:'feGaussianBlur', in:'SourceGraphic', stdDeviation:0.7}}
				]
			}
			this.Worksheet.addDef(def);	
			*/
			me.$on('mouse:dblclick', this._onDblClick);
		},
		
		mounted: function(){
			const me = this;
			
			if(me.input){
				var n = me.Worksheet.getNode(me.input.node);
				console.assert(n);
				var p = n.getInput(me.input.pin, true);
				console.assert(p);
				me.mInputPin = p;
			}
			if(me.output){
				var n = me.Worksheet.getNode(me.output.node);
				console.assert(n);
				var p = n.getOutput(me.output.pin, true);
				console.assert(p);
				me.mOutputPin = p;
			}
			me.update();
		},
		
		beforeDestroy: function(){
			console.log('link:beforeDestroy');
			const me = this;
			me.$off('mouse:dblclick', this._onDblClick);
			
			me.$emit('remove');

			me.mWatchers.input.forEach(function(el){
				el();
			});
			me.mWatchers.output.forEach(function(el){
				el();
			});

			if(me.mInputPin){
				me.mInputPin.removeLink(me);
				me.mInputPin.Node.$off('remove', me.remove);
				me.mInputPin.Node.$off('update', this.update);
			}
			if(me.mOutputPin){
				me.mOutputPin.removeLink(me);
				me.mOutputPin.Node.$off('remove', me.remove);
				me.mOutputPin.Node.$off('update', this.update);
			}
			me.Store.commit('removeLink', {uid: me.id});
			//me.$el.parentNode.removeChild(me.$el);
		},
		
		methods: {
			
			_onDblClick: function(evt){
				var pos = findMousePoint.call(this, evt);
				//console.log('link:dblclick', pos);
				var n = this.Library.getNodeById('core.rerouteNode').toObject();
				n.x = pos.point.x-10;
				n.y = pos.point.y-10;
				this.Store.commit('addNode', n);
				this.$nextTick(function(){
					var n2 = this.Worksheet.getNode(n.uid);
					n2.splitLink(this);					
				});
			},
			
			getDatatype: function(){
				return this.datatype;
			},
			
			canChangeDatatype: function(newDatatype, evt, fromPin){
				
			},
			
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

			getInput: function(){
				return this.mInputPin;
			},
			
			getOutput: function(){
				return this.mOutputPin;
			},
			
			remove: function(){
				this.$destroy();
			}
		},
	}
	
</script>

<style>
	.exLink {
		stroke-width: 2;
		pointer-events: all;
		fill: none;
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
	
	.exWorksheet.drawlinkevent .exNode .exPin:not(.linkable){
		pointer-events: none;
	}
	
</style>