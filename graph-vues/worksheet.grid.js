
import ExNode from './node.vue';

ExNode.mixins.push({
	inject: ['snapToGrid'],
	
	mounted: function(){
		this.mX = this.snapToGrid(this.x)+this.$worksheet.gridsize;
		this.mY = this.snapToGrid(this.y)+this.$worksheet.gridsize;
	},
	
	watch: {
		mX: function(val){
			this.mX = this.snapToGrid(val);
		},
		mY: function(val){
			this.mY = this.snapToGrid(val);
		}
	}
});


export default {
	props: {
		gridsize: {type: Number, default: 16},
	},
	
	provide: function(){
		var me = this;
		return {
			snapToGrid: function(x, y){
				if(typeof x !== 'undefined' && typeof y === 'undefined')
					return parseInt(x/me.gridsize)*me.gridsize;
				else if(typeof y !== 'undefined' && typeof x === 'undefined')
					return parseInt(y/me.gridsize)*me.gridsize;
				else
					return {x: parseInt(x/me.gridsize)*me.gridsize, y: parseInt(y/me.gridsize)*me.gridsize};
			},
			//viewport: 'zzz'
		}
	},
	
	created: function(){
		var me = this
		, smallId = this.$uid()
		, data = [
			{props: {is: 'pattern', id: smallId, x: 0, y:0, width: this.gridsize, height: this.gridsize, patternUnits: 'userSpaceOnUse', class: 'smallGrid'},
				childs: [{props:{is: 'path',d: 'M ' + this.gridsize + ' 0 L 0 0 0 ' + this.gridsize, fill: 'none'}}]
			},
			{props: {is: 'pattern', id: 'grid_' + this.id, x: 0, y:0, width: (this.gridsize*8), height: (this.gridsize*8), patternUnits: 'userSpaceOnUse', class: 'medGrid'},
				childs: [{props:{is: 'rect', width: (this.gridsize*8), height: (this.gridsize*8), fill: 'url(#' + smallId + ')'}}]
			}
		];
			
		this.addDef(data);
	},

};