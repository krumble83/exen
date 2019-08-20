/*
Vue.directive('inline', {
	inserted: function(el, bind, vm){
		var prev = el.previousSibling;
		if(!prev)
			return;
		if(prev.nodeName == '#text')
			prev = prev.previousSibling;
		//console.log(prev);
		var box = prev.getBBox();
		if(bind && bind.modifiers && bind.modifiers.debug)
			console.log(el, prev, box, el.getCTM())//.getTransformToElement(prev));
		if(bind && bind.modifiers && bind.modifiers.vertical)
			el.setAttribute('y', (parseInt(prev.getAttribute('y')) ||0) + box.height + (bind.value || 0));
		if(bind.modifiers && bind.modifiers.horizontal)
			el.setAttribute('x', (parseInt(prev.getAttribute('x')) ||0) + box.width + (bind.value || 0));			
	},

	update: function(el, bind){
		//console.log('update', bind);
		var prev = el.previousSibling;
		if(!prev)
			return;
		if(prev.nodeName == '#text')
			prev = prev.previousSibling;
		
		var box = prev.getBBox();
		if(bind && bind.modifiers && bind.modifiers.debug)
			console.log(el, prev, box, el.getCTM())//.getTransformToElement(prev));
		if(bind && bind.modifiers && bind.modifiers.vertical)
			el.setAttribute('y', (parseInt(prev.getAttribute('y')) ||0) + box.height + (bind.value || 0));
		if(bind.modifiers && bind.modifiers.horizontal)
			el.setAttribute('x', (parseInt(prev.getAttribute('x')) ||0) + box.width + (bind.value || 0));
	},

	componentUpdated: function(el, bind){
		//console.log('update', bind);
		var prev = el.previousSibling;
		if(!prev)
			return;
		if(prev.nodeName == '#text')
			prev = prev.previousSibling;
		
		var box = prev.getBBox();
		if(bind && bind.modifiers && bind.modifiers.debug)
			console.log(el, prev, box, el.getCTM())//.getTransformToElement(prev));
		if(bind && bind.modifiers && bind.modifiers.vertical)
			el.setAttribute('y', (parseInt(prev.getAttribute('y')) ||0) + box.height + (bind.value || 0));
		if(bind.modifiers && bind.modifiers.horizontal)
			el.setAttribute('x', (parseInt(prev.getAttribute('x')) ||0) + box.width + (bind.value || 0));
	}
});
*/

/*
const main_group_selector = ".svg-pan-zoom_viewport";

function getSvgPoint(x, y) {
        var svgDropPoint = $("svg")[0].createSVGPoint();

        svgDropPoint.x = x;
        svgDropPoint.y = y;

        svgDropPoint = svgDropPoint.matrixTransform($(main_group_selector)[0].getCTM().inverse());
        return svgDropPoint;
    }
*/	
	
export const WorksheetHelpers = {
	methods: {

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
		
		getMousePoint: function(evt, point){
			if(typeof point == 'undefined')
				point = this.getSvg().createSVGPoint();
			
			point.x = (evt.mozInputSource !== undefined) ? evt.layerX : evt.offsetX;
			point.y = (evt.mozInputSource !== undefined) ? evt.layerY : evt.offsetY;
			point = point.matrixTransform(this.getViewportEl().getCTM().inverse());
			return point;
		},
	},
	
	computed: {
		//$worksheet: function(){return this.getWorksheet();},
		$viewport: function(){return this.getViewportEl();},
	}
}

export const SvgHelpers = {
	methods: {
		getMouseEventCoords: function(point, evt){
			
		}
	}
}

export const SvgBase = {
	mixins: [WorksheetHelpers],
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
