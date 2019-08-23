<template>
	<div>Project
		<library>
			<package id="core">
				<datatype id="exec" :private="true" color="#fff" />
			</package>
			<package id="python.requests" :catagories="['Python/Requests']" color="#87663f" symbol="exlibs/python/requests.png" :childs="childss">
				<class id="RequestsCookieJar" label="Python Requests RequestsCookieJar" :_import="[]">
					<method id="get" label="Get Cookie">
						<output id="name" datatype="core.type.string" />
					</method>
					<method id="set" label="Set Cookie">
						<entry /><exit />
						<input id="name" datatype="core.type.string" />
						<input id="value" datatype="core.exec" />
					</method>
				</class>
				<class id="response" label="Python Requests Response">
					<member name="encoding" datatype="core.type.string" label="Response Encoding" />
					<member name="url" datatype="core.type.string" label="Response Url" />
					<member name="elapsed" datatype="core.type.int" label="Response Elapsed Time" />

					<member name="text" datatype="core.type.string" label="Response Text" />
					<member name="content" datatype="core.type.byte" label="Response Content" :array="true" />
					<member name="json" datatype="json.jsonobject" label="Response JSON" />
					<member name="status_code" datatype="core.type.int" label="Response status_code" />
					<member name="headers" datatype="python.type.stringpair" label="Response Headers" :array="true" />
					<member name="cookies" datatype="RequestsCookieJar" label="Response Cookies" />
					<member name="history" datatype="python.requests.response" label="Response History" :array="true" />
				</class>
				<datatype id="zozo" color="#456" :import="['RequestsCookieJar']" />
				<enum id="enum">
					<value name="kiki" />
				</enum>
				<function id="okay" />
			</package>
		</library>
	</div>
</template>

<script>
	import './blueprint.vue';

	//import * as name from '../testlib.js';
	import {Library,Package,Datatype,Class,Function,Input,Output,Method,Entry,Exit} from '../testlib.js';
	console.log('-->', name);

	import App from './app.vue';
		
	App.mixins.push({
		provide: function(){
			const me = this;
			return {
				$project: function(){return me},
			}
		},
		
		methods: {
			getProject: function(){
				return;
			},
			
			createProject: function(){
				//this.addComponent({name: 'Project', type:'project'});
				var bb;
				this.addBlueprint(null, function(bp){
					//console.log(bp);
					bp.addGraph({}, false);
					bp.addGraph({}, false);
					bp.addGraph({}, false);
					bp.addGraph({}, false);
					bp.addFunction({name: 'setup', flags: 0}, false);
					bp.addFunction({name: 'loop', flags: F_LOCK_INPUTS}, false);
					bb = bp
					//console.log(ok);
				});
				this.addBlueprint(null, function(){
					setTimeout(function(){
						bb.$parent.select();
					}, 100);
				});
				
			},
			
			addComponent: function(data, callback){
				console.assert(data.type);
				this.$store.commit('addComponent', data);
				//this.$store.state.tabs.push(data)
			},

			getComponent: function(name){
				//console.log('=>', this.$store.getters);
				return this.$store.getters.getComponent(name);
			}
		}
	});


	const Project = {
		components: {Library,Package,Datatype,Class,Function,Input,Output,Method,Entry,Exit},
		
		data: function(){
			return {
				childss: [
					{
						_ctor: 'datatype',
						id: 'zezette',
					}
				],
			}
		},
		
		provide: {
			getProject: function(){
				return this;
			}
		},
		
		mounted: function(){

		},
	}


	import {module} from '../store/modules/store.blueprint.js'
	App.store.registerModule('blueprint', module);

	import tab from './tabs.tab.vue';
	tab.components.Project = Project;
	
	export default Project;
	
</script>