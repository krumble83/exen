<script>

	Vue.use(Vuex);
	import ProjectStore from '../store/project.js'
	
	import infotabs from './infotabs.vue';
	import uigraphtabs from './tabs.vue';
	import uitree from './tree.vue';
	import uiproperties from './properties.vue';
	import uitbbutton from './toolbarbutton.vue';
	import uicontextmenu from '../cmon-vues/contextmenu.vue';
		
	var store = new Vuex.Store(ProjectStore);
	
	export default {
		components: { uigraphtabs, uitree, uiproperties, uitbbutton, infotabs, uicontextmenu },
		mixins: [],
		el: '#app',
		store,
		
		data: function(){
			return {
				tabs: [],
				tabsId: 1,
				treeSelected: false,
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
				/*
				else if(this.treeSelected && this.treeSelected == evt.target){
					if(evt.target.timestamp && Date.now() > evt.target.timestamp + 400){
						if(this[data.type + 'Rename'])
							this[data.type + 'Rename'](data, evt.target);
						else
							this.rename(data, evt.target).success(function(){
								console.log('coucou :)');
							});;					
					}
					return;
				}
				*/
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
				, input = document.querySelector('input.editor')
				, ret = {
					success: function(cb){this.succesCb = cb; return this},
					validate: function(cb){this.validateCb = cb; return this}
				}
				
				if(input && input.checkValidity())
					input.blur();
				else if(input && !input.checkValidity())
					return ret;
				
				if(data.flags && ((data.flags & F_NO_RENAME) == F_NO_RENAME))
					return ret;
				
				if(this.treeSelected)
					this.treeSelected.classList.remove('selected');
				
				input = document.createElement('input');				
				input.setAttribute('type', 'text');
				input.setAttribute('class', 'editor');
				input.setAttribute('required', '');
				el.prepend(input);
				input.value = data.name;
				//input.setAttribute('draggable', true);
							
				const prevent = function(e){
					e.preventDefault();
					e.stopPropagation();
				}
				
				const stop = function(e){
					e.stopPropagation();
				}
				
				const change = function(evt){
					//console.log('onchange');
					
					if(!input.checkValidity())
						return;
					
					if(input.value != data.name && input.checkValidity())
						me.$store.commit('changeGraph', {name: data.name, props:{name: input.value}});
					const parent = input.parentNode;
					parent.removeChild(input);
					me.treeClick(data, {target: parent});
					if(ret.succesCb)
						ret.succesCb(input.value);
				}
				
				const keyup = function(evt){
					//console.log('keyup', evt);
					if(ret.validateCb && ret.validateCb(evt, input) == false){
						input.setCustomValidity("name allready in use");
						return;
					}
					if(!input.checkValidity())
						return;
					if(evt.keyCode == 13)
						input.blur();
				}
				
				input.ondragstart = prevent;
				input.ondblclick = stop;
				input.onclick = stop;
				input.onkeyup = keyup;
				input.onchange = function(){input.checkValidity();}
				//input.onchange = change;
				input.pattern="[a-zA-Z_$][0-9a-zA-Z_$]*";
				input.onblur = change;
				
				this.$nextTick(function(){
					input.focus();
					input.select();
					el.classList.remove('selected');
					me.treeSelected = false;
				});

				return ret;
			},
			
			closeTab: function(tab){
				//console.log('closezz ', tab);
				this.$store.state.graphs.find(v => v.name == tab.name).tabOrder = 0;
			},
			
			focusTab: function(data){
				this.$refs.tabsContainer.focusTab(data);
			},
			
			
			switchFullscreen: function(value){
				//console.log('fullscreen');
				const left = document.querySelector('#left')
				, footer = document.querySelector('#footer')
				, right = document.querySelector('#right')
				, header = document.querySelector('#header');
				
				if(value){
					right.classList.add('width0');
					left.classList.add('width0');
					footer.classList.add('height0');
					header.classList.add('height0');
					this.$emit('app:fullscreen');
				}
				else {
					right.classList.remove('width0');
					left.classList.remove('width0');
					footer.classList.remove('height0');
					header.classList.remove('height0');
					this.$emit('app:normallayout');
				}
			},
			
		},
	}
</script>

<style>

	.width0{
		width: 1px !important;
		-moz-transition: width 0.05s ease;
		-webkit-transition: width 0.05s ease;
		-o-transition: width 0.05s ease;
		transition: width 0.05s ease;	
	}
	
	.height0{
		height: 1px !important;
		-moz-transition: height 0.05s ease;
		-webkit-transition: height 0.05s ease;
		-o-transition: height 0.05s ease;
		transition: height 0.05s ease;		
	}
</style>