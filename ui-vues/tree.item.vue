<template functional>
	<li :draggable="props.draggable"
		class="child"
		:name="props.name" 
		:flags="props.flags"
		@click.stop.left="props.onClick($event,props.id)"
		@contextmenu.stop.prevent="props.onContext($event,props.id)"
		@dblclick="props.onDblClick($event,props.id)"
		@mouseenter.stop=""
		@mousemove.stop=""
	>
		<span><img :src="props.img">&nbsp;{{props.name}}</span>
	</li>
</template>

<style>

</style>