
var selection = false;

const doSelection = function(evt){
	const me = this;
	if(!me.selected && (evt && !evt.ctrlKey)){
		//unselect all other nodes
		me.Worksheet.getNode().forEach(function(it){
			it.unselect();
		});
	}
	me.select();
	selection = me.Worksheet.getNode(function(node){
		if(node.selected && node != me){
			node.dragPosStart = {x: node.x, y: node.y};
			return true;
		}
		delete node.dragPosStart;
		return false;
	});
}


const doMoveSelection = function(evt, point){
	const me = this;
	selection.forEach(function(node){
		node.mX = point.x;
		node.mY = point.y;
	});
}

export default {

	data: function(){
		return {
			classObject: {
				selected: false,
			}		
		}
	},
	
	computed: {
		selected: function(){return this.classObject.selected;}
	},
	
	created: function(){
		const me = this;
		
		me.$on('mouse:click', me.select);
		me.$on(['mouse:cmenu', 'drag:start'], doSelection);
		me.$on('drag:move', doMoveSelection);
		
		me.Worksheet.$on(['mouse:leftup', 'mouse:cmenu'], me.unselect);		
		me.Worksheet.$on('node:remove', me._onNodeRemove);
	},
	
	mounted: function(){
		this.$el.setAttribute('tabindex', '-1');
	},
		
	beforeDestroy: function(){
		const me = this;
		me.$off('mouse:click', me.select);	
		me.$off(['mouse:cmenu', 'drag:start'], doSelection);
		me.$off('drag:move', doMoveSelection);
		
		me.Worksheet.$off(['mouse:leftup', 'mouse:cmenu'], me.unselect);		
		me.Worksheet.$off('node:remove', me._onNodeRemove);
	},
	
	methods: {
					
		select: function(evt){
			//console.log('select node', evt);
			const me = this;
			
			if(me.selected && evt && !evt.ctrlKey)
				return;
			else if(me.selected && evt && evt.ctrlKey)
				return me.unselect();
			
			me.$el.focus();
			me.classObject.selected = true;
			me.$emit('focus', me);
			//if(evt)
			//	evt.stopPropagation();
		},
		
		_onNodeRemove: function(node, evt){
			const me = this;
			
			if(node == me || !me.selected)
				return;
			me.unselect();
			me.remove();
		},
		
		isSelectd: function(){
			return this.selected;
		},
		
		swapSelect: function(){
			this.classObject.selected = !this.classObject.selected;
		},
		
		unselect: function(evt, mouseevent){
			//console.log('unselect node', evt, mouseevent);
			const me = this;
			
			if(evt && (evt.ctrlKey || me.$el.contains(evt.srcElement)))
				return;

			me.classObject.selected = false;
			me.$emit('blur', me);
		},
		
	}
}
