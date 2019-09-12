<template>
	<package id="core.array">
		<category name="Utilities/Array">
			<function name="make" title="Make Array" color="#C3C3C3" symbol="exlibs/img/array.png" keywords="array create,create array,makearray,arraymake">
				<in name="item" datatype="core.wildcards" label="Item" group="1" />
				<out name="array" datatype="core.wildcards[]" group="1" />
				<out name="add" datatype="special.add" label="Add Item" target="item" tooltip="Add a new Item to Array." />
			</function>
			<function name="get" title="Get array item" color="#C3C3C3" symbol="exlibs/img/array.png" keywords="array get,get array,get item,arrayget">
				<in name="array" datatype="core.wildcards[]" group="1" tooltip="The array to get the item from" />
				<in name="index" datatype="core.type.int" tooltip="The index in the array to get the item from" />
				<out name="item" datatype="core.wildcards" group="1" />
			</function>
			<function name="last" title="Get last item" color="#C3C3C3" symbol="exlibs/img/array.png" keywords="array last,get last">
				<in name="array" datatype="core.wildcards[]" group="1" tooltip="The array to get the item from" />
				<out name="item" datatype="core.wildcards" group="1" />
			</function>
			<function name="set" title="Set Array Item" color="#C3C3C3" symbol="exlibs/img/array.png" keywords="array set item,set item array,item set array">
				<entry /><exit />
				<in name="array" datatype="core.wildcards[]" group="1" :flags="4194304" tooltip="The array to perform the operation on" />
				<in name="index" datatype="core.type.int" tooltip="The index to assign the item to" />
				<in name="item" datatype="core.wildcards" group="1" tooltip="The item to assign to the index of the array." />
				<in name="sizetoFit" datatype="core.type.bool" tooltip="If true, the array will expend if index gretter than the current size of the array." :optional="true" />
			</function>
			<function name="add" title="Add Array Item" color="#C3C3C3" symbol="exlibs/img/array.png" keywords="array add item,add item array,item append array,append array item, array append">
				<entry /><exit />
				<in name="array" datatype="core.wildcards[]" group="1" tooltip="The array to perform the operation on" />
				<in name="item" datatype="core.wildcards" group="1" tooltip="The item to assign to the index of the array." />
				<out name="index" datatype="core.type.int" tooltip="The Array index of the newly inserted item." />
			</function>
			<function name="each" title="For Each Array Item" color="#C3C3C3" symbol="exlibs/img/array.png" keywords="foreach,array each,each array,each item,eachitem">
				<entry />
				<in name="array" datatype="core.wildcards[]" group="1" />
				<in name="break" datatype="core.exec" />
				<out name="loopBody" datatype="core.exec" />
				<out name="itemIndex" datatype="core.type.int" />
				<out name="arrayItem" datatype="core.wildcards" group="1" />
				<out name="complete" datatype="core.exec" />
			</function>
			<function name="length" title="Array Length" ctor="NodeOp" color="#C3C3C3" symbol="exlibs/img/array.png" keywords="array length,array size,length,size">
				<in name="array" datatype="core.wildcards[]" label=" " />
				<out name="size" datatype="core.type.int" label=" " />
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
	App.components['libCoreArray'] = exp;
</script>