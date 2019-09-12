
import LibraryMenu from './librarymenu.vue';


export default {
	inject: ['App', 'Library'],
	
	data: function(){
		return {
			//dPanned: false,
		}
	},
	
	created: function(){
		this.$on(['link:draw:stop', 'mouse:cmenu'], this.showLibraryMenu);
	},
	
	beforeDestroy: function(){
		this.$off(['link:draw:stop', 'mouse:cmenu'], this.showLibraryMenu);
	},
	
	methods: {
		showLibraryMenu: function(evt, link){
			//console.log('zzz', arg1 instanceof Vue);
			const me = this
				, ComponentClass = Vue.extend(LibraryMenu)
				, menu = new ComponentClass({parent: me.App})
				, query = this.Library.createQuery();


			const createNode = function(item){
				console.log('cliiiiick', item);
				const lnode = this.Library.getNodeById(item.getAttribute('data-id'))
					, newNode = lnode ? lnode.toObject() : false;
				
				console.log(newNode);
				if(!newNode){
					console.warn('can\'t find node ' + item.getAttribute('data-id'));
					link.$destroy();
					return;
				}
				var pos = me.mouseToSvg(evt);
				newNode.x = pos.x;
				newNode.y = pos.y;
				me.store.commit('addNode', newNode);
				menu.$off('close', closeMenu);
				
				me.$nextTick(function(){
					const n = me.getNode(newNode.uid);
					var p;
					console.assert(n);
					console.log(n);
					
					//find closest pin to attach
					if(query.inputDatatype) {
						p = n.getOutput(function(pin){
							return pin.datatype == query.inputDatatype;
						});
					} else {
						p = n.getInput(function(pin){
							return pin.datatype == query.outputDatatype;
						});						
					}
					//console.log('---', p);
					if(p[0]){
						link.finishLink(p[0]);
					}
				})
				if(link)
					link.$destroy();
			}
			
			const closeMenu = function(){
				menu.$off('click', createNode);
				if(link)
					link.$destroy();				
			}
			
			menu.$once('close', closeMenu);
			menu.$once('click', createNode);
						
			if(link && link.getInput())
				query.inputDatatype = link.getInput().datatype;
			else if(link && link.getOutput())
				query.outputDatatype = link.getOutput().datatype;
			
			evt.preventDefault();
			//menu.setContextStore(this.store);
			query.context = this.store;
			menu.update(query);
			menu.showAt(evt);

		},
		
		addLibraryNode: function(id, evt, link){
			//console.log('iddddd', id);
			var lnode = this.Library.getNode(id)
				, newNode = lnode ? lnode.toObject() : false;
			if(newNode){
				//console.log(newNode);
				var pos = this.mouseToSvg(evt);
				newNode.x = pos.x;
				newNode.y = pos.y;
				this.store.commit('addNode', newNode);
			}
		}
	},
}