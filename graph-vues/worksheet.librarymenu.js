
import LibraryMenu from './librarymenu.vue';

export default {
	//inject: ['preventPan'],
	
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
			console.log('zzz', arg1 instanceof Vue);
			var me = this;
			
			/*
			if(me.dPanned){
				me.dPanned = false;
				me.$once('pan:start', function(){
					me.dPanned = true;
				});
				return;
			}
			*/
			var ComponentClass = Vue.extend(LibraryMenu);
			var instance = new ComponentClass();
			
			instance.$once('menu:close', function(){
				//if(arg1 instanceof Vue)
				//	arg1.$destroy();
			});
			
			if(arg1 instanceof Vue){
				arg2.preventDefault();
				instance.showAt(arg2);
			}
			else {
				arg1.preventDefault();
				instance.showAt(arg1);
			}
			/*
			instance.$mount();
			me.$worksheet.$el.querySelector('.exLinks').appendChild(instance.$el);
			instance.$parent = this.$worksheet;
			instance.startDraw();
			*/
		},
	},
}

