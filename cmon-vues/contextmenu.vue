<template>
	<ul :style="styleObject" :class="classObject">		
		<slot>
			<component v-for="(item, idx) in items" :key="idx"
				:is="item.ctor ? item.ctor : 'MenuItem'"
				ref="items"
				v-bind="item"
			></component>
		</slot>
	</ul>
</template>



<script>

	import MenuItem from './contextmenu.item.vue';

	export default {
		components: {MenuItem},
		data: function(){
			return {
				classObject: {
					visible: false,
					exMenu: true,
				},
				styleObject: {
					left: 0,
					top: 0,
				},
				items: [],
			}
		},
		
		mounted: function(){
			if(this.$parent.classObject && this.$parent.classObject.sub){
				this.styleObject = {};
				this.classObject.exMenu = false;
			}
		},
		
		beforeDestroy: function(){
			console.log('destroy');
			this.items = [];
		},
		
		methods: {
			addItem: function(data){
				if(data.disabled)
					data.classObject = {disabled: true};
				else
					data.classObject = {};
				this.items.push(data);
			},
			
			addSubMenu: function(str){
				this.items.push({ctor: 'MenuItem', title: str, classObject: {sub: true}, submenuNode: false});
				this.$mount();
				return this.$refs.items[this.$refs.items.length-1].$refs.submenu;
			},
			
			getLast: function(){
				return this.$refs.items[this.$refs.items.length-1];
			},
			
			addSeparator: function(){
				this.items.push({ctor: 'MenuItem', classObject: {sep: true}})
			},
			
			addTitle: function(str){
				this.items.push({ctor: 'MenuItem', title: str, classObject: {title: true}})
			},
			
			getItem: function(id){
				return this.items.find(items => item.id == id);
			},
			
			clear: function(){
				if(this.$refs.items){
					this.$refs.items.forEach(function(el){
						if(el.$refs.submenu)
							el.$refs.submenu.clear();
					});
				}
				this.items = [];
			},
			
			showAt: function(x, y){
				var me = this;
				if(x.clientX && x.clientY){
					this.styleObject.left = x.clientX + 'px';
					this.styleObject.top = x.clientY + 'px';
				}
				else {
					this.styleObject.left = x + 'px';
					this.styleObject.top = y + 'px';
				}
				this.classObject.visible = true;
				document.addEventListener('mousedown', function(evt){
					me.hide();
				}, {once: true, capture: true});
			},
			
			hide: function(){
				this.classObject.visible = false;
				this.clear();
			},
		}
	}
	
	
</script>
<style>
.exMenu,
.exMenu ul {
	font-family: sans-serif;
	font-size: 12px;
	border: 1px solid #000;
	padding: 0;
	cursor: default;
	border-radius: 2px;
	min-width: 120px;
	white-space: nowrap;

	background: #292929; /* Old browsers */
	background: -moz-linear-gradient(top, #292929 0%, #1a1a1a 20%, #1a1a1a 50%, #1a1a1a 80%, #292929 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(top, #292929 0%,#1a1a1a 20%,#1a1a1a 50%,#1a1a1a 80%,#292929 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(to bottom, #292929 0%,#1a1a1a 20%,#1a1a1a 50%,#1a1a1a 80%,#292929 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#292929', endColorstr='#292929',GradientType=0 ); /* IE6-9 */

	-webkit-user-select: none; /* Safari */        
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* IE10+/Edge */
	user-select: none; /* Standard */	
}

.exMenu.context,
.exMenu.vertical {
	position: absolute;
	display: none;
	top: 300px;
	left: 300px;
	z-index: 1000;
}

.exMenu.visible {
	display: block;
}

.exMenu ul {
	display: none;
	position: absolute; 
	top: -1px; 
	left: 100%;
	white-space: nowrap;
}

.exMenu li {
	list-style-type: none;
	position: relative; 
	margin: 0; 
	padding: 0;
}

.exMenu li a {
	display: block; 
	padding: 5px 20px;
	padding-right: 30px;
	text-decoration: none;
	color: #eee;
	height: 11px;
	line-height: 10px;
	cursor: default;
	padding-right: 60px;
	white-space: nowrap;
}

.exMenu li:before {
    content: attr(data-shortcut) '';
	float: right;
	top: 5px; 
	white-space: nowrap;
	font-size: 11px;
	color: #777;
	margin: 5px 10px 0 0;
	pointer-events: none;
}

.exMenu li a:hover {
	background-color: #dea309;
	border-radius: 2px;
}

.exMenu li.sub > a{
	background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QwdCgEFEqlA3AAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAN0lEQVQI122OwQ0AMAgCwY3YfwhHoh9NbO29yIGJtG0AkEQU0SEzveQs2OeTwIclJTFecS3nSwcNtxEv8+bFmQAAAABJRU5ErkJggg==');
	background-position: 95% 50%;
	background-repeat: no-repeat;
}

.exMenu li:hover > ul{
	display: block; 
}

.exMenu li.sep {
	background: #666666;
	height: 1px;
	margin: 0 10px;
	padding: 0;
	pointer-events: none;
}

.exMenu li.title a {
	padding: 2px;
	margin: 0;
	color: #777;
	font-size: 11px;
	pointer-events: none;
}

.exMenu li.title a:hover,
.exMenu li.disabled a:hover,
.exMenu li[disabled="disabled"] a:hover {
	background-color: #1a1a1a;
	pointer-events: none;
}

.exMenu li.disabled,
.exMenu li[disabled="disabled"]{
	pointer-events: none;
}

.exMenu li.disabled a,
.exMenu li[disabled="disabled"] a{
	color: #777;
	pointer-events: none;
}



/***********************************************************
	Horizontal menu
***********************************************************/
.exMenu.horizontal{
	margin: 0;
	border: 0;
}

.exMenu.horizontal > li > ul ul {
	position: relative;
	top: -22px;
	left: 95%;
	width: auto;
	min-width: 100px;
}

.exMenu.horizontal > li > ul {
	margin-top: 22px;
	margin-left: 4px;
	width: auto;
	min-width: 100px;
}


.exMenu.horizontal > li{
	float: left;
	padding: 2px 5px 2px 5px;
}

ul.exMenu.horizontal > li > a {
	padding: 5px 10px 5px 5px !important;
}

.exMenu.horizontal ul:active {
	display: none;
}

.exMenu.horizontal li a {
	padding: 5px 10px 5px 20px;
}

.exMenu.horizontal li a:hover {
	background-color: #dea309;
	border-radius: 0;
}


</style>
