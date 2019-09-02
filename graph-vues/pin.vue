<template>
	<svg 
		:id="gid"
		:class="classObject"
		@mousedown.right.stop=""
		@mousedown.left.stop="$emit('mouse:leftdown', $event)"
		@mouseup.left.stop="$emit('mouse:leftup', $event)"
		@mouseenter="$emit('mouse:enter', $event)"
		@mouseleave="$emit('mouse:leave', $event)"
		@mouseup.right.stop="$emit('mouse:rightup', $event)" 
		@contextmenu.prevent.stop="$emit('mouse:cmenu', $event)"
		overflow="visible"
		v-inline.vertical="7"
	>
		<rect 
			:transform="$hasFlag('F_OUTPUT') ? 'scale(-1,1)' : ''" 
			x="0" 
			y="0" 
			:width="mWidth" 
			:height="mHeight" 
			:fill="'url(#pinFocus' + cColor.replace('#', '_') + ')'"
		/>
		<component :is="cPinCtor" />
		<text 
			x="26" 
			y="15" 
			:transform="$hasFlag('F_OUTPUT') ? 'translate(-52)': ''" 
			:text-anchor="$hasFlag('F_OUTPUT') ? 'end': 'start'" 
			class="label" 
			:stroke-color="cColor"
			ref="label"
		>
		{{cLabel}}
		</text>
		<component 
			v-if="!$hasFlag('F_OUTPUT') && mEditor && classObject.linked==false" 
			:is="mEditor.ctor" 
			class="editor" 
			v-bind="mEditor"
		/>
	</svg>
</template>

<script>

	import {SvgBase} from './mixins.js'
	import {PinContextMenu} from './contextmenu.js';
	import PinDrawLink from './pin.link.draw.js';

	import ExPinBase from './pin.render.default.vue';
	import PinExec from './pin.render.exec.vue';
	
	import PinEditorInput from './pin.editor.input.vue';
	
	export default {
		inject: ['$worksheet', 'Node', 'addSvgDef', 'camelCaseToLabel', 'Library'],
		mixins: [SvgBase, PinDrawLink, PinContextMenu],
		components: {ExPinBase, PinExec, PinEditorInput},
		
		props: {
			name: {type: String, required: true},
			height: {type: Number, default: 20},
			width: {type: Number, default: 30},
			label: String, 
			description: String,
			//type: Number,
			flags: Number,
			color: String,
			datatype: {type: String, required: true},
			'max-link': Number,
			
			pinCtor: String,
			
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
				//dEditor: this.editor,
				mLinkCount: 0,
				mEditor: this.editor,
			}
		},

		computed: {
			cLabel: function(){
				if(this.name.startsWith('@'))
					return '';
				return this.camelCaseToLabel(this.label) || this.camelCaseToLabel(this.name)
			},
			
			cPinCtor: function(){
				return this.pinCtor || this.Library.getDatatype(this.datatype).ctor || 'ExPinBase';
			},
			
			cColor: function(){
				return this.color || this.Library.getDatatype(this.datatype).Color();
			},
		},
		
		watch: {
			label: function(){
				var me = this;
					me.update(true);
			},
			
			editor: function(){
				var me = this;
				me.update(true);
			},
			
			datatype: function(){
				const me = this
					, editor = this.Library.getDatatype(this.datatype).Editor();
					
				if(editor && editor.ctor)
					me.mEditor = {ctor: 'PinEditor' + editor.ctor.charAt(0).toUpperCase() + editor.ctor.slice(1)};
				else
					me.mEditor = false;

				me.update(true);
			}
		},
		
		created: function(){
			const me = this
			, def = {
				props: {is: 'linearGradient',id: 'pinFocus_' + me.cColor.replace('#', '')},
				childs: [{props : {is: 'stop','stop-color': me.cColor,'stop-opacity': '0.05',offset: '0.1'}},
					{props: {is: 'stop','stop-color': me.cColor,'stop-opacity': '0.6',offset: '0.3'}},
					{props: {is: 'stop','stop-color': me.cColor,'stop-opacity': '0.01',offset: '1'}}
				]
			};
			me.addSvgDef(def);
			
			if(me.isarray){
				def = {
					props: {is: 'pattern', id: 'pinArrayPattern_' + me.cColor.replace('#', ''), x: 0, y: 0, width: 11, height: 11, patternUnits: 'userSpaceOnUse'},
					childs: [
						{props: {is: 'rect', width: 2, height: 2, x: 1, y: 1, fill: me.cColor}}
					]
				};
				me.addSvgDef(def);
			}
		},
		
		beforeDestroy: function(){
			
		},
				
		mounted: function(){
			this.update();
		},
		
		methods: {
			update: function(onNextTick){
				//console.log('Pin:start resize ' + this.mLabel);
				const me = this;
				var text = this.$refs.label
				, oldWidth = this.mWidth
				, textBox
				, width
				
				if(onNextTick)
					return me.$nextTick(function(){me.update()});
				
				me.$el.querySelector('rect').setAttribute('opacity', 0);
				
				me.mWidth = me.$el.getBBox().width;
				me.mHeight = me.$el.getBBox().height;
				me.$el.querySelector('rect').setAttribute('opacity', 1);
				me.Node.update();
				me.$forceUpdate();
				me.$emit('update');
			},
						
			getCenter: function(){
				var b = this.$refs.pin.getBoundingClientRect()
				, p = this.getSvgPoint(b.left+6, b.top+6);
				
				return p;
				//return p.matrixTransform(this.getViewportEl().getScreenCTM().inverse());

			},
			
			isInput: function(){
				return this.$hasFlag(F_INPUT);
			},
			
			isOutput: function(){
				return this.$hasFlag(F_OUTPUT);
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
