

import ExPin from './pin.vue';
import ExNode from './node.vue';


function nl2br (str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function showTooltip(evt, text, timeout){
	//console.log('exSVG.Worksheet.showTooltip()', text);
	
	tooltip.innerHTML = nl2br(text);
	tooltip.style.left = evt.pageX + 'px';
	tooltip.style.top = (evt.pageY+10) + 'px';
	//me.mToolTip.setAttribute('class', 'exTooltip visible');
	tooltip.timer = setTimeout(function(){
		if(!tooltip.timer)
			return;
		tooltip.setAttribute('class', 'exTooltip visible');
	}, timeout || 300);
}

function hideTooltip(){
	//console.log('exSVG.Worksheet.hideTooltip()');

	tooltip.timer = null;
	tooltip.setAttribute('class', 'exTooltip');
}

var tooltip = document.querySelector('#exTooltip');
if(!tooltip){
	tooltip = document.createElement('div');
	tooltip.setAttribute('id', 'exTooltip');
	document.body.appendChild(tooltip);
}



export default {
	created: function(){
		this.$on('link:draw:start', this.drawLinkTooltip);
	},
	
	beforeDestroy: function(){
		this.$off('link:draw:start', this.drawLinkTooltip);
	},
	
	methods: {
		drawLinkTooltip: function(evt){
			var me = this;
			function draw(ev){
				if(ev.srcElement.parentNode == me.$el || (ev.srcElement.parentNode.parentNode && ev.srcElement.parentNode.parentNode == me.$el))
					showTooltip(ev, 'place new node');
				else
					hideTooltip();
			}
			
			document.addEventListener('mousemove', draw);
			me.$once(['link:draw:stop', ], function(){
				document.removeEventListener('mousemove', draw);
				hideTooltip();
			});
		},
	},
}



ExPin.mixins.push({
	created: function(){
		this.$on('mouse:enter', this.tooltipMouseEnter);		
	},
	
	beforeDestroy: function(){
		this.$off('mouse:enter', this.tooltipMouseEnter);
	},
	
	methods: {
		tooltipMouseEnter: function(evt){				
			var me = this
			, link = this.$worksheet.$refs.drawlink
			, valid
			, msg;
			
			var move = function(ev){
				ev.stopPropagation();
				showTooltip(ev, msg);
			}
			
			if(link && link[0]){
				link = link[0];

				valid = link.isPinLinkable(this);
				if(valid.code === 0){					
					this.$emit('link-valid');
					msg = valid.label;
				}
				else {
					this.$emit('link-invalid', valid);
					msg = valid.label;
				}
			}
			else 
				msg = this.description;
				
			this.$el.addEventListener('mousemove', move, false);

			this.$once('mouse:leave', function(){
				hideTooltip();
				me.$el.removeEventListener('mousemove', move);
			});
							
			move(evt);
			
		},		
	}
});


ExNode.mixins.push({
	created: function(){
		this.$on('mouse:enter', this.tooltipMouseEnter);		
	},
	
	beforeDestroy: function(){
		this.$off('mouse:enter', this.tooltipMouseEnter);
	},
	
	methods: {
		tooltipMouseEnter: function(evt){				
			var me = this
			, valid
			, msg;
			
			
			var move = function(evt){
				//console.log(evt);
				if(!me.$el.querySelector('.exNodeHeader').contains(evt.srcElement))
					hideTooltip();
				else
					showTooltip(evt, msg);
			}
			
			msg = 'node desc';			
			me.$el.addEventListener('mousemove', move, false);
			me.$once('mouse:leave', function(){
				hideTooltip();
				me.$el.removeEventListener('mousemove', move, false);
			});
							
			move(evt);
			
		},		
	}
});