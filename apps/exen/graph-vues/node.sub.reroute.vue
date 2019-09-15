<template>
	<svg
		:class="classObject"
		:style="styleObject"
		:id="uid"
		:x="mX" 
		:y="mY" 
		:width="mWidth" 
		:height="mHeight" 
		overflow="visible"
		@click.stop="$emit('mouse:click', $event)" 
		@mousedown.left.stop="$emit('mouse:leftdown', $event)" 
		@mouseup.left="$emit('mouse:leftup', $event)" 
		@mouseup.right="$emit('mouse:rightup', $event)" 
		@mouseenter="$emit('mouse:enter', $event)" 
		@mouseleave="$emit('mouse:leave', $event)" 
		@contextmenu.prevent.stop="$emit('mouse:cmenu', $event)"
	>
		<rect class="body" x="0" y="0" width="100%" height="100%" />
		<g transform="translate(30,2)">
			<component  
				class="input"
				is="PinReroute" 
				@resize="$emit('pin:resize', $event)"
				name="@io"
			/>
		</g>
	</svg>
</template>

<script>
	import ExNode from './node.vue';
	import PinReroute from './pin.sub.reroute.vue';
	
	export default {
		extends: ExNode,
		components: {PinReroute},
		props: {
			x: Number,
			y: Number,
			width: {type: Number, default: 35}, 
			height: {type: Number, default: 25}
		},

		data: function() {
			return {
				classObject: {
					reroute: true,
				},
			}
		},
		
		mounted: function(){
		},
		
		methods: {
			update: function(nextTick){
				
			},
			
			splitLink: function(link){
				
			}
		}
		
	}
</script>

<style>
	.exWorksheet .exNode.reroute > rect.body{
		/*fill: #fff;*/
		stroke-width: 0;
		rx: 15;
		ry: 15;
		pointer-events: all;
	}

</style>