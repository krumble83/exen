
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
		var me = this;
		this.$once('draw:start', function(){
			me.classObject.draw = true;
			me.$parent.$el.classList.add('drawlinkevent');
		});
		
		this.$once('draw:stop', function(){
			me.classObject.draw = false;
			me.$parent.$el.classList.remove('drawlinkevent');
		});
		
	},
	
	beforeDestroy: function(){
		this.$el.parentNode.removeChild(this.$el);
	},
	
	methods: {
		startDraw: function(){
			var me = this;
			document.addEventListener('mousemove', me.drawUpdate);
			document.addEventListener('mouseup', me.stopDraw, {useCapture: true, once: true});
			me.$emit('draw:start');
			me.$parent.$emit('link:draw:start', this);
		},
		
		stopDraw: function(evt){
			var me = this;
			document.removeEventListener('mousemove', me.drawUpdate);
			me.$emit('draw:stop', evt);
			me.$parent.$emit('link:draw:stop', me, evt);
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
				me.dp1.x = me.dc1.x - this.intermediateRange;
				me.dp1.y = me.dc1.y;
			}
			else if(evt && !me.mOutputPin){
				me.dc2.x = point.x;
				me.dc2.y = point.y;
				me.dp2.x = me.dc2.x + this.intermediateRange;
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
		var me = this;
		this.$on('mouse:leftdown', this.startDrawLink);
		this.$on('mouse:leftup', this.finishLink);
		//this.$on('mouse:enter', this.mouseLinkEnter);
		
	},
	
	beforeDestroy: function(){
		this.$off('mouse:leftdown', this.startDrawLink);
		this.$off('mouse:leftup', this.finishLink);
		//this.$off('mouse:enter', this.mouseLinkEnter);
	},
	
	methods: {

		/*
		mouseLinkEnter: function(evt){				
			var me = this
			, link = null
			, valid
			
			link = this.$worksheet.$el.querySelector('.exLink.draw');
			}
		},
		*/
		startDrawLink: function(evt){
			var me = this;
			if(me.isInput())
				var d = {inputPin: me, color: this.Library.getDatatype(this.datatype).Color(), datatype: me.datatype}
			else if(me.isOutput())
				var d = {outputPin: me, color: this.Library.getDatatype(this.datatype).Color(), datatype: me.datatype}
			else
				return console.assert(false, 'unknown pin type');
			
			var ComponentClass = Vue.extend(LinkDraw);
			var instance = new ComponentClass({propsData: d});
			
			instance.$mount();
			me.$worksheet.$el.querySelector('.exLinks').appendChild(instance.$el);
			instance.$parent = this.$worksheet;
			instance.startDraw();
			/*
			me.getMousePoint(evt, point);
			instance.$once('stop', function(){
				me.classObject.selectEvent = false;
			});
			instance.start(startPos, point, me);			
			*/
			me.$worksheet.$emit('pin:drawlink', evt, d);
		},
		
		finishLink: function(evt){
			console.log('finish link', this.$worksheet.$refs.drawlink);
			//evt.stopPropagation();
			var link = this.$worksheet.$refs.drawlink;
			if(!link || !link)
				return;
			link.finishLink(this);
		},
		
		acceptLink: function(link){
			console.log(link.getInput(), link.getOutput());
			const me = this;
			
			if(me == link.getInput() || me == link.getOutput())
				return 1;
			
			if(link.getInput() && link.getInput().$node == me.$node)
				return 2;			
			if(link.getOutput() && link.getOutput().$node == me.$node)
				return 2;

			if(me.isInput() && link.getInput())
				return 4;
			if(me.isOutput() && link.getOutput())
				return 4;
			return 0;
		},
	},
}
