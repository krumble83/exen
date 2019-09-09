<template>
	<rect 
		class="mouseBorder" 
		x="0" 
		y="0" 
		width="100%" 
		height="100%" 
		:stroke-width="strokeWidth"
		@mousemove="_onMouseMove"
	/>

</template>

<script>

export default {
	inject: ['Worksheet'],
	props: {
		strokeWidth : {Number, default: 40},
	},
	
	methods: {
		_onMouseMove: function(evt){
			const me = this;

			if(!evt.buttons == 1 || !me.Worksheet.mPanzoom)
				return;

			//console.log(this.$el.width.baseVal.value);
			if(evt.layerX <= me.strokeWidth){
				//console.log('left');
				me.Worksheet.mPanzoom.panBy({x:10, y:0});
			}
			else if(evt.layerX > this.$el.width.baseVal.value - me.strokeWidth){
				//console.log('right');				
				me.Worksheet.mPanzoom.panBy({x:-10, y:0});
			}

			if(evt.layerY <= me.strokeWidth){
				//console.log('top');
				me.Worksheet.mPanzoom.panBy({x:0, y:10});
			}
			else if(evt.layerY > this.$el.height.baseVal.value - me.strokeWidth){
				//console.log('bottom');				
				me.Worksheet.mPanzoom.panBy({x:0, y:-10});
			}

		}
	}
}

</script>

<style>
	.exWorksheet .mouseBorder {
		stroke: #f00;
		stroke-opacity: 0.03;
		fill-opacity: 0;
		pointer-events: stroke
	}
</style>