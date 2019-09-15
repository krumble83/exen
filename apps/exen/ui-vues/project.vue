<template>
	<div id="app">
		<uitabs 
			id="projecttabs"
			:flags="flags"
			:tabs="projectcontents"
			@tab:focus="onComponentFocus"
			@tab:close="onComponentClose"
			ref="tabsContainer"
		>
			<component 
				slot="begin"
				is="defaultTab"
				:name="'Project'"
			>
				<component
					is="ProjectPanel"
				/>			
			</component>
		</uitabs>
		<div id="librarydiv" style="display:none" >
			<library ref="library">
				<template v-for="pack in packages">
					<component :is="pack" />
				</template>
			</library>
		</div>
	</div>
</template>

<script>

	import {loadCss,getQueryParam} from'../../../cmon-js/utils.js';

	import ProjectStore from '../store/store.project.js'
	var store = new Vuex.Store(ProjectStore);
	
	import {Library} from '../exlibs/default.export.js';
	
	import ProjectPanel from './project.panel.vue';
	
	import uitabs from './tabs.vue';
	import defaultTab from './tabs.tab.vue';

	const preventContext = function (evt){
		evt.preventDefault();
	}
	
	const App = {
		components: {uitabs,defaultTab,ProjectPanel,Library},
		mixins: [],
		el: '#app',
		store,
		
		provide: function(){
			const me = this;
			return {
				App: me,
				Project: me,
				get Library() {return me.$refs.library},
			}
		},

		data: function(){
			return {
				project: false,
				tabOrder: 1,
				//debug: false,
				flags: F_FOCUSABLE,
				packages: [],
			}
		},
		
		computed: {
			projectcontents: function(){ 
				return _.orderBy(this.$store.state.components, 'tabOrder');
			},
		},
		
		created: function(){
			const theme = getQueryParam('theme');
			if(theme){
				loadCss('apps/exen/themes/' + theme + '/' + theme + '.css');
			}
			else
				loadCss('apps/exen/themes/dark/dark.css');			
		},
		
		mounted: function(){
			document.addEventListener('contextmenu', preventContext);
			
			var pack = this.$refs.library.Package('project');
			this.$store.commit('setLibrary', pack);
			/*
			var t = (new DOMParser()).parseFromString("<library/>", 'text/xml');
			var z = t.createElement('test');
			t.documentElement.appendChild(z);
			this.$el.appendChild(t.documentElement);
			*/
		},
		
		beforeDestroy: function(){
			document.removeEventListener('contextmenu', preventContext);
		},
		
		methods: {
			
			addTab: function(data){
			},
		
			onComponentFocus: function(tab, evt){
				//console.log('componentFocus', evt);
			},
			
			onComponentClose: function(tab, evt){
				//var selected = this.$children[0].getSelected();
				this.$store.commit('updateComponent', {name: tab.name, props: {tabOrder: 0}});
				//this.$children[0].selectTab(selected.name);
			},
			
			createProject: function(){
				//this.addComponent({name: 'Project', type:'project'});
				
			},
			
			addComponent: function(data, callback){
				console.assert(data.type);
				this.$store.commit('addComponent', data);
				//this.$store.state.tabs.push(data)
			},

			getComponent: function(name){
				//console.log('=>', this.$store.getters);
				return this.$store.getters.getComponent(name);
			},
			
			doTest: function(){
				var bb;
				
				var data = {};
				data.name = data.name || 'newwBlueprint';
				data.flags = F_GRAPH | F_FUNCTION | F_VARIABLE;
				//data.icon = img;
				//data.closable = true;
				//data.checked = true;
				this.$store.commit('addBlueprint', data);
				data.store.commit('graph/add', {});
				console.log(data);
				
				
				
				this.addBlueprint(null, function(bp){
					//console.log(bp);
					bp.addGraph({}, false);
					bp.addGraph({}, false);
					bp.addGraph({}, false);
					bp.addGraph({}, false);
					bp.addFunction({name: 'setup', flags: 0}, false);
					bp.addFunction({name: 'loop', flags: F_LOCK_INPUTS}, false);
					bb = bp
					//console.log(ok);
				});
				this.addBlueprint(null, function(){
					setTimeout(function(){
						bb.$parent.select();
					}, 100);
				});				
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
	
	import {module} from '../store/modules/store.blueprint.js'
	App.store.registerModule('blueprint', module);
	
	export default App;
	
</script>

<style>


	.rowParent, 
	.columnParent{
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-direction: normal;
		-webkit-box-orient: horizontal;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		flex-direction: row;
		-webkit-flex-wrap: nowrap;
		-ms-flex-wrap: nowrap;
		flex-wrap: nowrap;
		-webkit-box-pack: start;
		-webkit-justify-content: flex-start;
		-ms-flex-pack: start;
		justify-content: flex-start;
		-webkit-align-content: stretch;
		-ms-flex-line-pack: stretch;
		align-content: stretch;
		-webkit-box-align: stretch;
		-webkit-align-items: stretch;
		-ms-flex-align: stretch;
		align-items: stretch;
	}

	.columnParent{
		-webkit-box-orient: vertical;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
	}

	.flexChild{
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		-webkit-align-self: auto;
		-ms-flex-item-align: auto;
		align-self: auto;
	}

	.flexChild.vDivider{
		-webkit-box-flex: 0;
		-webkit-flex: 0 0 auto;
		-ms-flex: 0 0 auto;
		flex: 0 0 auto; 
		width: 3px;
		cursor: col-resize;	
		margin: 1px;
	}

	.flexChild.hDivider{
		-webkit-box-flex: 0;
		-webkit-flex: 0 0 auto;
		-ms-flex: 0 0 auto;
		flex: 0 0 auto; 
		height: 3px;
		cursor: row-resize;
		margin: 1px;
	}

	.flexChild.hDivider.hover,
	.flexChild.hDivider:hover,
	.flexChild.vDivider.hover,
	.flexChild.vDivider:hover{
		background-color: var(--focused-bg-color);
	}

	.panel.toolbar,
	.panel.footer,
	.panel.right,
	.panel.header,
	.panel.left,
	.panel.leftBottom
	.panel.center {
		-webkit-box-flex: 0;
		-webkit-flex: 0 0 auto;
		-ms-flex: 0 0 auto;
		flex: 0 0 auto; 	
	}

	.panel.toolbar{
		background-color: var(--bg-light-color);
		height: 54px;
		margin-bottom: 5px;
		border-radius: var(--border-radius);
	}

	.panel.footer{
		height: 20px;
		padding-top: 27px;
	}

	.panel.right{
		background-color: var(--bg-light-color);

		width: 180px;
		min-width: 170px;
		max-width: 350px;
		overflow: hidden;
	}

	.panel.header{

		height: 24px;
	}

	.panel.left{
		-webkit-box-flex: 0;
		-webkit-flex: 0 0 auto;
		-ms-flex: 0 0 auto;
		flex: 0 0 auto; 
		width: 250px;
		min-width: 170px;
		max-width: 350px;
		overflow: hidden;
	}

	.panel.leftBottom{
		background-color: var(--bg-light-color);

		-webkit-box-flex: 0;
		-webkit-flex: 0 0 auto;
		-ms-flex: 0 0 auto;
		flex: 0 0 auto; 
		height: 70%;
	} 

	.panel.center{
		padding-top: 0;
		height: 100%;
		overflow-x: hidden;
	}

	.panel.leftTop,
	.panel.toolbar{
		border: 1px solid var(--bg-light-color);
	}


	.panel .title {
		color: var(--text-color);
		font-family: var(--text-font-family);

		height: 22px;
		padding-left: 5px;
		margin-right: -25px;
		width: 100%;
		background: #4c4c4c; /* Old browsers */
		background: -moz-linear-gradient(top, #4c4c4c 0%, #595959 12%, #666666 25%, #474747 39%, #2c2c2c 50%, #000000 51%, #111111 60%, #2b2b2b 76%, #1c1c1c 91%, #131313 100%); /* FF3.6-15 */
		background: -webkit-linear-gradient(top, #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%); /* Chrome10-25,Safari5.1-6 */
		background: linear-gradient(to bottom, #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4c4c4c', endColorstr='#131313',GradientType=0 ); /* IE6-9 */
	}

	#projecttabs > .tab > label{
		color: var(--text-color);
		background-color: transparent ;
		line-height: 30px;
		padding-top: 0;
		height: 0;
		border-bottom: 24px solid var(--bg-middle-color);
		border-left: 7px solid transparent;
		border-right: 7px solid transparent;		
	}
	
	#projecttabs.tabs > .tab > .content {
		top: 27px;
	}

	#projecttabs.tabs > .tab > input[type=radio]:checked ~ label {
		color: var(--selected-text-color);
		border-bottom: 24px solid var(--selected-bg-color);
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

</style>