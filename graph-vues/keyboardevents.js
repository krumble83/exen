export const worksheetKeyboardEvents = {
	
	created: function(){
		const me = this;

		this.$on('node:cmenu', function(node, menu, evt){
			console.log('keyboardzz');
			menu.getItem('delete').shortcut = 'Del';
			menu.getItem('duplicate').shortcut = 'ctrl+D';
			menu.getItem('cut').shortcut = 'ctrl+X';
			menu.getItem('copy').shortcut = 'ctrl+C';
		});
		
	},
	
	methods: {
		onKeyUp: function(evt){
			
			
			switch(evt.keyCode){
				case 67: // ctrl+C
					if(evt.ctrlKey)
					{
						console.log('okayyy', evt);
						return true;
					}
					break;
				
				case 86: // ctrl+V
					if(evt.ctrlKey)
					{
						console.log('okayyy', evt);
						return true;
					}
					break;
				
				case 88: // ctrl+x
					if(evt.ctrlKey)
					{
						console.log('okayyy', evt);
						return true;
					}
					break;
				
				case 46: // Del
					console.log('okayyy', evt);
					return true;
					break;
				
				case 68: // ctrl+D
					if(evt.ctrlKey)
					{
						console.log('okayyy', evt);
						return true;
					}
					break;
			}
		},
	},
}