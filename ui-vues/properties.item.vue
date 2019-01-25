<template functional>
	<li 
		class="child props"
		:name="props.name||props.index"
	>
		<div class="label" :style="'width:' + props.labelwidth + 'px'">{{props.name}}<img /></div>
		<div v-if="props.editor" class="editor">
			<component :is="props.editor.ctor" :success="props.editor.success"></component>
		</div>
	</li>
</template>


<style>

	.uiTree li.child.props .label{
		display:inline-block;
		padding-left: 10px;
	}
	
	.uiTree li.child.props .label img {
		width:2px;
		height:16px;
		float:right;
		cursor:col-resize;
		pointer-events:all;
		background-color: #222;
	}
	
	.uiTree li.child.props .editor {
		display:inline-block;
	}
	
	.uiTree li.child.props input.editor {
		position: static !important;
		padding: 0;
		margin-top: -1px;
		pointer-events: all;
		background-color: #e7e7e7;
		border: 1px solid #444;
		border-radius: 0;
		height: 16px;
		font-size: 12px;
		outline: none;
		width: 100%;
		-webkit-user-select: auto;
		-moz-user-select: auto;
		-ms-user-select: auto;
		user-select: auto;	
	}
</style>