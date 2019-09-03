<template>
	<svg 
		:id="gid"
		:class="classObject"
		@contextmenu.prevent.stop="$emit('mouse:cmenu', $event)"
		@click="$emit('mouse:click', $event)"
		v-inline.vertical="5"
	>
		<rect 
			:transform="type == $flag('F_OUTPUT') ? 'scale(-1,1)' : ''" 
			x="0" 
			y="0" 
			:width="mWidth" 
			:height="mHeight" 
			:fill="'url(#pinFocus' + color.replace('#', '_') + ')'"
		/>
		<component :is="pinCtor" />
		<text 
			x="26" 
			y="15" 
			:transform="type == $flag('F_OUTPUT') ? 'translate(-52)': ''" 
			:text-anchor="type == $flag('F_OUTPUT') ? 'end': 'start'" 
			class="label" 
			ref="label"
		>
		zzz
		</text>
		<component 
			v-if="!$hasFlag('F_OUTPUT') && editor && classObject.linked==false" 
			:is="editor.ctor" 
			class="exEditor" 
			v-bind="editor"
		/>
	</svg>
</template>

<script>

	import {SvgBase} from './mixins.js'
	import ExPinBase from './pin.render.default.vue';
	import {PinContextMenu} from './contextmenu.js';
	import PinDrawLink from './pin.link.draw.js';
	
	export default {
		inject: ['Worksheet', '$node', 'addSvgDef', 'camelCaseToLabel'],
		mixins: [SvgBase, PinDrawLink, PinContextMenu],
		components: {ExPinBase},
		props: {
			name: {type: String, required: true},
			height: {type: Number, default: 20},
			width: {type: Number, default: 60},
			label: String, 
			description: String,
			type: Number,
			flags: Number,
			color: {type: String, required: true},
			datatype: {type: String, required: true},
			'max-link': Number,
			
			pinctor: {type: String, default: 'ExPinAdd'},
			
			optionnal: {type: Boolean, default: false},
			isarray: Boolean,
			group: {type: String, default:''},
			editor: false,
		},

		data: function() {
			return {
				classObject: {
					exPin: true,
					linkable: true,
					linked: false,
				},
				dEditor: this.editor,
				mLinkCount: 0,
			}
		},

		computed: {
			//Worksheet: function(){return this.$parent.$parent},
			//$node: function(){return this.$parent},
			
			cLabel: function(){ return this.camelCaseToLabel(this.label) || this.camelCaseToLabel(this.name)},
			
			center: function(){
				var b = this.$refs.pin.getBoundingClientRect();
				return {x: b.left-3, y: b.top-3};
			},
		},
		
		watch: {
			label: function(){
				var me = this;
					Vue.nextTick(function () {
						//me.$forceUpdate();
						me.update();
					})
			},
			
			editor: function(){
				var me = this;
					Vue.nextTick(function () {
						me.update();
					})
			},
		},
		
		created: function(){
			var me = this
			, def = {
				props: {is: 'linearGradient',id: 'pinFocus_' + this.color.replace('#', '')},
				childs: [{props : {is: 'stop','stop-color': this.color,'stop-opacity': '0.01',offset: '0.1'}},
					{props: {is: 'stop','stop-color': this.color,'stop-opacity': '0.4',offset: '0.3'}},
					{props: {is: 'stop','stop-color': this.color,'stop-opacity': '0.01',offset: '1'}}
				]
			};
			this.addSvgDef(def);
			
			if(this.isarray){
				def = {
					props: {is: 'pattern', id: 'pinArrayPattern_' + this.color.replace('#', ''), x: 0, y: 0, width: 11, height: 11, patternUnits: 'userSpaceOnUse'},
					childs: [
						{props: {is: 'rect', width: 2, height: 2, x: 1, y: 1, fill: this.color}}
					]
				};
				this.addSvgDef(def);
			}
		},
		
		beforeDestroy: function(){
			
		},
				
		mounted: function(){
			this.update();
		},
		
		methods: {
			update: function(){
				//console.log('Pin:start resize ' + this.mLabel);
				const me = this;
				var text = this.$refs.label
				, oldWidth = this.mWidth
				, textBox
				, width
				
				me.$el.querySelector('rect').setAttribute('opacity', 0);
				
				me.mWidth = me.$el.getBBox().width;
				me.mHeight = me.$el.getBBox().height;
				me.$el.querySelector('rect').setAttribute('opacity', 1);
				me.$parent.update();
				me.$forceUpdate();
				me.$emit('update');


				/*
				this.mWidth = 400;
				textBox = text.getBBox();
				
				width = parseInt(text.getAttribute('x')) + textBox.width + 11;
				
				if( (width) != oldWidth){
					this.mWidth = width;
					this.$nextTick(function(){
						me.$emit('pin-resize');
					});
				}
				else
					this.mWidth = oldWidth;
				*/
			},
						
			getCenter: function(){
				var b = this.$refs.pin.getBoundingClientRect()
				, p = this.getSvgPoint(b.left+6, b.top+6);
				
				return p;
				//return p.matrixTransform(this.getViewportEl().getScreenCTM().inverse());

			},
			
			isInput: function(){
				return this.type == F_INPUT;
			},
			
			isOutput: function(){
				return this.type == F_OUTPUT;
			},
			
			addLink: function(link){
				var me = this;
				me.classObject.linked = true;
				me.mLinkCount++;
				link.$once('remove', function(){
					me.mLinkCount--;
					if(me.mLinkCount == 0)
						me.classObject.linked = false;
				});
			},
			
		},
	};


</script>

<style>
	.exWorksheet .exNode .exPin{
		cursor: crosshair;
	}

	.exWorksheet .exNode .exPin.hidden{
		display: none;
	}

	.exWorksheet .exNode .exPin.linkable{
		pointer-events : all;
		cursor: crosshair;
	}

	.exWorksheet.selectEvent .exNode .exPin,
	.exWorksheet .exNode.dragging .exPin{
		pointer-events : none;
	}


	.exWorksheet .exNode .exPin > rect:first-child{
		stroke-width: 0;
		fill-opacity: 0;
	}

	.exWorksheet .exNode .exPin > rect:hover{
		fill-opacity: 1;
	}

	.exWorksheet .exNode .exPin circle.pin{
		stroke-width: 3;
		pointer-events : none;
		fill-opacity: 0;
	}

	.exWorksheet .exNode .exPin.linked circle.pin{
		fill-opacity: 1;
	}
	
	.exWorksheet .exNode .exPin > rect.pin.exArray{
		stroke-width: 3;
		stroke-dasharray: 3,2.1;
		pointer-events : none;
	}

	.exWorksheet .exNode .exPin.linked rect.pin.exArray{
		fill-opacity: 1;
	}

	
	.exWorksheet .exNode .exPin text.label{
		stroke-width: 0;
		font-size: 16px;
		fill: #fff;
		pointer-events : none;
	}
</style>
