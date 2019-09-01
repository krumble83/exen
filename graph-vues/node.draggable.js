
import {WorksheetHelpers} from './mixins.js';


export default {
	mixins: [WorksheetHelpers],
	
	created: function(){
		this.$on('mouse:leftdown', this.dragMouseDown);
	},
	
	beforeDestroy: function(){
		this.$off('mouse:leftdown', this.dragMouseDown);
	},
	
	data: function(){
		return {
			classObject: {
				dragging: false,
			}
		}
	},
	
	watch: {
		x : function(val){this.mX = val},
		y : function(val){this.mY = val},
	},
	
	methods: {
		dragMouseDown(evt) {				
			//console.log('drag node', this);
			const me = this;

			// start drag only if cursor is moved when mouse button is down
			setTimeout(function(){
				
				function drag(){
					//console.log('start dragzzzzzz');
					var point = me.getSvgPoint()
					, startPos = {x: me.x, y: me.y};
					
					me.$el.parentNode.appendChild(me.$el);
					
					me.mouseToSvg(evt, point);
					
					const delta = {x: point.x - (me.mX), y: point.y - (me.mY)}
					
					const updateFn = () => {
						if (me.classObject.dragging) 
							requestAnimationFrame(updateFn);

						me.mX = point.x - delta.x;
						me.mY = point.y - delta.y;

						me.$emit('dragmove', evt);
					}
					
					const moveFn = (evt) => {
						me.mouseToSvg(evt, point);
						//me.getMousePoint(evt, point);
						//me.$emit('dragevent', evt);
					}
					
					const stopFn = (evt) => {
						//console.log('stopdrag');
						evt.stopPropagation();
						me.classObject.dragging = false;
						document.removeEventListener('mousemove', moveFn);
						if(me.mX != startPos.x || me.mY != startPos.y){
							me.$worksheet.store.commit('changeNodeProperty', {node: me.id, props: {x: me.mX, y: me.mY}});
							me.$emit('drag:end', evt, me);
							me.$worksheet.$emit('node:drag:stop', me, evt);
							//this.$worksheet.$emit('node:dragend', evt, this);
						}
					}
					
					document.addEventListener('mouseup', stopFn, {once: true, useCapture: true});
					document.addEventListener('mousemove', moveFn);						


					me.classObject.dragging = true;
					me.$emit('drag:start', evt);
					me.$worksheet.$emit('node:dragstart', me, evt);
					
					requestAnimationFrame(updateFn);
					moveFn(evt);					
				}
				
				document.addEventListener('mousemove', drag, {once:true});
				document.addEventListener('mouseup', function(){
					document.removeEventListener('mousemove', drag);
				}, {once:true, useCapture: true});
				
			}, 20);
		},
	}
}
