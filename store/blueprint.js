

export default {
	state: {
		nodes: [],
		links: [],
		inputs: [],
		outputs: [],
	},

	mutations: {
		emptyState() {
			this.replaceState({ nodes: [], links: [] });
		},
	},
	
	getters: {
	}
}
