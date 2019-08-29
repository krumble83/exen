<template>
	<package id="core.date">
		<category id="Date Time">
			<function id="date.make" title="Make DateTime Structure" symbol="exlibs/core/img/make.png" keywords="make DateTime Structure" color="#00f">
				<in id="date-year" datatype="core.type.int" label="Year" />
				<in id="date-month" datatype="core.type.int" label="Month" />
				<in id="date-day" datatype="core.type.int" label="Day" />
				<in id="date-hour" datatype="core.type.int" label="Hour" />
				<in id="date-minutes" datatype="core.type.int" label="Minute" />
				<in id="date-seconds" datatype="core.type.int" label="Seconds" />
				<out id="out" datatype="core.type.date" label="DateTime Structure" />
			</function>
			<function id="date.break" title="Break DateTime Structure" symbol="exlibs/core/img/break.png" keywords="break DateTime Structure" color="#00f">
				<in id="in" datatype="core.type.date" label="DateTime Structure" />
				<out id="date-year" datatype="core.type.int" label="Year" />
				<out id="date-month" datatype="core.type.int" label="Month" />
				<out id="date-day" datatype="core.type.int" label="Day" />
				<out id="date-hour" datatype="core.type.int" label="Hour" />
				<out id="date-minutes" datatype="core.type.int" label="Minute" />
				<out id="date-seconds" datatype="core.type.int" label="Seconds" />
			</function>
			<function id="now" title="Now" symbol="exlibs/img/date.png" keywords="date">
				<out id="value" datatype="core.type.date" />
			</function>
			<function id="getyear" title="Get Year" symbol="exlibs/img/date.png" keywords="year,get year">
				<in id="date" datatype="core.type.date" />
				<out id="year" datatype="core.type.int" />
			</function>
			<function id="getmonth" title="Get Month" symbol="exlibs/img/date.png" keywords="month,get month">
				<in id="date" datatype="core.type.date" />
				<out id="month" datatype="core.type.int" />
			</function>
			<function id="getday" title="Get Day" symbol="exlibs/img/date.png" keywords="day,get day">
				<in id="date" datatype="core.type.date" />
				<out id="day" datatype="core.type.int" />
			</function>
			<function id="gethour" title="Get Hour (24h)" symbol="exlibs/img/date.png" keywords="hour, get hour">
				<in id="date" datatype="core.type.date" />
				<out id="hour" datatype="core.type.int" />
			</function>
			<function id="gethour12" title="Get Hour (12h)" symbol="exlibs/img/date.png" keywords="hour, get hour">
				<in id="date" datatype="core.type.date" />
				<out id="hour" datatype="core.type.int" />
			</function>
			<function id="getminute" title="Get Minutes" symbol="exlibs/img/date.png" keywords="minutes,get minute">
				<in id="date" datatype="core.type.date" />
				<out id="minutes" datatype="core.type.int" />
			</function>
			<function id="getsecond" title="Get Seconds" symbol="exlibs/img/date.png" keywords="seconds,get seconds">
				<in id="date" datatype="core.type.date" />
				<out id="seconds" datatype="core.type.int" />
			</function>
		</category>
		
		<category id="Date Time/Arithmetic">
			<function id="add" title="DateTime + DateTime" ctor="NodeOp" symbol="exlibs/core/img/op.add.png" keywords="add,+" subtitle="+" color="#555">
				<in id="in1" datatype="core.type.date" />
				<in id="in2" datatype="core.type.date" />
				<out id="out" datatype="core.type.date" />
				<in id="a" datatype="core.type.date" label=" " />
				<in id="b" datatype="core.type.date" label=" " />
				<out id="output" datatype="core.type.date" />
				<out id="add" datatype="special.add" label="Add Item" target="a" tooltip="Add a new value." />
			</function>
			<function id="sub" ctor="NodeOp" symbol="exlibs/core/img/op.sub.png" title="DateTime - DateTime" keywords="sub,-" subtitle="-" color="#555">
				<in id="in1" datatype="core.type.date" />
				<in id="in2" datatype="core.type.date" />
				<out id="out" datatype="core.type.date" />
				<in id="a" datatype="core.type.date" label=" " />
				<in id="b" datatype="core.type.date" label=" " />
				<out id="output" datatype="core.type.date" />
				<out id="add" datatype="special.add" label="Add Item" target="a" tooltip="Add a new value." />
			</function>
			<function id="min" symbol="exlibs/img/function.png" title="Min (DateTime)" color="#aaeea0" keywords="min" tooltip="Return minimum value between a and b">
				<in id="a" datatype="core.type.date" />
				<in id="b" datatype="core.type.date" />
				<out id="return" datatype="core.type.date" />
			</function>
			<function id="max" symbol="exlibs/img/function.png" title="Max (DateTime)" color="#aaeea0" keywords="max" tooltip="Return maximum value between a and b">
				<in id="a" datatype="core.type.date" />
				<in id="b" datatype="core.type.date" />
				<out id="return" datatype="core.type.date" />
			</function>
			<function id="clamp" symbol="exlibs/img/function.png" title="Clamp (DateTime)" color="#aaeea0" keywords="clamp,limit,range" tooltip="Return value clamped between min and max">
				<in id="value" datatype="core.type.date" />
				<in id="min" datatype="core.type.date" />
				<in id="max" datatype="core.type.date" />
				<out id="return" datatype="core.type.date" />
			</function>
			<function id="between" symbol="exlibs/img/function.png" title="Between (DateTime)" color="#aaeea0" tooltip="return True if &quot;value&quot; is between &quot;min&quot; and &quot;max&quot; (included)" keywords="range">
				<in id="value" datatype="core.type.date" />
				<in id="min" datatype="core.type.date" />
				<in id="max" datatype="core.type.date" />
				<out id="out" datatype="core.type.bool" tooltip="True if &quot;value&quot; is between &quot;min&quot; and &quot;max&quot;" />
			</function>
		</category>
		
		<category id="Date Time/Comparators">
			<function id="eq" ctor="NodeOp" symbol="exlibs/core/img/op.eq.png" color="#555" keywords="==,equal" subtitle="==" title="DateTime == DateTime (equal)">			
				<in id="a" datatype="core.type.date" />
				<in id="b" datatype="core.type.date" />
				<out id="output" datatype="core.type.bool" tooltip="True if a = b" />
			</function>
			<function id="neq" ctor="NodeOp" symbol="exlibs/core/img/op.neq.png" color="#555" keywords="!=,<>,not equal,different" subtitle="!=" title="DateTime != DateTime (not equal)">
				<in id="a" datatype="core.type.date" />
				<in id="b" datatype="core.type.date" />
				<out id="output" datatype="core.type.bool" tooltip="True if a != b" />
			</function>
			<function id="lt" ctor="NodeOp" symbol="exlibs/core/img/op.lt.png" color="#555" keywords="<,lower than" subtitle="<" title="DateTime < DateTime (lower than)">
				<in id="a" datatype="core.type.date" />
				<in id="b" datatype="core.type.date" />
				<out id="output" datatype="core.type.bool" tooltip="True if a < b" />
			</function>
			<function id="gt" ctor="NodeOp" symbol="exlibs/core/img/op.gt.png" color="#555" keywords=">,gretter than" subtitle=">" title="DateTime > DateTime (gretter than)">
				<in id="a" datatype="core.type.date" />
				<in id="b" datatype="core.type.date" />
				<out id="output" datatype="core.type.bool" tooltip="True if a > b" />
			</function>
			<function id="lte" ctor="NodeOp" symbol="exlibs/core/img/op.lte.png" color="#555" keywords="<=,lower than or equal" subtitle="<=" title="DateTime <= DateTime (lower than or equal)">
				<in id="a" datatype="core.type.date" />
				<in id="b" datatype="core.type.date" />
				<out id="output" datatype="core.type.bool" tooltip="True if a <= b" />
			</function>
			<function id="gte" ctor="NodeOp" symbol="exlibs/core/img/op.gte.png" color="#555" keywords=">=,=>,gretter than or equal" subtitle=">=" title="DateTime >= DateTime (gretter than or equal)">
				<in id="a" datatype="core.type.date" />
				<in id="b" datatype="core.type.date" />
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
	App.components['libCoreDate'] = exp;
</script>