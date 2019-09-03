
import {WorksheetHelpers} from './mixins.js';
import ExLink from './link.vue';

const LinkDraw = {
	extends: ExLink,
	mixins: [WorksheetHelpers],
	
	data: function(){
		return {
			classObject: {
				draw: false,
			},
		}
	},
	
	created: function(){
		const me = this;
		me.$once('draw:start', function(){
			me.classObject.draw = true;
			me.$parent.$el.classList.add('drawlinkevent');
		});
		
		me.$once('draw:stop', function(){
			me.classObject.draw = false;
			me.$parent.$el.classList.remove('drawlinkevent');
		});
		
	},
	
	beforeDestroy: function(){
		this.$el.parentNode.removeChild(this.$el);
	},
	
	methods: {
		startDraw: function(){
			const me = this;
			document.addEventListener('mousemove', me.drawUpdate);
			document.addEventListener('mouseup', me.stopDraw, {useCapture: true, once: true});
			me.$emit('draw:start');
			me.$parent.$emit('link:draw:start', me);
		},
		
		stopDraw: function(evt){
			const me = this;
			document.removeEventListener('mousemove', me.drawUpdate);
			me.$emit('draw:stop', evt);
			me.$parent.$emit('link:draw:stop', evt, me);
			if(evt.defaultPrevented)
				return;
			if(!me.mInputPin || !me.outputPin){
				me.$parent.$emit('link:draw:cancel', me);
				me.$el.parentNode.removeChild(me.$el);
				me.$destroy();
			}
			console.log('stop draw');			
		},
		
		drawUpdate: function(evt){
			const me = this;
			var point = me.mouseToSvg(evt);
			me.update();
			if(evt && !me.mInputPin){
				me.dc1.x = point.x;
				me.dc1.y = point.y;
				me.dp1.x = me.dc1.x - me.intermediateRange;
				me.dp1.y = me.dc1.y;
			}
			else if(evt && !me.mOutputPin){
				me.dc2.x = point.x;
				me.dc2.y = point.y;
				me.dp2.x = me.dc2.x + me.intermediateRange;
				me.dp2.y = me.dc2.y;
			}
			else
				console.assert(false, 'unknown pin type');
		}
	},
}



export default {
	inject: ['Library'],
	mixins: [WorksheetHelpers],
	
	created: function(){
		const me = this;
		me.$on('mouse:leftdown', me.startDrawLink);
		me.$on('mouse:leftup', me.finishLink);
		
	},
	
	beforeDestroy: function(){
		const me = this;
		me.$off('mouse:leftdown', me.startDrawLink);
		me.$off('mouse:leftup', me.finishLink);
	},
	
	methods: {

		startDrawLink: function(evt){
			const me = this;
			if(me.isInput())
				var d = {inputPin: me, color: me.Library.getDatatype(me.datatype).Color(), datatype: me.datatype}
			else if(me.isOutput())
				var d = {outputPin: me, color: me.Library.getDatatype(me.datatype).Color(), datatype: me.datatype}
			else
				return console.assert(false, 'unknown pin type');
			
			var ComponentClass = Vue.extend(LinkDraw);
			var instance = new ComponentClass({propsData: d, parent: me.Worksheet});
			
			instance.$mount();
			me.Worksheet.$el.querySelector('.exLinks').appendChild(instance.$el);
			instance.startDraw();
			me.Worksheet.$emit('pin:drawlink', evt, d);
		},
		
		finishLink: function(evt){
			console.log('finish link', this.Worksheet.$refs.drawlink);
			//evt.stopPropagation();
			var link = this.Worksheet.$refs.drawlink;
			if(!link)
				return;
			link.finishLink(this);
		},
		
		acceptLink: function(link){
			console.log(link.getInput(), link.getOutput());
			const me = this;
			
			if(me == link.getInput() || me == link.getOutput())
				return 1;
			
			if(link.getInput() && link.getInput().Node == me.Node)
				return 2;			
			if(link.getOutput() && link.getOutput().Node == me.Node)
				return 2;

			if(me.isInput() && link.getInput())
				return 4;
			if(me.isOutput() && link.getOutput())
				return 4;
			return 0;
		},
	},
}
