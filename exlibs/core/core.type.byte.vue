<template>
	<package id="core.byte">
		<category id="Byte">
			<function id="makeliteral" title="Make literal (Byte)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="make Byte">
				<in id="in" datatype="core.type.byte" />
				<out id="value" datatype="core.type.byte" label="Byte" />
			</function>
			<function id="tobit" title="Byte to Bit" color="#aaeea0" symbol="exlibs/img/function.png">
				<in id="byte" datatype="core.type.byte" />
				<out id="bit0" datatype="core.type.bool" label="Bit 0" />	
				<out id="bit1" datatype="core.type.bool" label="Bit 1" />
				<out id="bit2" datatype="core.type.bool" label="Bit 2" />
				<out id="bit3" datatype="core.type.bool" label="Bit 3" />
				<out id="bit4" datatype="core.type.bool" label="Bit 4" />
				<out id="bit5" datatype="core.type.bool" label="Bit 5" />
				<out id="bit6" datatype="core.type.bool" label="Bit 6" />
				<out id="bit7" datatype="core.type.bool" label="Bit 7" />
			</function>
			<function id="tobyte" title="Bit to Byte" color="#aaeea0" symbol="exlibs/img/function.png">
				<in id="bit0" datatype="core.type.bool" label="Bit 0" />
				<in id="bit1" datatype="core.type.bool" label="Bit 1" />
				<in id="bit2" datatype="core.type.bool" label="Bit 2" />
				<in id="bit3" datatype="core.type.bool" label="Bit 3" />
				<in id="bit4" datatype="core.type.bool" label="Bit 4" />
				<in id="bit5" datatype="core.type.bool" label="Bit 5" />
				<in id="bit6" datatype="core.type.bool" label="Bit 6" />
				<in id="bit7" datatype="core.type.bool" label="Bit 7" />
				<out id="byte" datatype="core.type.byte" />
			</function>
			<function id="random" title="Random (Byte)" color="#aaeea0" symbol="exlibs/img/function.png" tooltip="return a random value between &quot;min&quot; and &quot;max&quot; (included)" keywords="make random">
				<in id="min" datatype="core.type.byte" />
				<in id="max" datatype="core.type.byte" />
				<out id="out" datatype="core.type.byte" label="Return Value" />
			</function>
			<function id="min" title="Min (Byte)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="min" tooltip="Return minimum value between a and b">
				<in id="a" datatype="core.type.byte" />
				<in id="b" datatype="core.type.byte" />
				<out id="return" datatype="core.type.byte" />
			</function>
			<function id="max" title="Max (Byte)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="max" tooltip="Return maximum value between a and b">
				<in id="a" datatype="core.type.byte" />
				<in id="b" datatype="core.type.byte" />
				<out id="return" datatype="core.type.byte" />
			</function>
			<function id="clamp" title="Clamp (Byte)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="clamp,limit,range" tooltip="Return value clamped between min and max">
				<in id="value" datatype="core.type.byte" />
				<in id="min" datatype="core.type.byte" />
				<in id="max" datatype="core.type.byte" />
				<out id="return" datatype="core.type.byte" />
			</function>
			<function id="between" title="Between (Byte)" color="#aaeea0" symbol="exlibs/img/function.png" tooltip="return True if &quot;value&quot; is between &quot;min&quot; and &quot;max&quot; (included)" keywords="range">
				<in id="value" datatype="core.type.byte" />
				<in id="min" datatype="core.type.byte" />
				<in id="max" datatype="core.type.byte" />
				<out id="out" datatype="core.type.bool" tooltip="True if &quot;value&quot; is between &quot;min&quot; and &quot;max&quot;" />
			</function>
		</category>	
			
		<category id="Byte/Arithmetic">
			<function id="add" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.add.png" keywords="add,+" subtitle="+" title="Byte + Byte">				
				<in id="a" datatype="core.type.byte" label=" " />
				<in id="b" datatype="core.type.byte" label=" " />
				<out id="output" datatype="core.type.byte" />
				<out id="add" datatype="special.add" label="Add Item" target="a" tooltip="Add a new value." />
			</function>
			<function id="sub" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.sub.png" keywords="sub,-" subtitle="-" title="Byte - Byte">
				<in id="a" datatype="core.type.byte" label=" " />
				<in id="b" datatype="core.type.byte" label=" " />
				<out id="output" datatype="core.type.byte" />
				<out id="add" datatype="special.add" label="Add Item" target="a" tooltip="Add a new value." />
			</function>
			<function id="multiply" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.mul.png" keywords="multiply,*,x" subtitle="x" title="Byte x Byte">
				<in id="a" datatype="core.type.byte" label=" " />
				<in id="b" datatype="core.type.byte" label=" " />
				<out id="output" datatype="core.type.byte" />
				<out id="add" datatype="special.add" label="Add Item" target="a" tooltip="Add a new value." />
			</function>
			<function id="eq" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.eq.png" keywords="==,equal" subtitle="==" title="Byte == Byte (equal)">
				<in id="a" datatype="core.type.byte" />
				<in id="b" datatype="core.type.byte" />
				<out id="output" datatype="core.type.bool" tooltip="True if a = b" />
			</function>
			<function id="neq" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.neq.png" keywords="!=,<>,not equal,different" subtitle="!=" title="Byte != Byte (not equal)">
				<in id="a" datatype="core.type.byte" />
				<in id="b" datatype="core.type.byte" />
				<out id="output" datatype="core.type.bool" tooltip="True if a != b" />
			</function>
			<function id="lt" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.lt.png" keywords="<,lower than" subtitle="<" title="Byte < Byte (lower than)">
				<in id="a" datatype="core.type.byte" />
				<in id="b" datatype="core.type.byte" />
				<out id="output" datatype="core.type.bool" tooltip="True if a < b" />
			</function>
			<function id="gt" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.gt.png" keywords=">,gretter than" subtitle=">" title="Byte > Byte (gretter than)">
				<in id="a" datatype="core.type.byte" />
				<in id="b" datatype="core.type.byte" />
				<out id="output" datatype="core.type.bool" tooltip="True if a > b" />
			</function>
			<function id="lte" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.lte.png" keywords="<=,lower than or equal" subtitle="<=" title="Byte <= Byte (lower than or equal)">
				<in id="a" datatype="core.type.byte" />
				<in id="b" datatype="core.type.byte" />
				<out id="output" datatype="core.type.bool" tooltip="True if a <= b" />
			</function>
			<function id="gte" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.gte.png" keywords=">=,=>,gretter than or equal" subtitle=">=" title="Byte >= Byte (gretter than or equal)">
				<in id="a" datatype="core.type.byte" />
				<in id="b" datatype="core.type.byte" />
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
	App.components['libCoreTypeByte'] = exp;
</script>