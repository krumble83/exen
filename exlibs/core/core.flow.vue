<template>
    <package id="core.flow">
		<category id="Utilities/Flow Control">
			<function id="if" title="If (Condition)" color="#C3C3C3" keywords="if,branch,condition" symbol="exlibs/core/img/if.png">
				<input id="entry" type="core.exec"></input>
				<input id="condition" type="core.type.bool"></input>
				<output id="then" type="core.exec"></output>
				<output id="else" type="core.exec"></output>
			</function>
			<function id="forloop" title="ForLoop" color="#C3C3C3" symbol="exlibs/core/img/forloop.png" keywords="for,loop" pos="500,360">
				<input id="entry" type="core.exec"></input>
				<input id="startIndex" type="core.type.int"></input>
				<input id="endIndex" type="core.type.int" label="End Index"></input>
				<input id="breakLoop" type="core.exec"></input>
				<output id="loopBody" type="core.exec"></output>
				<output id="index" type="core.type.int" tooltip="Current loop Index"></output>
				<output id="completed" type="core.exec"></output>
			</function>
			<function id="flipflop" title="FlipFlop" color="#C3C3C3" keywords="flipflop" tooltip="Alternate between A and B" symbol="exlibs/core/img/flipflop.png">
				<input id="entry" type="core.exec"></input>
				<output id="a" type="core.exec"></output>
				<output id="b" type="core.exec"></output>
				<output id="isA" type="core.type.bool"></output>
			</function>
			<function id="doonce" title="DoOnce" color="#C3C3C3" keywords="do once,one time" symbol="exlibs/core/img/doonce.png">
				<input id="entry" type="core.exec"></input>
				<input id="reset" type="core.exec"></input>
				<input id="startClosed" type="core.type.bool"></input>
				<output id="completed" type="core.exec"></output>
			</function>
			<function id="while" title="While" color="#C3C3C3" keywords="while,loop,as long as" symbol="exlibs/core/img/while.png">
				<input id="entry" type="core.exec"></input>
				<input id="condition" type="core.type.bool"></input>
				<output id="loop" type="core.exec" label="Do while"></output>
				<output id="completed" type="core.exec"></output>
			</function>
			<function id="sequence" title="Sequence" color="#C3C3C3" symbol="exlibs/core/img/sequence.png" keywords="sequence,then" tooltip="Execute a serie of pins in order. Click the Add pin button to add a new sequence" pos="300,200">
				<input id="entry" type="core.exec"></input>
				<output id="then" type="core.exec" label="Then [0]" group="1"></output>
				<output id="add" type="special.add" label="Add pin" target="then" tooltip="Add a new action to the sequence."></output>
			</function>
			<function id="selectBool" title="Select (Bool)" color="#C3C3C3" keywords="select bool" symbol="exlibs/core/img/select.png">
				<input id="a" type="core.wildcards" group="1"></input>
				<input id="b" type="core.wildcards" group="1"></input>
				<input id="pickA" type="core.type.bool"></input>
				<output id="returnValue" type="core.wildcards" group="1"></output>
			</function>
			<function id="switch" title="Switch on Int" color="#C3C3C3" keywords="switch">
				<input id="entry" type="core.exec"></input>
				<input id="selection" type="core.type.int"></input>
				<output id="default" type="core.exec"></output>
				<output id="out" type="core.exec" label="value 0"></output>
				<output id="add" type="special.add" label="Add" target="out"></output>
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