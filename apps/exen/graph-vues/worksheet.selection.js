
import {WorksheetHelpers} from './mixins.js';


const detectSelectionStart = function(evt){
	var me = this;
	//return;
	var detectMove = function(mevt){
		if((mevt.clientX - evt.clientX) > 3 || (evt.clientX - mevt.clientX) > 3
			|| (mevt.clientY - evt.clientY) > 3 || (evt.clientY - mevt.clientY) > 3
		){
			console.log('start selection');
			document.removeEventListener('mousemove', detectMove);
			me.classObject.selectEvent = true;
			handleSelection.call(me, mevt);
		}
	}
	
	document.addEventListener('mousemove', detectMove);
	document.addEventListener('mouseup', function(){
		document.removeEventListener('mousemove', detectMove);
	}, {once: true});
}

const handleSelection = function(evt){
	const me = this
	, point = me.getSvgPoint()
	, rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	
	var moveEvt = false;
	
	const setPoint = (ev, point) => {
		point = point || me.getSvgPoint()
		point.x = (ev.mozInputSource !== undefined) ? ev.layerX : ev.offsetX;
		point.y = (ev.mozInputSource !== undefined) ? ev.layerY : ev.offsetY;
		point = point.matrixTransform(me.$el.getCTM());
		return point;
	}
							
	const cacheNodeCoords = () => {
		me.$refs.nodes.forEach(function(node){
			node.cachePos = {tl: {}, br: {}, selected: node.selected}
			var p = me.getSvgPoint();
			p.x = node.mX;
			p.y = node.mY;
			p = p.matrixTransform(me.getViewportEl().getCTM());
			node.cachePos.tl = {x: p.x, y: p.y};
			p.x = node.mX + node.mWidth;
			p.y = node.mY + node.mHeight;
			p = p.matrixTransform(me.getViewportEl().getCTM());
			node.cachePos.br = {x: p.x, y: p.y};
			//console.log(node.cachePos, startPos.x, startPos.y);
		});
		
	}
	
	const updateFn = () => {

		if(point.x - startPos.x < 0){
			rect.setAttribute('x', point.x);
			rect.setAttribute('width', startPos.x - point.x);
		}
		else
			rect.setAttribute('width', point.x - startPos.x);
		
		if(point.y - startPos.y < 0){
			rect.setAttribute('y', point.y);
			rect.setAttribute('height', startPos.y - point.y);
		}
		else
			rect.setAttribute('height', point.y - startPos.y);
		
		const sel = {
				x1: parseInt(rect.getAttribute('x')), 
				x2: parseInt(rect.getAttribute('x')) + parseInt(rect.getAttribute('width')),
				y1: parseInt(rect.getAttribute('y')), 
				y2: parseInt(rect.getAttribute('y')) + parseInt(rect.getAttribute('height'))
			}

		me.$refs.nodes.forEach(function(node){
			//console.log(sel.x2, node.cachePos.tl.x);
			if( sel.x2 < node.cachePos.tl.x 
				|| sel.y2 < node.cachePos.tl.y
				|| sel.x1 > node.cachePos.br.x
				|| sel.y1 > node.cachePos.br.y){
				//console.log('unselect ' + node.name);
				if((moveEvt && !moveEvt.ctrlKey) || (node.selected && moveEvt && moveEvt.ctrlKey))
					node.unselect();
				return;
			}
			node.select();
			//console.log('select ' + node.name);
		});
		//console.log('');
	}
	
	const moveFn = (ev) => {
		//console.log(ev);
		setPoint(ev, point);
		moveEvt = ev;
		requestAnimationFrame(updateFn);
	}
	
	const stopFn = (evt) => {
		console.log('stopselect');
		document.removeEventListener('mousemove', moveFn);
		me.classObject.selectEvent = false;
		me.$off('pan:panning', movePan);
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		//evt.preventDefault();
		//evt.stopImediatePropagation();
		me.$refs.nodes.forEach(function(node){
			delete node.cachePos
		});
		rect.parentNode.removeChild(rect);
		me.$emit('selection:end');
	}
	
	const movePan = function(newPan){
		console.log('panning');
	}
	
	const startPos = setPoint(evt);
		
	rect.setAttribute('class', 'exSelectionRectangle');
	rect.setAttribute('x', startPos.x);
	rect.setAttribute('y', startPos.y);
	rect.setAttribute('width', '100');
	rect.setAttribute('height', '100');
	me.$el.appendChild(rect);
	
	cacheNodeCoords();
	
	me.classObject.selectEvent = true;
	document.addEventListener('mouseup', stopFn, {once: true, capture: true});
	document.addEventListener('mousemove', moveFn);						

	me.$on('pan:panning', movePan);
	me.$emit('selection:start');

	//requestAnimationFrame(updateFn);
	moveFn(evt);					
}


export default {
	mixins: [WorksheetHelpers],

	data: function(){
		return {
			classObject: {
				selectEvent: false,
			},
		}
	},

	created: function(){
		const me = this
		, def = {
			props: {is: 'linearGradient',id: 'selectionHandlerStroke',x1: '0',y1:'0',x2: '0',y2: '1'
			},
			childs: [
				{props : {is: 'stop','stop-color': '#f1b000',offset: '0'}},
				{props: {is: 'stop','stop-color': '#ce6d00',offset: '1'}}
			]			
		};
		this.addDef(def);
		
		this.$on('mouse:leftdown', detectSelectionStart);
	},
	
	beforeDestroy: function(){
		this.$off('mouse:leftdown', detectSelectionStart);
	},
	
}
