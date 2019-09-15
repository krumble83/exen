
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
				
				default:
					this.$emit('key:down', evt);
					this.Worksheet.$emit('node:key:down', this, evt);
					break;
			}
		}
	}
})


const doCMenu = function(node, menu, evt){
	menu.$once('show', function(){
		menu.getItem('delete').shortcut = 'Del';
		menu.getItem('duplicate').shortcut = 'ctrl+D';
		if(menu.getItem('cut')){
			menu.getItem('cut').shortcut = 'ctrl+X';
			menu.getItem('copy').shortcut = 'ctrl+C';
		}
	});	
}

export default {
	
	created: function(){
		const me = this;

		this.$on('node:cmenu', doCMenu);
		this.$on('keyboard:down', this._onKeyDown);
	},
	
	beforeDestroy: function(){
		this.$off('node:cmenu', doCMenu);
		this.$off('keyboard:down', this._onKeyDown);
	},
	
	methods: {
		_onKeyDown: function(evt){
			this.$emit('key:down', evt);
			//this.Worksheet.$emit('node:key:down', this, evt);			
		}
	}
}