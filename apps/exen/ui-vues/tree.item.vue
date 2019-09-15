<template>
	<li tabindex="-1"
		:class="classObject"
		@blur="blur"
		@focus="onFocus"
		@dblclick="onDblClick"
		@keydown.stop="_onKeyDown"
		@contextmenu.capture.prevent="onContextMenu"
		
		:draggable="($hasFlag('F_DRAGGABLE')) ? 'true' : 'false'"

		ondragstart="this.__vue__.onDragStart(event)"
		ondrop="console.log(event.dataTransfer.getData('text/plain'))"

		@dragover="allowDrop"
		@dragend="onDragEnd"
	>
		<component
			ref='editor'
			v-if="editor"
			is="texteditor"
			:value="name"
			:required="true"
			@end="renameEnd"
		/>
		<span><img :src="symbol">&nbsp;{{label}}</span>
	</li>
</template>

<script>
	

	
	import Menu from '../../../vues/contextmenu.vue';
	import texteditor from '../../../vues/editor.text.vue';
	
	//import Vue from 'vue';
	import {EventBus} from '../cmon-js/event-bus.js';

	export default {
		components: {texteditor},
		
		props: {
			name: String,
			symbol: String,
			flags: Number,
			//icon: String,
			type: Number,
			store: Object,
			datas: Object,
			tabOrder: Number,
			validname: {type: String, default: '[a-zA-Z_$][0-9a-zA-Z_$]*'},
		},
		
		data: function(){
			return {
				classObject: {
					child: true,
					focused: false,
					selected: false,
				},
				timer: false,
				mEdited: false,
				editor: false,
				dndUid: this.$uid(),
			}
		},
		
		computed: {
			label: function () {
				return this.name + (this.mEdited ? ' *' : '');
			},
		},

		mounted: function(){
		},
		
		beforeDestroy: function(){
		},

		
		methods: {
			onClick: function(evt){
				//console.log(evt);
				var me = this;
				
				return;
				//var c = this.$parent.$children.find(item => item.classObject.selected == true);
				if(document.activeElement == this.$el){
					this.timer = setTimeout(function(){
						me.rename(evt);
					}, 200);
				}
				//this.focus();
			},
			
			onDblClick: function(){
				//console.log('dblclick');
				clearTimeout(this.timer);
				this.timer = false;
				this.open();
			},
			
			_onKeyDown: function(evt){
				//console.log('keypress', evt);
				evt.preventDefault();
				switch(evt.keyCode){
					case 113:
						this.rename();
						return true;
						break;
					case 46:
						this.delete();
						return true;
						break;
				}
			},
			
			onFocus: function(evt){
				//console.log('focus');
				var c = this.$parent.$children.find(item => item.classObject.selected == true);
				if(c && c != this)
					c.unselect();
				this.classObject.selected = true;
				this.$emit('focus', this, evt);
			},
						
			allowDrop: function(evt){
				//console.log('allowDrop', evt);
				evt.preventDefault();
			},
			
			onWorksheetDrop: function(worksheet, evt){
				console.log('item:worksheetdrop', evt);
				this.$emit('worksheetdrop', this, worksheet, evt);
			},

			onDragStart: function(evt){
				console.log('dragstart', evt);
				EventBus.$on(this.dndUid, this.onWorksheetDrop);
				evt.dataTransfer.setData('text/eventbus', this.dndUid);
				
			},

			onDragEnd: function(evt){
				//console.log('dragend', evt);
				EventBus.$off(this.dndUid, this.onWorksheetDrop);
			},
			
			open: function(evt){
				this.$emit('open', this, evt);
				//this.getBlueprint().openFile(this);
			},
			
			
			blur: function(){
				
			},
			
			select: function(){
				this.$el.focus();
			},
			
			unselect: function(){
				this.blur();
				this.classObject.selected = false;
			},
			
			onContextMenu: function(evt){
				var me = this;
				this.onClick(evt);
				//this.$emit('cmenu', this, evt);
				
				var ComponentClass = Vue.extend(Menu);
				var instance = new ComponentClass();
				instance.classObject.context = true;
				
				this.$emit('cmenu', this, instance, evt);
				instance.showAt(evt.clientX, evt.clientY);

			},
			
			rename: function(callback){
				console.log('rename ' + this.name);
				const me = this;
				this.select();
				
				if(this.$hasFlag(F_NO_RENAME))
					return;
				this.editor = true;
				this.$nextTick(function(){
					me.$emit('rename:start', this, this.$refs.editor);
				});
			},
			
			renameEnd: function(){
				this.mEdited = true;
				this.$emit('edited', this);
				this.editor = false;
			},
			
			delete: function(){
				console.log('delete');
				if(this.$hasFlag(F_NO_DELETE))
					return;
				this.$emit('delete', this);
			},
			
			duplicate: function(){
				console.log('duplicate');				
				this.$emit('duplicate', this);
			},
			
			findReferences: function(){
				console.log('findReferences');				
			},
		}
	}

</script>

<style>

</style>