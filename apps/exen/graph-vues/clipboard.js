/*
import {ExNode} from './node.vue';

ExNode.mixins.push({
	methods: {
		clipboardCopy: function(){
			
		}
	}
})
*/
const copyNode = function(){
	const me = this;
	if(me.$hasFlag(F_NO_COPY))
		return;
	//console.log('copy node', this);
	var exp = {};
	me.$emit('export', exp);
	me.Worksheet.$emit('node:export', me, exp);
	console.log('exported:', exp);

	navigator.clipboard.writeText(JSON.stringify(exp))
		.then(function() { /* clipboard successfully set */
			
		}, 
		function() { /* clipboard write failed */
			
	});
}

const worksheetClipboard = function(evt){
	if(!evt.ctrlKey)
		return;
	switch(evt.keyCode){
		case 86: // ctrl+V
			console.log('ctrl+V', evt);
			evt.stopPropagation();
			break;
		
		default:
			//node.Worksheet.$emit('key:down');
			break;
	}
}

const nodeClipboard = function(node, evt){
	if(!evt.ctrlKey)
		return;
	switch(evt.keyCode){
		case 67: // ctrl+C
			//console.log('ctrl+C', evt);
			copyNode.call(node);
			evt.stopPropagation();
			break;

		case 88: // ctrl+x
			console.log('ctrl+X', evt);
			evt.stopPropagation();
			break;
			
		default:
			node.Worksheet.$emit('key:down', evt);
			break;
	}	
}

const nodeCmenu = function(node, menu, evt){
	menu.addSeparator();
	menu.addItem({id: 'cut', title: 'Cut', disabled: node.$hasFlag(F_NO_CUT)});
	menu.addItem({id: 'copy', title: 'Copy', disabled: node.$hasFlag(F_NO_COPY), callback: function(){copyNode.call(node)}});	
}

export default {	
	created: function(){
		this.$on('node:key:down', nodeClipboard);
		this.$on('node:cmenu', nodeCmenu);
		this.$on('key:down', worksheetClipboard);
	},
	
	beforeDestroy: function(){
		this.$off('node:key:down', nodeClipboard);
		this.$off('node:cmenu', nodeCmenu);
		this.$off('key:down', worksheetClipboard);		
	}
}