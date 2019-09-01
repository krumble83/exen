
import QuotationStore from './store.quotation.js'
import ws from './ws.js'
import {EventBus} from '../cmon-js/event-bus.js';

export default {
	state: {
		authors: [
			{uid: 0, name: 'Didier BOURET'},
		],
		customers: [],
		products: [
		],
	},
	
	mutations: {
		
		init: function(state){
			EventBus.$on('ws:customersList', function(message){
				state.customers.splice(0, state.customers.length);
				console.log(message.content);
				//var data = JSON.parse(message.content);
				message.content.forEach(function(it){
					state.customers.push(it);
				});				
			});
			setTimeout(function(){
				ws.send('{"type": "getCustomers"}');
			}, 100);
			
		},
		
		clearProducts: function(state){
			state.products.splice(0, state.products.length);
		},
		
		searchProductsByReference: function(state, query){
			
		}
	},

	getters: {
		/*
		getLastNameByName: (state) => (name) => {
			return state.customers.find(element => {
				return element.name === name
			}).lastname
		},
		*/
		getCustomers: (state) => {
			return state.customers;
		},
		
		searchProductsByReference: (state) => (query) => {
			return state.products.filter(it => it.reference.startsWith(query));
		},

		getCustomerById: (state) => (id) => {
			return state.customers.find(it => it.uid == parseInt(id));
		},

		searchCustomers: (state) => (str) => {
			if(!str)
				return state.customers;
			var ret = [];
			state.customers.forEach(function(it){
				
			});
			return ret;
		},
		
		createQuotation: (state) => {
			return new Vuex.Store(QuotationStore);
		},
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