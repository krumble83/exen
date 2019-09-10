<template>
	<svg 
		:id="uid"
		:class="classObject"
		:data-name="name"
		:x="mX"
		@mousedown.left.stop="$emit('mouse:leftdown', $event)"
		@mouseup.left.stop="$emit('mouse:leftup', $event)"
		@mouseenter="$emit('mouse:enter', $event)"
		@mouseleave="$emit('mouse:leave', $event)"
		@click.stop="$emit('mouse:click', $event)"
		@contextmenu.prevent.stop="$emit('mouse:cmenu', $event)"
		overflow="visible"
		v-inline.vertical="6"
		:data-link-count="mLinkCount"
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
			y="14" 
			:transform="$hasFlag('F_OUTPUT') ? 'translate(-52)': ''" 
			:text-anchor="$hasFlag('F_OUTPUT') ? 'end': 'start'" 
			class="label" 
			ref="label"
		>
			{{cLabel}}
		</text>
		<component 
			v-if="!$hasFlag('F_OUTPUT') && mEditor && mLinkCount < 1" 
			:is="mEditor.ctor" 
			class="editor" 
			v-bind="mEditor"
		/>
	</svg>
</template>

<script>

	import {SvgBase} from './mixins.js'
	import {PinContextMenu} from './contextmenu.js';
	import PinDrawLink from './pin.link.draw.vue';

	import PinBase from './pin.render.default.vue';
	import PinExec from './pin.render.exec.vue';
	import PinAdd from './pin.render.add.vue';
	
	import PinEditorInput from './pin.editor.input.vue';
	
	export default {
		inject: ['Worksheet', 'Node', 'addSvgDef', 'camelCaseToLabel', 'Library'],
		mixins: [SvgBase, PinContextMenu, PinDrawLink],
		components: {PinBase, PinExec, PinAdd, PinEditorInput},
		
		props: {
			name: {type: String, required: true},
			height: {type: Number, default: 20},
			width: {type: Number, default: 30},
			label: String, 
			description: String,

			flags: Number,
			color: String,
			datatype: {type: String, required: true},
			maxlink: Number,
			
			pinctor: String,
			
			optionnal: {type: Boolean, default: false},
			isarray: Boolean,
			group: String,
			editor: false,
		},

		data: function() {
			return {
				classObject: {
					exPin: true,
					hidden: false,
				},
				mLinkCount: 0,
				mEditor: this.editor,
				mLabel: this.label,
				mDatatype: this.datatype,
			}
		},

		computed: {
			cLabel: function(){
				if(this.name.startsWith('@'))
					return '';
				return this.camelCaseToLabel(this.mLabel) || this.camelCaseToLabel(this.name)
			},
			
			cPinCtor: function(){
				return this.pinctor || this.Library.getDatatype(this.datatype).pinctor || 'PinBase';
			},
			
			cColor: function(){
				return this.color || this.Library.getDatatype(this.datatype).Color();
			},
			
			cIsArray: function(){
				return this.datatype.endsWith('[]');
			},
		},
		
		watch: {
			mLabel: function(){
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
				me.$emit('datatype:change');
			},
			
			mLinkCount: function(newVal){
				if(this.maxlink > 0 && newVal > this.maxlink)
					console.log('max link');
			}
		},
		
		created: function(){
			const me = this;
			var def = {
				props: {is: 'linearGradient',id: 'pinFocus_' + me.cColor.replace('#', '')},
				childs: [{props : {is: 'stop','stop-color': me.cColor,'stop-opacity': '0.05',offset: '0.1'}},
					{props: {is: 'stop','stop-color': me.cColor,'stop-opacity': '0.6',offset: '0.3'}},
					{props: {is: 'stop','stop-color': me.cColor,'stop-opacity': '0.01',offset: '1'}}
				]
			};
			me.addSvgDef(def);
			
			if(me.cIsArray){
				def = {
					props: {is: 'pattern', id: 'pinArrayPattern_' + me.cColor.replace('#', ''), x: 0, y: 0, width: 12, height: 13, patternUnits: 'userSpaceOnUse'},
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
				, width;
				
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
			
			addLink: function(link){
				this.mLinkCount++;
			},
			
			removeLink: function(link){
				this.mLinkCount--;
			},
			
			getDatatype: function(){
				return this.datatype;
			},
			
			getLink: function(){
				var me = this;
				return this.Worksheet.getLink(function(link){
					return link.mInputPin == me || link.mOutputPin == me;
				});
			},
			
			getType: function(){
				
			},
			
			isInput: function(){
				return this.$hasFlag(F_INPUT);
			},
			
			isOutput: function(){
				return this.$hasFlag(F_OUTPUT);
			},
			
			isIO: function(){
				return this.$hasFlag(F_OUTPUT) && this.$hasFlag(F_INPUT);
			},

			isArray: function(){
				return this.cIsArray;
			},
		},
	};


</script>

<style>
	.exWorksheet .exNode .exPin{
		cursor: default;		
	}

	.exWorksheet .exNode .exPin.hidden{
		display: none;
	}

	.exWorksheet.selectEvent .exNode .exPin{
		pointer-events : none;
	}

	.exWorksheet .exNode .exPin > rect:first-child{
		stroke-width: 0;
		fill-opacity: 0;
	}

	.exWorksheet .exNode .exPin text.label{
		stroke-width: 0;
		font-size: 12px;
		font-family: Arial, Helvetica, sans-serif;
		fill: #fff;
		pointer-events : none;
	}
</style>
