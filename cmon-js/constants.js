const F_NO_RENAME = 1;
const F_NO_DELETE = 2;
const F_NO_EDIT = 4;
const F_LOCK_INPUTS = 8;
const F_LOCK_OUTPUTS = 16;
const F_LOCK_IO = 24;
const F_READ_ONLY = 31;

const F_NO_CUT = 32;
const F_NO_COPY = 64;
const F_NO_PASTE = 128;
const F_NO_CLIPBOARD = 224;

const F_CLOSABLE = 256;
const F_DRAGGABLE = 512;
const F_CHECKED = 1024;

const F_GRAPH = 2048;
const F_FUNCTION = 4096;
const F_VARIABLE = 0x2000;
const F_PVARIABLE = 0x4000;
const F_MACRO = 0x8000;
const F_COMPONENT = 0xFFFF;

const F_IS_NODE = 0x20000;

const F_INPUT = 0x40000;
const F_OUTPUT = 0x80000;
const F_IO = 0x100000;

const F_FOCUSABLE = 0x200000;

const F_REQUIRED = 0x400000;


const C_FILE_NAME_PATTERN = C_FUNCTION_NAME_PATTERN = C_VARIABLE_NAME_PATTERN = ['[a-zA-Z_$]{1,}[0-9a-zA-Z_$]*', 'Invalid format: must start with letter and contains only alphanum'];



;(function(ctx){

if(ctx.define)
	return;

function def(obj, name, value){
	Object.defineProperty(obj, name, {
			enumerable: true,
			configurable: false,
			writable: false,
			value: value
	});
}
def(ctx, 'define', def);


})(window);