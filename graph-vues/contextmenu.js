/*
*/

import Menu from '../cmon-vues/contextmenu.vue';

export const NodeContextMenu = {
	inject: ['App'],
	
	created: function(){
		this.$on('mouse:cmenu', this.showContextMenu);
	},
	
	beforeDestroy: function(){
		this.$off('mouse:cmenu', this.showContextMenu);
	},
	
	methods: {
		showContextMenu: function(evt){
			//console.log('showContextMenu',this.App);
			const me = this
				, ComponentClass = Vue.extend(Menu)
				, instance = new ComponentClass({parent: me.App});
				
			instance.classObject.context = true;
			
			instance.addTitle('Node Actions');
			instance.addItem({id: 'delete', title: 'Delete', desc: 'Delete this Node', callback: function(){
				me.remove();
			}});
			instance.addItem({id: 'duplicate', title: 'Duplicate', desc: 'Duplicate this Node'});
			instance.addSeparator();
			instance.addItem({id: 'cut', title: 'Cut'});
			instance.addItem({id: 'copy', title: 'Copy'});
			instance.addSeparator();
			instance.addItem({id: 'breaklinks', title: 'Break Link(s)', desc: 'Break all links to this Node'});
			
			me.$emit('cmenu', instance, evt);
			me.Worksheet.$emit('node:cmenu', me, instance, evt);
			instance.showAt(evt);

		},
	},
}


export const PinContextMenu = {
	inject: ['App'],
	created: function(){
		this.$on('mouse:cmenu', this.showContextMenu);
	},
	
	beforeDestroy: function(){
		this.$off('mouse:cmenu', this.showContextMenu);
	},
	
	methods: {
		showContextMenu: function(evt){
			const me = this;
			var ComponentClass = Vue.extend(Menu);
			var instance = new ComponentClass({parent: me.App});
			instance.classObject.context = true;
			
			const links = me.getLink();
			
			instance.addTitle('Pin Actions');
			instance.addItem({id: 'breaklinks', title: 'Break Link(s)', desc: 'Break all links to this Pin', callback: function(){
				links.forEach(function(link){
					link.$destroy();
				});
			}});
			
			// Remove link
			if(links.length == 1){
				var label = me.isInput() ? links[0].getOutput().Node.cTitle : links[0].getInput().Node.cTitle;
				instance.addItem({id: 'breaklink0', title: 'Break Link to "' + label + '"', desc: 'Break link to this Pin', callback: function(){
					links[0].$destroy();
				}});
			}
			else if(links.length > 1){
				var sub = instance.addSubMenu('Break link to...');
				links.forEach(function(link){
					var label = me.isInput() ? link.getOutput().Node.cTitle : link.getInput().Node.cTitle;
					sub.addItem({id: 'breaklink', title: label, desc: 'Break link to this Pin', callback: function(){
						link.$destroy();
					}});
				});
			}
			
			
			// Go to 
			if(links.length == 1){
				const node = me.isInput() ? links[0].getOutput().Node : links[0].getInput().Node;
				//var label = me.isInput() ? links[0].getOutput().Node.cTitle : links[0].getInput().Node.cTitle;
				instance.addItem({id: 'gotolink0', title: 'Goto Node "' + node.cTitle + '"', desc: 'Goto Node', callback: function(){
					me.Worksheet.mPanzoom.pan({x:node.x, y:node.y});
				}});
			}
			else if(links.length > 1){
				var sub = instance.addSubMenu('Goto Node...');
				links.forEach(function(link){
					var label = me.isInput() ? link.getOutput().Node.cTitle : link.getInput().Node.cTitle;
					sub.addItem({id: 'goto', title: label, desc: 'Goto Node', callback: function(){
						//link.$destroy();
					}});
				});
			}			
			
			
			me.$emit('cmenu', instance, evt);
			me.Node.$emit('pin:cmenu', me, instance, evt);
			me.Worksheet.$emit('pin:cmenu', me, instance, evt);
			instance.showAt(evt);
			
		},
	},
}