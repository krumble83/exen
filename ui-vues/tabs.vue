<template>
	<div class="tabs" :id="id">
		<slot name="begin" />
		<component v-for="tab in tabs"
			:is="tab.tabCtor ? tab.tabCtor : 'defaultTab'"
			:tabindex="$hasFlag('F_FOCUSABLE') ? '-1' : ''"
			:tabsname="mId"
			@focus="onTabClick"
			@close="onTabClose"
			@edited="onEdited"
			v-bind="tab"
			:ref="tab.name"
		>
		<slot />
		</component>
	</div>
</template>

<script>
	import defaultTab from './tabs.tab.vue';
	import _ from 'amd!lodash';

	export default {
		components: { defaultTab },
		
		props: {
			id: String,
			name: String,
			flags: Number,
			tabs: {type: Array, default: function(){return []}},
			//closable: Boolean,
			//storeobject: String,
		},
		
		data: function(){
			return {
				mId: this.id || this.$uid(),
				selected: false,
				dndItem: false,
				dndProxy: false,
			}
		},
		
	
		methods: {
			onTabClick: function(tab, evt){
				this.selected = tab;
				this.$emit('tab:focus', tab, evt);
			},

			onTabClose: function(tab, evt){
				this.$emit('tab:close', tab, evt);
			},
			
			onEdited: function(item){
				this.$emit('tab:edited', item);
			},

			closeTab: function(tab){
				tab.close();
			},
			
			getSelected: function(){
				return this.selected;
				
			},
			
			getTab: function(data){
				if(typeof data == 'string')
					return this.$children.find(tab => tab.name == data);
				else if(data && data.name)
					return this.$children.find(tab => tab.name == data.name);
				console.assert(false);
			},
			
			selectTab: function(tab){
				if(typeof tab == 'string')
					tab = this.$children.find(item => item.name == tab);
				console.assert(tab);
				tab.select();
			},
			
			onDragStart: function(item, evt){
				//console.log('startDrag', item, evt);
				evt.dataTransfer.setData('text/plain', '');
				this.dndItem = item;
				setTimeout(function(){
					item.$el.querySelector('label').style.display = "none";
				}, 10);
				if(!this.dndProxy){
					this.dndProxy = document.createElement('div');
					this.dndProxy.style.width = '5px';
					this.dndProxy.style.height = '20px';
					this.dndProxy.style.backgroundColor = '#f00';
					this.dndProxy.className = 'tab';
				}
			},

			onDragOver: function(item, evt){
				//console.log(this.$el.offsetLeft, evt.clientX);
				//console.log(this.$el.contains(item.$el));
				if(!this.$children.find(item => item.$el = this.dndItem.$el))
					return;
				
				if(evt.clientX > (item.$el.offsetLeft + (item.$el.clientWidth /2))){
					if(item.$el.nextSibling)
						this.$el.insertBefore(this.dndProxy, item.$el.nextSibling);
					else
						this.$el.appendChild(this.dndProxy);
				}
				else
					this.$el.insertBefore(this.dndProxy, item.$el);
			},
			
			onDrop: function(item, evt){
				if(!this.$children.find(item => item.$el = this.dndItem.$el))
					return;
				return;


				if(evt.clientX > (item.$el.offsetLeft + (item.$el.clientWidth /2))){
					if(item.$el.nextSibling)
						this.$el.insertBefore(this.dndProxy, item.$el.nextSibling);
					else
						this.$el.appendChild(this.dndProxy);
				}
				else
					this.$el.insertBefore(this.dndProxy, item.$el);				
			},

			onDragEnd: function(evt){
				//console.log('dragend');
				this.$el.removeChild(this.dndProxy);
				//this.dndProxy = false;
			},			
		}
	
	}
</script>

<style>
	.tabs {
		
		position: relative;
		height: 100%;
		white-space: nowrap;
		
	}
</style>