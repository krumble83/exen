

export default {
		
	data: function(){
		return {
			classObject: {
				panEvent: false,
			},
			mPanzoom: false,
		}
	},
	
	created: function(){
		//this.$on('node:cmenu', this.stopPan);
	},
	
	beforeDestroy: function(){
		//this.$off('node:cmenu', this.stopPan);	
	},
			
	mounted: function(){
		const me = this;
		var panzoom = svgPanZoom(this.$el, {
			viewportSelector: '.exViewport', 
			fit: false, 
			center: false,
			zoomScaleSensitivity: 0.3,
			minZoom: 0.05,
			maxZoom: 1,
			preventMouseEventsDefault: false, // set to false for dragging ui elements
			useGlobalMove: false,
			restrictPanButton: 2,
			endPan: function(pan, evt){
				//console.log('pan:end');
				evt.stopPropagation();
				evt.stopImmediatePropagation();
				me.$emit('pan:end', pan, evt);
				me.classObject.panEvent = false;
			},
			startPan: function(evt){
				//console.log('pan:start');
				document.addEventListener('contextmenu', function(ev){
					//console.log('prevent context');
					ev.preventDefault();
					ev.stopPropagation();	
				}, {capture:true, once: true});
				
				me.classObject.panEvent = true;
				me.$emit('pan:start', evt);
			},
			onPan: function(newPan){
				//console.log('pan:panning', newPan);
				me.$emit('pan:panning', newPan);
			}
		});
		this.$el._panzoom = panzoom;
		this.mPanzoom = panzoom;
		this.$emit('pan:init', panzoom);
	},
	
	methods: {
		stopPan: function(){
			this.$el._panzoom.stopPan();
		},
		/*
		isPanning: function(){
			return this.classObject.panEvent;
		},
		*/
	}
};