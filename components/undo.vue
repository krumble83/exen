<script>
	import App from './App.vue';
	import undoImg from '../img/undo.png';
	import redoImg from '../img/redo.png';
	
	const EMPTY_STATE = 'emptyState';
	
	App.mixins.push({		
		data: function() {
			return {
				done: [],
				undone: [],
				newMutation: true,
				ignoreMutations: ['changeNodePropertyShadow'],
				sequence: 0,
			};
		},
	
		computed: {
			canRedo() {
				return this.undone.length;
			},
			canUndo() {
				return this.done.length;
			}
		},
			
		created: function() {
			if (this.$store) {
				this.$store.subscribe(mutation => {
					//console.log('mutation recorded ', mutation.type)
					if (mutation.type !== EMPTY_STATE && this.ignoreMutations.indexOf(mutation.type) === -1) {
						//mutation.sequence = this.sequence;
						this.done.push(mutation);
					}
					if (this.newMutation) {
						this.undone = [];
					}
				});
			}
		},
	
		mounted: function(){
			var me = this;
			if(this.toolbuttons && this.toolbuttons.push){
				var undo = {
					img: undoImg, 
					title:'undo last action', 
					action: this.undo,
					classObject: {
						undoredo: true,
						undo: true,
						enable: this.canUndo,
					}
				};
				this.toolbuttons.push(undo);
				this.$watch('canUndo', function(val){
					undo.classObject.enable = val;
				});
				
				var redo = {
					img: redoImg, 
					title:'redo last action', 
					action: this.redo,
					classObject: {
						undoredo: true,
						redo: true,
						enable: this.canRedo,
					}
				}
				this.toolbuttons.push(redo);
				this.$watch('canRedo', function(val){
					redo.classObject.enable = val;
				});
			}
		},
		
		methods: {
			redo: function() {
				if(!this.canRedo)
					return;
				let commit = this.undone.pop();
				this.newMutation = false;
				switch (typeof commit.payload) {
					case 'object':
						this.$store.commit(`${commit.type}`, Object.assign({}, commit.payload));
						break;
					default:
						this.$store.commit(`${commit.type}`, commit.payload);
				}
				this.newMutation = true;
			},
			
			undo: function() {
				console.log('undo');
				if(!this.canUndo)
					return;
				this.undone.push(this.done.pop());
				this.newMutation = false;
				this.$store.commit(EMPTY_STATE);
				this.done.forEach(mutation => {
					//console.log(mutation.sequence);
					switch (typeof mutation.payload) {
						case 'object':
							this.$store.commit(`${mutation.type}`, Object.assign({}, mutation.payload));
							break;
						default:
							this.$store.commit(`${mutation.type}`, mutation.payload);
					}
					this.done.pop();
				});
				this.newMutation = true;
			},
			
			startSequence: function(){
				this.sequence++;
			},
			
			stopSequence: function(){
				this.sequence--;			
			},
		},			
	});
</script>
