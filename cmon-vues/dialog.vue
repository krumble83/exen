<template>
	<div>
		<div v-if="modal" class="uiModalBg"></div>
		<div class="uiDialog" :style="styleObject">
			<div class="uiDialogTitle">&nbsp;&nbsp;&nbsp;{{title}}</div>
			<div class="uiDialogContent">{{text}}</div>
			<div class="uiDialogButtons">
				<slot>
					<button v-for="button,idx in buttons" @click="click(button.text)">{{button.text}}</button>
				</slot>
			</div>
		</div>
	</div>
</template>


<script>
	export default {
		props: {
		},
		
		data: function(){
			return {
				styleObject: {
					width: '300px',
					height: '170px',
					display: 'none',
				},
				modal: false,
				title: '',
				text: '',
				buttons: [],
				callbacks: {}
			}
		},
		
		methods: {
			yesno: function(title, text){
				this.callbacks = {
					cbs: {},
					yes: function(cb){this.cbs.yes = cb;return this},
					no: function(cb){this.cbs.no = cb;return this},
				};
				this.modal = true;
				this.width = '300px';
				this.height = '170px';
				this.title = title;
				this.text = text;
				this.buttons.splice(0);
				this.buttons.push({text: 'yes'});
				this.buttons.push({text: 'no'});
				this.styleObject.display= 'inline-block';
				return this.callbacks;
			},
			
			click: function(name){
				this.close();
				if(typeof this.callbacks.cbs[name] === 'function')
					this.callbacks.cbs[name]();
			},
			
			close: function(){
				this.styleObject.display = 'none';
				this.modal = false;			
			}
		}
	}
</script>

<style>
	.uiModalBg {
		position:absolute;
		top:0;
		left:0;
		background-color:#000;
		opacity:0.5;
		width:100%;
		height:100%;
	}

	.uiDialogTitle {
		height: 27px;
		width: 100%;
		color: #fff;
		line-height: 25px;
		border-radius:10px 10px 0 0;
		background: #4c4c4c; /* Old browsers */
		background: -moz-linear-gradient(top, #4c4c4c 0%, #595959 12%, #666666 25%, #474747 39%, #2c2c2c 50%, #000000 51%, #111111 60%, #2b2b2b 76%, #1c1c1c 91%, #131313 100%); /* FF3.6-15 */
		background: -webkit-linear-gradient(top, #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%); /* Chrome10-25,Safari5.1-6 */
		background: linear-gradient(to bottom, #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4c4c4c', endColorstr='#131313',GradientType=0 ); /* IE6-9 */
	}	
	
	.uiDialog{
		display: none;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		border: 1px solid #000;
		border-radius: 10px;
		font-family: Arial, Helvetica, sans-serif;

		background: #292929; /* Old browsers */
		background: -moz-linear-gradient(top, #292929 0%, #1a1a1a 20%, #1a1a1a 50%, #1a1a1a 80%, #292929 100%); /* FF3.6-15 */
		background: -webkit-linear-gradient(top, #292929 0%,#1a1a1a 20%,#1a1a1a 50%,#1a1a1a 80%,#292929 100%); /* Chrome10-25,Safari5.1-6 */
		background: linear-gradient(to bottom, #292929 0%,#1a1a1a 20%,#1a1a1a 50%,#1a1a1a 80%,#292929 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#292929', endColorstr='#292929',GradientType=0 ); /* IE6-9 */		
	}
	
	.uiDialogContent{
		padding: 20px;
		color: #fff;
		font-size: 13px;
	}
	
	.uiDialogButtons {
		padding: 15px;
		position: absolute;
		bottom: 2px;
		right: 0px;
		width: 100%;
	}
	
	.uiDialogButtons button{
		background-color: #303030;
		color: #fff;
		float: right;
		border-radius: 5px;
		border: 1px solid #000;
		padding: 4px 19px 8px 19px;
		line-height: 13px;
		margin-left: 10px;
	}
	
	.uiDialogButtons button:hover{
		background-color: #dea309;
	}
</style>