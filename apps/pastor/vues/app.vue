<template>
	<div id="app">
		<Layout style="width:100%;height:100%;">
			<LayoutPanel region="north" style="height:20px;">
				<div class="title">North Region</div>
			</LayoutPanel>
			<LayoutPanel region="west" style="width:120px;" :split="true">
				<div class="title">West Region</div>
			</LayoutPanel>
			<LayoutPanel region="east" style="width:120px;">
				<div class="title">East Region</div>
			</LayoutPanel>
			<LayoutPanel region="center" style="height:100%">
				<Tabs style="width:100%;height:100%" ref="tabs" :justified="true">
					<TabPanel title="Menu">
						<MainPanel />
					</TabPanel>
					<TabPanel 
						v-for="tab in tabs"
						v-bind="tab"
					>
						<component v-if="tab.panelCtor" :is="tab.panelCtor" />
					</TabPanel>
				</Tabs>
			</LayoutPanel>
		</Layout>
	</div>
</template>
<script>

	import MainPanel from './panel.main.vue'
	import CustomersPanel from './panel.customers.vue'

	const preventContext = function (evt){
		evt.preventDefault();
	}
	
    export default {
		el: '#app',
		components: {MainPanel,CustomersPanel},
		
		provide: function(){
			const me = this;
			return {
				App: me,
			}
		},

		data: function(){
			return {
				tabs: [],
			}
		},
		
		computed: {
			Tabs: function(){return this.$refs.tabs;}
		},
		
		mounted: function(){
			document.addEventListener('contextmenu', preventContext);
		},
		
		beforeDestroy: function(){
			document.removeEventListener('contextmenu', preventContext);
		},
		
		methods: {
			addTab: function(tab, callback){
				this.tabs.push(tab);
				if(typeof callback == 'function'){
					this.$nextTick(function(){
						console.log(this.$refs.tabs);
						callback(this.$refs.tabs.panels[this.$refs.tabs.panels.length-1]);
					});
				}
			},
			
			selectTab: function(tab){
				const p = (typeof tab == 'string' ) ? this.$refs.tabs.panels.find(pan => pan.title == tab) : tab
					, id = this.$refs.tabs.panels.indexOf(p);
				//var id = this.$refs.tabs.getPanelIndex(title);
				console.log(id);
				this.$refs.tabs.select(id);
			}
		},
    }
</script>
<style>
#app {
	width: 100%;
	height: 100%;
}