<template>
	<div class="tabsinfo">
		<div v-for="tab in tabs" class="tab" :name="tab.name">
			<input type="radio" :id="'tabinfo_' + tab.name" name="tabinfo-group" :checked="tab.checked">
			<label :for="'tabinfo_' + tab.name"><img :src="tab.img" style="vertical-align:bottom;padding-right:5px;" /><span>{{tab.name}}</span><img v-if="tab.closable" :src="closeImg" @click.stop="close" style="padding-top:5px;padding-left:7px;float:right" /></label>
			<div :id="'tabinfo_' + tab.name + '_content'" class="content">{{tab.name}}</div>
		</div>
	</div>
</template>

<script>
	import closeImg from '../ui-img/closetab.png';

	export default {
		props: {
			name: {},
			img: String,
			closable: Boolean,
			edited: Boolean,
			data: {},
		},
		
		data: function(){
			return {
				closeImg: closeImg,
				checked: false,
				tabs: [],
			}
		}
	
	}

</script>

<style>
	.tabsinfo {
		position: relative;
		clear: both;
		height: 100%;
	}
	
	.tabsinfo .tab {
		float: left;
	   
	}
	.tabsinfo .tab label {
		background-color: #434343;
		padding: 4px 10px 4px 10px; 
		/*border: 1px solid #ccc; */
		display:block;
		min-width:60px;
		margin-left: -1px; 
		position: relative;
		left: 1px; 
		top: -24px;
		border-radius: 7px 7px 0 0;
		color: white;
		font-size: 12px;
		/*-webkit-transition: background-color .17s linear;*/
	}

	.tabsinfo .tab [type=radio] {
		display: none;   
	}
	.tabsinfo .content {
		position: absolute;
		top: -1px;
		left: 0;
		/*background: white;*/
		right: 0;
		bottom: 1px;
		/*padding: 20px;*/
		border: 1px solid #606060; 
		/*-webkit-transition: opacity .6s linear;*/
		opacity: 0;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;  
	}
	.tabsinfo .tab input[type=radio]:checked ~ label {
		background: #606060;
		/*border-bottom: 1px solid white;*/
		z-index: 2;
	}
	.tabsinfo .tab input[type=radio]:checked ~ label ~ .content {
		z-index: 1;
		opacity: 1;
	}
</style>