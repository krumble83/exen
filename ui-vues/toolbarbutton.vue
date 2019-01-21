<template>
	<button class="uiTbButton" type="button" :title="title" :class="classObject" @click="doAction"><div class="icon" :style="'background-image:url(\'' + img + '\')'"></div>{{label}}</button>
</template>

<script>

	export default {
		props: {
			label: String,
			img: String,
			title: String,
			toggle: Number,
			action: String,
			disabled: Boolean,
		},
		
		data: function(){
			return {
				classObject: {
					checked: false,
					disabled: this.disabled,
				},
			}
			
		},
		
		methods: {
			doAction: function(){				
				if(this.toggle == 1){					
					if(this.classObject.checked){
						this.classObject.checked = false;
						this.$parent[this.action]();
					}
					else {
						this.classObject.checked = true;
						this.$parent[this.action](true);						
					}
				}
				else
					this.$parent[this.action]();
			}
		}
	}
	
</script>

<style>
	.uiTbButton:first-child { 
		border-radius: 7px 0 0 7px;
	}

	.uiTbButton{
		height: 100%;
		background-color: #3e3e3e;
		border: none;
		color: #fff;
		display: inline-block;
		margin: 0;
		min-width: 60px;
	}

	.uiTbButton:hover{
		background-color: #dea309;
	}

	.uiTbButton div{
		background-position: 50% 50%;
		background-repeat: no-repeat;
		width: 100%;
		height: 32px;
	}

	.uiTbButton.checked {
		background-color: #dea309;
	}
	
	.uiTbButton.disabled {
		-webkit-filter: grayscale(100%);
		filter: grayscale(100%);
		pointer-events: none;
	}
	
</style>