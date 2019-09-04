 
import {Node,Pin} from './exlib.js';

import {Library,Package,Datatype,Class,Function,In,Out,Method,Entry,Exit,Category,Editor,Enum,Value,Structure,Member,Component,Device} from './default.export.js';

function Extend(){
	var args = Array.prototype.slice.call(arguments);
	
	if(args.length === 1)
		return;

	var tok = args.shift()
		, name = args[args.length - 1];
	var ret = {methods: {}};
	var f = function(obj){
		if(!obj)
			return this._create(name,{});
		var id = (typeof obj == 'string') ? obj : obj.id;
		obj = (typeof obj == 'string') ? {id: obj} : obj;
		//console.log('----', obj, name);
		//console.assert(obj.id, 'YOU MUST PROVIDE ID');
		return this.$children.find(it => it.id == id) || this._create(name, obj);
		//return this._create(name, obj);
	}
	ret.methods[name] = f;
	tok.mixins.push(ret)
	Extend.apply(this, args);
}

Extend(Library, 'Package');
Extend(Package, Category, 'Category');
Extend(Package, Category, 'Function');
Extend(Package, Category, 'Datatype');
Extend(Node, Function, 'In');
Extend(Node, Function, 'Out');
Extend(Node, 'Entry');
Extend(Node, 'Exit');
Extend(Pin, Datatype, 'Editor');
Extend(Package, Category, Editor, 'Pattern');
Extend(Package, Category, 'Enum');
Extend(Enum, Editor, 'Value');
Extend(Package, Category, 'Structure');
Extend(Package, Category, 'Class');
Extend(Package, Category, 'Interface');
Extend(Class, 'Method');
Extend(Class, Structure, 'Member');
Extend(Package, Category, 'Device');
Extend(Device, 'Category');
Extend(Device, 'Component');
Extend(Device, Component, 'Provide');
Extend(Device, Component, 'Require');
