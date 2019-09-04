
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
			var point = this.getSvg().createSVGPoint();
			if(typeof x == 'undefined')
				return point;

			point.x = x;
			point.y = y;
			var ret = point.matrixTransform(this.getViewportEl().getScreenCTM().inverse()); // <------------- /!\ getScreenCTM() /!\
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
		uid: {type: String, default: function(){return Vue.options.methods.$uid('svg')}},
		x: {type: Number, default: 0}, 
		y: {type: Number, default: 0}, 
		width: {type: Number, default: 100}, 
		height: {type: Number, default: 60}
	},
	
	data () {
		return {
			mX: this.x,
			mY: this.y,
			mHeight: this.height,
			mWidth: this.width,
		}
	},
}	
