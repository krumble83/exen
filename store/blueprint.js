

export default {
	state: {
		nodes: [],
		links: []
	},

	mutations: {
		emptyState() {
			this.replaceState({ nodes: [], links: [] });
		},
	},
	
	getters: {
	}
}
