<template>
	<div class="tab">
		<input type="radio" :id="id" :name="tabsname" @click.stop="onClick" :checked="checked">
		<label 
			:for="id" 
			draggable="true" 
			@dragover="allowDrop" 
			
			ondragstart="event.dataTransfer.setData('text/plain', 'rrrrr')"
			ondrop="console.log(event.dataTransfer.getData('text/plain'))"

		>
			<img 
				:src="icon" 
			/>
			<span>{{label}}</span>
			<img 
				v-if="$hasFlag('F_CLOSABLE')" 
				:src="closeImg" 
				class="close" 
				@click.stop.capture="onClose" 
			/>
		</label>
		<div 
			class="content"
		>
			<component
				v-if="panelCtor"
				:is="panelCtor"
				:name="name"
				:flags="flags"
				:store="store"
				@edited="onEdit"
			/>
			<slot />
		</div>
	</div>
</template>

<script>
	
	import closeImg from '../ui-img/closetab.png';
	
	export default {
		components: {},
		
		provide: function(){
			const me = this;
			return {
				getFile: function(){
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
			checked: {type: String, default:""},
			//closable: Boolean,
			},
		

		
		computed: {
			label: function () {
				return this.name.split(/(?=[A-Z])/).join(' ') + (this.mEdited ? ' *' : '');
			}
		},

		data: function(){
			return {
				closeImg: closeImg,
				id: this.$uid(),
				mEdited: false,
			}
		},
		
		methods: {
			onClose: function(evt){
				console.log('close', this);
				this.$emit('close', this, evt);
				//this.close();
				//this.$parent.closeTab(this);
			},
			
			onClick: function(evt){
				//console.log("click", this.$parent);
				this.$emit('focus', this, evt);
			},
			
			onEdit: function(){
				this.mEdited = true;
				this.$emit('edited', this);
			},

			/*
			close: function(){
				console.log('closeTAb', this);
				this.$store.commit('updateComponent', {name: this.name, props: {tabOrder: 0}});
				//this.store.test();
				//this._data.tabOrder = 0;
			},
			*/
			select: function(){
				//console.log(this);
				const me = this;
				this.$nextTick(function(){
					me.$el.querySelector('label').click();
				});
			},
			/*
			undo: function(evt){
				console.log('undo - ' + this.name);
			},
			
			redo: function(evt){
				console.log('redo - ' + this.name);
			},
			
			onModify: function(){
				
			},
			*/
			onKeyDown: function(evt){
				//console.log('keydown', evt);
				switch(evt.keyCode){
					case 90:
						if(!evt.ctrlKey)
							return;
						this.undo(evt);
						return true;
						break;
						
					case 89:
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
				this.$parent.onDragStart(this, evt);
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
		float: left;
		display: inline-block;
		outline: none;
	}
	.tabs > .tab > label {
		background-color: #434343;
		padding: 4px 10px 4px 10px;
		display:block;
		min-width:60px;
		margin-left: 1px;
		position: relative;
		left: 1px; 
		/*top: -24px;*/
		border-radius: 7px 7px 0 0;
		color: white;
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
		position: absolute;
		left: 0;
		top: 23px;
		right: 0;
		bottom: 1px;
		border: 1px solid #606060;
		opacity: 0;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		overflow: hidden;
	}
	.tabs > .tab > input[type=radio]:checked ~ label {
		background: #606060;
		/*z-index: 2;*/
	}
	.tabs > .tab input[type=radio]:checked ~ .content {
		z-index: 1;
		opacity: 1;
	}
</style>