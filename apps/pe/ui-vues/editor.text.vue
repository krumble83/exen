<template functional>
	<input class="rowEditor" :name="props.name" :pattern="props.pattern" :value="props.value" :style="props.stylez" :required="props.required" @keyup="parent.onRowKeyup" >
</template>

<style>
	.rowEditor{
		border: none;
	}

	.rowEditor:invalid {
		background-color: #f99;
	}
</style>