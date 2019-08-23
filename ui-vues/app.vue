<template>
	<uitabs 
		id="projecttabs"
		:flags="flags"
		:tabs="projectcontents"
		@tab:focus="componentFocus"
		@tab:close="componentClose"
	>
		<component 
			slot="begin"
			:is="'defaultTab'"
			panelCtor="Project"
			:name="'Project'"
			tabsname="projecttabs"
			checked="checked"
		>
		</component>
		<datatype></datatype>
	</uitabs>
</template>

<script>

	var onKeyDown = function(evt){
		//console.dir(document.activeElement);
		if(!document.activeElement.__vue__ || !document.activeElement.__vue__.onKeyDown)
			return;
		const handled = document.activeElement.__vue__.onKeyDown(evt);
		if(!handled){
			//send event to parent
			var parent = document.activeElement.__vue__.$parent;
			while (parent){
				if(parent.onKeyDown){
					if(parent.onKeyDown(evt))
						break;
				}
				parent = parent.$parent;
			}
		}
	}
	
	var onKeyUp = function(evt){
		if(!document.activeElement.__vue__ || !document.activeElement.__vue__.onKeyUp)
			return;
		const handled = document.activeElement.__vue__.onKeyUp(evt);
		if(!handled){
			//send event to parent
			var parent = document.activeElement.__vue__.$parent;
			while (parent){
				if(parent.onKeyUp){
					if(parent.onKeyUp(evt))
						break;
				}
				parent = parent.$parent;
			}
		}
	}

	import ProjectStore from '../store/store.project.js'
	var store = new Vuex.Store(ProjectStore);
		
	import uitabs from './tabs.vue';	
	import defaultTab from './tabs.tab.vue';
	
	//import Project from './project.vue';
	
	export default {
		components: {
			//Project: () => import('./project.vue'),
			uitabs, defaultTab
		},
		mixins: [],
		el: '#app',
		store,
		
		data: function(){
			return {
				project: false,
				tabOrder: 1,
				debug: false,
				flags: F_FOCUSABLE,
			}
		},
		
		computed: {
			
			//contents: $tore.state.components,
			
			projectcontents: function(){ 
				return _.orderBy(this.$store.state.components, 'tabOrder')
			},
		},
		/*
		beforeCreate: function () {
			this.$options.components.Project = require('./project.vue').default;
		},*/
		
		mounted: function(){
			document.addEventListener('keydown', onKeyDown);
			document.addEventListener('keyup', onKeyUp);
			
			document.addEventListener('contextmenu', function(evt){
				evt.preventDefault();
			});
			
			if(this.debug){
				document.addEventListener('focusin', function(e) { 
					console.log('focusin!', document.activeElement);
				});
			}
		},
		
		beforeDestroy: function(){
			document.removeEventListener('keydown', onKeyDown);
			document.removeEventListener('keyup', onKeyUp);
		},

		watch: {
		},
		
		methods: {
			
			addTab: function(data){
			},
		
			componentFocus: function(tab, evt){
				//console.log('componentFocus', evt);
			},
			
			componentClose: function(tab, evt){
				//var selected = this.$children[0].getSelected();
				this.$store.commit('updateComponent', {name: tab.name, props: {tabOrder: 0}});
				//this.$children[0].selectTab(selected.name);
			},
			
			
			
			
			
			
			
			undo: function(){
				this.$store.dispatch('undo');
			},

			redo: function(){
				this.$store.dispatch('redo');
			},

			closeTab: function(tab){
				//console.log('closezz ', tab);
				this.$store.commit('changeGraph', {name: tab.name, props: {$tabOrder: 0}});
				//this.$store.state.graphs.find(v => v.name == tab.name).$tabOrder = 0;
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

	#projecttabs > .tab > label{
		border-radius: 9px 7px 0 0;
		background-color: transparent ;
		line-height: 30px;
		padding-top: 0;
		height: 0;
		border-bottom: 24px solid #434343;
		border-left: 7px solid transparent;
		border-right: 7px solid transparent;		
	}
	
	#projecttabs.tabs > .tab > .content {
		top: 27px;
	}

	#projecttabs.tabs > .tab > input[type=radio]:checked ~ label {
		border-bottom: 24px solid #606060;
		/*z-index: 2;*/
	}

	#projecttabs.tabs > .tab > label > img:first-child {
		padding-top: 0;
		padding-bottom: 6px;
	}

	#projecttabs.tabs > .tab > label > img:last-child {
		padding-top: 12px;
		padding-left: 10px;
		float: right;
	}


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