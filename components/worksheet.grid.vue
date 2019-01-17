<script>

	import {genUid} from '../utils';
	import ExWorksheet from './worksheet.vue';
	import ExNode from './node.vue';

	ExNode.mixins.push({
		inject: ['snapToGrid'],
		
		mounted: function(){
			this.mX = this.snapToGrid(this.x);
			this.mY = this.snapToGrid(this.y);
		},
		
		watch: {
			mX: function(val){
				this.mX = this.snapToGrid(val);
			},
			mY: function(val){
				this.mY = this.snapToGrid(val);
			}
		}
	});

	
	ExWorksheet.mixins.push({		
		props: {
			snap: {default: 16},
		},
		
		provide: {
			snapToGrid: function(x, y){
				if(typeof x !== 'undefined' && typeof y === 'undefined')
					return parseInt(x/16)*16;
				else if(typeof y !== 'undefined' && typeof x === 'undefined')
					return parseInt(y/16)*16;
				else
					return {x: parseInt(x/16)*16, y: parseInt(y/16)*16};
			}
		},
		
		created: function(){
			var me = this
			, smallId = genUid()
			, data = [
				{props: {is: 'pattern', id: smallId,x: 0,y:0,width: this.snap,height: this.snap,patternUnits: 'userSpaceOnUse', class: 'smallGrid'},
					childs: [{props:{is: 'path',d: 'M ' + this.snap + ' 0 L 0 0 0 ' + this.snap, fill: 'none'}}]
				},
				{props: {is: 'pattern', id: 'grid_' + this.id, x: 0, y:0, width: (this.snap*8), height: (this.snap*8), patternUnits: 'userSpaceOnUse', class: 'medGrid'},
					childs: [{props:{is: 'rect', width: (this.snap*8), height: (this.snap*8), fill: 'url(#' + smallId + ')'}}]
				}
			];
				
			this.getWorksheet().addDef(data);
		},
		
		mounted: function(){		
			var panzoom = svgPanZoom(this.$el, {
				viewportSelector: '.exViewport', 
				fit: false, 
				center: false,
				zoomScaleSensitivity: 0.4,
				minZoom: 0.05,
				maxZoom: 1,
				useGlobalMove: true,
				restrictPanButton: 2,
			});
			this.$el._panzoom = panzoom;
			this.$emit('panzoom', panzoom);
		},
		
		methods: {
			snaptoGridzzzzzzzzzz: function(x, y){
				if(typeof x !== "undefined" && typeof y === "undefined")
					return parseInt(x/16)*16;
				else if(typeof y !== "undefined" && typeof x === "undefined")
					return parseInt(y/16)*16;
				else
					return {x: parseInt(x/16)*16, y: parseInt(y/16)*16};
			}
		}
	});

</script>

