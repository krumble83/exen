
import {WorksheetHelpers} from './mixins.js';
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
		
		this.$on('mouse:leftdown', this.detectSelectionStart);
	},
	
	beforeDestroy: function(){
		this.$off('mouse:leftdown', this.detectSelectionStart);
	},
	
	methods: {			
		
		handleSelection: function(evt){
			var me = this
			, point = me.getSvgPoint()
			, startPos = me.mouseToSvg(evt);
			
			var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			rect.setAttribute('class', 'exSelectionRectangle');
			rect.setAttribute('x', startPos.x);
			rect.setAttribute('y', startPos.y);
			rect.setAttribute('width', '100');
			rect.setAttribute('height', '100');
			this.$el.querySelector('.exViewport').appendChild(rect);
			
			
			const updateFn = () => {
				if (me.classObject.selectEvent)
					requestAnimationFrame(updateFn);

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
					
			}
			
			const moveFn = (ev) => {
				me.mouseToSvg(ev, point);
				//point = me.getMousePoint(ev);
				//me.$emit('dragevent', evt);
			}
			
			const stopFn = (evt) => {
				console.log('stopselect');
				document.removeEventListener('mousemove', moveFn);
				me.classObject.selectEvent = false;
				evt.stopPropagation();
				rect.parentNode.removeChild(rect);
			}
			
			me.classObject.selectEvent = true;
			document.addEventListener('mouseup', stopFn, {once: true, useCapture: true});
			document.addEventListener('mousemove', moveFn);						

			requestAnimationFrame(updateFn);
			moveFn(evt);					
		},
		
		detectSelectionStart: function(evt){
			var me = this;
			//return;
			var detectMove = function(mevt){
				if((mevt.clientX - evt.clientX) > 3 || (evt.clientX - mevt.clientX) > 3
					|| (mevt.clientY - evt.clientY) > 3 || (evt.clientY - mevt.clientY) > 3
				){
					console.log('start selection');
					document.removeEventListener('mousemove', detectMove);
					me.classObject.selectEvent = true;
					me.handleSelection(mevt);


				}
			}
			
			document.addEventListener('mousemove', detectMove);
			document.addEventListener('mouseup', function(){
				document.removeEventListener('mousemove', detectMove);
			}, {once: true});
		}
	}
	
}
