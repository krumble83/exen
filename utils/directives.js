
//;(function() {
"use strict";

function inline(el, bind, vm){
		var prev = el.previousSibling;
		if(!prev)
			return;
		if(prev.nodeName == '#text')
			prev = prev.previousSibling;

		if(!prev)
			return;
		//console.log(prev);
		var box = prev.getBBox();
		if(bind && bind.modifiers && bind.modifiers.debug)
			console.log(el, prev, box, el.getCTM())//.getTransformToElement(prev));
		if(bind && bind.modifiers && bind.modifiers.vertical)
			el.setAttribute('y', (parseInt(prev.getAttribute('y')) ||0) + box.height + (bind.value || 0));
		if(bind.modifiers && bind.modifiers.horizontal)
			el.setAttribute('x', (parseInt(prev.getAttribute('x')) ||0) + box.width + (bind.value || 0));			
	}


Vue.directive('inline', {
	inserted: inline,
	update: inline,
	componentUpdated: inline
});

//}());