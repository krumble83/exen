/*
<for>
	<init>
		<variable />
		<operator />
		<value />
	</init>
	<while>
		<condition />
	</while>
	<iteration></iteration>
	<body>
		<continue />
		<break />	
	</body>
</for>
*/



exPC.ConditionBase = exBASE.invent({
    //create: 'condition',
	inherit: exPC.Base,
	extend: {
		__init: function(){
			return exPC.Base.prototype.init.apply(this, arguments);
		},
	}
});

exPC.ForInit = exBASE.invent({
    create: 'init',
	inherit: exPC.Base,
	extend: {},
});

exPC.ForWhile = exBASE.invent({
    create: 'while',
	inherit: exPC.ConditionBase,
	extend: {
		__init: function(){
			return exPC.ConditionBase.prototype.init.apply(this, arguments);
		},
	},
});


exPC.Fragment = exBASE.invent({
    create: 'fragment',
	inherit: exPC.Base,
	extend: {
		__init: function(){
			return exPC.Base.prototype.init.apply(this, arguments);
		},
		Native: function(){},
		Break: function(){},
		Continue: function(){},		
		Cast: function(){},
		Instruction: function(){},
	},
});


exPC.Cast = exBASE.invent({
    create: 'cast',
	inherit: exPC.Base,
	extend: {
		__init: function(){
			return exPC.Base.prototype.init.apply(this, arguments);
		},
		From: function(){},
		To: function(){},
	},
});



exPC.Body = exBASE.invent({
    create: 'body',
	inherit: exPC.Fragment,
	extend: {
		__init: function(){
			return exPC.Fragment.prototype.init.apply(this, arguments);
		},
	},
});

exPC.ForBody = exBASE.invent({
    create: 'body',
	inherit: exPC.Body,
	extend: {
		__init: function(){
			return exPC.Body.prototype.init.apply(this, arguments);
		},
	},
});

exPC.For = exBASE.invent({
    create: 'for',
	inherit: exPC.Base,
	
    extend: {
		__init: function(){
			return exPC.Base.prototype.init.apply(this, arguments);
		},

		Init: function(){
			var ret = this.create('ForInit');
			return ret.__init.apply(ret, arguments);
		},
		
		While: function(){
			var ret = this.create('Init');
			return ret.__init.apply(ret, arguments);
		},
		
		Body: function(svgid){
			var ret = this.create('ForBody');
			return ret.__init.apply(ret, arguments);
		}
	}
});