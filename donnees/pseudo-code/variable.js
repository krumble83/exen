

exPC.Variable = exBASE.invent({
    create: 'variable',
	inherit: [exPC.Base,
	extend: {
		__init: function(){
			return exPC.Base.prototype.init.apply(this, arguments);
		},	
		Name: function(value){return this.attr('name', value);},
		IsArray: function(value){return this.attr('array', value)},
		Object: function(value){return this.attr('object', value)},
	}
});


exPC.VariableDeclare = exBASE.invent({
    create: 'declare:variable',
	inherit: exPC.Variable,
	extend: {
		__init: function(){
			return exPC.Variable.prototype.init.apply(this, arguments);
		},
		flags: function(){}
	}
});

exPC.VariableAssign = exBASE.invent({
    create: 'assign::variable',
	inherit: exPC.Variable,
	extend: {
		__init: function(){
			return exPC.Variable.prototype.init.apply(this, arguments);
		},
		Operator: function(value){
			return this.attr('operator', value);			
		},		
		Value: function(){
			var ret = this.create('ValueBase');
			return ret.__init.apply(ret, arguments);
		},
	}
});