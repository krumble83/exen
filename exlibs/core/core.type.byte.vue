<template>
	<package id="core.byte">
		<category id="Byte">
			<function name="makeliteral" title="Make literal (Byte)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="make Byte">
				<in name="in" datatype="core.type.byte" />
				<out name="value" datatype="core.type.byte" label="Byte" />
			</function>
			<function name="tobit" title="Byte to Bit" color="#aaeea0" symbol="exlibs/img/function.png" keywords="byte bit">
				<in name="byte" datatype="core.type.byte" />
				<out name="bit0" datatype="core.type.bool" label="Bit 0" />	
				<out name="bit1" datatype="core.type.bool" label="Bit 1" />
				<out name="bit2" datatype="core.type.bool" label="Bit 2" />
				<out name="bit3" datatype="core.type.bool" label="Bit 3" />
				<out name="bit4" datatype="core.type.bool" label="Bit 4" />
				<out name="bit5" datatype="core.type.bool" label="Bit 5" />
				<out name="bit6" datatype="core.type.bool" label="Bit 6" />
				<out name="bit7" datatype="core.type.bool" label="Bit 7" />
			</function>
			<function name="tobyte" title="Bit to Byte" color="#aaeea0" symbol="exlibs/img/function.png" keywords="byte bit">
				<in name="bit0" datatype="core.type.bool" label="Bit 0" />
				<in name="bit1" datatype="core.type.bool" label="Bit 1" />
				<in name="bit2" datatype="core.type.bool" label="Bit 2" />
				<in name="bit3" datatype="core.type.bool" label="Bit 3" />
				<in name="bit4" datatype="core.type.bool" label="Bit 4" />
				<in name="bit5" datatype="core.type.bool" label="Bit 5" />
				<in name="bit6" datatype="core.type.bool" label="Bit 6" />
				<in name="bit7" datatype="core.type.bool" label="Bit 7" />
				<out name="byte" datatype="core.type.byte" />
			</function>
			<function name="random" title="Random (Byte)" color="#aaeea0" symbol="exlibs/img/function.png" tooltip="return a random value between &quot;min&quot; and &quot;max&quot; (included)" keywords="make random">
				<in name="min" datatype="core.type.byte" />
				<in name="max" datatype="core.type.byte" />
				<out name="out" datatype="core.type.byte" label="Return Value" />
			</function>
			<function name="min" title="Min (Byte)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="min" tooltip="Return minimum value between a and b">
				<in name="a" datatype="core.type.byte" />
				<in name="b" datatype="core.type.byte" />
				<out name="return" datatype="core.type.byte" />
			</function>
			<function name="max" title="Max (Byte)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="max" tooltip="Return maximum value between a and b">
				<in name="a" datatype="core.type.byte" />
				<in name="b" datatype="core.type.byte" />
				<out name="return" datatype="core.type.byte" />
			</function>
			<function name="clamp" title="Clamp (Byte)" color="#aaeea0" symbol="exlibs/img/function.png" keywords="clamp,limit,range" tooltip="Return value clamped between min and max">
				<in name="value" datatype="core.type.byte" />
				<in name="min" datatype="core.type.byte" />
				<in name="max" datatype="core.type.byte" />
				<out name="return" datatype="core.type.byte" />
			</function>
			<function name="between" title="Between (Byte)" color="#aaeea0" symbol="exlibs/img/function.png" tooltip="return True if &quot;value&quot; is between &quot;min&quot; and &quot;max&quot; (included)" keywords="range">
				<in name="value" datatype="core.type.byte" />
				<in name="min" datatype="core.type.byte" />
				<in name="max" datatype="core.type.byte" />
				<out name="out" datatype="core.type.bool" tooltip="True if &quot;value&quot; is between &quot;min&quot; and &quot;max&quot;" />
			</function>
		</category>	
			
		<category id="Byte/Arithmetic">
			<function name="add" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.add.png" keywords="add,+" subtitle="+" title="Byte + Byte">				
				<in name="a" datatype="core.type.byte" label=" " />
				<in name="a[1]" datatype="core.type.byte" label=" " />
				<out name="output" datatype="core.type.byte" />
				<out name="add" datatype="special.add" label="Add Value" target="a" tooltip="Add a new value." />
			</function>
			<function name="sub" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.sub.png" keywords="sub,-" subtitle="-" title="Byte - Byte">
				<in name="a" datatype="core.type.byte" label=" " />
				<in name="b" datatype="core.type.byte" label=" " />
				<out name="output" datatype="core.type.byte" />
				<out name="add" datatype="special.add" label="Add Item" target="a" tooltip="Add a new value." />
			</function>
			<function name="multiply" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.mul.png" keywords="multiply,*,x" subtitle="x" title="Byte x Byte">
				<in name="a" datatype="core.type.byte" label=" " />
				<in name="b" datatype="core.type.byte" label=" " />
				<out name="output" datatype="core.type.byte" />
				<out name="add" datatype="special.add" label="Add Item" target="a" tooltip="Add a new value." />
			</function>
			<function name="eq" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.eq.png" keywords="==,equal" subtitle="==" title="Byte == Byte (equal)">
				<in name="a" datatype="core.type.byte" />
				<in name="b" datatype="core.type.byte" />
				<out name="output" datatype="core.type.bool" tooltip="True if a = b" />
			</function>
			<function name="neq" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.neq.png" keywords="!=,<>,not equal,different" subtitle="!=" title="Byte != Byte (not equal)">
				<in name="a" datatype="core.type.byte" />
				<in name="b" datatype="core.type.byte" />
				<out name="output" datatype="core.type.bool" tooltip="True if a != b" />
			</function>
			<function name="lt" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.lt.png" keywords="<,lower than" subtitle="<" title="Byte < Byte (lower than)">
				<in name="a" datatype="core.type.byte" />
				<in name="b" datatype="core.type.byte" />
				<out name="output" datatype="core.type.bool" tooltip="True if a < b" />
			</function>
			<function name="gt" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.gt.png" keywords=">,gretter than" subtitle=">" title="Byte > Byte (gretter than)">
				<in name="a" datatype="core.type.byte" />
				<in name="b" datatype="core.type.byte" />
				<out name="output" datatype="core.type.bool" tooltip="True if a > b" />
			</function>
			<function name="lte" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.lte.png" keywords="<=,lower than or equal" subtitle="<=" title="Byte <= Byte (lower than or equal)">
				<in name="a" datatype="core.type.byte" />
				<in name="b" datatype="core.type.byte" />
				<out name="output" datatype="core.type.bool" tooltip="True if a <= b" />
			</function>
			<function name="gte" ctor="NodeOp" color="#555" symbol="exlibs/core/img/op.gte.png" keywords=">=,=>,gretter than or equal" subtitle=">=" title="Byte >= Byte (gretter than or equal)">
				<in name="a" datatype="core.type.byte" />
				<in name="b" datatype="core.type.byte" />
				<out name="output" datatype="core.type.bool" tooltip="True if a >= b" />
			</function>
		</category>
		
		<category id="Utilities/Flow Control">
			<function name="selectByte" title="Select (Byte)" keywords="select byte" symbol="exlibs/core/img/selectint.png" color="#C3C3C3">
				<in name="in" datatype="core.wildcards" label="in" group="1" />
				<in name="pick" datatype="core.type.byte" />
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
	App.components['libCoreTypeByte'] = exp;
</script>