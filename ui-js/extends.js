;(function(){

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

Vue.directive('panel', {
	inserted: function(el, bind, vm){
		//console.log(el);
		const div = document.createElement('div');
		div.classList.add('flexChild');

		if(bind && bind.modifiers && bind.modifiers.left){
			const move = function(evt){
				el.style.width = evt.clientX + (bind.value || 0) + 'px';			
			};
			
			div.classList.add('vDivider');
			el.after(div);
			div.onmousedown = function(){
				document.addEventListener('mousemove', move);
				div.classList.add('hover');
				document.addEventListener('mouseup', function(){
					div.classList.remove('hover');
					document.removeEventListener('mousemove', move);
				}, {once: true});
			}
			
		}
		else if(bind && bind.modifiers && bind.modifiers.right){
			const move = function(evt){
				el.style.width = (screenWidth - evt.clientX) + (bind.value || 0) + 'px';	
			};
			var screenWidth = window.innerWidth;
			
			div.classList.add('vDivider');
			el.parentNode.insertBefore(div, el);
			div.onmousedown = function(){
				div.classList.add('hover');
				screenWidth = window.innerWidth;
				document.addEventListener('mousemove', move);
				document.addEventListener('mouseup', function(){
					div.classList.remove('hover');
					document.removeEventListener('mousemove', move);
				}, {once: true});
			}
			
		}
		else if(bind && bind.modifiers && bind.modifiers.bottom){
			const move = function(evt){
				el.style.height = (screenHeight - evt.clientY) + (bind.value || 0) + 'px';			
			};
			var screenHeight = window.innerHeight;
			
			div.classList.add('hDivider');
			el.parentNode.insertBefore(div, el);
			div.onmousedown = function(){
				div.classList.add('hover');
				screenHeight = window.innerHeight
				document.addEventListener('mousemove', move);
				document.addEventListener('mouseup', function(){
					div.classList.remove('hover');
					document.removeEventListener('mousemove', move);
				}, {once: true});
			}			
		}
		
	}
});

})();