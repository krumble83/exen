<template>
	<package id="core.date">
		<category name="Date Time">
			<function name="make" title="Make DateTime Structure" symbol="exlibs/core/img/make.png" keywords="make date time datetime" color="#00f">
				<in name="date-year" datatype="core.type.int" label="Year" />
				<in name="date-month" datatype="core.type.int" label="Month" />
				<in name="date-day" datatype="core.type.int" label="Day" />
				<in name="date-hour" datatype="core.type.int" label="Hour" />
				<in name="date-minutes" datatype="core.type.int" label="Minute" />
				<in name="date-seconds" datatype="core.type.int" label="Seconds" />
				<out name="out" datatype="core.type.date" label="DateTime Structure" />
			</function>
			<function name="break" title="Break DateTime Structure" symbol="exlibs/core/img/break.png" keywords="break date time datetime" color="#00f">
				<in name="in" datatype="core.type.date" label="DateTime Structure" />
				<out name="date-year" datatype="core.type.int" label="Year" />
				<out name="date-month" datatype="core.type.int" label="Month" />
				<out name="date-day" datatype="core.type.int" label="Day" />
				<out name="date-hour" datatype="core.type.int" label="Hour" />
				<out name="date-minutes" datatype="core.type.int" label="Minute" />
				<out name="date-seconds" datatype="core.type.int" label="Seconds" />
			</function>
			<function name="now" title="Now" symbol="exlibs/img/date.png" keywords="date time">
				<out name="now" datatype="core.type.date" />
			</function>
			<function name="getyear" title="Get Year" symbol="exlibs/img/date.png" keywords="year date">
				<in name="date" datatype="core.type.date" />
				<out name="year" datatype="core.type.int" />
			</function>
			<function name="getmonth" title="Get Month" symbol="exlibs/img/date.png" keywords="month date">
				<in name="date" datatype="core.type.date" />
				<out name="month" datatype="core.type.int" />
			</function>
			<function name="getday" title="Get Day" symbol="exlibs/img/date.png" keywords="day date">
				<in name="date" datatype="core.type.date" />
				<out name="day" datatype="core.type.int" />
			</function>
			<function name="gethour" title="Get Hour (24h)" symbol="exlibs/img/date.png" keywords="hour time">
				<in name="date" datatype="core.type.date" />
				<out name="hour" datatype="core.type.int" />
			</function>
			<function name="gethour12" title="Get Hour (12h)" symbol="exlibs/img/date.png" keywords="hour time">
				<in name="date" datatype="core.type.date" />
				<out name="hour" datatype="core.type.int" />
			</function>
			<function name="getminute" title="Get Minutes" symbol="exlibs/img/date.png" keywords="minutes min time">
				<in name="date" datatype="core.type.date" />
				<out name="minutes" datatype="core.type.int" />
			</function>
			<function name="getsecond" title="Get Seconds" symbol="exlibs/img/date.png" keywords="seconds time">
				<in name="date" datatype="core.type.date" />
				<out name="seconds" datatype="core.type.int" />
			</function>
		</category>
		
		<category name="Date Time/Arithmetic">
			<function name="add" title="DateTime + DateTime" ctor="NodeOp" symbol="exlibs/core/img/op.add.png" keywords="date add +" subtitle="+" color="#555">
				<in name="in1" datatype="core.type.date" />
				<in name="in2" datatype="core.type.date" />
				<out name="out" datatype="core.type.date" />
				<in name="a" datatype="core.type.date" label=" " />
				<in name="b" datatype="core.type.date" label=" " />
				<out name="output" datatype="core.type.date" />
				<out name="add" datatype="special.add" label="Add Item" target="a" tooltip="Add a new value." />
			</function>
			<function name="sub" ctor="NodeOp" symbol="exlibs/core/img/op.sub.png" title="DateTime - DateTime" keywords="date sub -" subtitle="-" color="#555">
				<in name="in1" datatype="core.type.date" />
				<in name="in2" datatype="core.type.date" />
				<out name="out" datatype="core.type.date" />
				<in name="a" datatype="core.type.date" label=" " />
				<in name="b" datatype="core.type.date" label=" " />
				<out name="output" datatype="core.type.date" />
				<out name="add" datatype="special.add" label="Add Item" target="a" tooltip="Add a new value." />
			</function>
			<function name="min" symbol="exlibs/img/function.png" title="Min (DateTime)" color="#aaeea0" keywords="date min" tooltip="Return minimum value between a and b">
				<in name="a" datatype="core.type.date" />
				<in name="b" datatype="core.type.date" />
				<out name="return" datatype="core.type.date" />
			</function>
			<function name="max" symbol="exlibs/img/function.png" title="Max (DateTime)" color="#aaeea0" keywords="date max" tooltip="Return maximum value between a and b">
				<in name="a" datatype="core.type.date" />
				<in name="b" datatype="core.type.date" />
				<out name="return" datatype="core.type.date" />
			</function>
			<function name="clamp" symbol="exlibs/img/function.png" title="Clamp (DateTime)" color="#aaeea0" keywords="date clamp limit range" tooltip="Return value clamped between min and max">
				<in name="value" datatype="core.type.date" />
				<in name="min" datatype="core.type.date" />
				<in name="max" datatype="core.type.date" />
				<out name="return" datatype="core.type.date" />
			</function>
			<function name="between" symbol="exlibs/img/function.png" title="Between (DateTime)" color="#aaeea0" tooltip="return True if &quot;value&quot; is between &quot;min&quot; and &quot;max&quot; (included)" keywords="date range">
				<in name="value" datatype="core.type.date" />
				<in name="min" datatype="core.type.date" />
				<in name="max" datatype="core.type.date" />
				<out name="out" datatype="core.type.bool" tooltip="True if &quot;value&quot; is between &quot;min&quot; and &quot;max&quot;" />
			</function>
		</category>
		
		<category name="Date Time/Comparators">
			<function name="eq" ctor="NodeOp" symbol="exlibs/core/img/op.eq.png" color="#555" keywords="date == equal" subtitle="==" title="DateTime == DateTime (equal)">			
				<in name="a" datatype="core.type.date" />
				<in name="b" datatype="core.type.date" />
				<out name="output" datatype="core.type.bool" tooltip="True if a = b" />
			</function>
			<function name="neq" ctor="NodeOp" symbol="exlibs/core/img/op.neq.png" color="#555" keywords="date != <> not equal different" subtitle="!=" title="DateTime != DateTime (not equal)">
				<in name="a" datatype="core.type.date" />
				<in name="b" datatype="core.type.date" />
				<out name="output" datatype="core.type.bool" tooltip="True if a != b" />
			</function>
			<function name="lt" ctor="NodeOp" symbol="exlibs/core/img/op.lt.png" color="#555" keywords="date < lower" subtitle="<" title="DateTime < DateTime (lower than)">
				<in name="a" datatype="core.type.date" />
				<in name="b" datatype="core.type.date" />
				<out name="output" datatype="core.type.bool" tooltip="True if a < b" />
			</function>
			<function name="gt" ctor="NodeOp" symbol="exlibs/core/img/op.gt.png" color="#555" keywords="date > gretter" subtitle=">" title="DateTime > DateTime (gretter than)">
				<in name="a" datatype="core.type.date" />
				<in name="b" datatype="core.type.date" />
				<out name="output" datatype="core.type.bool" tooltip="True if a > b" />
			</function>
			<function name="lte" ctor="NodeOp" symbol="exlibs/core/img/op.lte.png" color="#555" keywords="date <= lower equal" subtitle="<=" title="DateTime <= DateTime (lower than or equal)">
				<in name="a" datatype="core.type.date" />
				<in name="b" datatype="core.type.date" />
				<out name="output" datatype="core.type.bool" tooltip="True if a <= b" />
			</function>
			<function name="gte" ctor="NodeOp" symbol="exlibs/core/img/op.gte.png" color="#555" keywords="date >= gretter equal" subtitle=">=" title="DateTime >= DateTime (gretter than or equal)">
				<in name="a" datatype="core.type.date" />
				<in name="b" datatype="core.type.date" />
				<out name="output" datatype="core.type.bool" tooltip="True if a >= b" />
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