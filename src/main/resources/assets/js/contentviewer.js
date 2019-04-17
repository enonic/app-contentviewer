window['HTMLImports'].whenReady(function() {

    const widgetContainer = document.getElementById('widget-' + CONFIG.widgetId);

    widgetContainer.querySelector('#tab_draft').addEventListener('click', () => cv_branchToggle('draft'));
    widgetContainer.querySelector('#tab_master').addEventListener('click', () => cv_branchToggle('master'));

    new Clipboard('.xp-contentviewer-copy.draft', {
        text: function () {
            //var container = getContainer('xpcontentviewerid');
            const tooltip = widgetContainer.querySelector(".xpcontentviewer-tooltip.draft");
            tooltip.style.display = 'block';
            setTimeout(function () {
                tooltip.style.display = 'none';
            }, 1500);
            return widgetContainer.querySelector(".xpcontentviewer-content.draft").textContent.trim();
        }
    });
    new Clipboard('.xp-contentviewer-copy.master', {
        text: function () {
            //var container = getContainer('xpcontentviewerid');
            const tooltip = widgetContainer.querySelector(".xpcontentviewer-tooltip.master");
            tooltip.style.display = 'block';
            setTimeout(function () {
                tooltip.style.display = 'none';
            }, 1500);
            return widgetContainer.querySelector(".xpcontentviewer-content.master").textContent.trim();
        }
    });

    const cv_branchToggle = function (branch) {
        const otherBranch = (branch == "master" ? "draft" : "master");

        if (widgetContainer.querySelector("#" + branch).style.display == "none") {
            widgetContainer.querySelector("#" + branch).style.display = "block";
            widgetContainer.querySelector("#tab_" + branch).classList.toggle("selected");

            widgetContainer.querySelector("#" + otherBranch).style.display = "none";
            widgetContainer.querySelector("#tab_" + otherBranch).classList.toggle("selected");
        }

        return false;
    }

});