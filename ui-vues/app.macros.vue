<script>

	import App from './app.vue';
	//import graphImg from '../ui-img/graph.png';
	
	App.mixins.push({
		computed: {	
			macros: function(){return this.$store.state.graphs.filter(g => g.type=='macros')}
		},
		
		methods: {
		}
	});
	
</script>