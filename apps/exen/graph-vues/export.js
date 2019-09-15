import ExNode from './node.vue';

ExNode.mixins.push({
	created: function(){
		this.$on('keyboard:down', this._onKeyDown);
	},
	
	beforeDestroy: function(){
		
	},
	
	methods: {
		_onKeyDown: function(evt){
			switch(evt.keyCode){
				case 46: // Del
					console.log('delete node');
					evt.stopPropagation();
					this.remove();
					break;
				
				case 68: // ctrl+D
					if(evt.ctrlKey)
					{
						console.log('okayyy', evt);
						return true;
					}
					break;
			}
			this.$emit('key:down', evt);
			this.Worksheet.$emit('node:key:down', this, evt);
		}
	}
})