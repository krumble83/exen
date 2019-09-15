<template>
	<div class="tab" tabindex="-1">
		<input type="radio" :id="id" :name="$parent.mId" @click.stop="_onClick" :checked="selected ? 'checked' : ''">
		<label 
			:for="id" 
			:draggable="draggable" 
			@dragover="allowDrop" 
			
			ondragstart="event.dataTransfer.setData('text/plain', 'rrrrr')"
			ondrop="console.log(event.dataTransfer.getData('text/plain'))"

		>
			<img v-if="icon"
				:src="icon" 
			/>
			<span>{{label}}</span>
			<img v-if="closable"
				:src="closeImg" 
				class="close" 
				@click.stop.capture="_onClose" 
			/>
		</label>
		<div 
			class="content"
			ref="contents"
		>
			<component
				v-if="panelCtor"
				:is="panelCtor"
				:name="name"
				:flags="flags"
				:store="store"
				@edited="_onEdit"
			/>
			<slot />
		</div>
	</div>
</template>

<script>
	
	import {uid} from '../cmon-js/utils';
	import closeImg from '../img/closetab.png';
	
	export default {
		components: {},
		
		provide: function(){
			const me = this;
			return {
				getTab: function(){
					return me;
				}
			}
		},
		
		props: {
			tabsname: String,
			name: String,
			store: Object,
			icon: String,
			panelCtor: String,
			flags: Number,
			taborder: Number,

			//edited: Boolean,
			selected: {type: Boolean, default: false},
			draggable: {type: Boolean, default: true},
			closable: {type: Boolean, default: false},
		},
		
		computed: {
			label: function () {
				return this.name.split(/(?=[A-Z])/).join(' ') + (this.mEdited ? ' *' : '');
			}
		},

		data: function(){
			return {
				closeImg: closeImg,
				id: uid(),
				mEdited: false,
			}
		},
		
		methods: {
			_onClose: function(evt){
				this.close(evt);
				if(this.mEdited){
					alert('edited');
				}
			},
			
			_onClick: function(evt){
				//console.log("click", this.$parent);
				this.$emit('focus', this, evt);
			},
			
			_onEdit: function(){
				this.mEdited = true;
				this.$emit('edited', this);
			},

			
			close: function(evt){
				console.log('close', this);
				this.$emit('close', this, evt);
			},
			
			select: function(){
				const me = this;
				this.$nextTick(function(){
					me.$el.querySelector('label').click();
				});
			},

			onKeyDown: function(evt){
				//console.log('keydown', evt);
				switch(evt.keyCode){
					case 90: // ctrl+Z
						if(!evt.ctrlKey)
							return;
						this.undo(evt);
						return true;
						break;
						
					case 89: // ctrl+Y
						if(!evt.ctrlKey)
							return;
						this.redo(evt);
						return true;
						break;
				}
			},
						
			allowDrop: function(evt){
				//console.log('allowDrop', evt);
				evt.preventDefault();
				evt.dataTransfer.dropEffect = "copy";
			},

			onDragStart: function(evt){
				evt.dataTransfer.setData("text/plain", "https://www.mozilla.org");
				this.$parent._onDragStart(this, evt);
			},
			
			onDragEnd: function(evt){
				//console.log('dragend');
				this.$el.querySelector('label').style.display = "inline-block";
				//this.$parent.onDragEnd(this, evt);
			},
			
			onDrop: function(evt){
				evt.preventDefault();
				evt.stopPropagation();
				console.log('->', '+' + evt.dataTransfer.getData('text/plain') + '+');
				return false;
				//this.$parent.onDrop(this, evt);
			},
		},
	}
</script>

<style>
	.tabs > .tab {
		/*float: left;*/
		display: inline-block;
		outline: none;
	}
	.tabs > .tab > label {
		background-color: var(--bg-middle-color);
		color: var(--text-color);

		padding: 4px 10px 4px 10px;
		display:block;
		min-width:60px;
		margin-left: 1px;
		position: relative;
		left: 1px; 
		border-radius: 7px 7px 0 0;
		font-size: 13px;
		font-family: Arial, Helvetica, sans-serif;
	}
	
	.tabs > .tab > label > img:first-child {
		vertical-align:bottom;
		padding-right:5px;
	}
	
	.tabs > .tab > label > img:last-child {
		padding-top: 5px;
		padding-left: 7px;
		float: right;
	}

	.tabs > .tab [type=radio] {
		display: none;   
	}
	
	.tabs > .tab > .content {
		border: 1px solid var(--bg-light-color);
		color: var(--text-color);
		
		position: absolute;
		left: 0;
		top: 23px;
		right: 0;
		bottom: 1px;
		opacity: 0;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		overflow: hidden;
	}

	.tabs > .tab > input[type=radio]:checked ~ label {
		background-color: var(--selected-bg-color);
		color: var(--selected-text-color);
	}
	
	.tabs > .tab input[type=radio]:checked ~ .content {
		z-index: 1;
		opacity: 1;
	}
</style>