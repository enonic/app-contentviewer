(function () {

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

    var dvScript = getCurrentScript();
    var cvDocument = getDocument(dvScript);
    var uid = cvDocument.baseURI.split('?uid=')[1];

    function branchToggle(branch) {
        var divs = getContainer('xpcontentviewerid').getElementsByTagName('div');
        [].forEach.call(divs, function (el) {
            el.style.display = el.className !== branch ? 'block' : 'none';
        });
        return false;
    }

    function getContainer(containerId) {
        containerId = containerId + '_' + uid;
        return document.getElementById(containerId) || cvDocument.getElementById(containerId);
    }

}());