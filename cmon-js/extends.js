
Vue.mixin({
	methods: {
		$uid: function(prefix){
			prefix = prefix || 'uid';
			return prefix + 'xxxxxxxxxxxxxxxx'.replace(/./g, function(c) {
				var r = Math.random() * 16 | 0;
				return r.toString(16);
			});
		},
		
		$flag: function(flag){
			return (typeof flag == 'string') ? eval(flag) : flag;
		},
		
		$hasFlag: function(flag){
			flag = (typeof flag == 'string') ? eval(flag) : flag;
			return ((this.flags & flag) == flag);			
		},
	}
});