<template>
	<li 
		class="child"
		:name="name" 
		:flags="flags"
	>
		<span><img :src="img">&nbsp;{{name}}</span>
	</li>
</template>

<script>
	export default {
		props: {
			ctor: String,
			name: String,
			flags: Number,
			img: String
		}
	}
</script>

<style>

</style>