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
				<component is="Item" v-for="(item, id) in orderedItems" v-bind="item" />
			</ul> 
		</div>
	</div>
</template>


<script>

var menuEl = document.querySelector('#exMenu');

import Item from './librarymenu.item.vue'

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
			mContextStore: false,
		}
	},
	
	// return _.orderBy(this.$store.state.components, 'tabOrder')
	
	//_.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	// => [{ 'x': 1 }, { 'x': 2 }]
	
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
			var nodes = this.Library.getNode(query);
			

			function findUl(id, parent){
				//console.log('findUl()', id, parent)
				var el
					, path = id.split('/')
					, tid = path.shift()
					, ul = parent.find(it => it.id == tid)
					, li;
				
				if(!parent.childs)
					parent.childs = [];
				if(!ul){
					li = {id: tid, childs: []}
					parent.push(li);
					ul = li;

				}
				if(path.length > 0)
					return findUl(path.join('/'), ul.childs);
				
				return ul.childs;
			}
			
			
			nodes.forEach(function(it){
				var vu = it.__vue__
					, cat = me.items;
				if(vu.Category)
					cat = findUl(vu.Category.fullPath, me.items);
				cat.push({
					name: vu.title || vu.id, 
					id: vu.fullpath,
					symbol: vu.symbol,
					tooltip: vu.tooltip,
				});
			});
			
			if(this.mContextStore){
				console.log(this.mContextStore);
				const me = this;
				var items = this.mContextStore.getters.getLibraryMenu;
				items.forEach(function(vu){
					var cat = me.items;
					if(vu.Category)
						cat = findUl(vu.Category.fullPath, me.items);
					cat.push({
						name: vu.title || vu.id, 
						id: vu.fullpath,
						symbol: vu.symbol,
						tooltip: vu.tooltip,
					});
				});

				console.log(items);
			}
			
			//console.log(this.items);
			//console.log(nodes);
		},
		
		setContextStore: function(store){
			this.mContextStore = store;
		},
		
		_show: function(vue){
			if(vue.private)
				return false;
			return true;
		},
		
		_sort: function(items){
			return items.slice().sort((a, b) => (a.name > b.name) ? 1 : -1);
		},
		
		onSearch: function(evt){
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
					me.selectNext()
					break;

				case 38: // up
					me.selectPrevious();
					break;
			}
		},
		
		selectNext: function(){
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
		
		selectPrevious: function(){
			var s = this.$el.querySelector('li[child="1"].selected');
			if(s.previousElementSibling)
				s.previousElementSibling.classList.add('selected');
			else if(s.parentNode.previousElementSibling && s.parentNode.previousElementSibling.lastChild)
				s.parentNode.previousElementSibling.lastChild.classList.add('selected');
			else
				return;
			s.classList.remove('selected');			
		},
		
		onBlur: function(){
			if(this.$refs.input)
				this.$refs.input.focus();
		},
		
		onClick: function(evt){
			//console.log(evt.srcElement.tagName != 'LI',!evt.srcElement.hasAttribute('child'));
			//return;
			var me = this;
			if(evt.srcElement.tagName != 'LI' || !evt.srcElement.hasAttribute('child'))
				return;
			me.$emit('click', evt.srcElement);
			this.close();
		},
		
		getCategories: function(path){
			body.querySelector('library').query
		},
		
		showAt: function(x, y){
			const me = this;
			
			if(me.$parent){
				var div = document.createElement('div');
				me.$parent.$el.appendChild(div);
				me.$mount(div);

				me.$once('close', function(){
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


#exMenu .highlight{
	background-color: yellow;
	color: red;
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
 

#exMenu img{
	vertical-align: -3px;
}

</style>