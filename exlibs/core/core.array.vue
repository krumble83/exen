<template>
	<package id="core.array">
		<category id="Utilities/Array">
			<function id="get" title="Get array item" color="#C3C3C3" symbol="exlibs/img/array.png" keywords="array get,get array,get item,arrayget">
				<in id="array" datatype="core.wildcards[]" group="1" tooltip="The array to get the item from" />
				<in id="index" datatype="core.type.int" tooltip="The index in the array to get the item from" />
				<out id="item" datatype="core.wildcards" group="1" />
			</function>
			<function id="last" title="Get last item" color="#C3C3C3" symbol="exlibs/img/array.png" keywords="array last,get last">
				<in id="array" datatype="core.wildcards[]" group="1" tooltip="The array to get the item from" />
				<out id="item" datatype="core.wildcards" group="1" />
			</function>
			<function id="set" title="Set Array Item" color="#C3C3C3" symbol="exlibs/img/array.png" keywords="array set item,set item array,item set array">
				<entry /><exit />
				<in id="entry" datatype="core.exec" />
				<in id="array" datatype="core.wildcards[]" group="1" flags="4194304" tooltip="The array to perform the operation on" />
				<in id="index" datatype="core.type.int" tooltip="The index to assign the item to" />
				<in id="item" datatype="core.wildcards" group="1" tooltip="The item to assign to the index of the array." />
				<in id="sizetoFit" datatype="core.type.bool" tooltip="If true, the array will expend if index gretter than the current size of the array." :optional="true" />
			</function>
			<function id="add" title="Add Array Item" color="#C3C3C3" symbol="exlibs/img/array.png" keywords="array add item,add item array,item append array,append array item, array append">
				<entry /><exit />
				<in id="entry" datatype="core.exec" />
				<in id="array" datatype="core.wildcards[]" group="1" tooltip="The array to perform the operation on" />
				<in id="item" datatype="core.wildcards" group="1" tooltip="The item to assign to the index of the array." />
				<out id="index" datatype="core.type.int" tooltip="The Array index of the newly inserted item." />
			</function>
			<function id="make" title="Make Array" color="#C3C3C3" symbol="exlibs/img/array.png" keywords="array create,create array,makearray,arraymake">
				<in id="item" datatype="core.wildcards" label="Item [0]" group="1" />
				<out id="array" datatype="core.wildcards[]" group="1" />
				<out id="add" datatype="special.add" label="Add Item" target="item" tooltip="Add a new Item to Array." />
			</function>
			<function id="each" title="For Each Array Item" color="#C3C3C3" symbol="exlibs/img/array.png" keywords="foreach,array each,each array,each item,eachitem">
				<entry />
				<in id="array" datatype="core.wildcards[]" group="1" />
				<in id="break" datatype="core.exec" />
				<out id="loopBody" datatype="core.exec" />
				<out id="itemIndex" datatype="core.type.int" />
				<out id="arrayItem" datatype="core.wildcards" group="1" />
				<out id="complete" datatype="core.exec" />
			</function>
			<function id="length" title="Array Length" ctor="NodeOp" color="#C3C3C3" symbol="exlibs/img/array.png" keywords="array length,array size,length,size">
				<in id="array" datatype="core.wildcards[]" label=" " />
				<out id="size" datatype="core.type.int" label=" " />
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