<template>
	<package id="core.int">
		<category name="Integer">
			<function name="makeliteral" title="Make literal (Integer )" color="#aaeea0" symbol="exlibs/img/function.png" keywords="make Integer">
				<in name="in" datatype="core.type.int" />
				<out name="value" datatype="core.type.int" label="Integer" />
			</function>
			<function name="random" title="Random (Int)" color="#aaeea0" symbol="exlibs/img/function.png" tooltip="return a random value between &quot;min&quot; and &quot;max&quot; (included)" keywords="make random">
				<in name="min" datatype="core.type.int" />
				<in name="max" datatype="core.type.int" />
				<out name="out" datatype="core.type.int" label="Return Value" />
			</function>
			<function name="min" title="Min (Int)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="min" tooltip="Return minimum value between a and b">
				<in name="a" datatype="core.type.int" />
				<in name="b" datatype="core.type.int" />
				<out name="return" datatype="core.type.int" />
			</function>
			<function name="max" title="Max (Int)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="max" tooltip="Return maximum value between a and b">
				<in name="a" datatype="core.type.int" />
				<in name="b" datatype="core.type.int" />
				<out name="return" datatype="core.type.int" />
			</function>
			<function name="clamp" title="Clamp (Int)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="clamp,limit,range" tooltip="Return value clamped between min and max">
				<in name="value" datatype="core.type.int" />
				<in name="min" datatype="core.type.int" />
				<in name="max" datatype="core.type.int" />
				<out name="return" datatype="core.type.int" />
			</function>
			<function name="between" title="Between (Int)" symbol="exlibs/img/function.png" tooltip="return True if &quot;value&quot; is between &quot;min&quot; and &quot;max&quot; (included)" keywords="range">
				<in name="value" datatype="core.type.int" />
				<in name="min" datatype="core.type.int" />
				<in name="max" datatype="core.type.int" />
				<out name="out" datatype="core.type.bool" tooltip="True if &quot;value&quot; is between &quot;min&quot; and &quot;max&quot;" />
			</function>
		</category>
		

		<category name="Integer/Bitwise Operators">
			<function name="not" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.not.png" keywords="not,!" subtitle="NOT" title="Int NOT Int">	
				<in name="a" datatype="core.type.int" label=" " />
				<out name="output" datatype="core.type.int" />
			</function>
			<function name="and" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.and.png" keywords="and,&amp;" subtitle="AND" title="Int AND Int">	
				<in name="a" datatype="core.type.int" label=" " />
				<in name="b" datatype="core.type.int" label=" " />
				<out name="output" datatype="core.type.int" />
			</function>
			<function name="nand" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.nand.png" keywords="nand" subtitle="NAND" title="Int NAND Int">	
				<in name="a" datatype="core.type.int" label=" " />
				<in name="b" datatype="core.type.int" label=" " />
				<out name="output" datatype="core.type.int" />
			</function>
			<function name="or" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.or.png" keywords="or,|" subtitle="OR" title="Int OR Int">	
				<in name="a" datatype="core.type.int" label=" " />
				<in name="b" datatype="core.type.int" label=" " />
				<out name="output" datatype="core.type.int" />
			</function>
			<function name="nor" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.nor.png" subtitle="NOR" title="Int NOR Int">	
				<in name="a" datatype="core.type.int" label=" " />
				<in name="b" datatype="core.type.int" label=" " />
				<out name="output" datatype="core.type.int" />
			</function>
			<function name="xor" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.xor.png" subtitle="XOR" title="Int XOR Int">	
				<in name="a" datatype="core.type.int" label=" " />
				<in name="b" datatype="core.type.int" label=" " />
				<out name="output" datatype="core.type.int" />
			</function>
			<function name="xnor" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.xnor.png" subtitle="XNOR" title="Int XNOR Int">	
				<in name="a" datatype="core.type.int" label=" " />
				<in name="b" datatype="core.type.int" label=" " />
				<out name="output" datatype="core.type.int" />
			</function>
		</category>
		

		<category name="Integer/Arithmetic">
			<function name="add" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.add.png" keywords="add,+" subtitle="+" title="Int + Int" pos="900,450">	
				<in name="a" datatype="core.type.int" label=" " />
				<in name="b" datatype="core.type.int" label=" " />
				<out name="output" datatype="core.type.int" />
				<out name="add" datatype="special.add" label="Add Item" target="a" tooltip="Add a new value." />
			</function>
			<function name="sub" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.sub.png" keywords="sub,-" subtitle="-" title="Int - Int">	
				<in name="a" datatype="core.type.int" label=" " />
				<in name="b" datatype="core.type.int" label=" " />
				<out name="output" datatype="core.type.int" />
				<out name="add" datatype="special.add" label="Add Item" target="a" tooltip="Add a new value." />
			</function>
			<function name="multiply" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.mul.png" keywords="multiply,*,x" subtitle="x" title="Int x Int">	
				<in name="a" datatype="core.type.int" label=" " />
				<in name="b" datatype="core.type.int" label=" " />
				<out name="output" datatype="core.type.int" />
				<out name="add" datatype="special.add" label="Add Item" target="a" tooltip="Add a new value." />
			</function>
			<function name="divide" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.div.png" keywords="divide,/" subtitle="/" title="Int / Int">	
				<in name="a" datatype="core.type.int" label=" " />
				<in name="b" datatype="core.type.int" label=" " />
				<out name="output" datatype="core.type.int" />
			</function>
		</category>
		

		<category name="Integer/Comparators">
			<function name="eq" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.eq.png" keywords="==,equal" subtitle="==" title="Int == Int (equal)">	
				<in name="a" datatype="core.type.int" />
				<in name="b" datatype="core.type.int" />
				<out name="output" datatype="core.type.bool" tooltip="True if a = b" />
			</function>
			<function name="neq" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.neq.png" keywords="!=,<>,not equal,different" subtitle="!=" title="Int != Int (not equal)">	
				<in name="a" datatype="core.type.int" />
				<in name="b" datatype="core.type.int" />
				<out name="output" datatype="core.type.bool" tooltip="True if a != b" />
			</function>
			<function name="lt" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.lt.png" keywords="<,lower than" subtitle="<" title="Int < Int (lower than)">	
				<in name="a" datatype="core.type.int" />
				<in name="b" datatype="core.type.int" />
				<out name="output" datatype="core.type.bool" tooltip="True if a < b" />
			</function>
			<function name="gt" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.gt.png" keywords=">,gretter than" subtitle=">" title="Int > Int (gretter than)">	
				<in name="a" datatype="core.type.int" />
				<in name="b" datatype="core.type.int" />
				<out name="output" datatype="core.type.bool" tooltip="True if a > b" />
			</function>
			<function name="lte" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.lte.png" keywords="<=,lower than or equal" subtitle="<=" title="Int <= Int (lower than or equal)">	
				<in name="a" datatype="core.type.int" />
				<in name="b" datatype="core.type.int" />
				<out name="output" datatype="core.type.bool" tooltip="True if a <= b" />
			</function>
			<function name="gte" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.gte.png" keywords=">=,=>,gretter than or equal" subtitle=">=" title="Int >= Int (gretter than or equal)">	
				<in name="a" datatype="core.type.int" />
				<in name="b" datatype="core.type.int" />
				<out name="output" datatype="core.type.bool" tooltip="True if a >= b" />
			</function>
		</category>
		
		<category name="Utilities/Flow Control">
			<function name="selectInt" title="Select (Int)" keywords="select int" symbol="exlibs/core/img/selectint.png" color="#C3C3C3">
				<in name="in" datatype="core.wildcards" label="in" group="1" />
				<in name="pick" datatype="core.type.int" />
				<out name="returnValue" datatype="core.wildcards" group="1" />
				<out name="add" datatype="special.add" label="Add pin" target="in" tooltip="Add a new input." />
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