<template>
	<div class="flexChild columnParent" style="width:100%;height:100%">
		<div class="panel header flexChild">
			<uimenu class="horizontal" tabindex="-1" ref="menu">
				<uimenuitem title="Project">
					<uimenu>
						<uimenuitem title="New..." shortcut="ctrl+N" action="newProject" desc="create new project" icon="ui-img/16x16/new.png" />
						<uimenuitem title="Open.." action="openProject" desc="open existing project" icon="ui-img/16x16/folder.png" />
						<uimenuitem class="sep"></uimenuitem>
						<uimenuitem title="Save" action="saveProject" desc="save current project" icon="ui-img/16x16/save.png" />
						<uimenuitem title="Save As..." action="saveProject" desc="save current project" icon="ui-img/16x16/save.png" />
						<uimenuitem class="sep"></uimenuitem>
						<uimenuitem title="Close" action="closeProject" desc="close current project" />
					</uimenu>
				</uimenuitem>
				<uimenuitem title="Edition">
					<uimenu>
						<uimenuitem title="Undo" action="undo" shortcut="ctrl+Z" icon="cmon-img/16x16/undo.png" :disabled="$store.getters['undoRedo/canUndo']" desc="undo last action"></uimenuitem>
						<uimenuitem title="Redo" action="redo" shortcut="ctrl+Y"icon="cmon-img/16x16/redo.png"  :disabled="$store.getters['undoRedo/canRedo']" desc="redo last action"></uimenuitem>
						<uimenuitem class="sep"></uimenuitem>
						<uimenuitem title="Cut" shortcut="ctrl+X"icon="cmon-img/16x16/cut.png" ></uimenuitem>
						<uimenuitem title="Copy" shortcut="ctrl+C"icon="cmon-img/16x16/copy.png" ></uimenuitem>
						<uimenuitem title="Paste" shortcut="ctrl+V"icon="cmon-img/16x16/paste.png" ></uimenuitem>
						<uimenuitem class="sep"></uimenuitem>
						<uimenuitem title="Preferences" action="showPreferences" icon="ui-img/16x16/preferences.png" />
					</uimenu>
				</uimenuitem>
				<uimenuitem title="Compile">
					<uimenu>
						<uimenuitem title="Check Project" icon="ui-img/16x16/check.png"></uimenuitem>
						<uimenuitem title="Compile Project" icon="ui-img/16x16/compile.png"></uimenuitem>
						<uimenuitem title="Project" class="sub">
							<uimenu>
								<uimenuitem styleObject="{left: '96%',top: '-23px'}" title="Compile"></uimenuitem>
							</uimenu>
						</uimenuitem>							
					</uimenu>
				</uimenuitem>
				<uimenuitem title="?">
					<uimenu>
						<uimenuitem title="Help"></uimenuitem>
						<uimenuitem title="About"></uimenuitem>
					</uimenu>
				</uimenuitem>
			</uimenu>
		</div>
		
		<div class="flexChild rowParent">
			<div class="panel left flexChild columnParent" v-panel.left="-4">
				<div class="panel leftTop flexChild">
					<div class="title">&nbsp;&nbsp;Project</div>
					<div style="padding:3px;">

					</div>
				</div>
				<div class="panel leftBottom flexChild" v-panel.bottom="20">
					<div class="title">&nbsp;&nbsp;BluePrint</div>
					<div style="padding:3px;">
						<uitree 
							v-if="$hasFlag('F_GRAPH')" 
							:draggable="false" 
							label="Graphs" 
							:type="$flag('F_GRAPH')" 
							:items="graphs" 
							:button="{text: 'Add Graph', action:'addGraph'}" 
							ref="graphsTree" 
							@item:edited="onEdited"
							@item:select="graphsTreeSelect"
							@item:open="openFile"
							@item:delete="deleteGraph"
							@item:cmenu="graphsTreeContextMenu"
							@item:rename:start="onFileRename"
						></uitree>
						<uitree 
							v-if="$hasFlag('F_FUNCTION')" 
							label="Functions" 
							:type="$flag('F_FUNCTION')" 
							:items="functions" 
							:button="{text: 'Function', action:'addFunction'}" 
							ref="functionsTree" 
							@item:edited="onEdited"
							@item:select="functionsTreeSelect"
							@item:open="openFile"
							@item:delete="deleteFunction"
							@item:cmenu="functionsTreeContextMenu"
							@item:rename:start="onFileRename"
							@item:worksheetdrop="onFunctionWorksheetdrop"
						></uitree>
						<uitree 
							v-if="$hasFlag('F_MACRO')" 
							label="Macros" 
							:type="$flag('F_MACRO')" 
							:items="macros" 
							:button="{text: 'Macro', action:'addMacro'}" 
							ref="macrosTree" 
							@item:edited="onEdited"
							@item:select="macrosTreeSelect"
							@item:open="openFile"
							@item:delete="deleteMacro"
							@item:cmenu="macrosTreeContextMenu"
							@item:rename:start="onFileRename"
						></uitree>
						<uitree 
							v-if="$hasFlag('F_VARIABLE')" 
							label="Variables" 
							:type="$flag('F_VARIABLE')" 
							:items="variables" 
							:button="{text: 'Variable', action:'addVariable'}" 
							ref="variablesTree" 
							@edited="onEdited"
							@item:select="variablesTreeSelect"
							@item:delete="deleteVariable"
							@item:cmenu="variablesTreeContextMenu"
							@item:rename:start="onVariableRename"
							@item:worksheetdrop="onVariableWorksheetdrop"
						></uitree>					
					</div>
				</div>
			</div>
			<div class="flexChild columnParent">
				<div class="panel toolbar flexChild">
					<uitbbutton label="Check" img="ui-img/check.png" action="check" title="Check current Project" ></uitbbutton>
					<uitbbutton label="Save" img="ui-img/save.png" :disabled="true" action="save" title="Save current Project" ></uitbbutton>
					<uitbbutton label="F.screen" img="ui-img/fullscreen.png" action="switchFullscreen" :toggle="1" title="Toggle fullscreen" ></uitbbutton>
				</div>
				<div class="panel center flexChild">		
					<uigraphtabs 
						ref="tabsContainer" 
						:closable="true" 
						:tabs="files"
						@tab:close="closeFile"
						@tab:edited="onEdited"
					/>
				</div>
				<div class="panel footer flexChild selected" v-panel.bottom="-30">
					<infotabs ref="infoTabs">
						<div class="tab">
							<input type="radio" id="tabinfo_compile" name="tabinfo-group" checked>
							<label for="tabinfo_compile"><img src="ui-img/16x16/gear.png" style="vertical-align:bottom;padding-right:5px;" />
								<span>Compile result</span>
								<img src="ui-img/closetab.png" style="padding-top:5px;padding-left:7px;float:right" />
							</label>
							<div id="tabinfo_compile_content" class="content">Compile result</div>
						</div>					
					<infotabs>
				</div>
			</div>
			<div class="panel right flexChild" v-panel.right="-2">
				<div class="title">&nbsp;&nbsp;Properties</div>
				<uiproperties ref="properties"></uiproperties>
			</div>
		</div>		
	</div>
</template>

<script>
	
	import App from './project.vue';

	import uimenu from '../cmon-vues/contextmenu.vue';
	import uimenuitem from '../cmon-vues/contextmenu.item.vue';

	import infotabs from './infotabs.vue';
	import uigraphtabs from './tabs.vue';
	import uitree from './tree.vue';
	import uiproperties from './properties.vue';
	import uitbbutton from './toolbarbutton.vue';
	
	import img from '../ui-img/bp.png';
	
	//import Graph from './blueprint.graph.vue';
	import blueprintStore from '../store/modules/store.blueprint.js'
	
	App.mixins.push({
		methods: {
			addBlueprint: function(data, callback){
				data = data || {}
				data.name = data.name || 'newBlueprint';
				data.flags = F_GRAPH | F_FUNCTION | F_VARIABLE;
				data.icon = img;
				//data.closable = true;
				//data.checked = true;
				this.$store.commit('addBlueprint', data);
				this.$nextTick(function(){
					if(typeof callback == 'function')
						callback(this.$children[0].$children.find(item => item.name == data.name).$children[0]);
				})
			},
			
			openBlueprint: function(name){
				console.assert(name);
				this.$store.commit('updateComponent', {name: name, props: {tabOrder: 1}});
			},

			closeBlueprint: function(name){
				console.assert(name);
				this.$store.commit('updateComponent', {name: name, props: {tabOrder: 0}});
			},

			getBlueprint: function(name){
				return this.$store.getters.getBlueprint(name);
			}
			
		}
	});

	var ex = {
		components: {uimenu, uimenuitem, uitree, uitbbutton, uiproperties, uigraphtabs, infotabs },
		mixins: [],
		
		provide: function(){
			const me = this;
			return {
				Blueprint: me,
				/*getBlueprint: function(){
					return me;
				}*/
			}
		},

		props: {
			name: String,
			flags: Number,
			store: Object,
		},
		
		data: function(){
			return {
				tabCount: 1,
				edited: false,
			}
		},
		
		computed: {		
			files: function(){
				//return _.orderBy(this.store.state.files, 'tabOrder');
				return this.store.state.files;
			},
		},
		
		created: function(){
			//this.store = new Vuex.Store(blueprintStore);
			//this.store.replaceState(this.$store.getters.getBlueprint(this.name).datas);
		},
		
		mounted: function(){
			var me = this;
			//console.log('ttt', this.store)
			this.$parent.$on('close', function(tab, evt){
					console.log('closed');
					//me.$parent.store.test();
				}
			);
		},
		
		watch: {
		},

		methods: {
			
			open: function(){
				
			},
			
			openFile: function(treeItem){
				var me = this
				, g = this.store.getters.getFile(treeItem.name);
				
				console.assert(g);
				
				if(g.tabOrder > 0){
					this.$refs.tabsContainer.selectTab(g.name);
					return;
				}
				this.tabCount += 100;
				this.store.commit('updateFile', {name: g.name, props: {tabOrder: this.tabCount}});
				this.$nextTick(function(){
					this.$refs.tabsContainer.selectTab(g.name);
				}, this);
			},
			
			closeFile: function(tab, evt){
				this.store.commit('updateFile', {name: tab.name, props: {tabOrder: 0}});
			},
			
			deleteFile: function(item){
				this.store.commit('deleteFile', {name: item.name});
				this.edited = true;
				this.$refs.properties.hidePanels();
			},
			
			onEdited: function(){
				this.$emit('edited');
			},
			
			onFileRename: function(item, editor, evt){
				//console.log('+++', editor);
				var me = this;
				
				editor.setPattern(C_FILE_NAME_PATTERN);
				
				function check(value, editor){
					if(value == item.name)
						return;
					if(me.store.getters.nameExist(value))
						editor.invalidate('name allready exists');					
				}
				
				editor.$on('change', check);
				
				editor.$once('end', function(value, editor){
					if(value == item.name || me.store.getters.nameExist(value))
						item.editor = false;
					else
						me.store.commit('updateFile', {name: item.name, props: {name: value}});
					editor.$off('change', check);
				});

			},
			
			fileSelect: function(file){
				var items = this.$el.querySelector('.left.panel').querySelectorAll('ul.uiTree li.child.selected');
				items.forEach(function(it){
					if(it.__vue__ != file)
						it.__vue__.unselect();
				});
				this.$refs.properties.hidePanels();
			},
			
			getStore: function(){
				return this.store;
			},
			
			getProject: function(){
				
			}
			
		}
	}

	import tab from './tabs.tab.vue';
	tab.components.blueprint = ex;
	
	export default ex;
	
</script>