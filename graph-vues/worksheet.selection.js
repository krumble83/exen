
const SelectionRect = {
	props: {
		x: {type: Number, default: 0},
		y: {type: Number, default: 0},
		width: {type: Number, default: 0},
		height: {type: Number, default: 0},
	},
	
	data: function(){
		return {
			mX: 0,
			mY: 0,
			mW: 0,
			mH: 0,
			startPos: {}
		}
	},
	
	methods: {
		updateFn: function(point){
			//console.log('zz');
			this.req = requestAnimationFrame(this.updateFn);
			
			this.mH = this.point.y - this.mY;
			
			if (this.point.x < this.mX) {
				this.mW = this.mX - point.x;
				this.mX = this.point.x;
			}
			else
				this.mW = this.point.x - this.mX;

		},
		
		
		start: function(startPos, point, ctx){
			var me = this;
			this.startPos = startPos;
			this.mX = startPos.x;
			this.mY = startPos.y;
			this.ctx = ctx;
			this.point = point;
			
			document.addEventListener('mousemove', this.moveFn);
			document.addEventListener('mouseup', function(){
				document.removeEventListener('mousemove', me.moveFn);
				//this.$el.removeChild(rect);
				cancelAnimationFrame(me.req);
				me.$el.parentNode.removeChild(me.$el);
				me.$emit('stop');
				me.$destroy();				
			}, {once:true});	
			
			this.updateFn(startPos);
		},
		
		moveFn: function(evt) {
			//console.log('eee');
			this.ctx.getMousePoint(evt, this.point);
		},
		
		stopFn: function(){
		}
	},
	template: '<rect :x="mX" :y="mY" :width="mW" :height="mH" class="exSelectionRectangle"></rect>'
}

import {WorksheetHelpers} from './mixins.js';



export const WorksheetSelection = {
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

		/*
		this.$on('mouse:leftdown', function(evt){
			if(!evt.ctrlKey)
				me.unselectNode();	
			me.startSelection(evt);
		});
		*/
	},
	
	methods: {			
		
		unselectNode: function(node){
			if(!node){
				var n = this.getNode(node => node.classObject.selected == true);
				n.forEach(el => el.classObject.selected = false);
			}
			else
				node.classObject.selected = false;
		},

		switchSelectNode: function(node){
			node.classObject.selected = !node.classObject.selected;
		},
		
		selectNode: function(node){
			node.classObject.selected = true;
		},
		
		isNodeSelected: function(node){
			return node.classObject.selected;
		},
		
		removeSelected: function(){
			const sel = this.getNode(node => node.classObject.selected)
			sel.forEach(function(el){})
			
		},
		
		getSelection: function(){
			return this.$refs
		},
		
		startSelection: function(evt){
			var me = this;
			return;
			var detectMove = function(mevt){
				if((mevt.clientX - evt.clientX) > 3 || (evt.clientX - mevt.clientX) > 3
					|| (mevt.clientY - evt.clientY) > 3 || (evt.clientY - mevt.clientY) > 3
				){
					console.log('start selection');
					me.classObject.selectEvent = true;
					document.removeEventListener('mousemove', detectMove);

					var point = me.$el.createSVGPoint()
					, startPos = me.getMousePoint(evt);
					
					var ComponentClass = Vue.extend(SelectionRect);
					var instance = new ComponentClass();
					instance.$mount();
					me.$el.appendChild(instance.$el);
					me.getMousePoint(evt, point);
					instance.$once('stop', function(){
						me.classObject.selectEvent = false;
					});
					instance.start(startPos, point, me);


				}
			}
			
			document.addEventListener('mousemove', detectMove);
			return;
			/*
			document.addEventListener('mouseup', function(){
				document.addEventListener('mousemove', detectMove);
			},{once: true});
			*/
			
			console.log(this);
		}
	}
	
}
