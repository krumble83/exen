<template>
	<svg
		:id="id"
		:style="styleObject" 
		:class="classObject" 
		xmlns="http://www.w3.org/2000/svg" 
		ref="worksheet" 
		@mousedown="setFocus(true)"
		@contextmenu.prevent.stop="$emit('mouse:context', $event)" 

		@mousedown.left.stop="$emit('mouse:leftdown', $event)"
		@mouseup.left="$emit('mouse:leftup', $event)"

		@mousedown.right="$emit('mouse:rightdown', $event)"
		@mouseup.right="$emit('mouse:rightup', $event)"
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
		<g class="exViewport" ref="viewport">
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
					:is="node.ctor ? node.ctor : 'ex-node'"
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

	import {genUid} from '../utils';
	import ExNode from './node.vue';

	export default {
		mixins: [],
		components: {ExNode},
		//mixins: [VueUndoRedo, WorksheetGrid, WorksheetSelection, WorksheetTooltip, WorksheetLibraryMenu],
		//inject: ['getUid'],
		
		props: {
			id: {type: String, default: genUid()},
		},
		
		data: function(){
			return {
				classObject: {
					focus: true,
				},
				styleObject: {},
				defs: [],
				//selection: [],
				workspace: [],
				drawlink: false,
			}
		},
		
		computed: {
			nodes: function() {
				return this.$store.state.nodes;
			},
			
			links: function(){
				return this.$store.state.links;
			},
			
			$worksheet: function(){ return this; }
		},

		created: function(){
			var me = this;
			//this.$parent.$on('undo', function(){me.undo()});
			//this.$parent.$on('redo', function(){me.redo()});
		},
	  
		methods: {
			addNode: function(data){
				if(!data.id)
					data.id = genUid('node');
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
					data.props.id = genUid();
				
				this.defs.push(data);
				return data.id;
			},
			
			getWorksheet: function(){
				return this;
			},
			
			getViewportEl: function(){
				return this.$refs.viewport;
			},
			
			getSvg: function(){
				return this.$el;
			},

			setFocus: function(focus){
				console.log('setFocus');
				this.$el.parentNode.focus();
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
		width:100%;
		height:100%;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		border: 3px solid #000;
		opacity: 0.9;
	}

	.exWorksheet .background{
		fill: #262626;
	}

	.exWorksheet.focus {
		border: 3px solid #00f;
		opacity: 1;
	}
</style>