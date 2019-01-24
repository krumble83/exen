<template>
	<div class="tab" :name="name">
		<input type="radio" :id="'tab_' + name" name="tab-group" :checked="checked">
		<label :for="'tab_' + name"><img :src="img" style="vertical-align:bottom;padding-right:5px;" /><span>{{name}}<span v-if="edited">&nbsp;*</span></span><img v-if="closable" :src="closeImg" @click.stop="close" style="padding-top:5px;padding-left:7px;float:right" /></label>
		<div :id="'tab_' + name + '_content'" class="content">
			{{name}}<slot />
		</div>
	</div>
</template>

<script>
	//import {genUid} from '../utils'
	
	import closeImg from '../ui-img/closetab.png';

	export default {
		props: {
			name: {},
			img: String,
			closable: Boolean,
			edited: Boolean,
			data: {},
			$data: {},
			props: {},
			$tabOrder: {},
		},
		
		data: function(){
			return {
				closeImg: closeImg,
				checked: false,
			}
		},
		
		methods: {
			close: function(){
				//console.log(this);
				this.$parent.closeTab(this);
			}
		}
	}
</script>

<style>
	.tabs .tab {
		/*float: left;*/
		display: inline-block;
	}
	.tabs .tab label {
		background-color: #434343;
		padding: 4px 10px 4px 10px;
		display:block;
		min-width:60px;
		margin-left: -1px; 
		position: relative;
		left: 1px; 
		top: -24px;
		border-radius: 7px 7px 0 0;
		color: white;
		font-size: 12px;
	}

	.tabs .tab [type=radio] {
		display: none;   
	}
	.tabs .content {
		position: absolute;
		top: -1px;
		left: 0;
		right: 0;
		bottom: 1px;
		border: 1px solid #606060;
		opacity: 0;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;  
	}
	.tabs .tab input[type=radio]:checked ~ label {
		background: #606060;
		/*z-index: 2;*/
	}
	.tabs .tab input[type=radio]:checked ~ label ~ .content {
		/*z-index: 1;*/
		opacity: 1;
	}
</style>