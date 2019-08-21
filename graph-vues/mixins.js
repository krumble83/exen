
const WorksheetHelpers = {

	//inject:['viewport'],
	methods: {
		svgToScreen: function(x, y){
			if(x && x.x && x.y)
				point = x;
			else {
				point = getSvgPoint(x, y);
			}	
			point = point.matrixTransform(this.getViewportEl().getCTM());
			return point;			
		},
		
		mouseToSvg: function(evt, point){
			point = point || this.getSvgPoint();
			point.x = (evt.mozInputSource !== undefined) ? evt.layerX : evt.offsetX;
			point.y = (evt.mozInputSource !== undefined) ? evt.layerY : evt.offsetY;
			var ret = point.matrixTransform(this.getViewportEl().getCTM().inverse());
			point.x = ret.x;
			point.y = ret.y;
			return point;
		},
		

		getViewportEl: function(){
			return this.$parent.getViewportEl();
		},
		
		getSvg: function(){
			return this.$parent.getSvg();
		},
		
		getSvgPoint(x, y){
			var ret = this.getSvg().createSVGPoint();
			if(typeof x != 'undefined')
				ret.x = x;
			if(typeof y != 'undefined')
				ret.y = y;
			return ret;
		},
	},
	
	computed: {
		//$worksheet: function(){return this.getWorksheet();},
		//$viewport: function(){return this.getViewportEl();},
	}
}

export {WorksheetHelpers};

export const SvgBase = {
	//mixins: [WorksheetHelpers],
	props: {
		gid: {type: String, default: function(){return Vue.options.methods.$uid()}},
		x: {type: Number, default: 0}, 
		y: {type: Number, default: 0}, 
		width: {type: Number, default: 30}, 
		height: {type: Number, default: 100}
	},
	
	data () {
		return {
			mHeight: this.height,
			mWidth: this.width,
		}
	},
}	
