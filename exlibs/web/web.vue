<template>
	<package id="web.dom">
	
		<datatype name="window" label="HTML Window Element" color="#55f" />
		<datatype name="node" label="HTML Dom Node" color="#55f" inherits="eventTarget" />
		<datatype name="element" label="HTML Dom Element" color="#55f" inherits="node eventTarget core.object" />
		<datatype name="htmlelement" label="HTML Dom Html Element" color="#55f" inherits=" element node eventTarget core.object" />
		<datatype name="document" label="HTML Dom Document" color="#55f" inherits="element node eventTarget core.object" />
		<datatype name="body" label="HTML Body Element" color="#55f" inherits="element node eventTarget core.object" />
		<datatype name="attribute" label="HTML Dom Element Attribute" color="#fff" />
		

		
		<category name="Web/Dom">
		
		
		
		
			<datatype name="DOMstring" label="HTML DOMString" color="#fff" inherits="core.type.string" />
			
			<class name="event">
			
			</class>
			

			<class name="nodeList">
			
			</class>
			


			<interface id="EventTarget" inherits="HTMLObject" label="HTML EventTarget Interface">
				<method name="addEventListener">
					<entry /><exit />
					<in name="name" datatype="core.type.string" />
					<in name="useCapture" datatype="core.type.bool" :optional="true" />
					<in name="once" datatype="core.type.bool" :optional="true" />
					<in name="passive" datatype="core.type.bool" :optional="true" />
					<out name="callback" datatype="core.exec" />
				</method>

				<method name="removeEventListener">
					<entry /><exit />
					<in name="name" datatype="core.type.string" />
					<in name="useCapture" datatype="core.type.bool" :optional="true" />
					<in name="once" datatype="core.type.bool" :optional="true" />
					<in name="passive" datatype="core.type.bool" :optional="true" />			
				</method>

				<method name="dispatchEvent">
					<entry /><exit />
					<in name="event" datatype="event" />
				</method>
			</interface>
			
			
			<enum name="nodeTypeEnum" label="HTML nodeType Enum">
				<value name="ELEMENT_NODE">1</value>
				<value name="ATTRIBUTE_NODE">2</value>
				<value name="TEXT_NODE">3</value>
				<value name="CDATA_SECTION_NODE">4</value>
				<value name="ENTITY_REFERENCE_NODE">5</value>
				<value name="ENTITY_NODE">6</value>
				<value name="PROCESSING_INSTRUCTION_NODE">7</value>
				<value name="COMMENT_NODE">8</value>
				<value name="DOCUMENT_NODE">9</value>
				<value name="DOCUMENT_TYPE_NODE">10</value>
				<value name="DOCUMENT_FRAGMENT_NODE">11</value>
				<value name="NOTATION_NODE">12</value>
			</enum>
			
			<enum name="documentPosition" label="HTML Node position">
				<value name="DOCUMENT_POSITION_DISCONNECTED">1</value>
				<value name="DOCUMENT_POSITION_PRECEDING">2</value>
				<value name="DOCUMENT_POSITION_FOLLOWING">4</value>
				<value name="DOCUMENT_POSITION_CONTAINS">8</value>
				<value name="DOCUMENT_POSITION_CONTAINED_BY">16</value>
				<value name="DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC">32</value>
			</enum>
			
			<interface id="Node" implements="EventTarget" label="HTML Node">
				<member id="baseURI" datatype="DOMstring" />
				<member id="childNodes" datatype="nodeList" />
				<member id="firstChild" datatype="Node" />
				<member id="lastChild" datatype="Node" />
				<member id="nextSibling" datatype="Node" />
				<member id="nodeName" datatype="DOMstring" />
				<member id="nodeType" datatype="nodeTypeEnum" />
				<member id="nodeValue" datatype="DOMstring" />
				<member id="ownerDocument" datatype="document" />
				<member id="parentNode" datatype="Node" />
				<member id="parentElement" datatype="element" />
				<member id="previousSibling" datatype="Node" /> 
				<member id="textContent" datatype="DOMstring" />
					
				<method name="appendChild">
					<entry /><exit />
					<in name="target" datatype="Node" />
					<in name="child" datatype="Node" />
				</method>
				
				<method name="cloneNode">
					<entry /><exit />
					<in name="target" datatype="Node" />
					<in name="deep" datatype="core.type.bool" :optional="true" :default="true" />
					<out name="dupNode" datatype="Node" />
				</method>
				
				<method name="compareDocumentPosition">
					<in name="target" datatype="Node" />
					<out name="position" datatype="documentPosition" />
				</method>			
				
				<method name="contains">
					<in name="target" datatype="Node" />
					<in name="otherNode" datatype="Node" />
					<out name="result" datatype="core.type.bool" />
				</method>
				
				<method name="getRootNode">
					<entry /><exit />
					<in name="target" datatype="Node" />
					<in name="composed" datatype="core.type.bool" :optional="true" />
					<out name="rootNode" datatype="Node" />
				</method>

				<method name="hasChildNodes">
					<in name="target" datatype="Node" />
					<out name="result" datatype="core.type.bool" />
				</method>

				<method name="insertBefore">
					<entry /><exit />
					<in name="target" datatype="Node" />
					<in name="newNode" datatype="Node" />
					<in name="referenceNode" datatype="Node" />
				</method>

				<method name="isDefaultNamespace">
					<in name="target" datatype="Node" />
					<in name="namespaceURI" datatype="core.type.string" />
					<out name="result" datatype="core.type.bool" />
				</method>

				<method name="isEqualNode">
					<in name="target" datatype="Node" />
					<in name="otherNode" datatype="Node" />
					<out name="result" datatype="core.type.bool" />
				</method>

				<method name="isSameNode">
					<in name="target" datatype="Node" />
					<in name="otherNode" datatype="Node" />
					<out name="result" datatype="core.type.bool" />
				</method>

				<method name="lookupPrefix">
					<in name="target" datatype="Node" />
					<out name="result" datatype="DOMstring" />
				</method>

				<method name="normalize">
					<entry /><exit />
					<in name="target" datatype="Node" />
				</method>

				<method name="removeChild">
					<entry /><exit />
					<in name="target" datatype="Node" />
					<in name="child" datatype="Node" />
					<out name="oldChild" datatype="Node" />
				</method>

				<method name="replaceChild">
					<entry /><exit />
					<in name="target" datatype="Node" />
					<in name="newChild" datatype="Node" />
					<in name="oldChild" datatype="Node" />
					<out name="replacedNode" datatype="Node" />
				</method>
			</interface>
			

			<interface id="ParentNode" label="HTML ParentNode Interface">
			
			</interface>
			
			<interface id="HTMLDocument" label="HTML HTMLDocument Interface">
			
			</interface>

			
			<class name="Document" implements="Node ParentNode HTMLDocument" label="HTML Document Interface">
				<member id="doctype" datatype="DocumentType" />
				<member id="documentElement" datatype="element" />
				<member id="documentURI" datatype="core.type.string" />
				<member id="hidden" datatype="core.type.bool" />
				<member id="implementation" datatype="DOMImplementation" />
				<member id="lastStyleSheetSet" datatype="core.type.string" />
				<member id="preferredStyleSheetSet" datatype="core.type.string" />
				<member id="selectedStyleSheetSet" datatype="core.type.string" />
				<member id="styleSheets" datatype="StyleSheetList" />
				<member id="visibilityState" datatype="core.type.string" />
				
				
				
				
				
				
			</class>
			
			<class name="StyleSheetList">
			
			</class>
			
			<structure name="StyleSheet">
			
			</structure>
			
			<class name="DOMImplementation">
			
			</class>

			<class name="documentType" inherits="node">
			
			</class>
			
			<class name="element" inherits="node">
			
			</class>
			
					
		
		
		
		
		
			<function name="getDocument" title="document" color="#aaeea0" symbol="exlibs/img/function.png" keywords="get document,document">
				<out name="document" datatype="document" />
			</function>
			<function name="getBody" title="body" color="#aaeea0" symbol="exlibs/img/function.png" keywords="get body,body">
				<in name="document" datatype="document" />
				<out name="body" datatype="element" />
			</function>
			<function name="isvalid" title="IsValidElement" color="#aaeea0" symbol="exlibs/img/function.png" keywords="nodename" tooltip="Check if the element is a valid Dom Element">
				<in name="element" datatype="element" />
				<out name="valid" datatype="core.type.bool" />
			</function>
			<function name="innerHtml" title="innerHTML" color="#aaeea0" symbol="exlibs/img/function.png">
				<in name="element" datatype="element" />
				<out name="text" datatype="core.type.string" />
			</function>

		</category>
		
		<category name="Web/Dom/Selector">			
			<function name="getelementbyid" title="getElementById()" color="#aaeea0" symbol="exlibs/img/function.png" keywords="get element by id">
				<in name="parent" datatype="element" />
				<in name="id" datatype="core.type.string" />
				<out name="element" datatype="element" />
			</function>
			<function name="getelementsbytagname" title="getElementsByTagName()" color="#aaeea0" symbol="exlibs/img/function.png" keywords="get elements by tag name,tagname">
				<in name="parent" datatype="element" />
				<in name="tagName" datatype="core.type.string" />
				<out name="elements" datatype="element[]" />
			</function>
			<function name="querySelector" title="querySelector()" color="#78c8fe" symbol="exlibs/img/function.png" keywords="query selector,select element">
				<entry /><exit />
				<in name="entry" datatype="core.exec" />
				<in name="parent" datatype="element" />
				<in name="selector" datatype="core.type.string" />
				<out name="element" datatype="element" />
			</function>
			<function name="querySelectorall" title="querySelectorAll()" color="#78c8fe" symbol="exlibs/img/function.png" keywords="query selector,select element">
				<entry /><exit />
				<in name="parent" datatype="element" />
				<in name="selector" datatype="core.type.string" />
				<out name="element" datatype="element[]" />
			</function>
		</category>	
		
		<category name="Web/Dom/Attributes">		
			<function name="nodeName" title="nodeName" color="#aaeea0" symbol="exlibs/img/function.png" keywords="nodename">
				<in name="element" datatype="element" />
				<out name="nodeName" datatype="core.type.string" />
			</function>
			<function name="setattribute" title="setAttribute()" color="#78c8fe" symbol="exlibs/img/function.png" keywords="set attribute">
				<entry /><exit />
				<in name="parent" datatype="element" />
				<in name="attribute" datatype="core.type.string" />
				<in name="value" datatype="core.wildcards" />
			</function>
			<function name="getattribute" title="getAttribute()" color="#aaeea0" symbol="exlibs/img/function.png" keywords="get attribute">
				<entry /><exit />
				<in name="parent" datatype="element" />
				<in name="attribute" datatype="core.type.string" />
				<out name="value" datatype="core.wildcards" />
			</function>
			<function name="attributes" title="attributes" color="#aaeea0" symbol="exlibs/img/function.png" keywords="attributes">
				<in name="parent" datatype="element" />
				<out name="attributes" datatype="core.type.pair[]" />
			</function>
		</category>
		
		<category name="Web/Dom/Elements">
			<function name="createelement" title="createElement()" subtitle="Target is self" color="#aaeea0" symbol="exlibs/img/function.png" keywords="get attribute">
				<in name="target" datatype="document" />
				<in name="tagname" datatype="core.type.string" />
				<in name="is" datatype="core.type.string" :optional="true" />
				<out name="element" datatype="element" />
			</function>
			<function name="appendchild" title="appendChild()" color="#78c8fe" symbol="exlibs/img/function.png" keywords="append child,child append">
				<entry /><exit />
				<in name="parent" datatype="element" />
				<in name="child" datatype="element" label="Child" />
				<out name="add" datatype="special.add" label="Add Child" target="child" tooltip="Add a new Children." />
			</function>
			<function name="appendchildsarray" title="appendChildsArray()" color="#78c8fe" symbol="exlibs/img/function.png" keywords="append childs,childs append">
				<entry /><exit />
				<in name="parent" datatype="element" />
				<in name="childs" datatype="element[]" />
			</function>
			<function name="removechild" title="removeChild()" color="#78c8fe" symbol="exlibs/img/function.png" keywords="remove child">
				<entry /><exit />
				<in name="parent" datatype="element" />
				<in name="element" datatype="element" />
			</function>
			<function name="parentnode" title="parentNode" color="#aaeea0" symbol="exlibs/img/function.png" keywords="parent node">
				<in name="node" datatype="element" />
				<out name="parent" datatype="element" />
			</function>
			<function name="children" title="Get Childrens" color="#aaeea0" symbol="exlibs/img/function.png" keywords="childs,childrens,children">
				<in name="parent" datatype="element" />
				<out name="childs" datatype="element[]" />
			</function>
			<function name="firstChild" title="firstChild" color="#aaeea0" symbol="exlibs/img/function.png" keywords="child,children">
				<in name="parent" datatype="element" />
				<out name="firstChild" datatype="element" />
			</function>
			<function name="lastChild" title="lastChild" color="#aaeea0" symbol="exlibs/img/function.png" keywords="child,children">
				<in name="parent" datatype="element" />
				<out name="lastChild" datatype="element" />
			</function>
		</category>
		
		<category name="Web/Dom/Sibling">
			<function name="nextSibling" title="nextSibling" color="#aaeea0" symbol="exlibs/img/function.png">
				<in name="node" datatype="element" />
				<out name="nextSibling" datatype="element" />
			</function>
			<function name="prevSibling" title="prevSibling" color="#aaeea0" symbol="exlibs/img/function.png">
				<in name="node" datatype="element" />
				<out name="prevSibling" datatype="element" />
			</function>
		</category>
		
		<category name="Web/Dom/Class">
			<function name="addclass" title="Add Class" color="#78c8fe" symbol="exlibs/img/function.png" keywords="class add">
				<entry /><exit />
				<in name="element" datatype="element" />
				<in name="className" datatype="core.type.string" />
			</function>
			<function name="removeclass" title="Remove Class" color="#78c8fe" symbol="exlibs/img/function.png" keywords="class remove">
				<entry /><exit />
				<in name="element" datatype="element" />
				<in name="className" datatype="core.type.string" />
			</function>
			<function name="hasclass" title="Has Class" color="#aaeea0" symbol="exlibs/img/function.png" keywords="class">
				<in name="element" datatype="element" />
				<in name="className" datatype="core.type.string" />
				<out name="hasClass" datatype="core.type.bool" />
			</function>
		</category>	
			
		
		<category name="Web/Dom/Events">
			<datatype name="event" label="Dom Event" color="#fff" />
			<datatype name="mouseevent" label="Dom Mouse Event Dom Event" color="#fff" inherits="event" />
			
			<enum color="#8000FF" inherits="core.type.enum" tooltip="Enum" label="Enum Enum" id="mouseeventenum" values="[&quot;mouseover&quot;,&quot;mousemove&quot;,&quot;mouseleave&quot;,&quot;click&quot;,&quot;wheel&quot;]">
				<editor id="select">
					<value name="mouseenter" />
					<value name="mousemouse" />
					<value name="mouseover" />
				</editor>
			</enum>
			
			<datatype name="keyevent" label="Dom Key Event Dom Event" color="#fff" inherits="event" />
			
			<enum name="keyeventenum" color="#8000FF" inherits="core.type.enum" tooltip="Enum" label="Enum Enum">
				<editor id="select">
					<value name="keyup" />
					<value name="keydown" />
					<value name="keypress" />
				</editor>
			</enum>

			<datatype name="touchevent" label="Dom Mouse Event Dom Event" color="#fff" inherits="event" />
		
			<function name="eventoof" title="Off Event" color="#78c8fe" symbol="exlibs/img/function.png" keywords="event">
				<entry /><exit />
				<in name="element" datatype="element" />
				<in name="capture" datatype="core.type.bool" :optional="true" tooltip="indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree" />
				<in name="once" datatype="core.type.bool" :optional="true" tooltip="indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked." />
				<in name="passive" datatype="core.type.bool" :optional="true" tooltip="if true, indicates that the function specified by listener will never call preventDefault(). If a passive listener does call preventDefault(), the user agent will do nothing other than generate a console warning" />
			</function>
			<function name="onmouseevent" title="On Mouse Event" color="#78c8fe" symbol="exlibs/img/function.png" keywords="event">
				<entry /><exit />
				<in name="element" datatype="element" />
				<in name="eventName" datatype="mouseeventenum" />
				<in name="capture" datatype="core.type.bool" :optional="true" tooltip="indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree" />
				<in name="once" datatype="core.type.bool" :optional="true" tooltip="indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked." />
				<in name="passive" datatype="core.type.bool" :optional="true" tooltip="if true, indicates that the function specified by listener will never call preventDefault(). If a passive listener does call preventDefault(), the user agent will do nothing other than generate a console warning" />
				<out name="Do" datatype="core.exec" tooltip="Action to do when event is triggered." />
				<out name="event" datatype="mouseevent" label="Mouse Event" />
			</function>
			<function name="onkeyevent" title="On Mouse Event" color="#78c8fe" symbol="exlibs/img/function.png" keywords="event">
				<entry /><exit />
				<in name="element" datatype="element" />
				<in name="eventName" datatype="keyeventenum" />
				<in name="capture" datatype="core.type.bool" :optional="true" tooltip="indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree" />
				<in name="once" datatype="core.type.bool" :optional="true" tooltip="indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked." />
				<in name="passive" datatype="core.type.bool" :optional="true" tooltip="if true, indicates that the function specified by listener will never call preventDefault(). If a passive listener does call preventDefault(), the user agent will do nothing other than generate a console warning" />
				<out name="do" datatype="core.exec" tooltip="Action to do when event is triggered." />
				<out name="event" datatype="keyevent" label="Key Event" />
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