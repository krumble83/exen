/*
*/

import Menu from '../cmon-vues/contextmenu.vue';

export const NodeContextMenu = {
	inject: ['preventPanCmenu'],
	
	created: function(){
		const me = this;


		me.preventPanCmenu('mouse:cmenu', me.showContextMenu);
		//me.$on('mouse:cmenu', me.showContextMenu);
		
		/*
		me.$worksheet.$once('pan:start', function(){
			me.dPanned = true;
		});		
		*/
	},
	
	beforeDestroy: function(){
		this.$off('mouse:cmenu', this.showContextMenu);
	},
	
	methods: {
		showContextMenu: function(evt){
			var me = this;
			
			/*
			if(me.dPanned){
				me.dPanned = false;
				me.$worksheet.$once('pan:start', function(){
					me.dPanned = true;
				});
				return;
			}
			*/
			var ComponentClass = Vue.extend(Menu);
			var instance = new ComponentClass();
			instance.classObject.context = true;
			
			instance.addTitle('Node');
			instance.addItem({id: 'delete', title: 'Delete', desc: 'Delete this Node'});
			instance.addItem({id: 'duplicate', title: 'Duplicate', desc: 'Duplicate this Node'});
			instance.addSeparator();
			instance.addItem({id: 'cut', title: 'Cut'});
			instance.addItem({id: 'copy', title: 'Copy'});
			instance.addSeparator();
			instance.addItem({id: 'breaklinks', title: 'Break Links', desc: 'Break all links to this Node'});
			
			me.$emit('cmenu:before', me, instance, evt);
			me.$worksheet.$emit('node:cmenu', me, instance, evt);
			instance.showAt(evt.clientX, evt.clientY);

		},
	},
}


export const PinContextMenu = {
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
			var instance = new ComponentClass();
			instance.classObject.context = true;
			
			instance.addTitle('Pin');
			instance.addItem({id: 'breaklinks', title: 'Break Links', desc: 'Break all links to this Pin'});
			
			me.$emit('cmenu', me, instance, evt);
			me.$node.$emit('pin:cmenu', me, instance, evt);
			me.$worksheet.$emit('pin:cmenu', me, instance, evt);
			instance.showAt(evt.clientX, evt.clientY);
			
		},
	},
}