/*
*/

import Menu from '../cmon-vues/contextmenu.vue';

export const NodeContextMenu = {
	inject: ['preventPanCmenu', 'App'],
	
	created: function(){
		const me = this;

		me.preventPanCmenu('mouse:cmenu', me.showContextMenu);

	},
	
	beforeDestroy: function(){
		this.$off('mouse:cmenu', this.showContextMenu);
	},
	
	methods: {
		showContextMenu: function(evt){
			console.log('*-*-',this.App);
			const me = this
				, ComponentClass = Vue.extend(Menu)
				, instance = new ComponentClass({parent: me.App});
				
			instance.classObject.context = true;
			
			instance.addTitle('Node');
			instance.addItem({id: 'delete', title: 'Delete', desc: 'Delete this Node'});
			instance.addItem({id: 'duplicate', title: 'Duplicate', desc: 'Duplicate this Node'});
			instance.addSeparator();
			instance.addItem({id: 'cut', title: 'Cut'});
			instance.addItem({id: 'copy', title: 'Copy'});
			instance.addSeparator();
			instance.addItem({id: 'breaklinks', title: 'Break Links', desc: 'Break all links to this Node'});
			
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
						
			instance.addTitle('Pin');
			instance.addItem({id: 'breaklinks', title: 'Break Links', desc: 'Break all links to this Pin'});
			
			me.$emit('cmenu', instance, evt);
			me.Node.$emit('cmenu', me, instance, evt);
			me.Worksheet.$emit('pin:cmenu', me, instance, evt);
			instance.showAt(evt);
			
		},
	},
}