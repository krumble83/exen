<template>
	<div></div>
</template>

<script>

	//import AppStore from '../store/store.js'
	//var store = new Vuex.Store(AppStore);
		
	//import QuotationPanel from './panel.quotation.vue';
	
	import Tabs from '../../../tabs.vue';
	//import defaultTab from './tabs.tab.vue';
	
	export default {
		//components: {uitabs},

	}
	
	
</script>

<style>

	#projecttabs > .tab > label{
		border-radius: 9px 7px 0 0;
		background-color: transparent ;
		line-height: 30px;
		padding-top: 0;
		height: 0;
		border-bottom: 24px solid var(--bg-middle-color);
		border-left: 7px solid transparent;
		border-right: 7px solid transparent;		
	}
	
	#projecttabs.tabs > .tab > .content {
		top: 27px;
	}

	#projecttabs.tabs > .tab > input[type=radio]:checked ~ label {
		border-bottom: 24px solid #606060;
		/*z-index: 2;*/
	}

	#projecttabs.tabs > .tab > label > img:first-child {
		padding-top: 0;
		padding-bottom: 6px;
	}

	#projecttabs.tabs > .tab > label > img:last-child {
		padding-top: 12px;
		padding-left: 10px;
		float: right;
	}

</style>