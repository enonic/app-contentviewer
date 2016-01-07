function cv_getCurrentScript() {
    var script = window.HTMLImports ? window.HTMLImports.currentScript : undefined;

    if (!script && !!document.currentScript) {
        script = document.currentScript.__importElement || document.currentScript;
    }

    return script;
}

function cv_getDocument(script) {
    return script ? script.ownerDocument : document;
}

var dvScript = cv_getCurrentScript();
var cvDocument = cv_getDocument(dvScript);
var uid = cvDocument.baseURI.split('?uid=')[1];

function cv_branchToggle(branch) {
    var containerId = 'xpcontentviewerid_' + uid,
        container = document.getElementById(containerId) || cvDocument.getElementById(containerId),
        otherBranch = (branch == "master" ? "draft" : "master");

    if (container.querySelector("#" + branch).style.display == "none") {
        container.querySelector("#" + branch).style.display = "block";
        container.querySelector("#tab_" + branch).classList.toggle("selected");

        container.querySelector("#" + otherBranch).style.display = "none";
        container.querySelector("#tab_" + otherBranch).classList.toggle("selected");
    }

    return false;
}
