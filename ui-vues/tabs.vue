<template>
	<div class="tabs">
		<component v-for="tab in orderedTabs"
			v-if="tab.tabOrder > 0"
			:is="tab.ctor ? tab.ctor : 'uigraphtab'"
			:closable="closable"
			@click="tabClick"
			v-bind="tab"
		>
		</component>
	</div>
</template>

<script>
	import {genUid} from '../utils';
	import uigraphtab from './tab.graph.vue';
	import _ from 'amd!lodash';

	export default {
		components: { uigraphtab },
		props: {
			id: {},
			name: {},
			closable: Boolean,
		},
		
		data: function(){
			return {
				mId: this.id || genUid()
			}
		},
		
		computed: {
			tabs: function(){return this.$store.state.graphs},
			
			orderedTabs: function () {
				return _.orderBy(this.tabs, 'tabOrder')
			}
		},
		
		created: function(){
		},
		
		methods: {
			closeTab: function(tab){
				console.log(tab);
				this.$parent.closeTab(tab);
				//this.$children[this.$children.length].checked
			},
			
			getTab: function(data){
				return this.tabs.find(tab => tab.name == data.name);
			},
			
			focusTab: function(data){
				var me = this;
				this.$children.forEach(function(el){
					if(el.name == data.name){
						el.checked = true;
						me.$emit('tab:focus');
					}
				});
			},
			
			tabClick: function(evt){
				this.$emit('tab:focus');
				console.log('tabClick');
			}
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