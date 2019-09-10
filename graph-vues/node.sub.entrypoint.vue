<script>

import ExNode from './node.vue';

export default {
	extends: ExNode,
	
	computed: {
		cInputs: function(){
			return this.inputs;
			
		},
		cOutputs: function(){
			return this.outputs;
		},
	},
}

</script>