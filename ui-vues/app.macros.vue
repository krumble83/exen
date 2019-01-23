<script>

	import App from './app.vue';
	//import graphImg from '../ui-img/graph.png';
	
	App.mixins.push({
		computed: {	
			macros: function(){return this.$store.state.graphs.filter(g => (g.flags & F_IS_MACRO) == F_IS_MACRO)}
		},
		
		methods: {
		}
	});
	
</script>