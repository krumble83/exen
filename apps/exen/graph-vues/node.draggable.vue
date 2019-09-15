
<script>
import {WorksheetHelpers} from './mixins.js';


const dragMouseDown = function(evt) {				
	//console.log('drag node', this);
	const me = this;

	// start drag only if cursor is moved when mouse button is down
	setTimeout(function(){
		
		function drag(){
			//console.log('start dragzzzzzz');
			var point = me.mouseToSvg(evt)
			, startPos = {x: me.x, y: me.y};
			
			const delta = {x: point.x - (me.mX), y: point.y - (me.mY)}
			
			const updateFn = () => {
				me.mX = point.x - delta.x;
				me.mY = point.y - delta.y;
				me.$emit('drag:move', evt, point);
				me.Worksheet.$emit('node:drag:move', me, evt, point);
			}
			
			const moveFn = (evt) => {
				me.mouseToSvg(evt, point);
				requestAnimationFrame(updateFn);
			}
			
			const stopFn = (evt) => {
				//console.log('stopdrag');
				evt.stopPropagation();
				me.classObject.dragging = false;
				document.removeEventListener('mousemove', moveFn);
				if(me.mX != startPos.x || me.mY != startPos.y){
					me.Store.commit('changeNodeProperty', {node: me.uid, props: {x: me.mX, y: me.mY}});
				}
				me.$emit('drag:end', evt, me);
				me.Worksheet.$emit('node:drag:end', me, evt);
			}
			
			document.addEventListener('mouseup', stopFn, {once: true, capture: true});
			document.addEventListener('mousemove', moveFn);						


			me.classObject.dragging = true;
			me.$emit('drag:start', evt, point);
			me.Worksheet.$emit('node:drag:start', me, evt);
			
			moveFn(evt);					
		}
		
		document.addEventListener('mousemove', drag, {once:true});
		document.addEventListener('mouseup', function(){
			document.removeEventListener('mousemove', drag);
		}, {once:true, capture: true});
		
	}, 20);
}


export default {
	mixins: [WorksheetHelpers],
	inject: ['Store'],
	
	created: function(){
		this.$on('mouse:leftdown', dragMouseDown);
	},
	
	beforeDestroy: function(){
		this.$off('mouse:leftdown', dragMouseDown);
	},
	
	data: function(){
		return {
			classObject: {
				draggable: true,
				dragging: false,
			}
		}
	},
	
	watch: {
		x : function(val){this.mX = val},
		y : function(val){this.mY = val},
	},
	
	methods: {

	}
}
</script>

<style>
	.exWorksheet .exNode.draggable{
		cursor: move;
	}
	
	.exWorksheet .exNode.dragging .exPin{
		pointer-events : none;
	}	
</style>