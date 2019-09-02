
import LibraryMenu from './librarymenu.vue';

export default {
	inject: ['App', 'Library'],
	
	data: function(){
		return {
			//dPanned: false,
		}
	},
	
	created: function(){
		var me = this;
		
		//me.$on(['link:draw:stop', 'mouse:cmenu'], me.showLibraryMenu);
		me.preventPan(['link:draw:stop', 'mouse:cmenu'], me.showLibraryMenu);
		/*
		me.$once('pan:start', function(){
			me.dPanned = true;
		});
		*/
	},
	
	methods: {
		showLibraryMenu: function(arg1, arg2){
			//console.log('zzz', arg1 instanceof Vue);
			const me = this
				, ComponentClass = Vue.extend(LibraryMenu)
				, menu = new ComponentClass({parent: me.App});

			menu.$once('close', function(){
			});
			
			var q = this.Library.createQuery();
			//console.log(this.store);
			
			if(arg1.getInput && arg1.getInput())
				q.inputDatatype = arg1.getInput().datatype;
			else if(arg1.getOutput)
				q.outputDatatype = arg1.getOutput().datatype;
			
			menu.setContextStore(this.store);
			menu.update(q);
			
			if(arg1 instanceof Vue){
				arg2.preventDefault();
				menu.showAt(arg2);
			}
			else {
				arg1.preventDefault();
				menu.showAt(arg1);
			}

		},
	},
}