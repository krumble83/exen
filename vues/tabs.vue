<template>
	<div :class="classObject" :id="mId">
		<slot name="begin" />
		<component v-for="tab in tabs"
			:is="tab.tabCtor ? tab.tabCtor : 'defaultTab'"
			:tabsname="mId"
			@focus="_onTabClick"
			@close="_onTabClose"
			@edited="_onEdited"
			v-bind="tab"
			:ref="tab.name"
		>
		<slot />
		</component>
	</div>
</template>

<script>

	import {uid} from '../cmon-js/utils';

	import defaultTab from './tabs.tab.vue';

	export default {
		components: {defaultTab},
		
		props: {
			id: String,
			name: String,
			flags: Number,
			tabs: {type: Array, default: function(){return []}},
		},
		
		data: function(){
			return {
				classObject: {
					tabs: true,
				},
				mId: this.id || uid(),
				selected: false,
				dndItem: false,
				dndProxy: false,
			}
		},
		
	
		methods: {
			
			add: function(){
				
			},

			closeTab: function(tab){
				tab.close();
			},
			
			getSelected: function(){
				return this.selected;
				
			},
			
			get: function(data){
				if(typeof data == 'string')
					return this.$children.find(tab => tab.name == data);
				else if(data && data.name)
					return this.$children.find(tab => tab.name == data.name);
				console.assert(false);
			},
			
			getTab: function(data){
				console.warn('deprecated');
				if(typeof data == 'string')
					return this.$children.find(tab => tab.name == data);
				else if(data && data.name)
					return this.$children.find(tab => tab.name == data.name);
				console.assert(false);
			},
			
			select: function(tab){
				if(typeof tab == 'string')
					tab = this.getTab(tab);
				console.assert(tab);
				tab.select();
			},
			
			_onTabClick: function(tab, evt){
				this.selected = tab;
				this.$emit('tab:focus', tab, evt);
			},

			_onTabClose: function(tab, evt){
				this.$emit('tab:close', tab, evt);
			},
			
			_onEdited: function(item){
				this.$emit('tab:edited', item);
			},

			_onDragStart: function(item, evt){
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
/*
			_onDragOver: function(item, evt){
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
			
			_onDrop: function(item, evt){
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

			_onDragEnd: function(evt){
				//console.log('dragend');
				this.$el.removeChild(this.dndProxy);
				//this.dndProxy = false;
			},
*/
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