<template>
	<ul :style="styleObject" :class="classObject">		
		<slot>
			<component v-for="(item, idx) in items" :key="idx"
				:is="item.ctor ? item.ctor : 'MenuItem'"
				ref="items"
				v-bind="item"
				sub="true"
			></component>
		</slot>
	</ul>
</template>



<script>

	import MenuItem from './contextmenu.item.vue';

	export default {
		components: {MenuItem},
		
		props: {
			sub: String,
		},
		
		data: function(){
			return {
				classObject: {
					visible: false,
					exMenu: true,
					context: false,
				},
				styleObject: {
					//left: 0,
					//top: 0,
				},
				items: [],
			}
		},
		
		mounted: function(){
			//if(this.$parent.classObject && this.$parent.classObject.sub){
			if(this.sub == 'true' || (this.$parent && this.$parent.classObject && this.$parent.classObject.exMenu)){
				console.log('ttttttttttttttttttttttttttttttttttt')
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
					data.classes = {disabled: true};
				this.items.push(data);
			},
			
			addSubMenu: function(str){
				this.items.push({ctor: 'MenuItem', title: str});
				this.$mount();
				return this.$refs.items[this.$refs.items.length-1].$refs.submenu;
			},
			
			getLast: function(){
				return this.$refs.items[this.$refs.items.length-1];
			},
			
			addSeparator: function(){
				this.items.push({ctor: 'MenuItem', classes: {sep: true}})
			},
			
			addTitle: function(str){
				this.items.push({ctor: 'MenuItem', title: str, classes: {title: true}})
			},
			
			getItem: function(id){
				return this.items.find(it => it.id == id);
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
				const me = this;
				
				if(me.$parent && me.classObject.context){
					var div = document.createElement('div');
					me.$parent.$el.appendChild(div);
					me.$mount(div);

					me.$once('close', function(){
						me.$el.parentNode.removeChild(me.$el);
						document.removeEventListener('mousedown', me.close, {once: true, capture: true});
					});
					document.addEventListener('mousedown', this.close, {once: true, capture: true});
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
				this.$emit('show', x);
			},
			
			close: function(evt){
				const me = this;
				
				if(evt && me.$el.contains(evt.srcElement)){
					console.log('eeee');
					if(me.classObject.context)
						document.addEventListener('mousedown', me.close, {once: true, capture: true});
					return;
				}
				if(!me.classObject.context)
					return;
				me.$emit('close', evt);
				me.classObject.visible = false;
				me.clear();
				//this.$el.parentNode.removeChild(this.$el);
				me.$destroy();
			},
		}
	}
	
	
</script>

<style>
:root {
  --bg-color-top: #292929;
  --bg-color-bottom: #1a1a1a;
}


.exMenu,
.exMenu ul {
	font-size: var(--font-size);
	border: var(--border);
	border-radius: var(--border-radius);

	padding: 0;
	cursor: default;
	white-space: nowrap;
	outline: none;
	
	font-family: sans-serif;
	background: -moz-linear-gradient(top, var(--bg-color-top) 0%, var(--bg-color-bottom) 20%, var(--bg-color-bottom) 50%, var(--bg-color-bottom) 80%, var(--bg-color-top) 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(top, var(--bg-color-top) 0%, var(--bg-color-bottom) 20%, var(--bg-color-bottom) 50%, var(--bg-color-bottom) 80%, var(--bg-color-top) 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(to bottom, var(--bg-color-top) 0%, var(--bg-color-bottom) 20%, var(--bg-color-bottom) 50%, var(--bg-color-bottom) 80%, var(--bg-color-top) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=var(--bg-color-top), endColorstr=var(--bg-color-bottom),GradientType=0 ); /* IE6-9 */
	
	-webkit-user-select: none; /* Safari */        
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* IE10+/Edge */
	user-select: none; /* Standard */	
	/*min-width: 120px;*/
}

.exMenu ul {
	display: none;
	position: absolute; 
	top: -1px; 
	/*left: 0;*/
}


.exMenu > li > ul ul {
	/*position: absolute;*/
	left: 100%;
	/*width: auto;*/
	/*min-width: 100px;*/
}





/* li */
.exMenu li {
	list-style-type: none;
	position: relative; 
	/*margin: 0; */
	width: 100%;
	padding: 1px 0 1px 0;
}

.exMenu li[data-shortcut]:before {
	color: var(--disabled-bg-color);
	font-size: var(--text-size);

    content: attr(data-shortcut) '';
	float: right;
	white-space: nowrap;
	margin: 4px 5px 0 0;
	pointer-events: none;
}

.exMenu li.disabled,
.exMenu li[disabled="disabled"]{
	pointer-events: none;
}


/* li > a */
.exMenu li a {
	color: var(--text-color);
	
	display: block; 
	padding: 3px 0;
	padding-left: 24px; 
	padding-right: 20px;
	text-decoration: none;
	cursor: default;
	white-space: nowrap;
}

.exMenu li:hover {
	background-color: var(--focused-bg-color);
	color: var(--focused-text-color);
	border-radius: var(--border-radius);
}

.exMenu li[data-shortcut] a{
	padding-right: 50px;
}

.exMenu li > a{
	background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QwdCgEFEqlA3AAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAN0lEQVQI122OwQ0AMAgCwY3YfwhHoh9NbO29yIGJtG0AkEQU0SEzveQs2OeTwIclJTFecS3nSwcNtxEv8+bFmQAAAABJRU5ErkJggg==');
	background-position: 95% 50%;
	background-repeat: no-repeat;
}

.exMenu li > a > img{
	left: 2px;
	position: absolute;
}

.exMenu li.disabled > a > img,
.exMenu li[disabled="disabled"] > a > img{
	webkit-filter: grayscale(100%);
    filter: grayscale(100%);
	opacity: 0.1;
}

.exMenu li a:only-child {
	background-image: none;
}

.exMenu li.disabled a,
.exMenu li[disabled="disabled"] a{
	color: var(--disabled-color);
}

.exMenu li.disabled a:hover,
.exMenu li[disabled="disabled"] a:hover {
	pointer-events: none;
}


/* sep / title */
.exMenu li.sep,
.exMenu li:empty {
	background-color: var(--disabled-color);
	padding-top: 0;
	width: auto;
	pointer-events: none;
}
.exMenu li > a:empty {
	display: none;
}


.exMenu li.title {
	pointer-events: none;
}

.exMenu li.title > a {
	color: var(--disabled-color);
	font-size: var(--text-size);
	padding: 2px;
	padding-left: 5px;
	margin: 0;
	pointer-events: none;
}



/***********************************************************
	Horizontal menu
***********************************************************/
.exMenu.horizontal{
	margin: 0;
	border: 0;
	height: 24px;
	border-radius: 0;	
}

.exMenu.horizontal > li {
	float: left;
	width: auto;
}

.exMenu.horizontal > li > a{
	background-image: none;
	border-radius: 0;
}

ul.exMenu.horizontal > li > a {
	padding: 5px 10px 5px 5px;
}

.exMenu.horizontal:not([tabindex]) li:hover > ul,
.exMenu.horizontal:focus li:hover > ul{
	display: block; 
}


.exMenu.horizontal > li > ul {
	top: 22px;
}

.exMenu.horizontal ul:active{
	display: none;
}

/*********************************************
	context menu
*********************************************/


.exMenu.context li:hover > ul{
	display: block; 
}

.exMenu.context {
	position: absolute;
	display: none;
	top: 300px;
	left: 300px;
	z-index: 1000;
}

.exMenu.context.visible {
	display: block;
}

.exMenu.context > li ul {
	left: 100%;
}


</style>
