<script>

	import App from './app.vue';
	import variableImg from '../ui-img/variable.png';

	App.mixins.push({
		computed: {
			variables: function(){return this.$store.state.variables},
		},
		
		methods: {
			addVariable: function(data, doReaname){
				var a = 0
				, name = (data && data.name) ? data.name : 'NewVar';
				if(this.variables.find(v => v.name == name)){
					while(this.variables.find(v => v.name == name + '_' + a))
						a++;
					name += '_' + a;
				}
				this.$store.commit('addVariable', {name: name, img:variableImg, datatype: 'core.int'});
				if(doReaname === false)
					return;
				this.$nextTick(function(){
					var n = this.$refs.variablesTree.findNode(name);
					this.rename(n.data, n.el);
				});
			}
		}
	});

</script>