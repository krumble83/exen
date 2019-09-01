
import {EventBus} from '../cmon-js/event-bus.js';

const ws = new WebSocket("ws://localhost:8100");

ws.onopen = function (event) {
	ws.send('{ "type":"text", "content":"Browser ready."}' ); 
};

ws.onmessage=function(event) { 
	var message = JSON.parse(event.data);
	EventBus.$emit('ws:' + message.type, message);
	return;
	switch(message.type) {
		case "customersList":
			state.customers.splice(0, state.customers.length);
			console.log(message.content);
			//var data = JSON.parse(message.content);
			message.content.forEach(function(it){
				state.customers.push(it);
			});
			break;
	}
};

export default ws;