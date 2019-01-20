
var id = 100;

export function genUid(prefix){
	prefix = prefix || 'uid';
	while(document.querySelector('#' + prefix + id))
		id++;
	return prefix + id++;
}

export function nl2br (str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
