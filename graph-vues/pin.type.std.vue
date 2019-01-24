<template functional>
	<template v-if="props.type == 'output'">
		<circle v-if="!props.isarray" cx="-13" :cy="props.mHeight/2" r="5" :stroke="props.color" :fill="props.color" class="pin" ref="pin" />
		<rect v-if="props.isarray" x="-19" y="4" width="10" height="11" class="pin exArray" ref="pin" :stroke="props.color" stroke-width="4" :fill="'url(#pinArrayPattern' + props.color.replace('#', '_') + ')'" />
		<text x="19" y="14" id="zz" transform="translate(-47)" text-anchor="end" class="label" ref="label">{{props.label}}</text>
	</template>
	<template v-else>
		<circle v-if="!isarray" cx="13" cy="10" r="5" :stroke="color" :fill="color" class="pin" ref="pin" />
		<rect x="8" y="4" v-if="isarray" width="11" height="10" class="pin exArray" ref="pin" :stroke="color" stroke-width="4" :fill="'url(#pinArrayPattern' + color.replace('#', '_') + ')'" />
		<text x="26" y="14" class="label" ref="label">{{label}}</text>
	</template>

</template>