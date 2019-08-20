

exPC.Litteral = exBASE.invent({
    create: 'litteral',
	inherit: exPC.Base,
	extend: {
		__init: function(){
			return exPC.Base.prototype.init.apply(this, arguments);
		},		
		Value: function(value){return this.text(value)},
		Delimiter: function(value){return this.attr('delimiter', value);},
		Prefix: function(value){return this.attr('prefix', value);},
	}
});

exPC.String = exBASE.invent({
    create: 'string',
	inherit: exPC.Litteral,
	extend: {
		__init: function(){
			this.attr('delimiter', '"');
			return exPC.Litteral.prototype.init.apply(this, arguments);
		}
	}
});

exPC.Integer = exBASE.invent({
    create: 'integer',
	inherit: exPC.Litteral,
	extend: {
		__init: function(){
			return exPC.Litteral.prototype.init.apply(this, arguments);
		},
	}
});

exPC.Float = exBASE.invent({
    create: 'float',
	inherit: exPC.Litteral,
	extend: {
		__init: function(){
			return exPC.Litteral.prototype.init.apply(this, arguments);
		},
	}
});

exPC.ValueBase = exBASE.invent({
    //create: 'value',
	inherit: exPC.Base,
	extend: {
		__init: function(){
			return exPC.Base.prototype.init.apply(this, arguments);
		},		
		Litteral: function(){
			var ret = this.__create('Litteral');
			return ret.__init.apply(ret, arguments);
		},
		String: function(){
			var ret = this.__create('String');
			return ret.__init.apply(ret, arguments);
		},
		Integer: function(){
			var ret = this.__create('Integer');
			return ret.__init.apply(ret, arguments);
		},
		Float: function(){
			var ret = this.__create('Float');
			return ret.__init.apply(ret, arguments);
		},
	}
});