<template>
	<div id="app">
		<uitabs 
			id="maintabs"
			:tabs="tabs"
			ref="tabs"
		>
			<component 
				slot="begin"
				is="defaultTab"
				name="Menu"
				:draggable="false"
				:selected="true"
			>
				<component
					is="MainPanel"
				/>			
			</component>
		</uitabs>
	</div>
</template>

<script>

	//import AppStore from '../store/store.js'
	//var store = new Vuex.Store(AppStore);
	
	import MainPanel from './panel.main.vue';
	import MailingPanel from './panel.mailing.vue';
	
	import uitabs from './tabs.vue';
	import defaultTab from './tabs.tab.vue';
	
	const preventContext = function (evt){
		evt.preventDefault();
	}
	
	export default {
		components: {uitabs, defaultTab, MainPanel},
		mixins: [],
		el: '#app',
		//store,
		
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
						callback(this.$refs.tabs.$children[this.$refs.tabs.$children.length-1]);
					});
				}
			}
		},
	}
	
	
</script>

<style>

	#maintabs > .tab > label{
		border-radius: 9px 7px 0 0;
		background-color: transparent ;
		line-height: 30px;
		padding-top: 0;
		height: 0;
		border-bottom: 24px solid var(--bg-middle-color);
		border-left: 7px solid transparent;
		border-right: 7px solid transparent;		
	}
	
	#maintabs.tabs > .tab > .content {
		top: 27px;
	}

	#maintabs.tabs > .tab > input[type=radio]:checked ~ label {
		border-bottom: 24px solid #606060;
	}

	#maintabs.tabs > .tab > label > img:first-child {
		padding-top: 0;
		padding-bottom: 6px;
	}

	#maintabs.tabs > .tab > label > img:last-child {
		padding-top: 12px;
		padding-left: 10px;
		float: right;
	}

</style>