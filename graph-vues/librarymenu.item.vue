<template functional>
	<li v-if="props.childs && props.childs.length">
		<input type="checkbox" :id="'folder_' + props.name" :checked="parent.mQuery && parent.mQuery.searchString.length ? 'checked' : ''">
		<label :for="'folder_' + props.name">{{props.name}}</label>
		<ul>
			<component is="Item" v-for="(itemx, idx) in parent._sort(props.childs)" v-bind="itemx" />
		</ul>
	</li>	
	<li v-else :data-id="props.id" :child="1" :title="props.tooltip" >
		<img :src="props.symbol" />&nbsp;{{parent.mQuery && parent.mQuery.searchString.length ? props.name.replace(parent.mQuery.searchString, '-' + parent.mQuery.searchString + '-') : props.name}}
	</li>
</template>
