<template functional>
	<g class="exTitlebar">
		<rect width="100%" height="40" />
		<g>
			<slot name="buttons">
				<image v-for="(button,idx) in props.toolbuttons"  :key="idx" 
					width="32" 
					:href="button.img" 
					height="32"
					x="15"
					y="3" 
					class="button"
					:class="button.classObject" 
					:style="button.styleObject" 
					slot="buttons"
					@mousedown.left.stop=""
					@click.stop="props.doToolbarAction(idx)"
					v-inline.horizontal="idx == 0 ? 30 : 10"
				>
					<title>{{button.title}}</title>
				</image>
			</slot>
			<text y="25" stroke="#fff" x="0" v-inline.horizontal="20">{{props.title}}</text>
		</g>
	</g>
</template>
