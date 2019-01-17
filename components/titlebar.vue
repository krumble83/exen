<template functional>
	<g class="exTitlebar">
		<rect width="100%" height="40" />
		<text x="100" y="25" stroke="#fff">
			<tspan>{{props.title}}</tspan>
		</text>
		<slot name="buttons" />
	</g>
</template>

<style>

	.exTitlebar text {
		font-family: "Helvetica, Arial, sans-serif";
	}

</style>