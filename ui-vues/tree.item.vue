<template functional>
	<li :draggable="props.draggable"
		class="child"
		:name="props.name" 
		:flags="props.flags"
		:index="props.index"
		@click.stop.left="props.onClick($event,props.index)"
		@contextmenu.stop.prevent="props.onContext($event,props.index)"
		@dblclick="props.onDblClick($event,props.index)"
		@mouseenter.stop=""
		@mousemove.stop=""
	>
		<span><img :src="props.img">&nbsp;{{props.name}}</span>
	</li>
</template>

<style>

</style>