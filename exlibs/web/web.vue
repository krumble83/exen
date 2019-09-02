<template>
	<package id="web.dom">
	
		<datatype id="window" label="HTML Window Element" color="#55f" />
		<datatype id="eventTarget" label="HTML Dom EventTarget" color="#55f" />
		<datatype id="node" label="HTML Dom Node" color="#55f" :inherits="['eventTarget']" />
		<datatype id="element" label="HTML Dom Element" color="#55f" :inherits="['node','eventTarget','core.object']" />
		<datatype id="htmlelement" label="HTML Dom Html Element" color="#55f" :inherits="['element','node','eventTarget','core.object']" />
		<datatype id="document" label="HTML Dom Document" color="#55f" :inherits="['element','node,','eventTarget','core.object']" />
		<datatype id="body" label="HTML Body Element" color="#55f" :inherits="['element','node','eventTarget','core.object']" />
		<datatype id="attribute" label="HTML Dom Element Attribute" color="#fff" />
		
		<category id="Web/Dom">
			<function id="getDocument" title="document" color="#aaeea0" symbol="exlibs/img/function.png" keywords="get document,document">
				<out id="document" datatype="document" />
			</function>
			<function id="getBody" title="body" color="#aaeea0" symbol="exlibs/img/function.png" keywords="get body,body">
				<in id="document" datatype="document" />
				<out id="body" datatype="element" />
			</function>
			<function id="isvalid" title="IsValidElement" color="#aaeea0" symbol="exlibs/img/function.png" keywords="nodename" tooltip="Check if the element is a valid Dom Element">
				<in id="element" datatype="element" />
				<out id="valid" datatype="core.type.bool" />
			</function>
			<function id="innerHtml" title="innerHTML" color="#aaeea0" symbol="exlibs/img/function.png">
				<in id="element" datatype="element" />
				<out id="text" datatype="core.type.string" />
			</function>

		</category>
		
		<category id="Web/Dom/Selector">			
			<function id="getelementbyid" title="getElementById()" color="#aaeea0" symbol="exlibs/img/function.png" keywords="get element by id">
				<in id="parent" datatype="element" />
				<in id="id" datatype="core.type.string" />
				<out id="element" datatype="element" />
			</function>
			<function id="getelementsbytagname" title="getElementsByTagName()" color="#aaeea0" symbol="exlibs/img/function.png" keywords="get elements by tag name,tagname">
				<in id="parent" datatype="element" />
				<in id="tagName" datatype="core.type.string" />
				<out id="elements" datatype="element[]" />
			</function>
			<function id="querySelector" title="querySelector()" color="#78c8fe" symbol="exlibs/img/function.png" keywords="query selector,select element">
				<entry /><exit />
				<in id="entry" datatype="core.exec" />
				<in id="parent" datatype="element" />
				<in id="selector" datatype="core.type.string" />
				<out id="element" datatype="element" />
			</function>
			<function id="querySelectorall" title="querySelectorAll()" color="#78c8fe" symbol="exlibs/img/function.png" keywords="query selector,select element">
				<entry /><exit />
				<in id="parent" datatype="element" />
				<in id="selector" datatype="core.type.string" />
				<out id="element" datatype="element[]" />
			</function>
		</category>	
		
		<category id="Web/Dom/Attributes">		
			<function id="nodeName" title="nodeName" color="#aaeea0" symbol="exlibs/img/function.png" keywords="nodename">
				<in id="element" datatype="element" />
				<out id="nodeName" datatype="core.type.string" />
			</function>
			<function id="setattribute" title="setAttribute()" color="#78c8fe" symbol="exlibs/img/function.png" keywords="set attribute">
				<entry /><exit />
				<in id="parent" datatype="element" />
				<in id="attribute" datatype="core.type.string" />
				<in id="value" datatype="core.wildcards" />
			</function>
			<function id="getattribute" title="getAttribute()" color="#aaeea0" symbol="exlibs/img/function.png" keywords="get attribute">
				<entry /><exit />
				<in id="parent" datatype="element" />
				<in id="attribute" datatype="core.type.string" />
				<out id="value" datatype="core.wildcards" />
			</function>
			<function id="attributes" title="attributes" color="#aaeea0" symbol="exlibs/img/function.png" keywords="attributes">
				<in id="parent" datatype="element" />
				<out id="attributes" datatype="core.type.pair[]" />
			</function>
		</category>
		
		<category id="Web/Dom/Elements">
			<function id="createelement" title="createElement()" subtitle="Target is self" color="#aaeea0" symbol="exlibs/img/function.png" keywords="get attribute">
				<in id="target" datatype="document" />
				<in id="tagname" datatype="core.type.string" />
				<in id="is" datatype="core.type.string" :optional="true" />
				<out id="element" datatype="element" />
			</function>
			<function id="appendchild" title="appendChild()" color="#78c8fe" symbol="exlibs/img/function.png" keywords="append child,child append">
				<entry /><exit />
				<in id="parent" datatype="element" />
				<in id="child" datatype="element" label="Child [0]" />
				<out id="add" datatype="special.add" label="Add Child" target="child" tooltip="Add a new Children." />
			</function>
			<function id="appendchildsarray" title="appendChildsArray()" color="#78c8fe" symbol="exlibs/img/function.png" keywords="append childs,childs append">
				<entry /><exit />
				<in id="parent" datatype="element" />
				<in id="childs" datatype="element[]" />
			</function>
			<function id="removechild" title="removeChild()" color="#78c8fe" symbol="exlibs/img/function.png" keywords="remove child">
				<entry /><exit />
				<in id="parent" datatype="element" />
				<in id="element" datatype="element" />
			</function>
			<function id="parentnode" title="parentNode" color="#aaeea0" symbol="exlibs/img/function.png" keywords="parent node">
				<in id="node" datatype="element" />
				<out id="parent" datatype="element" />
			</function>
			<function id="children" title="Get Childrens" color="#aaeea0" symbol="exlibs/img/function.png" keywords="childs,childrens,children">
				<in id="parent" datatype="element" />
				<out id="childs" datatype="element[]" />
			</function>
			<function id="firstChild" title="firstChild" color="#aaeea0" symbol="exlibs/img/function.png" keywords="child,children">
				<in id="parent" datatype="element" />
				<out id="firstChild" datatype="element" />
			</function>
			<function id="lastChild" title="lastChild" color="#aaeea0" symbol="exlibs/img/function.png" keywords="child,children">
				<in id="parent" datatype="element" />
				<out id="lastChild" datatype="element" />
			</function>
		</category>
		
		<category id="Web/Dom/Sibling">
			<function id="nextSibling" title="nextSibling" color="#aaeea0" symbol="exlibs/img/function.png">
				<in id="node" datatype="element" />
				<out id="nextSibling" datatype="element" />
			</function>
			<function id="prevSibling" title="prevSibling" color="#aaeea0" symbol="exlibs/img/function.png">
				<in id="node" datatype="element" />
				<out id="prevSibling" datatype="element" />
			</function>
		</category>
		
		<category id="Web/Dom/Class">
			<function id="addclass" title="Add Class" color="#78c8fe" symbol="exlibs/img/function.png" keywords="class add">
				<entry /><exit />
				<in id="element" datatype="element" />
				<in id="className" datatype="core.type.string" />
			</function>
			<function id="removeclass" title="Remove Class" color="#78c8fe" symbol="exlibs/img/function.png" keywords="class remove">
				<entry /><exit />
				<in id="element" datatype="element" />
				<in id="className" datatype="core.type.string" />
			</function>
			<function id="hasclass" title="Has Class" color="#aaeea0" symbol="exlibs/img/function.png" keywords="class">
				<in id="element" datatype="element" />
				<in id="className" datatype="core.type.string" />
				<out id="hasClass" datatype="core.type.bool" />
			</function>
		</category>	
			
		
		<category id="Web/Dom/Events">
			<datatype id="event" label="Dom Event" color="#fff" />
			<datatype id="mouseevent" label="Dom Mouse Event Dom Event" color="#fff" :inherits="['web.dom.event']" />
			
			<enum color="#8000FF" :inherits="['core.type.enum']" tooltip="Enum" label="Enum Enum" id="mouseeventenum" values="[&quot;mouseover&quot;,&quot;mousemove&quot;,&quot;mouseleave&quot;,&quot;click&quot;,&quot;wheel&quot;]">
				<editor id="select">
					<value id="mouseenter" />
					<value id="mousemouse" />
					<value id="mouseover" />
				</editor>
			</enum>
			
			<datatype id="keyevent" label="Dom Key Event Dom Event" color="#fff" :inherits="['web.dom.event']" />
			
			<enum id="keyeventenum" color="#8000FF" :inherits="['core.type.enum']" tooltip="Enum" label="Enum Enum">
				<editor id="select">
					<value id="keyup" />
					<value id="keydown" />
					<value id="keypress" />
				</editor>
			</enum>

			<datatype id="touchevent" label="Dom Mouse Event Dom Event" color="#fff" :inherits="['web.dom.event']" />
		
			<function id="eventoof" title="Off Event" color="#78c8fe" symbol="exlibs/img/function.png" keywords="event">
				<entry /><exit />
				<in id="element" datatype="element" />
				<in id="capture" datatype="core.type.bool" :optional="true" tooltip="indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree" />
				<in id="once" datatype="core.type.bool" :optional="true" tooltip="indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked." />
				<in id="passive" datatype="core.type.bool" :optional="true" tooltip="if true, indicates that the function specified by listener will never call preventDefault(). If a passive listener does call preventDefault(), the user agent will do nothing other than generate a console warning" />
			</function>
			<function id="onmouseevent" title="On Mouse Event" color="#78c8fe" symbol="exlibs/img/function.png" keywords="event">
				<entry /><exit />
				<in id="element" datatype="element" />
				<in id="eventName" datatype="mouseeventenum" />
				<in id="capture" datatype="core.type.bool" :optional="true" tooltip="indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree" />
				<in id="once" datatype="core.type.bool" :optional="true" tooltip="indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked." />
				<in id="passive" datatype="core.type.bool" :optional="true" tooltip="if true, indicates that the function specified by listener will never call preventDefault(). If a passive listener does call preventDefault(), the user agent will do nothing other than generate a console warning" />
				<out id="Do" datatype="core.exec" tooltip="Action to do when event is triggered." />
				<out id="event" datatype="mouseevent" label="Mouse Event" />
			</function>
			<function id="onkeyevent" title="On Mouse Event" color="#78c8fe" symbol="exlibs/img/function.png" keywords="event">
				<entry /><exit />
				<in id="element" datatype="element" />
				<in id="eventName" datatype="keyeventenum" />
				<in id="capture" datatype="core.type.bool" :optional="true" tooltip="indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree" />
				<in id="once" datatype="core.type.bool" :optional="true" tooltip="indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked." />
				<in id="passive" datatype="core.type.bool" :optional="true" tooltip="if true, indicates that the function specified by listener will never call preventDefault(). If a passive listener does call preventDefault(), the user agent will do nothing other than generate a console warning" />
				<out id="do" datatype="core.exec" tooltip="Action to do when event is triggered." />
				<out id="event" datatype="keyevent" label="Key Event" />
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
	App.components['libWeb'] = exp;
</script>