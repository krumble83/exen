<template functional>
	<li v-if="props.childs && props.childs.length">
		<input type="checkbox" :id="'folder_' + props.id">
		<label :for="'folder_' + props.id">{{props.id}}</label>
		<ul>
			<component is="Item" v-for="(itemx, idx) in parent._sort(props.childs)" v-bind="itemx" />
		</ul>
	</li>	
	<li v-else :data-id="props.id" :child="1" :title="props.tooltip" >
		<img :src="props.symbol" />&nbsp;{{props.name}}
	</li>
</template>
