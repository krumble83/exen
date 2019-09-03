

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
		this.$on('pan:start', hideTooltip);
	},
	
	beforeDestroy: function(){
		this.$off('link:draw:start', this.drawLinkTooltip);
		this.$off('pan:start', hideTooltip);
	},
	
	methods: {
		drawLinkTooltip: function(evt){
			var me = this;
			function draw(ev){
				if(ev.srcElement.parentNode == me.$el || (ev.srcElement.parentNode.parentNode && ev.srcElement.parentNode.parentNode == me.$el))
					showTooltip(ev, 'place new node');
				//else if(!evt.button == 0)
				//	hideTooltip();
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
	inject: ['Library'],
	created: function(){
		this.$on('mouse:enter', this.tooltipMouseEnter);
		this.$on('mouse:cmenu', hideTooltip);
	},
	
	beforeDestroy: function(){
		this.$off('mouse:enter', this.tooltipMouseEnter);
		this.$off('mouse:cmenu', hideTooltip);		
	},
	
	methods: {
		tooltipMouseEnter: function(evt){				
			var me = this
			, link = this.Worksheet.$el.querySelector('.exLink.draw')
			, valid
			, msg;
			
			var move = function(ev){
				if(!ev.buttons == 1) // if not drawing link
					ev.stopPropagation();
				showTooltip(ev, msg);
			}
			
			if(link){
				link = this.Worksheet.$el.querySelector('.exLink.draw').__vue__;
				var accept = me.acceptLink(link);
				if(accept == 1)
					return hideTooltip();
				if(accept == 0)
					msg = '<img src="graph-img/linkok.png" /> Create link';
				else
					msg = '<img src="graph-img/none.png" />&nbsp;' + C_ERR_LINK[accept];
			}
			else {
				msg = this.cLabel + '<br />' + this.Library.getDatatype(this.datatype).Label();
				msg += (this.description) ? ('<br /><br />' + this.description) : '';
			}
				
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
	inject: ['Library'],
	
	created: function(){
		this.$on('mouse:enter', this.tooltipMouseEnter);		
		this.$on('mouse:cmenu', hideTooltip);		
		this.$on('drag:start', hideTooltip);		
	},
	
	beforeDestroy: function(){
		this.$off('mouse:enter', this.tooltipMouseEnter);
		this.$off('mouse:cmenu', hideTooltip);		
		this.$off('drag:start', hideTooltip);		
	},
	
	methods: {
		tooltipMouseEnter: function(evt){				
			var me = this
			, valid
			, msg;
			
			
			var move = function(ev){
				//console.log(ev);
				if(!me.$el.querySelector('.header').contains(ev.srcElement) && !ev.buttons == 1)
					hideTooltip();
				else if(!ev.buttons == 1) // if not drawing link
					showTooltip(ev, msg);
			}
			//console.log(this.Library.getNode(this.name))
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