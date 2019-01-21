<script>

	Vue.use(Vuex);
	import ProjectStore from '../store/project.js'
	
	import infotabs from './infotabs.vue';
	import uigraphtabs from './tabs.vue';
	import uitree from './tree.vue';
	import uiproperties from './properties.vue';
	import uitbbutton from './toolbarbutton.vue';
		
	var store = new Vuex.Store(ProjectStore);
	
	export default {
		components: { uigraphtabs, uitree, uiproperties, uitbbutton, infotabs },
		mixins: [],
		el: '#app',
		store,
		
		data: function(){
			return {
				tabs: [],
				tabsId: 1,
				treeSelected: false,
				panelSizes: {left:0, right:0, footer:0},
			}
		},
		
		mounted: function(){
			this.$refs.infoTabs.tabs.push({name: 'Compile Result', checked: true});
			this.$refs.infoTabs.tabs.push({name: 'Search Result'});
		},
		
		computed: {		
			tabGraphs: function () {
				return _.orderBy(this.$store.state.graphs, 'tabOrder');
			}
		},
		
		methods: {			
			hasGraph: function(name){
				return typeof this[name] !== 'undefined';
			},
			
			treeClick: function(data, evt){
				//console.log(evt.target.type)
				if(this.treeSelected && this.treeSelected != evt.target)
					this.treeSelected.classList.remove('selected');
				else if(this.treeSelected && this.treeSelected == evt.target){
					if(evt.target.timestamp && Date.now() > evt.target.timestamp + 400){
						if(this[data.type + 'Rename'])
							this[data.type + 'Rename'](data, evt.target);
						else
							this.rename(data, evt.target);					
					}
					return;
				}
				evt.target.classList.add('selected');
				evt.target.timestamp = Date.now();
				this.treeSelected = evt.target;
				if(this[data.type + 'Click'])
					this[data.type + 'Click'](data, evt);
			},
			
			treeDblClick: function(data, evt){
				if(this[data.type + 'Dblclick'])
					this[data.type + 'Dblclick'](data, evt);
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
				
				var stop = function(e){
					e.stopPropagation();
				}
				
				var change = function(evt){
					//console.log('onchange');
					if(evt && evt.type == 'mousedown' && evt.target == input)
						return;
					input.checkValidity();
					if(input.value != data.name)
						me.$store.commit('changeGraph', {name: data.name, props:{name: input.value}});
					var parent = input.parentNode;
					parent.removeChild(input);
					me.treeClick(data, {target: parent});
				}
				
				var keyup = function(evt){
					//console.log('change', evt.keyCode);
					input.checkValidity();
					if(evt.keyCode == 13)
						input.onchange(evt);
					//if(input.validate)
					//	input.validate(evt);
				}
				
				input.ondragstart = prevent;
				input.ondblclick = stop;
				input.onclick = stop;
				input.oninput = keyup;
				input.onchange = change;
				input.pattern="[a-zA-Z_$][a-zA-Z_$0-9]*"
				input.onblur = change;
				
				this.$nextTick(function(){
					input.focus();
					input.select();
					el.classList.remove('selected');
					me.treeSelected = false;
				});
				return input;
			},
			
			closeTab: function(tab){
				//console.log('closezz ', tab);
				this.$store.state.graphs.find(v => v.name == tab.name).tabOrder = 0;
			},
			
			focusTab: function(data){
				this.$refs.tabsContainer.focusTab(data);
			},
			
			
			goFullscreen: function(value){
				//console.log('fullscreen');
				if(value){
					this.panelSizes.left = document.querySelector('#left').style.width;
					this.panelSizes.footer = document.querySelector('#footer').style.height;
					this.panelSizes.right = document.querySelector('#right').style.width;
					
					//document.querySelector('#left').animate([{transform: 'scale(0,1)'}], {duration: 1000, iterations: 1});
					
					document.querySelector('#left').style.width = 0;
					document.querySelector('#footer').style.height = 0;
					document.querySelector('#right').style.width = 0;
					this.$emit('app:fullscreen');
				}
				else {
					document.querySelector('#left').style.width = this.panelSizes.left;
					document.querySelector('#footer').style.height = this.panelSizes.footer;
					document.querySelector('#right').style.width = this.panelSizes.right;				
					this.$emit('app:normallayout');
				}
			},
			
		},
	}
</script>