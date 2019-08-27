<template>
	<svg
		:class="classObject"
		:style="styleObject"
		:id="gid"
		:x="mX" 
		:y="mY" 
		:width="mWidth" 
		:height="mHeight" 
		:type="type"
		overflow="visible"
		@click.stop="$emit('mouse:click', $event)" 
		@mousedown.left.stop="$emit('mouse:leftdown', $event)" 
		@mouseup.left="$emit('mouse:leftup', $event)" 
		@mouseup.right="$emit('mouse:rightup', $event)" 
		@mouseenter="$emit('mouse:enter', $event)" 
		@mouseleave="$emit('mouse:leave', $event)" 
		@contextmenu.prevent.stop="$emit('mouse:cmenu', $event)"
	>
		<rect 
			class="body" 
			width="100%" 
			height="100%" 
			rx="9" 
			ry="9" 
			fill="url(#exBgGradient)" 
			filter="url(#exBgFilter)" 
		/>
		<g class="header" ref="header">
			<rect width="100%" height="100%" rx="9" ry="9" :fill="'url(#nodeHeader_' + color.replace('#', '') + ')'" :clip-path="'url(#exNodeClipPath_' + ((subtitle) ? '2' : '1') + ')'" />
			<image v-if="img" :href="img" x="10" y="6" width="16" height="16" />
			<text v-if="title" class="title" :x="img ? '28' : 10" y="20">{{cTitle}}</text>
			<text v-if="subtitle" class="subtitle" :x="img ? '28' : 10" y="38">{{subtitle}}</text>
		</g>
		<rect width="100%" height="100%" rx="9" ry="9" fill-opacity="0" stroke-width="0" />
		
		<g ref="inputs" class="inputs" :transform="subtitle ? 'translate(0,50)' : title ? 'translate(0,36)' : ''">
			<slot name="inputs">
				<component v-for="(pin, idx) in cInputs" :key="pin.id" 
					class="input"
					:is="pin.ctor ? pin.ctor : 'ExPin'"
					:max-link="pin.maxlink ? pin.maxlink : 1"
					:ref="'input_' + pin.name"
					:type="$flag('F_INPUT')"
					@pin-resize="$emit('pin-resize', $event)"
					v-bind="pin"
				/>
			</slot>
		</g>
		
		<g ref="outputs" class="outputs" :transform="'translate(' + outputsGroupPos.x + ',' + (subtitle ? 50 : 36) + ')'">
			<slot name="outputs">	
				<component v-for="(pin, idx) in cOutputs" :key="pin.id" 
					class="output"
					:is="pin.ctor ? pin.ctor : 'ExPin'" 
					:max-link="pin.maxlink ? pin.maxlink : 99"
					:ref="'output_' + pin.name"
					:type="$flag('F_OUTPUT')"
					@pin-resize="$emit('pin-resize', $event)"
					v-bind="pin"
				/>
			</slot>
		</g>
		<svg
			v-if="hasOptionalPin"
			ref="optional"
			class="exExtend" 
			@click.stop="mExpanded = !mExpanded" 
			@mousedown.stop=""
		>
			<rect x="3" y="0" width="98%" height="15" rx="6" ry="6" ></rect>
			<polygon v-if="!mExpanded" :points="(mWidth/2-5) + ',4 ' + (mWidth/2+5) + ',4 ' + (mWidth/2) + ',12'"></polygon>
			<polygon v-if="mExpanded" :points="(mWidth/2-5) + ',12 ' + (mWidth/2+5) + ',12 ' + (mWidth/2) + ',4'"></polygon>
		</svg>
	</svg>
</template>

<script>


	import Color from './color.js';
	import {SvgBase} from './mixins.js'
	import NodeDraggable from './node.draggable.js'
	import NodeSelectable from './node.selectable.js'
	import {NodeContextMenu} from './contextmenu.js'
	
	import ExPin from './pin.vue';
	
	export default {
		inject: ['$worksheet', 'addSvgDef', 'camelCaseToLabel'],
		mixins: [SvgBase, NodeSelectable, NodeDraggable, NodeContextMenu],
		//mixins: [SvgBase, NodeSelectable, NodeDraggable, NodeGrid, ContextMenu],
		components: {ExPin},
		
		provide: function(){
			var me = this;
			return {
				$node: me,
			}
		},
			
		props: {
			title: String, 
			subtitle: String,
			type: String,
			flags: Number,
			color: {type: String, default: '#00f'},
			img: String,
			inputs: {type: Array},
			outputs: {type: Array},
			expendable: Boolean,
		},
		
		computed: {
			cTitle: function(){return this.camelCaseToLabel(this.title)},
			cInputs: function(){
				if(this.mExpanded)
					return this.inputs;
				return this.inputs.filter(it => it.optional != true);
				
			},
			cOutputs: function(){
				if(this.mExpanded)
					return this.outputs;
				return this.outputs.filter(it => it.optional != true);
			},
			hasOptionalPin: function(){
				return (this.inputs.filter(it => it.optional == true).length > 0) 
					|| (this.outputs.filter(it => it.optional == true).length > 0);
			},
		},

		data: function() {
			return {
				classObject: {},
				styleObject: {},
				mExpanded: false,
				outputsGroupPos: {x: 0, y:0},
				mEdited: false,
			}
		},
		
		watch: {
			mEdited: function(){
				console.log('node:edited');
				this.$emit('edited');
			},
			mX: function(){
				this.mEdited = true;
				this.$emit('edited');
			},
			mY: function(){
				this.mEdited = true;
				this.$emit('edited');
			},
			mWidth: function(){
				this.$emit('node:resize')
			},
			mHeight: function(){
				this.$emit('node:resize')
			},
			mExpanded: function(){
				this.$nextTick(function(){
					this.update();
				});
			},
			title: function(){
				this.$nextTick(function(){
					this.update();console.log('zZz')
				});
			},
		},

		created: function(){
			//console.log('created');
			var me = this
			, def = {
				props: {is: 'linearGradient',id: 'nodeHeader_' + this.color.replace('#', ''),x1: '0',y1: '0',x2: '1',y2: '0.4'},
				childs: [
					{props: {is: 'stop','stop-color': new Color(this.color).darker(0.1).toString(),offset: '0'}},
					{props: {is: 'stop','stop-color': this.color,offset: '0.02'}},
					{props: {is: 'stop','stop-color': new Color(this.color).darker(0.45).toString(),offset: '0.3'}},
					{props: {is: 'stop','stop-color': new Color(this.color).darker(0.4).toString(),offset: '0.7'}},
					{props: {is: 'stop','stop-color': new Color(this.color).darker(0.8).toString(),offset: '0.95'}},
					{props: {is: 'stop','stop-color': new Color(this.color).darker(0.8).toString(),offset: '1'}}				
				]
			}
			//console.log(this);
			this.addSvgDef(def);
			
			def = {
				props: {is: 'clipPath', id: 'exNodeClipPath_' + ((this.subtitle) ? '2' : '1')},
				childs: [
					{props: {is: 'rect', x:'0', y:'0', width:'100%', height: ((this.subtitle) ? '45' : '29')}}
				]
			}
			this.addSvgDef(def);		
			
			def = {
				props: {is: 'linearGradient', id: 'exBgGradient', x1: '0', y1: '0', x2:'0', y2:'1'},
				childs: [
					{props: {is: 'stop', 'stop-opacity': '0.8', 'stop-color': '#000000', offset:'0'}},
					{props: {is: 'stop', 'stop-opacity': '0.5', 'stop-color': '#111111', offset: '1'}}				
				]
			}
			this.addSvgDef(def);
			
			def = {
				props: {is: 'filter', id: 'exBgFilter', width: '2', height: '2'},
				childs: [
					{props: {is: 'feOffset', dx: '3', dy:'3', result:'SvgjsFeOffset1084Out', in: 'SourceAlpha'}},
					{props: {is: 'feGaussianBlur', stdDeviation: '3 3', result: 'SvgjsFeGaussianBlur1085Out', in: 'SvgjsFeOffset1084Out'}},
					{props: {is: 'feBlend', in: 'SourceGraphic', in2: 'SvgjsFeGaussianBlur1085Out', mode:'normal', result: 'SvgjsFeBlend1086Out'}}
				]
			}
			this.addSvgDef(def);
			
			this.$on('pin:resize', this.update);
		},
		
		beforeDestroy: function(){
			this.$off('pin:resize', this.update);
		},
		
		
		mounted: function(){
			//console.log('mounted');
			this.update();
		},
		
		methods: {
								
			update: function(onNextTick){
				//console.log('Node: Start resize ' + this.mTitle);
				var oldSize = {w: this.mWidth, h: this.mHeight}
				, maxWidth = 80
				, maxHeigth = 30
				, headBox = this.$refs.header
				, inputsBox = this.$refs.inputs.getBBox()
				, outputsBox = this.$refs.outputs.getBBox()

				if(onNextTick)
					return me.$nextTick(function(){me.update()});
				
				//this.$forceUpdate();
				
				//compute header
				headBox.querySelector('rect').style.display = 'none';
				this.mWidth = 600;
				var temp = headBox.getBBox();
				this.mWidth = oldSize.w;
				headBox.querySelector('rect').style.display = 'block';
				headBox = temp;
				
				
				maxWidth = Math.max(maxWidth, headBox.width + headBox.x + 1, inputsBox.x + inputsBox.width + 19 + outputsBox.width);
								
				//outputs
				//this.outputsGroupPos.y = this.subtitle ? 50 : 37;
				this.outputsGroupPos.x = maxWidth;
				
				//body
				if(maxWidth != oldSize.w)
					this.mWidth = maxWidth;
				

				maxHeigth = Math.max(maxHeigth, headBox.height + 30, headBox.height + 30 + inputsBox.height, headBox.height + 30 + outputsBox.height);
				
				if(this.$refs.optional){
					this.$refs.optional.setAttribute('width', maxWidth-5);
					this.$refs.optional.setAttribute('y', maxHeigth-14);
					maxHeigth += 5;
				}
				
				if(maxHeigth != oldSize.h)
					this.mHeight = maxHeigth;
				
				if(maxWidth != oldSize.w || maxHeigth != oldSize.h)
					this.$emit('resize');
			},
			
			remove: function(){
				this.$emit('remove');
				this.$worksheet.$emit('node:remove');
				this.$worksheet.removeNode(this.id);
			},

			getInput: function(name, asComponent){
				if(asComponent)
					return this.$refs['input_' + name][0];
				return this.inputs.find(pin => pin.name === name);
			},

			getOutput: function(name, asComponent){
				if(asComponent)
					return this.$refs['output_' + name][0];
				return this.outputs.find(pin => pin.name === name);
			},

		},
	};
</script>

<style>
	.exWorksheet .exNode{
		cursor: move;
		stroke: none;
		fill: none;
		outline: none;

		-webkit-user-select: none; /* Safari */        
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* IE10+/Edge */
		user-select: none; /* Standard */
	}


	.exWorksheet .exNode > rect.body{
		stroke: #000;
		stroke-width:  1px;
		opacity: 0.9;

		-webkit-user-select: none; /* Safari */        
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* IE10+/Edge */
		user-select: none; /* Standard */
	}


	.exWorksheet .exNode > .header{
		font-family: Helvetica, Arial, sans-serif;
		font-size: 12px;
		stroke: none;
	}
	
	.exWorksheet .exNode > .header > text.subtitle{
		fill: #999;
	}
	
	.exWorksheet .exNode > .header > text.title{
		fill: #fff;
	}


	.exWorksheet .exNode > .extend rect{
		cursor: pointer;
		pointer-events: all;
		opacity: 0;
	}

	.exWorksheet .exNode > .extend{
		pointer-events: all;
	}
	
	.exWorksheet .exNode > .extend rect:hover{
		cursor: pointer;
		opacity: 1;
	}

	.exWorksheet .exNode > .extend polygon{
		pointer-events: none;
		fill: #eee;
	}
	

	.exWorksheet.selectEvent .exNode > .extend,
	.exWorksheet.selectEvent .extend rect:hover,
	.exWorksheet.selectEvent .extend rect{
		pointer-events: none !important;		
	}

	
	.exWorksheet.drawlinkevent .exNode .extend,
	.exWorksheet.drawlinkevent .exNode .extend rect:hover,
	.exWorksheet.drawlinkevent .exNode .extend rect,
	.exWorksheet.drawlinkevent .exNode,
	.exWorksheet.selectEvent .exNode{
		pointer-events: none !important;
		cursor: crosshair !important;
	}
	
	.exWorksheet .exNode.selected > rect{
		stroke-width: 3px;
		stroke: url(#selectionHandlerStroke);
	}
	
</style>