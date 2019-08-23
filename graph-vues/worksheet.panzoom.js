
export default {
	
	provide: function(){
		var me = this;
		
		return {
			preventPanCmenu: function(evts, callback){
				var targ = this;
				
				me.$once('pan:start', function(){
					targ.dPanned = true;
				});
				
				targ.$on(evts, function(){
					if(targ.dPanned){
						targ.dPanned = false;
						me.$once('pan:start', function(){
							targ.dPanned = true;
						});
						return;
					}
					callback.apply(targ, arguments);
				});
			},
		}
	},
	
	data: function(){
		return {
			classObject: {
				panEvent: false,
			},
		}
	},		

	created: function(){
		this.$on('node:cmenu', this.stopPan);
	},
	
	beforeDestroy: function(){
		this.$off('node:cmenu', this.stopPan);	
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
			useGlobalMove: true,
			restrictPanButton: 2,
			endPan: function(pan, evt){
				me.$emit('pan:end', pan, evt);
				me.classObject.panEvent = false;
			},
			startPan: function(evt){
				console.log('pan:start');
				me.$emit('pan:start', evt);
				me.classObject.panEvent = true;
			},
		});
		this.$el._panzoom = panzoom;
		this.$emit('panzoom', panzoom);
	},
	
	methods: {
		stopPan: function(){
			this.$el._panzoom.stopPan();
		},
		
		preventPan: function(evts, callback){
			var targ = this;
			
			targ.$once('pan:start', function(){
				targ.dPanned = true;
			});
			
			targ.$on(evts, function(evt){
				if(targ.dPanned){
					targ.dPanned = false;
					targ.$once('pan:start', function(){
						targ.dPanned = true;
					});
					return;
				}
				callback.apply(targ, arguments);
			});
		},
		
	}
};