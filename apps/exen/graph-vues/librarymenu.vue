<template>
	<div :class="classObject" :style="styleObject" id="exMenu">
		<div class="head">
			<div>All Actions for this Graph</div>
			<input 
				type="text" 
				placeholder="search..."
				@keyup="_onSearch"
				@blur="_onBlur"
				ref="input"
			>
		</div>
		<div class="body" ref="body">
			<ul @click="_onClick">
				<component is="Item" v-for="(item, id) in orderedItems" v-bind="item" />
			</ul> 
		</div>
	</div>
</template>


<script>

var menuEl = document.querySelector('#exMenu');

import Item from './librarymenu.item.vue'
//import EventBus from '../cmon-js/event-bus.js';

export default {
	inject: ['Library'],
	components: {Item},

	data: function(){
		return {
			classObject: {
				//exLibraryMenu: true,
				visible: false,
			},
			styleObject: {
				left: 0,
				top: 0,
			},
			items: [],
			mInputTimer: false,
			mQuery: false,
		}
	},

	computed: {
		orderedItems: function(){return this.items.slice().sort((a, b) => (a.name > b.name) ? 1 : -1)},
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
		
		update: function(query){
			const me = this;
			var nodes = this.Library.getNode(query || me.mQuery);
			
			if(query)
				me.mQuery = query;

			function findUl(name, parent){
				//console.log('findUl()', id, parent)
				var el
					, path = name.split('/')
					, tid = path.shift()
					, ul = parent.find(it => it.name == tid)
					, li;
				
				if(!parent.childs)
					parent.childs = [];
				if(!ul){
					li = {name: tid, childs: []}
					parent.push(li);
					ul = li;

				}
				if(path.length > 0)
					return findUl(path.join('/'), ul.childs);
				
				return ul.childs;
			}
			
			me.items.splice(0, me.items.length);
						
			nodes.forEach(function(it){
				var vu = it.__vue__
					, cat = me.items;
				if(vu.Category)
					cat = findUl(vu.Category.fullPath, me.items);
				//console.log(vu);
				cat.push({
					name: vu.title || vu.name, 
					id: vu.properties.id,
					symbol: vu.symbol,
					tooltip: vu.tooltip,
				});
			});
			var ret = [];
			//this.Library.$emit('librarymenu:get', ret, this.mContextStore);
			ret.forEach(function(vu){
				var cat = me.items;
				if(vu.Category)
					cat = findUl(vu.Category.fullPath, me.items);
				cat.push({
					name: vu.title || vu.name, 
					id: vu.id,
					symbol: vu.symbol,
					tooltip: vu.tooltip,
				});
			});

		},

		_sort: function(items){
			return items.slice().sort((a, b) => (a.name > b.name) ? 1 : -1);
		},
		
		_onSearch: function(evt){
			//console.log(this.$refs.input);
			const me = this;
			var s = me.$el.querySelector('li[child="1"].selected');
			switch(evt.keyCode){
				case 13: // enter
					me.$emit('item:click', s);
					me.close();
					break;
				
				case 27: //esc
					me.close();
					break;
					
				case 40: // down
					me._selectNext()
					break;

				case 38: // up
					me._selectPrevious();
					break;
					
				default:
					clearTimeout(this.mInputTimer);
					this.mInputTimer = setTimeout(function(){
						me.mQuery.searchString = me.$refs.input.value;
						me.update();
					}, 200);
			}
		},
		
		_selectNext: function(){
			var s = this.$el.querySelector('li[child="1"].selected');
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
		},
		
		_selectPrevious: function(){
			var s = this.$el.querySelector('li[child="1"].selected');
			if(s.previousElementSibling)
				s.previousElementSibling.classList.add('selected');
			else if(s.parentNode.previousElementSibling && s.parentNode.previousElementSibling.lastChild)
				s.parentNode.previousElementSibling.lastChild.classList.add('selected');
			else
				return;
			s.classList.remove('selected');			
		},
		
		_formatText: function(text){
			return (this.mQuery && this.mQuery.searchString.length) ? text.replace(this.mQuery.searchString, '<span class="highlight">' + this.mQuery.searchString + '</span>') : text;
		},
		
		_onBlur: function(){
			if(this.$refs.input)
				this.$refs.input.focus();
		},
		
		_onClick: function(evt){
			//console.log(evt.srcElement.tagName != 'LI',!evt.srcElement.hasAttribute('child'));
			//return;
			const me = this;
			if(evt.srcElement.tagName != 'LI' || !evt.srcElement.hasAttribute('child'))
				return;
			//console.log('ty',evt.srcElement.tagName != 'LI',!evt.srcElement.hasAttribute('child'));
			me.$emit('click', evt.srcElement);
			me.classObject.visible = false;
			me.$destroy();
		},
		/*
		getCategories: function(path){
			body.querySelector('library').query
		},
		*/
		showAt: function(x, y){
			const me = this;
			
			if(me.$parent){
				var div = document.createElement('div');
				me.$parent.$el.appendChild(div);
				me.$mount(div);

				me.$once(['close', 'click'], function(){
					me.$el.parentNode.removeChild(me.$el);
				});			
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
			document.addEventListener('mousedown', this.close, {onde: true, capture: true});
			this.$nextTick(function(){
				this.$refs.input.focus();
			});
		},
		
		close: function(evt){
			if(evt && this.$el.contains(evt.srcElement))
				return;
			//document.removeEventListener('mousedown', this.close, {capture: true});
			this.classObject.visible = false;
			this.$emit('close');
			//this.$el.parentNode.removeChild(this.$el);
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

#exMenu li[child="1"] > img{
	vertical-align: -3px;
	pointer-events: none;
}

#exMenu li[child="1"] > span {
	pointer-events: none;

}

#exMenu li[child="1"] > span > span.highlight
{
	background-color: yellow;
	color: red;
	pointer-events: none;
}


#exMenu li[child="1"].selected{
	background-color: #888;
	color: #000;
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
 



</style>