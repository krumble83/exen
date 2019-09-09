<script>
	import ExPinWildcards from './pin.sub.wildcards.vue';
	
	export default {
		extends : ExPinWildcards,
		
		props: {
			datatype: {type: String, default: 'core.wildcards'},
			flags: {type: Number, default: F_INPUT|F_OUTPUT},
		}
	};

</script>

<style>

</style>
