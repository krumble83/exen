					
			Vue.use(Vuex);
			
			import App from './ui-vues/project.vue';
			
			var test = new Vue({
				el: '#app',
				render: h => h(App)
			});
			console.log("zzzz");
			
			var n = {name: 'setup', flags: F_READ_ONLY|F_LOCK_IO};
			
			//test.addFunction(n, false);
			//test.addFunction({name: 'loop'}, false);
			
			//console.dir(test.$store);
			//console.log(test.$store.getters['undoRedo/canUndo']);
			//test.$store.dispatch('undo');