<template functional>
	<polygon 
		class="exPinExec" 
		:fill="parent.cColor"
		points="2,4 6,4 14,10 6,16 2,16" 
		:transform="parent.type == parent.$flag('F_OUTPUT') ? 'translate(-23)' : 'translate(5)'" 
		ref="pin"
	></polygon>
</template>

<style>
	.exWorksheet .exNode .exPin polygon.exPinExec{
		fill: #fff;
		pointer-events: none;
	}	
</style>
