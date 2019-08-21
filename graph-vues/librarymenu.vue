<template>
	<div :class="classObject" :style="styleObject" id="exMenu">
		<div class="head">
			<div>All Actions for this Graph</div>
			<input 
				type="text" 
				placeholder="search..."
				@keyup="onSearch"
				@blur="onBlur"
				ref="input"
			>
		</div>
		<div class="body">
			<ul @click="onClick">
				<li v-for="item in items" :key="item.id">
					<input v-if="item.items" type="checkbox" :id="'folder_' + id">
					<label v-if="item.items" :for="'folder_' + id">{{label}}</label>
					<ul v-if="item.items">
				</li>
				
				
				
				<li>
					<input type="checkbox" id="folder_fd0993bec7bec96cc5840155b9e03b3e">
					<label for="folder_fd0993bec7bec96cc5840155b9e03b3e">Utilities</label>
					<ul id="Utilities">
						<li>
							<input type="checkbox" id="folder_04b049d22c2f0565a8daa63b0107a957">
							<label for="folder_04b049d22c2f0565a8daa63b0107a957">Array</label>
							<ul id="Array">
								<li id="Node_core.array.add" child="1">
									<img src="lib/img/array.png">&nbsp;Add Array Item
								</li>
								<li id="Node_core.array.length" child="1" onmouseover="event.stopPropagation();event.stopImmediatePropagation()">
									<img src="lib/img/array.png">&nbsp;Array Length
								</li>
								<li id="Node_core.array.each" child="1">
									<img src="lib/img/array.png">&nbsp;For Each Array Item
								</li>
								<li id="Node_core.array.get" child="1">
									<img src="lib/img/array.png">&nbsp;Get array item
								</li>
								<li id="Node_core.array.last" child="1">
									<img src="lib/img/array.png">&nbsp;Get last item
								</li>
							</ul>
						</li>
					</ul>
				</li>

				<li>
					<input type="checkbox" id="folder_fd0993bec7bec96cc5840155b9e03b3e">
					<label for="folder_fd0993bec7bec96cc5840155b9e03b3e">Utilities2</label>
					<ul id="Utilities">
						<li>
							<input type="checkbox" id="folder_04b049d22c2f0565a8daa63b0107a957">
							<label for="folder_04b049d22c2f0565a8daa63b0107a957">Array</label>
							<ul id="Array">
								<li id="Node_core.array.add" child="1">
									<img src="lib/img/array.png">&nbsp;Add Array Item
								</li>
								<li id="Node_core.array.length" child="1" onmouseover="event.stopPropagation();event.stopImmediatePropagation()">
									<img src="lib/img/array.png">&nbsp;Array Length
								</li>
								<li id="Node_core.array.each" child="1">
									<img src="lib/img/array.png">&nbsp;For Each Array Item
								</li>
								<li id="Node_core.array.get" child="1">
									<img src="lib/img/array.png">&nbsp;Get array item
								</li>
								<li id="Node_core.array.last" child="1">
									<img src="lib/img/array.png">&nbsp;Get last item
								</li>
							</ul>
						</li>
					</ul>
				</li>
				<li>
					<input type="checkbox" id="folder_fd0993bec7bec96cc5840155b9e03b3e">
					<label for="folder_fd0993bec7bec96cc5840155b9e03b3e">Utilities2</label>
					<ul id="Utilities3">
						<li>
							<input type="checkbox" id="folder_04b049d22c2f0565a8daa63b0107a957">
							<label for="folder_04b049d22c2f0565a8daa63b0107a957">Array</label>
							<ul id="Array">
								<li id="Node_core.array.add" child="1">
									<img src="lib/img/array.png">&nbsp;Add Array Item
								</li>
								<li id="Node_core.array.length" child="1" onmouseover="event.stopPropagation();event.stopImmediatePropagation()">
									<img src="lib/img/array.png">&nbsp;Array Length
								</li>
								<li id="Node_core.array.each" child="1">
									<img src="lib/img/array.png">&nbsp;For Each Array Item
								</li>
								<li id="Node_core.array.get" child="1">
									<img src="lib/img/array.png">&nbsp;Get array item
								</li>
								<li id="Node_core.array.last" child="1">
									<img src="lib/img/array.png">&nbsp;Get last item
								</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul> 
		</div>
	</div>
</template>


<script>

var menuEl = document.querySelector('#exMenu');


export default {

	data: function(){
		return {
			classObject: {
				//exLibraryMenu: true,
				visible: false,
			},
			styleObject: {
				left: 0,
				top: 0,
			}
		}
	},
	
	// return _.orderBy(this.$store.state.components, 'tabOrder')
	
	//_.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	// => [{ 'x': 1 }, { 'x': 2 }]
	
	computed: {
		items: function(){return []},
		categories: function(){
			return 
		},

	},

	created: function(){
	},
	
	mounted: function(){
		this.$el.querySelector('li[child="1"]').classList.add('selected');
	},

	methods: {
		
		onSearch: function(evt){
			console.log(this.$refs.input);
			var s = this.$el.querySelector('li[child="1"].selected');
			switch(evt.keyCode){
				case 40:
					//console.log(s);
					if(s.nextElementSibling)
						s.nextElementSibling.classList.add('selected');
					else if(s.parentNode.nextElementSibling 
						&& s.parentNode
						&& s.parentNode.parentNode
						&& s.parentNode.parentNode.nextElementSibling
						&& s.parentNode.parentNode.nextElementSibling.firstChild)
						s.parentNode.parentNode.nextElementSibling.firstChild.classList.add('selected');
					else
						return;
					s.classList.remove('selected');
					break;
				case 38:
					if(s.previousElementSibling)
						s.previousElementSibling.classList.add('selected');
					else if(s.parentNode.previousElementSibling && s.parentNode.previousElementSibling.lastChild)
						s.parentNode.previousElementSibling.lastChild.classList.add('selected');
					else
						return;
					s.classList.remove('selected');
			}
		},
		
		onBlur: function(){
			if(this.$refs.input)
				this.$refs.input.focus();
		},
		
		onClick: function(evt){
			//console.log(evt.srcElement);
			var me = this;
			if(evt.srcElement.tagName != 'LI' || !evt.srcElement.hasAttribute('child'))
				return;
			me.$emit('item:click', evt.srcElement);
			this.close();
		},
		
		getCategories: function(path){
			body.querySelector('library').query
		},
		
		showAt: function(x, y){
			var me = this;
			
			if(!this.$parent){
				var d = document.createElement('div');
				document.body.appendChild(d);
				this.$mount(d);
				//console.dir(this.$el);
			}
			
			if(x.clientX && x.clientY){
				this.styleObject.left = x.clientX + 'px';
				this.styleObject.top = x.clientY + 'px';
			}
			else {
				this.styleObject.left = x + 'px';
				this.styleObject.top = y + 'px';
			}
			this.classObject.visible = true;
			document.addEventListener('mousedown', this.close, {capture: true});
			this.$nextTick(function(){
				this.$refs.input.focus();
			});
		},
		
		close: function(evt){
			if(evt && this.$el.contains(evt.srcElement))
				return;
			document.removeEventListener('mousedown', this.close, {capture: true});
			this.classObject.visible = false;
			this.$emit('menu:close');
			this.$el.parentNode.removeChild(this.$el);
			this.$destroy();			
		},		
	},
}


</script>

<style>

#exMenu {
	position: absolute;
	display: none;
	width: 350px;
    height: 300px;
	font-family: sans-serif;
	font-size: 12px;
	border: 1px solid #000;
	color: #ddd;
    padding: 3px;
	cursor: default;
    border-radius: 3px;
	min-width: 120px;
	z-index: 1000;

    background-color:#191919;
	background: -moz-linear-gradient(top, #292929 0%, #1a1a1a 20%, #1a1a1a 50%, #1a1a1a 80%, #292929 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(top, #292929 0%,#1a1a1a 20%,#1a1a1a 50%,#1a1a1a 80%,#292929 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(to bottom, #292929 0%,#1a1a1a 20%,#1a1a1a 50%,#1a1a1a 80%,#292929 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#292929', endColorstr='#292929',GradientType=0 ); /* IE6-9 */


	-webkit-user-select: none; /* Safari */        
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* IE10+/Edge */
	user-select: none; /* Standard */	
 
    -webkit-box-shadow: 2px 2px 7px 0px rgba(50, 50, 50, 0.5);
    -moz-box-shadow:    2px 2px 7px 0px rgba(50, 50, 50, 0.5);
    box-shadow:         2px 2px 7px 0px rgba(50, 50, 50, 0.5);
}

#exMenu.visible {
	display: block;
}


#exMenu .highlight{
	background-color: yellow;
	color: red;
} 

#exMenu li[child="1"].selected{
	background-color: #888;
	color: #fff;
} 

#exMenu li.selected:before{
	content: '';
    width: 200px;
    background-color: #888;
    height: 20px;
    position: absolute;
    left: 0;
    z-index: -1;
} 


#exMenu .head input[type=text] {
	background-color: #ccc;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;
	height: 12px;
	width: 98%;
	outline: none;
	padding-bottom: 3px;
}

#exMenu .head > div {
	padding: 3px;
	font-size: 14px;
}

#exMenu .body{
	position: relative;
	top: 3px;
	overflow: auto;
	height: 259px;
}

#exMenu .body > ul{
}

#exMenu ul,
#exMenu li
{
    padding: 0;
    margin: 0;
    list-style: none;
	line-height: 18px;
}




#exMenu li[child="1"]
{
	line-height: 20px;
    padding-left: 15px;
	
}


#exMenu input[type=checkbox]
{
    position: absolute;
    opacity: 0;
}
 
 
#exMenu input[type=checkbox] + label + ul
{
    padding: 0 0 0 15px;
}
 
#exMenu input[type=checkbox] ~ ul
{
    display: none;
}
 
#exMenu input[type=checkbox]:checked ~ ul
{
    display: block;
}
 
#exMenu label::before
{
    background: url("graph-img/menu.png") no-repeat;
    display: inline-block;
    height: 16px;
    line-height: 16px;
    vertical-align: middle;
    content: "";
    width: 16px;
    margin: 0;
    vertical-align: middle;
    background-position: 0 -32px;
}
 

 
#exMenu input[type=checkbox]:checked + label::before
{
    background-position: 0 -16px;
}



#exMenu .body::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #191919;
}

#exMenu .body::-webkit-scrollbar
{
	width: 10px;
	background-color: #191919;
}

#exMenu .body::-webkit-scrollbar-thumb
{
	background-color: #eee;
	border: 0;
}
 

#exMenu img{
	vertical-align: -3px;
}

</style>