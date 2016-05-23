(function (global) {

    var cvDocument = cv_getDocument();
    var uid = cvDocument.baseURI.split('?uid=')[1];

    global.ContentViewer = {

        cv_branchToggle: function (branch) {
            var container = getContainer('xpcontentviewerid'),
                otherBranch = (branch == "master" ? "draft" : "master");

            if (container.querySelector("#" + branch).style.display == "none") {
                container.querySelector("#" + branch).style.display = "block";
                container.querySelector("#tab_" + branch).classList.toggle("selected");

                container.querySelector("#" + otherBranch).style.display = "none";
                container.querySelector("#tab_" + otherBranch).classList.toggle("selected");
            }

            return false;
        }
    };

    function cv_getDocument() {
        var script = window.HTMLImports ? window.HTMLImports.currentScript : undefined;

        if (!script && !!document.currentScript) {
            script = document.currentScript.__importElement || document.currentScript;
        }

        return script ? script.ownerDocument : document;
    }

    function getContainer(containerId) {
        containerId = containerId + "_" + uid;
        return document.getElementById(containerId) || cvDocument.getElementById(containerId);
    }

}(window));