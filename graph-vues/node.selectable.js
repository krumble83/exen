
const DoSelection = function(evt){
	const me = this;
	if(!me.classObject.selected && (evt && !evt.ctrlKey)){
		//unselect all other nodes
		me.Worksheet.getNode().forEach(function(it){
			it.unselect();
		});
	}
	me.select();
}


const DoContextMenu = function(menu, evt){
	console.log('DoContextMenu');
	menu.getItem('delete').callback = function(){
		console.log('delete selection');
	};
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
		//console.log('----->', this.$el);
		const me = this;
		
		me.$on('mouse:click', me.select);
		me.$on('mouse:cmenu', DoSelection);
		me.$on('drag:start', DoSelection);
		me.$on('cmenu', DoContextMenu);
		
		me.Worksheet.$on('mouse:leftup', me.unselect);
		me.Worksheet.$on('mouse:cmenu', me.unselect);
		//me.Worksheet.$on('node:cmenu', NodeCMenu);
	},
	
	mounted: function(){
		this.$el.setAttribute('tabindex', '-1');
	},
		
	beforeDestroy: function(){
		const me = this;
		me.$off('mouse:click', me.select);	
		me.$off('mouse:cmenu', DoSelection);
		me.$off('drag:start', DoSelection);
		
		me.Worksheet.$off('mouse:leftup', me.unselect);
		me.Worksheet.$off('mouse:cmenu', me.unselect);
	},
	
	methods: {
					
		select: function(evt){
			//console.log('select node', evt);
			const me = this;
			
			if(me.classObject.selected && evt && !evt.ctrlKey)
				return;
			else if(me.classObject.selected && evt && evt.ctrlKey)
				return me.unselect();
			
			me.$el.focus();
			me.classObject.selected = true;
			me.$emit('focus', me);
			//if(evt)
			//	evt.stopPropagation();
		},
		
		isSelectd: function(){
			return this.classObject.selected;
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
