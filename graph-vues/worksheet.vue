<template>
	<svg
		:id="mId"
		:style="styleObject" 
		:class="classObject" 
		tabindex="-1"
		xmlns="http://www.w3.org/2000/svg" 
		ref="worksheet" 
		@mousedown="setFocus(true)"
		@contextmenu.prevent.stop="$emit('mouse:cmenu', $event)" 

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
				<slot name="links" />
			</g>

			<g class="exNodes" ref="nodesEl">
				<component v-for="node in nodes" :key="node.id" 
					:is="node.ctor ? node.ctor : 'ExNode'"
					ref="nodes"
					class="exNode"
					@edited="onEdited"
					@focus="$emit('node:focus', $event)"
					@blur="$emit('node:blur', $event)"
					v-bind="node"
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

	import WorksheetToolTip from './tooltip.js';

	import ExNode from './node.vue';
	import ExLink from './link.vue';

	import {EventBus} from '../cmon-js/event-bus.js';
	import WorksheetSelection from './worksheet.selection.js'
	import {worksheetKeyboardEvents} from './keyboardevents.js'
	import WorksheetGrid from './worksheet.grid.js'
	import WorksheetPanZoom from './worksheet.panzoom.js'
	import WorksheetLibraryMenu from './worksheet.librarymenu.js'

	export default {
		mixins: [WorksheetGrid, WorksheetPanZoom, WorksheetSelection, worksheetKeyboardEvents, WorksheetLibraryMenu, WorksheetToolTip],
		components: {ExNode, ExLink},
		//mixins: [VueUndoRedo, WorksheetGrid, WorksheetSelection, WorksheetTooltip, WorksheetLibraryMenu],
		
		provide: function() {
			var me = this;
			return {
				addSvgDef: function(data){me.addDef(data)},
				Worksheet: me,
				//Library: exLIB,
				camelCaseToLabel: function(str){
					if(!str)
						return '';
					return str
						// insert a space between lower & upper
						.replace(/([a-z])([A-Z])/g, '$1 $2')
						// space before last upper in a sequence followed by lower
						.replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
						// uppercase the first character
						.replace(/^./, function(str){ return str.toUpperCase(); })
				},
			}
		},
		
		props: {
			id: String,
			store: Object,
			//features: {type: Array, default: function(){return []}},
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
				mEdited: true,
				mId : this.id || Vue.options.methods.$uid(),
			}
		},
		
		computed: {
			nodes: function(){return this.store.getters.getNode()},
			links: function(){return this.store.getters.getLink()},
		},

		watch: {
			mEdited: function(){
				console.log('worksheet:edited');
				this.$emit('edited', this);
			},
		},

		mounted: function(){
			//this.$emit('edited');
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
			
			onEdited: function(){
				//console.log('worksheet:edited');
				this.mEdited=true;
				this.$emit('edited', this);
			},
			
			addNode: function(data){
				if(data.id){
					var lnode = this.Library.getNode(data.id);
					var out = {title: '', subtitle: '', color: '', inputs: [], outputs: []};
				}
			},
			

			
			
			hasFeature: function(name){
				return this.features.indexOf(name) != -1;
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
			
			addDef: function(data){
				const me = this;
				
				if(Array.isArray(data)){
					data.forEach(function(el){
						me.addDef(el);
					});
					return;
				}
				
				if(data.props.id){
					var found = me.defs.find(it => it.props.id == data.props.id);
					if(found)
						return found.props.id;
				}
				else
					data.props.id = me.$uid();

				me.defs.push(data);
				return data.id;
			},
			
			getViewportEl: function(){
				return this.$refs.viewport;
			},
			
			getSvg: function(){
				return this.$el;
			},

			setFocus: function(focus){
				//console.log('setFocus worksheet');
				this.$el.focus();
			},
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
	stroke-dasharray: 5;
	fill: none;
}





/********************************************************************************
	tooltip
********************************************************************************/
#exTooltip{
	position: absolute;
	min-height: 15px;
	min-width: 100px;
	max-width: 450px;
	background-color: #555;
	border: 1px solid #555;
	pointer-events: none;
	color: #999;
	display: none;
	padding: 5px;
	font: 12px arial, sans-serif;
	/*cursor: crosshair;*/
}

#exTooltip.visible{
	display: block;
	z-index: 10000;
}

#exTooltip span{
	display: block;
}

#exTooltip span:nth-of-type(2){
	font-style:italic;
	color:#fff;
	padding-bottom: 6px;
}
</style>