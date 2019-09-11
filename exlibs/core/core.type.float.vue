<template>
   <package id="core.float">
		<category id="Float">
			<function name="makeliteral" title="Make literal (Float )" color="#aaeea0" symbol="exlibs/img/function.png" keywords="make Float ">
				<in id="in" datatype="core.type.float" />
				<out id="value" datatype="core.type.float" label="Float " />
			</function>
			<function name="random" title="Random (Float)" color="#aaeea0" symbol="exlibs/img/function.png" tooltip="return a random value between &quot;min&quot; and &quot;max&quot; (included)" keywords="make random">
				<in id="min" datatype="core.type.float" />
				<in id="max" datatype="core.type.float" />
				<out id="out" datatype="core.type.float" label="Return Value" />
			</function>
			<function name="min" title="Min (Float)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="min" tooltip="Return minimum value between a and b">
				<in id="a" datatype="core.type.float" />
				<in id="b" datatype="core.type.float" />
				<out id="return" datatype="core.type.float" />
			</function>
			<function name="max" title="Max (Float)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="max" tooltip="Return maximum value between a and b">
				<in id="a" datatype="core.type.float" />
				<in id="b" datatype="core.type.float" />
				<out id="return" datatype="core.type.float" />
			</function>
			<function name="clamp" title="Clamp (Float)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="clamp,limit,range" tooltip="Return value clamped between min and max">
				<in id="value" datatype="core.type.float" />
				<in id="min" datatype="core.type.float" />
				<in id="max" datatype="core.type.float" />
				<out id="return" datatype="core.type.float" />
			</function>
			<function name="between" title="Between (Float)" color="#aaeea0" symbol="exlibs/img/function.png" tooltip="return True if &quot;value&quot; is between &quot;min&quot; and &quot;max&quot; (included)" keywords="range">
				<in id="value" datatype="core.type.float" />
				<in id="min" datatype="core.type.float" />
				<in id="max" datatype="core.type.float" />
				<out id="out" datatype="core.type.bool" tooltip="True if &quot;value&quot; is between &quot;min&quot; and &quot;max&quot;" />
			</function>
		</category>
		
		<category id="Float/Arithmetic">	  
			<function name="add" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.add.png" keywords="add,+" subtitle="+" title="Float + Float">
				<in id="a" datatype="core.type.float" label=" " />
				<in id="b" datatype="core.type.float" label=" " />
				<out id="output" datatype="core.type.float" />
				<out id="add" datatype="special.add" label="Add Item" target="a" tooltip="Add a new value." />
			</function>
			<function name="sub" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.sub.png" keywords="sub,-" subtitle="-" title="Float - Float">
				<in id="a" datatype="core.type.float" label=" " />
				<in id="b" datatype="core.type.float" label=" " />
				<out id="output" datatype="core.type.float" />
				<out id="add" datatype="special.add" label="Add Item" target="a" tooltip="Add a new value." />
			</function>
			<function name="multiply" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.mul.png" keywords="multiply,*,x" subtitle="x" title="Float x Float">
				<in id="a" datatype="core.type.float" label=" " />
				<in id="b" datatype="core.type.float" label=" " />
				<out id="output" datatype="core.type.float" />
				<out id="add" datatype="special.add" label="Add Item" target="a" tooltip="Add a new value." />
			</function>
			<function name="divide" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.div.png" keywords="divide,/" subtitle="/" title="Float / Float">
				<in id="a" datatype="core.type.float" label=" " />
				<in id="b" datatype="core.type.float" label=" " />
				<out id="output" datatype="core.type.float" />
			</function>
		</category>
		
		<category id="Float/Comparators">  
			<function name="eq" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.eq.png" keywords="==,equal" subtitle="==" title="Float == Float (equal)">
				<in id="a" datatype="core.type.float" />
				<in id="b" datatype="core.type.float" />
				<out id="output" datatype="core.type.bool" tooltip="True if a = b" />
			</function>
			<function name="neq" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.neq.png" keywords="!=,<>,not equal,different" subtitle="!=" title="Float != Float (not equal)">
				<in id="a" datatype="core.type.float" />
				<in id="b" datatype="core.type.float" />
				<out id="output" datatype="core.type.bool" tooltip="True if a != b" />
			</function>
			<function name="lt" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.lt.png" keywords="<,lower than" subtitle="<" title="Float < Float (lower than)">
				<in id="a" datatype="core.type.float" />
				<in id="b" datatype="core.type.float" />
				<out id="output" datatype="core.type.bool" tooltip="True if a < b" />
			</function>
			<function name="gt" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.gt.png" keywords=">,gretter than" subtitle=">" title="Float > Float (gretter than)">
				<in id="a" datatype="core.type.float" />
				<in id="b" datatype="core.type.float" />
				<out id="output" datatype="core.type.bool" tooltip="True if a > b" />
			</function>
			<function name="lte" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.lte.png" keywords="<=,lower than or equal" subtitle="<=" title="Float <= Float (lower than or equal)">
				<in id="a" datatype="core.type.float" />
				<in id="b" datatype="core.type.float" />
				<out id="output" datatype="core.type.bool" tooltip="True if a <= b" />
			</function>
			<function name="gte" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.gte.png" keywords=">=,=>,gretter than or equal" subtitle=">=" title="Float >= Float (gretter than or equal)">
				<in id="a" datatype="core.type.float" />
				<in id="b" datatype="core.type.float" />
				<out id="output" datatype="core.type.bool" tooltip="True if a >= b" />
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
	App.components['libCoreTypeFloat'] = exp;
</script>