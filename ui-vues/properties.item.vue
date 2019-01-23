<template functional>
	<li 
		class="child"
		:name="props.name" 
		:flags="props.flags"
	>
		<span><img :src="img">&nbsp;{{props.name}}</span>
	</li>
</template>
