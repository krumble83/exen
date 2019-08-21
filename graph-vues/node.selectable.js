
export default {
	//inject: ['$worksheet'],	
	data: function(){
		return {
			classObject: {
				selected: false,
			}		
		}
	},
	
	created: function(){
		//console.log('----->', this.$el);
		const me = this;
		
		me.$on('mouse:click', me.select);
		me.$on('mouse:rightup', me.select);
		me.$on('dragstart', me.onStartDrag);
		me.$worksheet.$on('mouse:leftup', me.unselect);
		me.$worksheet.$on('mouse:rightup', me.unselect);


		/*
		this.$worksheet.$on('pan:start', function(evt){
			me.$off('mouse:rightup', me.selectNode);
		});

		this.$worksheet.$on('pan:end', function(evt){
			me.$on('mouse:rightup', me.selectNode);
		});
		*/
	},
	
	mounted: function(){
		this.$el.setAttribute('tabindex', '-1');

	},
		
	beforeDestroy: function(){
		const me = this;
		me.$off('mouse:click', me.select);	
		me.$off('mouse:rightup', me.select);
		me.$off('dragstart', me.onStartDrag);
		me.$worksheet.$off('mouse:leftup', me.unselect);
		//me.$worksheet.$off('mouse:rightup', me.unselect);
	},
	
	methods: {
					
		select: function(evt){
			console.log('select', evt);
			const me = this;
			
			if(me.classObject.selected)
				return;
			
			me.$el.focus();
			me.classObject.selected = true;
			me.$emit('focus', me);
			
		},
		
		unselect: function(evt){
			const me = this;
			
			if(evt && (evt.ctrlKey || me.$el.contains(evt.srcElement)))
				return;

			me.classObject.selected = false;
			me.$emit('blur', me);
		},
		
		onStartDrag: function(evt){
			const me = this;
			if(!me.classObject.selected){
				//unselect all other nodes
				me.$worksheet.$refs.nodes.forEach(function(it){
					it.unselect();
				});
			}
			me.select();
		},
	}
}
