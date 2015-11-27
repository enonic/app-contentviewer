function getDocument(script) {
    return script ? script.ownerDocument : document;
}

function getCurrentScript() {
    var script = window.HTMLImports ? window.HTMLImports.currentScript : undefined;

    if (!script && !!document.currentScript) {
        script = document.currentScript.__importElement || document.currentScript;
    }

    return script;
}

var gaScript = getCurrentScript();
var gaDocument = getDocument(gaScript);
var uid = gaDocument.baseURI.split('?uid=')[1];

function fireReadyEvent() {
    //debugger;
    if (!uid) {
        return;
    }
    var event = new CustomEvent("importready" + uid, {
        detail: gaDocument.getElementById('aaa')
    });

    document.dispatchEvent(event);
}

fireReadyEvent();