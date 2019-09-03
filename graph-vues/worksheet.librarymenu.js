
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
	
	beforeDestroy: function(){
		me.$off(['link:draw:stop', 'mouse:cmenu'], me.showLibraryMenu);
	},
	
	methods: {
		showLibraryMenu: function(evt, link){
			//console.log('zzz', arg1 instanceof Vue);
			const me = this
				, ComponentClass = Vue.extend(LibraryMenu)
				, menu = new ComponentClass({parent: me.App})
				, q = this.Library.createQuery();

			menu.$once('close', function(){
				//return;
				if(link)
					link.$destroy();
			});
			
			menu.$once('click', function(item){
				console.log('cliiiiick', item);
				me.addLibraryNode(item.getAttribute('data-id'), evt);
			});
						
			if(link && link.getInput())
				q.inputDatatype = link.getInput().datatype;
			else if(link && link.getOutput())
				q.outputDatatype = link.getOutput().datatype;
			
			evt.preventDefault();
			//menu.setContextStore(this.store);
			q.context = this.store;
			menu.update(q);
			menu.showAt(evt);

		},
		
		addLibraryNode: function(id, evt){
			//console.log('iddddd', id);
			var lnode = this.Library.getNode(id)
				, newNode = lnode ? lnode.toObject() : false;
			if(newNode){
				newNode.x = evt.clientX;
				newNode.y = evt.clientY;
				this.store.commit('addNode', lnode.toObject());
			}
		}
	},
}