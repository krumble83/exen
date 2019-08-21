/*
*/

import Menu from '../cmon-vues/contextmenu.vue';

export const NodeContextMenu = {
	
	created: function(){
		const me = this;

		this.$on('mouse:cmenu', function(evt){
			console.log('cmenuuuuuuu');
			
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
		});
	},	
}


export const PinContextMenu = {
	created: function(){
		const me = this;

		this.$on('mouse:cmenu', function(evt){
			//console.log('cmenuuuuuuu');
			
			var ComponentClass = Vue.extend(Menu);
			var instance = new ComponentClass();
			instance.classObject.context = true;
			
			instance.addTitle('Pin');
			instance.addItem({id: 'breaklinks', title: 'Break Links', desc: 'Break all links to this Pin'});
			
			me.$emit('cmenu', me, instance, evt);
			me.$node.$emit('pin:cmenu', me, instance, evt);
			me.$worksheet.$emit('pin:cmenu', me, instance, evt);
			instance.showAt(evt.clientX, evt.clientY);
		});
	},
}