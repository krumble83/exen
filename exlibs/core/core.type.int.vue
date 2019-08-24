<template>
	<package id="core.int">
		<category id="Integer">
			<function id="makeliteral" title="Make literal (Integer )" color="#aaeea0" symbol="exlibs/img/function.png" keywords="make Integer">
				<input id="in" type="core.type.int"></input>
				<output id="value" type="core.type.int" label="Integer "></output>
			</function>
			<function id="random" title="Random (Int)" color="#aaeea0" symbol="exlibs/img/function.png" tooltip="return a random value between &quot;min&quot; and &quot;max&quot; (included)" keywords="make random">
				<input id="min" type="core.type.int"></input>
				<input id="max" type="core.type.int"></input>
				<output id="out" type="core.type.int" label="Return Value"></output>
			</function>
			<function id="min" title="Min (Int)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="min" tooltip="Return minimum value between a and b">
				<input id="a" type="core.type.int"></input>
				<input id="b" type="core.type.int"></input>
				<output id="return" type="core.type.int"></output>
			</function>
			<function id="max" title="Max (Int)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="max" tooltip="Return maximum value between a and b">
				<input id="a" type="core.type.int"></input>
				<input id="b" type="core.type.int"></input>
				<output id="return" type="core.type.int"></output>
			</function>
			<function id="clamp" title="Clamp (Int)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="clamp,limit,range" tooltip="Return value clamped between min and max">
				<input id="value" type="core.type.int"></input>
				<input id="min" type="core.type.int"></input>
				<input id="max" type="core.type.int"></input>
				<output id="return" type="core.type.int"></output>
			</function>
			<function id="between" title="Between (Int)" color="#aaeea0" symbol="exlibs/img/function.png" tooltip="return True if &quot;value&quot; is between &quot;min&quot; and &quot;max&quot; (included)" keywords="range">
				<input id="value" type="core.type.int"></input>
				<input id="min" type="core.type.int"></input>
				<input id="max" type="core.type.int"></input>
				<output id="out" type="core.type.bool" tooltip="True if &quot;value&quot; is between &quot;min&quot; and &quot;max&quot;"></output>
			</function>
		</category>
		

		<category id="Integer/Bitwise Operators">
			<function id="not" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.not.png" keywords="not,!" subtitle="NOT" title="Int NOT Int">	
				<input id="a" type="core.type.int" label=" "></input>
				<output id="output" type="core.type.int"></output>
			</function>
			<function id="and" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.and.png" keywords="and,&amp;" subtitle="AND" title="Int AND Int">	
				<input id="a" type="core.type.int" label=" "></input>
				<input id="b" type="core.type.int" label=" "></input>
				<output id="output" type="core.type.int"></output>
			</function>
			<function id="nand" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.nand.png" keywords="nand" subtitle="NAND" title="Int NAND Int">	
				<input id="a" type="core.type.int" label=" "></input>
				<input id="b" type="core.type.int" label=" "></input>
				<output id="output" type="core.type.int"></output>
			</function>
			<function id="or" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.or.png" keywords="or,|" subtitle="OR" title="Int OR Int">	
				<input id="a" type="core.type.int" label=" "></input>
				<input id="b" type="core.type.int" label=" "></input>
				<output id="output" type="core.type.int"></output>
			</function>
			<function id="nor" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.nor.png" subtitle="NOR" title="Int NOR Int">	
				<input id="a" type="core.type.int" label=" "></input>
				<input id="b" type="core.type.int" label=" "></input>
				<output id="output" type="core.type.int"></output>
			</function>
			<function id="xor" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.xor.png" subtitle="XOR" title="Int XOR Int">	
				<input id="a" type="core.type.int" label=" "></input>
				<input id="b" type="core.type.int" label=" "></input>
				<output id="output" type="core.type.int"></output>
			</function>
			<function id="xnor" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.xnor.png" subtitle="XNOR" title="Int XNOR Int">	
				<input id="a" type="core.type.int" label=" "></input>
				<input id="b" type="core.type.int" label=" "></input>
				<output id="output" type="core.type.int"></output>
			</function>
		</category>
		

		<category id="Integer/Arithmetic">
			<function id="add" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.add.png" keywords="add,+" subtitle="+" title="Int + Int" pos="900,450">	
				<input id="a" type="core.type.int" label=" "></input>
				<input id="b" type="core.type.int" label=" "></input>
				<output id="output" type="core.type.int"></output>
				<output id="add" type="special.add" label="Add Item" target="a" tooltip="Add a new value."></output>
			</function>
			<function id="sub" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.sub.png" keywords="sub,-" subtitle="-" title="Int - Int">	
				<input id="a" type="core.type.int" label=" "></input>
				<input id="b" type="core.type.int" label=" "></input>
				<output id="output" type="core.type.int"></output>
				<output id="add" type="special.add" label="Add Item" target="a" tooltip="Add a new value."></output>
			</function>
			<function id="multiply" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.mul.png" keywords="multiply,*,x" subtitle="x" title="Int x Int">	
				<input id="a" type="core.type.int" label=" "></input>
				<input id="b" type="core.type.int" label=" "></input>
				<output id="output" type="core.type.int"></output>
				<output id="add" type="special.add" label="Add Item" target="a" tooltip="Add a new value."></output>
			</function>
			<function id="divide" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.div.png" keywords="divide,/" subtitle="/" title="Int / Int">	
				<input id="a" type="core.type.int" label=" "></input>
				<input id="b" type="core.type.int" label=" "></input>
				<output id="output" type="core.type.int"></output>
			</function>
		</category>
		

		<category id="Integer/Comparators">
			<function id="eq" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.eq.png" keywords="==,equal" subtitle="==" title="Int == Int (equal)">	
				<input id="a" type="core.type.int"></input>
				<input id="b" type="core.type.int"></input>
				<output id="output" type="core.type.bool" tooltip="True if a = b"></output>
			</function>
			<function id="neq" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.neq.png" keywords="!=,<>,not equal,different" subtitle="!=" title="Int != Int (not equal)">	
				<input id="a" type="core.type.int"></input>
				<input id="b" type="core.type.int"></input>
				<output id="output" type="core.type.bool" tooltip="True if a != b"></output>
			</function>
			<function id="lt" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.lt.png" keywords="<,lower than" subtitle="<" title="Int < Int (lower than)">	
				<input id="a" type="core.type.int"></input>
				<input id="b" type="core.type.int"></input>
				<output id="output" type="core.type.bool" tooltip="True if a < b"></output>
			</function>
			<function id="gt" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.gt.png" keywords=">,gretter than" subtitle=">" title="Int > Int (gretter than)">	
				<input id="a" type="core.type.int"></input>
				<input id="b" type="core.type.int"></input>
				<output id="output" type="core.type.bool" tooltip="True if a > b"></output>
			</function>
			<function id="lte" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.lte.png" keywords="<=,lower than or equal" subtitle="<=" title="Int <= Int (lower than or equal)">	
				<input id="a" type="core.type.int"></input>
				<input id="b" type="core.type.int"></input>
				<output id="output" type="core.type.bool" tooltip="True if a <= b"></output>
			</function>
			<function id="gte" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.gte.png" keywords=">=,=>,gretter than or equal" subtitle=">=" title="Int >= Int (gretter than or equal)">	
				<input id="a" type="core.type.int"></input>
				<input id="b" type="core.type.int"></input>
				<output id="output" type="core.type.bool" tooltip="True if a >= b"></output>
			</function>
		</category>
		
		<category id="Utilities/Flow Control">
			<function id="selectInt" title="Select (Int)" keywords="select int" symbol="exlibs/core/img/selectint.png" color="#C3C3C3">
				<input id="in" type="core.wildcards" label="in [0]" group="1"></input>
				<input id="pick" type="core.type.int"></input>
				<output id="returnValue" type="core.wildcards" group="1"></output>
				<output id="add" type="special.add" label="Add pin" target="in" tooltip="Add a new input."></output>
			</function>
		</category>
	</package>
</template>

<script>

	import * as comps from '../default.export.js';
	
	const exp = {
		components: comps
	}
	export default exp;

	import App from '../../ui-vues/project.vue';
	App.components['libCoreTypeInt'] = exp;
</script>