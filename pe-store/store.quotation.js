
import ws from './ws.js'
import {EventBus} from '../cmon-js/event-bus.js';

export default {
	state: function() {
		return {
			uid: 0,
			author: 0,
			customer: 0,
			site: '',
			address: '',
			date: '',
			validity: '',
			contents: [],
			_products: [],
		};
	},

	getters: {
		getContents: (state) => {
			return state.contents;
		},

		getProducts: (state) => {
			return state.products;
		},
	},
	
	mutations: {
		init: function(state){
			EventBus.$on('ws:productsList', function(message){
				state._products.splice(0, state._products.length);
				message.content.forEach(function(it){
					state._products.push(it);
				});				
			});
			
		},

		clearProducts: function(state){
			state.products.splice(0, state.products.length);
		},
		
		searchProductsByReference: function(state, query){
			setTimeout(function(){
				ws.send('{"type": "getProducts", "query": "' + query + '", "ruid": "1"}');
			}, 100);			
		}
	},
	/*
	mutations: {
		setPersons: (state, payload) => {
			state.customers = [...payload]
		}
	},
	
	actions: {
		async updateCustomers({
			commit
		}) {
			return new Promise(function(resolve, reject) {
				setTimeout(async () => {
					commit('setPersons', [{
						name: 'John',
						lastname: 'Smith'
					}, {
						name: 'Sarah',
						account: 'Appleseed'
					}])

					resolve();
				}, 1000)
			})
		}
	}
	*/
}