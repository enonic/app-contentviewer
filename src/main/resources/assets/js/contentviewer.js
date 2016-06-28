(function (global) {

    var cvDocument = cv_getDocument();
    var uid = cvDocument.baseURI.split('?uid=')[1];
    if (uid.indexOf('&') > -1) {
        uid = uid.split('&')[0];
    }

    new Clipboard('.xp-contentviewer-copy.draft', {
        text: function () {
            var container = getContainer('xpcontentviewerid');
            var tooltip = container.querySelector(".xpcontentviewer-tooltip.draft");
            tooltip.style.display = 'block';
            setTimeout(function () {
                tooltip.style.display = 'none';
            }, 1500);
            return container.querySelector(".xpcontentviewer-content.draft").textContent.trim();
        }
    });
    new Clipboard('.xp-contentviewer-copy.master', {
        text: function () {
            var container = getContainer('xpcontentviewerid');
            var tooltip = container.querySelector(".xpcontentviewer-tooltip.master");
            tooltip.style.display = 'block';
            setTimeout(function () {
                tooltip.style.display = 'none';
            }, 1500);
            return container.querySelector(".xpcontentviewer-content.master").textContent.trim();
        }
    });

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