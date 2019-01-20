<template>
	<button class="uiTbButton" type="button" :title="title" :toggle="toggle" @click="doAction"><div class="icon" :style="'background-image:url(\'' + img + '\')'"></div>{{label}}</button>
</template>

<script>

	export default {
		props: {
			label: String,
			img: String,
			title: String,
			toggle: Number,
			action: String,
		},
		
		methods: {
			doAction: function(){
				this.$parent[this.action]();
			}
		}
	}
	
</script>
