
import {WorksheetHelpers} from './mixins.js';
import ExLink from './link.vue';

const LinkDraw = {
	extends: ExLink,
	mixins: [WorksheetHelpers],
	props: {
		inputPin: Object,
		outputPin: Object,	
	},
	
	data: function(){
		return {
			classObject: {
				draw: false,
			},
			mInputPin: this.inputPin,
			mOutputPin: this.outputPin,
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
			var me = this;
			me.update();
			if(evt && !me.mInputPin){
				var point = me.mouseToSvg(evt);
				me.dc1.x = point.x;
				me.dc1.y = point.y;
				me.dp1.x = me.dc1.x - 200;
				me.dp1.y = me.dc1.y;					
			}
			if(evt && !me.mOutputPin){
				var point = me.mouseToSvg(evt);
				me.dc2.x = point.getCenter().x;
				me.dc2.y = point.getCenter().y;
				me.dp2.x = me.dc2.x + 200;
				me.dp2.y = me.dc2.y;
			}	
		}
	},
}



export default {
	mixins: [WorksheetHelpers],
	
	created: function(){
		var me = this;
		this.$on('mouse:leftdown', this.startLink);
		this.$on('mouse:leftup', this.finishLink);
		this.$on('mouse:enter', this.mouseLinkEnter);
		
	},
	
	beforeDestroy: function(){
		this.$off('mouse:leftdown', this.startLink);
		this.$off('mouse:leftup', this.finishLink);
		this.$off('mouse:enter', this.mouseLinkEnter);
	},
	
	methods: {

		mouseLinkEnter: function(evt){				
			var me = this
			, link = this.$worksheet.$refs.drawlink
			, valid
			
			if(link && link[0]){
				link = link[0];

				valid = link.isPinLinkable(this);
				if(valid.code === 0){					
					this.$emit('link-valid');
				}
				else {
					this.$emit('link-invalid', valid);
				}
			}
		},
		
		startLink: function(evt){
			var me = this;
			if(me.isInput())
				var d = {inputPin: me, color: me.color, datatype: me.datatype}
			else
				var d = {outputPin: me, color: me.color, datatype: me.datatype}

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
		}
	},
}
