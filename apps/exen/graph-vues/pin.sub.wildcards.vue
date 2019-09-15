<script>
	import ExPin from './pin.vue';
	
	export default {
		extends : ExPin,
		
		props: {
			datatype: {type: String, default: 'core.wildcards'}
		},

		data: function() {
			return {
				classObject: {
					pinwildcards: true,
				},
			}
		},
		
		watch: {
			mLinkCount: function(newVal, oldVal){
				if(newVal > 1)
					this.changeDatatype(this.Library.getWildcardsDatatype());
				else if(newVal == 1 && this.mDatatype == this.Library.getWildcardsDatatype()){
					
					return;
					
					// check if all pins in group can change theyre datatype
					var ev = {
						items: [],
						prevented: false,
						push: function(it){this.items.push(it)},
						prevent: function(){this.prevented = true}
					}
					this.canChangeDatatype(newDatatype, ev);
				}
			}
		},
		
		methods: {
			changeDatatype: function(newDatatype){
				const me = this
					
				if(this.mDatatype == newDatatype)
					return true;
												
			},
			
			canChangeDatatype: function(newDatatype, evt){
				const me = this
					, group = me.Node.getPinGroup(me.group)
					, links = me.getLinks();
				
				if(evt.items.find(it => it == me) || evt.prevented)
					return;
				
				evt.items.push(me);
				
				group.forEach(function(pin){
					if(!pin.canChangeDatatype && pin.getDatatype() != newDatatype)
						evt.prevent();
					else if(pin.canChangeDatatype)
						pin.canChangeDatatype(newDatatype, evt);
				});
				
				if(evt.prevented)
					return;

				links.forEach(function(link){
					if(!link.canChangeDatatype && link.getDatatype() != newDatatype)
						evt.prevent();
					else if(link.canChangeDatatype)
						link.canChangeDatatype(newDatatype, evt);
					
				});
				
			}
		},
	};

</script>
