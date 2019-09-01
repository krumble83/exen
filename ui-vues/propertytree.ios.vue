<template>
	<ul class="uiTree properties">
		<li style="width:100%" class="main">
			<input type="checkbox" :id="'folder_' + uid" checked="true">
			<div v-if="button" 
				:class="{add: true, disabled: button.disabled}" 
				@click.stop.prevent="btnClick"
			>
				<img src="ui-img/add.png" />
				<span>{{button.text}}</span>
			</div>
			<label :for="'folder_' + uid">{{label}}</label>
			<ul>
				<component v-for="(it,id) in childs" :key="id"
					:is="it.ctor ? it.ctor : 'treeitemios'"
					v-show="!it.name.startsWith('@')"
					v-bind="it"
					:item="item"
					:type="dataid"
					:obj="it"
					:storeSetter="storeSetter"
					:storeGetter="storeGetter"
				>
				</component>
			</ul>
		</li>
		<li class="sep"></li>
	</ul>
</template>

<script>

	import treeitemios from './propertytree.item.ios.vue';

	export default {
		components: {treeitemios},
		props: {
			label: String,
			button: {},

			item: Object,
			dataid: String,
			storeGetter: String,
			storeSetter: String,
		},
		
		data: function(){
			return {
				uid: this.$uid(),
			}
		},
		
		computed: {
			childs: function(){
				//console.log('*-*-', this.dataid, this.item);
				if(this.storeGetter && this.item.store)
					return this.item.store.getters[this.storeGetter]();
				if(this.dataid && this.item.store)
					return this.item.store.getters.Datas[this.dataid];
					//return this.item.datas[this.dataid].filter(it => !it.name.startsWith('@'));
				return [];
			},
		},
		
		watch: {
		},
		
		mounted: function(){
		},
		
		methods: {
			
			btnClick: function(evt){
				this.$parent.$emit('button:' + this.button.action, this.item);
			},
		}
	}
</script>

<style>

</style>