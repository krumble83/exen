<script>

	Vue.use(Vuex);
	import ProjectStore from '../store/project.js'
	
	import infotabs from './infotabs.vue';
	import uigraphtabs from './tabs.vue';
	import uitree from './tree.vue';
	import uiproperties from './properties.vue';
	import uitbbutton from './toolbarbutton.vue';
	import uimenu from '../cmon-vues/contextmenu.vue';
	import uimenuitem from '../cmon-vues/contextmenu.item.vue';
	import uidialog from '../cmon-vues/dialog.vue';
	
	var store = new Vuex.Store(ProjectStore);
	
	export default {
		components: { uigraphtabs, uitree, uiproperties, uitbbutton, infotabs, uimenu, uimenuitem, uidialog },
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
			this.$on('tree:select', this.treeClick);
		},
		
		beforeDestroy: function(){
			this.$off('tree:select', this.treeClick);
		},
		
		computed: {		
			tabGraphs: function () {
				return _.orderBy(this.$store.state.graphs, '$tabOrder');
			}
		},
		
		watch: {
			treeSelected: function(val){
				const proptree = this.$refs.properties;
				if(!val && proptree)
					proptree.items.splice(0);
			}
		},
		
		methods: {			
			hasGraph: function(name){
				return typeof this[name] !== 'undefined';
			},
			
			treeClick: function(evt, data){
				//console.log(evt.target.type)				
				if(this.treeSelected && (!evt || this.treeSelected != evt.target)){
					this.treeSelected.classList.remove('selected', 'focused');
					this.treeSelected == false;
				}
				if(evt && evt.target)
					this.treeSelected = evt.target;

			},

			rename: function(data, el){
				const me = this
				, ret = {
					success: function(cb){this.succesCb = cb; return this},
					validate: function(cb){this.validateCb = cb; return this}
				}
				var input = document.querySelector('input.editor');
				
				if(input)
					input.blur();

				if(data.flags && ((data.flags & F_NO_RENAME) == F_NO_RENAME))
					return ret;
				
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
					const parent = input.parentNode;
					parent.removeChild(input);
					if(input.checkValidity() && typeof ret.succesCb === 'function')
						ret.succesCb(input);
				}
				
				const keyup = function(evt){
					//console.log('keyup', evt);
					if(typeof ret.validateCb === 'function'){
						if(ret.validateCb(evt, input) == false)
							input.setCustomValidity('name allready in use');
						else
							input.setCustomValidity('');
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
					el.classList.remove('selected', 'focused');
					me.treeSelected = false;
				});

				return ret;
			},
			
			closeTab: function(tab){
				//console.log('closezz ', tab);
				this.$store.state.graphs.find(v => v.name == tab.name).$tabOrder = 0;
			},
			
			focusTab: function(data){
				console.log('zz');
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
					this.$emit('fullscreen');
					this.$refs.menu.$el.style.display = 'none';
				}
				else {
					right.classList.remove('width0');
					left.classList.remove('width0');
					footer.classList.remove('height0');
					header.classList.remove('height0');
					this.$refs.menu.$el.style.display = '';
					this.$emit('normallayout');
				}
			},
			
			openProject: function(){
				console.log('open project');
			},
			
			isGraph: function(data){
				return hasFlag(data, F_IS_GRAPH);
				
			},
			
			isType: function(obj, type){
				return (obj.flags & type) == type;
			
			},

			graphDelete: function(data, force){
				const me = this,
				func = function(){
					if(me.treeSelected && me.treeSelected.getAttribute('name') == data.name)
						me.treeSelected = false;
					me.$store.commit('deleteGraph', data.name);
					me.$emit('graph:delete', data);
				}
				
				if(force == true)
					return func();

				me.$refs.dialog.yesno('Delete', 'Delete this Function ?').yes(function(){
					func();
				});

			},
						
		},
	}
</script>

<style>

	.width0{
		width: 0 !important;
		-moz-transition: width 0.05s ease;
		-webkit-transition: width 0.05s ease;
		-o-transition: width 0.05s ease;
		transition: width 0.05s ease;	
	}
	
	.height0{
		height: 0 !important;
		-moz-transition: height 0.05s ease;
		-webkit-transition: height 0.05s ease;
		-o-transition: height 0.05s ease;
		transition: height 0.05s ease;		
	}
</style>