<template>
	<div class="tab" :name="name">
		<input type="radio" :id="'tab_' + name" name="tab-group" :checked="checked">
		<label :for="'tab_' + name"><img :src="img" style="vertical-align:bottom;padding-right:5px;" /><span>{{name}}</span><img v-if="closable" :src="closeImg" @click.stop="close" style="padding-top:5px;padding-left:7px;float:right" /></label>
		<div :id="'tab_' + name + '_content'" class="content"><slot /></div>
	</div>
</template>

<script>
	import {genUid} from '../utils'
	
	import closeImg from '../ui-img/closetab.png';

	export default {
		props: {
			name: {},
			img: String,
			closable: Boolean,
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