<template>
	<package id="core.int">
		<category id="Integer">
			<function name="makeliteral" title="Make literal (Integer )" color="#aaeea0" symbol="exlibs/img/function.png" keywords="make Integer">
				<in id="in" datatype="core.type.int" />
				<out id="value" datatype="core.type.int" label="Integer" />
			</function>
			<function name="random" title="Random (Int)" color="#aaeea0" symbol="exlibs/img/function.png" tooltip="return a random value between &quot;min&quot; and &quot;max&quot; (included)" keywords="make random">
				<in id="min" datatype="core.type.int" />
				<in id="max" datatype="core.type.int" />
				<out id="out" datatype="core.type.int" label="Return Value" />
			</function>
			<function name="min" title="Min (Int)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="min" tooltip="Return minimum value between a and b">
				<in id="a" datatype="core.type.int" />
				<in id="b" datatype="core.type.int" />
				<out id="return" datatype="core.type.int" />
			</function>
			<function name="max" title="Max (Int)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="max" tooltip="Return maximum value between a and b">
				<in id="a" datatype="core.type.int" />
				<in id="b" datatype="core.type.int" />
				<out id="return" datatype="core.type.int" />
			</function>
			<function name="clamp" title="Clamp (Int)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="clamp,limit,range" tooltip="Return value clamped between min and max">
				<in id="value" datatype="core.type.int" />
				<in id="min" datatype="core.type.int" />
				<in id="max" datatype="core.type.int" />
				<out id="return" datatype="core.type.int" />
			</function>
			<function name="between" title="Between (Int)" color="#aaeea0" symbol="exlibs/img/function.png" tooltip="return True if &quot;value&quot; is between &quot;min&quot; and &quot;max&quot; (included)" keywords="range">
				<in id="value" datatype="core.type.int" />
				<in id="min" datatype="core.type.int" />
				<in id="max" datatype="core.type.int" />
				<out id="out" datatype="core.type.bool" tooltip="True if &quot;value&quot; is between &quot;min&quot; and &quot;max&quot;" />
			</function>
		</category>
		

		<category id="Integer/Bitwise Operators">
			<function name="not" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.not.png" keywords="not,!" subtitle="NOT" title="Int NOT Int">	
				<in id="a" datatype="core.type.int" label=" " />
				<out id="output" datatype="core.type.int" />
			</function>
			<function name="and" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.and.png" keywords="and,&amp;" subtitle="AND" title="Int AND Int">	
				<in id="a" datatype="core.type.int" label=" " />
				<in id="b" datatype="core.type.int" label=" " />
				<out id="output" datatype="core.type.int" />
			</function>
			<function name="nand" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.nand.png" keywords="nand" subtitle="NAND" title="Int NAND Int">	
				<in id="a" datatype="core.type.int" label=" " />
				<in id="b" datatype="core.type.int" label=" " />
				<out id="output" datatype="core.type.int" />
			</function>
			<function name="or" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.or.png" keywords="or,|" subtitle="OR" title="Int OR Int">	
				<in id="a" datatype="core.type.int" label=" " />
				<in id="b" datatype="core.type.int" label=" " />
				<out id="output" datatype="core.type.int" />
			</function>
			<function name="nor" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.nor.png" subtitle="NOR" title="Int NOR Int">	
				<in id="a" datatype="core.type.int" label=" " />
				<in id="b" datatype="core.type.int" label=" " />
				<out id="output" datatype="core.type.int" />
			</function>
			<function name="xor" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.xor.png" subtitle="XOR" title="Int XOR Int">	
				<in id="a" datatype="core.type.int" label=" " />
				<in id="b" datatype="core.type.int" label=" " />
				<out id="output" datatype="core.type.int" />
			</function>
			<function name="xnor" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.xnor.png" subtitle="XNOR" title="Int XNOR Int">	
				<in id="a" datatype="core.type.int" label=" " />
				<in id="b" datatype="core.type.int" label=" " />
				<out id="output" datatype="core.type.int" />
			</function>
		</category>
		

		<category id="Integer/Arithmetic">
			<function name="add" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.add.png" keywords="add,+" subtitle="+" title="Int + Int" pos="900,450">	
				<in id="a" datatype="core.type.int" label=" " />
				<in id="b" datatype="core.type.int" label=" " />
				<out id="output" datatype="core.type.int" />
				<out id="add" datatype="special.add" label="Add Item" target="a" tooltip="Add a new value." />
			</function>
			<function name="sub" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.sub.png" keywords="sub,-" subtitle="-" title="Int - Int">	
				<in id="a" datatype="core.type.int" label=" " />
				<in id="b" datatype="core.type.int" label=" " />
				<out id="output" datatype="core.type.int" />
				<out id="add" datatype="special.add" label="Add Item" target="a" tooltip="Add a new value." />
			</function>
			<function name="multiply" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.mul.png" keywords="multiply,*,x" subtitle="x" title="Int x Int">	
				<in id="a" datatype="core.type.int" label=" " />
				<in id="b" datatype="core.type.int" label=" " />
				<out id="output" datatype="core.type.int" />
				<out id="add" datatype="special.add" label="Add Item" target="a" tooltip="Add a new value." />
			</function>
			<function name="divide" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.div.png" keywords="divide,/" subtitle="/" title="Int / Int">	
				<in id="a" datatype="core.type.int" label=" " />
				<in id="b" datatype="core.type.int" label=" " />
				<out id="output" datatype="core.type.int" />
			</function>
		</category>
		

		<category id="Integer/Comparators">
			<function name="eq" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.eq.png" keywords="==,equal" subtitle="==" title="Int == Int (equal)">	
				<in id="a" datatype="core.type.int" />
				<in id="b" datatype="core.type.int" />
				<out id="output" datatype="core.type.bool" tooltip="True if a = b" />
			</function>
			<function name="neq" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.neq.png" keywords="!=,<>,not equal,different" subtitle="!=" title="Int != Int (not equal)">	
				<in id="a" datatype="core.type.int" />
				<in id="b" datatype="core.type.int" />
				<out id="output" datatype="core.type.bool" tooltip="True if a != b" />
			</function>
			<function name="lt" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.lt.png" keywords="<,lower than" subtitle="<" title="Int < Int (lower than)">	
				<in id="a" datatype="core.type.int" />
				<in id="b" datatype="core.type.int" />
				<out id="output" datatype="core.type.bool" tooltip="True if a < b" />
			</function>
			<function name="gt" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.gt.png" keywords=">,gretter than" subtitle=">" title="Int > Int (gretter than)">	
				<in id="a" datatype="core.type.int" />
				<in id="b" datatype="core.type.int" />
				<out id="output" datatype="core.type.bool" tooltip="True if a > b" />
			</function>
			<function name="lte" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.lte.png" keywords="<=,lower than or equal" subtitle="<=" title="Int <= Int (lower than or equal)">	
				<in id="a" datatype="core.type.int" />
				<in id="b" datatype="core.type.int" />
				<out id="output" datatype="core.type.bool" tooltip="True if a <= b" />
			</function>
			<function name="gte" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.gte.png" keywords=">=,=>,gretter than or equal" subtitle=">=" title="Int >= Int (gretter than or equal)">	
				<in id="a" datatype="core.type.int" />
				<in id="b" datatype="core.type.int" />
				<out id="output" datatype="core.type.bool" tooltip="True if a >= b" />
			</function>
		</category>
		
		<category id="Utilities/Flow Control">
			<function name="selectInt" title="Select (Int)" keywords="select int" symbol="exlibs/core/img/selectint.png" color="#C3C3C3">
				<in id="in" datatype="core.wildcards" label="in" group="1" />
				<in id="pick" datatype="core.type.int" />
				<out id="returnValue" datatype="core.wildcards" group="1" />
				<out id="add" datatype="special.add" label="Add pin" target="in" tooltip="Add a new input." />
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