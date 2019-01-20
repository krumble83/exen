<script>

	import store from '../store/project.js'

	import uigraphtabs from './tabs.vue';
	import uitree from './tree.vue';
	import uiproperties from './properties.vue';
	import uitbbutton from './toolbarbutton.vue';
	
	import variableImg from '../ui-img/variable.png';
	import graphImg from '../ui-img/graph.png';
	import functionImg from '../ui-img/function.png';
	
	var tabs = 1;
	
	export default {
		components: { uigraphtabs, uitree, uiproperties, uitbbutton },
		el: '#app',
		store,
		
		data: function(){
			return {
				tabs: [],
				treeSelected: false,
			}
			
		},
		
		computed: {
			variables: function(){return this.$store.state.variables},
			graphs: function(){return this.$store.state.graphs.filter(g => g.type=='graph')},
			functions: function(){return this.$store.state.graphs.filter(g => g.type=='function')},
			//macros: function(){return this.$store.state.graphs.filter(g => g.type=='macros')},
			
			tabGraphs: function () {
				return _.orderBy(this.$store.state.graphs, 'tabOrder');
			}
		},
		
		methods: {			
			addGraph: function(data, doReaname){
				var a = 0
				, name = (data && data.name) ? data.name : 'NewGraph';
				if(this.graphs.find(v => v.name == name)){
					while(this.graphs.find(v => v.name == name + '_' + a))
						a++;
					name += '_' + a;
				}
				this.$store.commit('addGraph', {name: name, img:graphImg, tabOrder: 0});
				if(doReaname === false)
					return;
				this.$nextTick(function(){
					var n = this.$refs.graphsTree.findNode(name);
					this.rename(n.data, n.el);
				});
			},
			
			openGraph: function(name){
				var data = this.getGraph(name);
				if(data.tabOrder == 0)
					data.tabOrder = tabs++;
				this.$nextTick(function(){
					this.focusTab(data);
				});
			},
						
			getGraph: function(name){
				return this.graphs.find(graph => graph.name == name && graph.type == 'graph');
			},
			
			
			addFunction: function(data, doReaname){
				var a = 0
				, name = (data && data.name) ? data.name : 'NewFunction';
				if(this.functions.find(v => v.name == name)){
					while(this.functions.find(v => v.name == name + '_' + a))
						a++;
					name += '_' + a;
				}
				this.$store.commit('addFunction', {name: name, img:functionImg, tabOrder: 0});
				if(doReaname === false)
					return;
				this.$nextTick(function(){
					var n = this.$refs.functionsTree.findNode(name);
					this.rename(n.data, n.el);
				});
			},
			
			openFunction: function(name){
				var data = this.getFunction(name);
				if(data.tabOrder == 0)
					data.tabOrder = tabs++;
				this.$nextTick(function(){
					this.focusTab(data);
				});
			},
						
			getFunction: function(name){
				return this.functions.find(func => func.name == name && func.type == 'function');
			},
			
			hasGraph: function(name){
				return typeof this[name] !== 'undefined';
			},
			
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
			},
			
			treeClick: function(data, evt){
				//console.log(evt.target.type)
				if(this.treeSelected && this.treeSelected != evt.target)
					this.treeSelected.classList.remove('selected');
				else if(this.treeSelected && this.treeSelected == evt.target){
					if(evt.target.timestamp && Date.now() > evt.target.timestamp + 400)
						this.rename(data, evt.target);
				}
				evt.target.classList.add('selected');
				evt.target.timestamp = Date.now();
				this.treeSelected = evt.target;
								
				switch(data.type){
					case 'variable':
						//this.openGraph(name);
						break;
				}				
			},
			
			treeDblClick: function(data, evt){
				switch(data.type){
					case 'graph':
						this.openGraph(data.name);
						break;
					case 'function':
						this.openFunction(data.name);
						break;
				}
			},
			
			rename: function(data, el){
				var me = this
				, input = document.querySelector('input.editor');
				
				if(input)
					input.onchange();
				
				if(this.treeSelected)
					this.treeSelected.classList.remove('selected');
				
				input = document.createElement('input');				
				input.setAttribute('type', 'text');
				input.setAttribute('class', 'editor');
				el.prepend(input);
				input.value = data.name;
				input.setAttribute('draggable', true);
							
				var prevent = function(e){
					e.preventDefault();
					e.stopPropagation();
				}
				
				var change = function(evt){
					//console.log('onchange');
					if(evt && evt.type == 'mousedown' && evt.target == input)
						return;
					if(input.value != data.name)
						me.$store.commit('changeGraph', {name: data.name, props:{name: input.value}});
					document.removeEventListener('mousedown', change);
					var parent = input.parentNode;
					parent.removeChild(input);
					//me.$nextTick(function(){
						me.treeClick(data, {target: parent});
					//});
				}
				
				var keyup = function(evt){
					//console.log('change', evt.keyCode);
					if(evt.keyCode == 13)
						input.onchange(evt);
				}
				
				input.ondragstart = prevent;
				input.ondblclick = prevent;
				input.onkeyup = keyup;
				input.onchange = change;
				document.addEventListener('mousedown', change);
				
				this.$nextTick(function(){
					if(!input)
						return;
					input.focus();
					el.classList.remove('selected');
					me.treeSelected = false;
				}, 100);
				
			},
			
			closeTab: function(tab){
				//console.log('closezz ', tab);
				this.$store.state.graphs.find(v => v.name == tab.name).tabOrder = 0;
			},
			
			focusTab: function(data){
				var t = this.$refs.tabsContainer.focusTab(data);
			},
			
			
			fullscreen: function(value){
				console.log('fullscreen');
				document.querySelector('#left').style.width = 0;
				document.querySelector('#footer').style.width = 0;
				document.querySelector('#right').style.width = 0;
			}

			//genUid: genUid,
		},
	}
</script>