<template>
	<svg
		:id="id"
		:style="styleObject" 
		:class="classObject" 
		tabindex="-1"
		xmlns="http://www.w3.org/2000/svg" 
		ref="worksheet" 
		@mousedown="setFocus(true)"
		@contextmenu.prevent.stop="$emit('mouse:context', $event)" 

		@mousedown.left.stop="$emit('mouse:leftdown', $event)"
		@mouseup.left="$emit('mouse:leftup', $event)"

		@mousedown.right="$emit('mouse:rightdown', $event)"
		@mouseup.right="$emit('mouse:rightup', $event)"
		
		ondrop="this.__vue__.onDrop(event)"
	>
		<defs>
			<template v-for="(def, idx) in defs" :key="def.id">
				<component v-bind="def.props">
					<component v-for="(subdef, idx) in def.childs" :key="idx" v-bind="subdef.props" />
				</component>
			</template>
			<slot name="defs" />
		</defs>

		<slot />

		<rect width="100%" height="100%" class="background" />
		<g class="exViewport" ref="viewport" @dragover="allowDrop" >
			<rect width="100000" height="100000" transform="translate(-50000,-50000)" :fill="'url(#grid_' + id + ')'" />
			<g class="exLinks" ref="linksEl">
				<component v-for="link in links" :key="link.id" 
					:is="link.ctor ? link.ctor : 'ex-link'"
					:id="link.id"
					ref="links"
					class="exLink"
					v-bind="link"
				/>
				<component v-if="drawlink" 
					:is="drawlink.ctor ? drawlink.ctor : 'ex-link'"
					:id="drawlink.id"
					class="exLink"
					v-bind="drawlink"
				/>
				<slot name="links" />
			</g>

			<g class="exNodes" ref="nodesEl">
				<component v-for="node in nodes" :key="node.id" 
					:is="node.ctor ? node.ctor : 'ExNode'"
					ref="nodes"
					class="exNode"
					v-bind="node"					
					:x="node.x"
					:y="node.y"
				/>
				<slot name="nodes" />
			</g>
			<g class="exSelection" ref="selection">
				<slot name="selection" />
			</g>
			<slot name="exViewport" />
			<template v-for="(child, index) in workspace">
				<component :is="child.is" v-bind="child" />
			</template>
		</g>
		<slot name="front" />
	</svg>
</template>
	
<script>

	import ExNode from './node.vue';
	import {EventBus} from '../cmon-js/event-bus.js';
	import {WorksheetSelection} from './worksheet.selection.js'
	import {KeyboardEvents} from './keyboardevents.js'

	export default {
		mixins: [WorksheetSelection, KeyboardEvents],
		components: {ExNode},
		//mixins: [VueUndoRedo, WorksheetGrid, WorksheetSelection, WorksheetTooltip, WorksheetLibraryMenu],
		//inject: ['getUid'],
		
		provide: function(){
			const me = this;
			return {
				getWorksheet: function(){
					return me;
				}
			}
		},
		
		props: {
			id: {type: String, default: function(){return Vue.options.methods.$uid()}},
			store: Object,
			features: {type: Array, default: function(){return []}},
		},
		
		data: function(){
			return {
				classObject: {
					exWorksheet: true,
				},
				styleObject: {
					
				},
				defs: [],
				workspace: [],
				drawlink: false,
			}
		},
		
		computed: {
			nodes: function(){return this.store.getters.getNode()},
			links: function(){return this.store.getters.getLink()},
		},

		created: function(){

		},
	  
		methods: {
			
			allowDrop: function(evt){
				evt.preventDefault();
			},
			
			onDrop: function(evt){
				console.log('worksheetdrop: ', evt.dataTransfer.getData('text/eventbus'));
				event.preventDefault();
				EventBus.$emit(evt.dataTransfer.getData('text/eventbus'), this, evt);
			},
			
			hasFeature: function(name){
				return this.features.indexOf(name) != -1;
			},
			
			addNode: function(data){
				/*
				if(!data.id)
					data.id = genUid('node');
				*/
				//this.nodes.push(data);
				this.$emit('node:add', data);
				this.$store.commit('addNode', data);
			},
			
			getNode: function(val){
				if(typeof val == 'function')
					return this.$refs.nodes.filter(val);
				
				// assume val is the id of node
				return this.$refs.nodes.find(node => node.id === val);
			},
			
			removeNode: function(id){
				this.$store.commit('deleteNode', id);
			},
			
			drawLink: function(data){
				Vue.set(this, 'drawlink', data);
			},
			
			addLink: function(data){
				if(!data.id)
					data.id = this.getUid('node');
				this.$store.commit('addLink', data);
			},
			
			removeLink: function(id){
				this.$store.commit('deleteLink', id);
			},
			
			getLink: function(val){
				//console.log(this.$refs.links);
				if(!this.$refs.links && typeof val == 'function'){
					console.log('no links in worksheet');
					return [];
				}
				if(typeof val == 'function')
					return this.$refs.links.filter(val);

				// assume val is the id of node
				return this.$refs.links.find(link => link.id === val);
			},
			
			jumpToNode: function(node){
				alert('Jump to');
			},
			
			addDef: function(data){
				var me = this;
								
				if(Array.isArray(data)){
					data.forEach(function(el){
						me.addDef(el);
					});
					return;
				}

				if(data.props.id) {
					var found = false;
					this.defs.forEach(function(elem){
						if(elem.props.id == data.props.id)
							found = elem;
					});
					if(found)
						return found;
				}
				else
					data.props.id = this.$uid();
				
				this.defs.push(data);
				return data.id;
			},
			
			getWorksheetZ: function(){
				return this;
			},
			
			getViewportEl: function(){
				return this.$refs.viewport;
			},
			
			getSvg: function(){
				return this.$el;
			},

			setFocus: function(focus){
				console.log('setFocus worksheet');
				this.$el.focus();
				return;

				var i = document.createElement('input');
				i.setAttribute('display', 'none');
				document.body.appendChild(i);
				i.focus({preventScroll:true});
				document.body.removeChild(i);
				return;
				if(focus){
					this.classObject.focus = true;
					this.$el.focus();
				} else {
					this.classObject.focus = false;
					this.$el.blur();				
				}
			},
			
			onContextMenu: function(evt){
				console.log('worksheet:onContextMenu');
				//this.$eventBus.$emit('worksheet.contextmenu', this, evt);
				if(evt.defaultPrevented)
					return;
				this.$emit('worksheet.contextmenu', evt);
			},
			
			onRightButtonDown: function(evt){
				console.log('worksheet:onRightButtonDown');
				//this.$eventBus.$emit('worksheet.rightbuttondown', this, evt);
				if(evt.defaultPrevented)
					return;
				this.$emit('worksheet.rightbuttondown', evt);
			},
			
			onRightButtonUp: function(evt){
				console.log('worksheet:onRightButtonUp');
				//this.$eventBus.$emit('worksheet.rightbuttonup', this, evt);
				if(evt.defaultPrevented)
					return;
				this.$emit('worksheet.rightbuttonup', evt);
			},
			
			zzzonLeftMouseDown: function(evt){
				console.log('worksheet:onLeftButtonDown');
				//this.$eventBus.$emit('worksheet.leftmousedown', this, evt);
				this.$emit('leftmousedown', evt);
				if(evt.defaultPrevented)
					return;
			}
		},

		provide: {
			addSvgDef: function(data){this.addDef(data)},
		},
	};
</script>

<style>
.exWorksheet{
	width:99.5%;
	height:99.5%;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	border: 1px solid #000;
	opacity: 0.9;
}

.exWorksheet .background{
	fill: #262626;
}

.exWorksheet:focus {
	border: 1px solid #00f;
	opacity: 1;
}


.exWorksheet .medGrid{
	stroke: #161616;
	stroke-width: 1;
}

.exWorksheet .smallGrid{
	stroke: #343434;
	stroke-width: 1;
	fill: #262626;
}





.exWorksheet .exSelectionRectangle{
	stroke: #fff;
	stroke-width: 1;
	fill: none;
}

</style>