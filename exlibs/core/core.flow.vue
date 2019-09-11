<template>
    <package id="core.flow">
		<category id="Utilities/Flow Control">
			<function name="if" title="If (Condition)" color="#C3C3C3" keywords="if,branch,condition" symbol="exlibs/core/img/if.png">
				<entry />
				<in id="condition" datatype="core.type.bool" />
				<out id="then" datatype="core.exec" />
				<out id="else" datatype="core.exec" />
			</function>
			<function name="forloop" title="ForLoop" color="#C3C3C3" symbol="exlibs/core/img/forloop.png" keywords="for,loop" pos="500,360">
				<entry />
				<in id="startIndex" datatype="core.type.int" />
				<in id="endIndex" datatype="core.type.int" label="End Index" />
				<in id="breakLoop" datatype="core.exec" />
				<out id="loopBody" datatype="core.exec" />
				<out id="index" datatype="core.type.int" tooltip="Current loop Index" />
				<out id="completed" datatype="core.exec" />
			</function>
			<function name="flipflop" title="FlipFlop" color="#C3C3C3" keywords="flipflop" tooltip="Alternate between A and B" symbol="exlibs/core/img/flipflop.png">
				<entry />
				<out id="a" datatype="core.exec" />
				<out id="b" datatype="core.exec" />
				<out id="isA" datatype="core.type.bool" />
			</function>
			<function name="doonce" title="DoOnce" color="#C3C3C3" keywords="do once,one time" symbol="exlibs/core/img/doonce.png">
				<entry />
				<in id="reset" datatype="core.exec" />
				<in id="startClosed" datatype="core.type.bool" />
				<out id="completed" datatype="core.exec" />
			</function>
			<function name="while" title="While" color="#C3C3C3" keywords="while,loop,as long as" symbol="exlibs/core/img/while.png">
				<entry />
				<in id="condition" datatype="core.type.bool" />
				<out id="loop" datatype="core.exec" label="Do while" />
				<out id="completed" datatype="core.exec" />
			</function>
			<function name="sequence" title="Sequence" color="#C3C3C3" symbol="exlibs/core/img/sequence.png" keywords="sequence,then" tooltip="Execute a serie of pins in order. Click the Add pin button to add a new sequence">
				<entry />
				<out id="then" datatype="core.exec" label="Then" group="1" />
				<out id="add" datatype="special.add" label="Add pin" target="then" tooltip="Add a new action to the sequence." />
			</function>
			<function name="switch" title="Switch on Int" color="#C3C3C3" keywords="switch">
				<entry />
				<in id="selection" datatype="core.type.int" />
				<out id="default" datatype="core.exec" />
				<out id="out" datatype="core.exec" label="value" />
				<out id="add" datatype="special.add" label="Add" target="out" />
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
	App.components['libCoreFlow'] = exp;
</script>