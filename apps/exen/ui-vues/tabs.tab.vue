
<script>

import Tab from '../../../vues/tabs.tab.vue';

export default {
	extends: Tab,
	
	components: {},
	
	provide: function(){
		const me = this;
		return {
			getFile: function(){
				return me;
			},
		}
	},
}
</script>