function getCurrentScript() {
    var script = window.HTMLImports ? window.HTMLImports.currentScript : undefined;

    if (!script && !!document.currentScript) {
        script = document.currentScript.__importElement || document.currentScript;
    }

    return script;
}

function getDocument(script) {
    return script ? script.ownerDocument : document;
}

var cvScript = getCurrentScript();
var cvDocument = getDocument(cvScript);
var uid = cvDocument.baseURI.split('?uid=')[1];

function fireReadyEvent() {
    if (!uid) {
        return;
    }
    var event = new CustomEvent("importready" + uid, {
        detail: cvDocument.getElementById('aaa')
    });

    document.dispatchEvent(event);
}

fireReadyEvent();