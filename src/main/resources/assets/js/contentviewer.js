window['HTMLImports'].whenReady(function() {

    const widgetContainer = document.getElementById('widget-' + CONFIG.widgetId);

    const tabDraft = widgetContainer.querySelector('#tab_draft');
    const tabMaster = widgetContainer.querySelector('#tab_master');

    if (tabDraft) {
        tabDraft.addEventListener('click', () => cv_branchToggle('draft'));
    }
    if (tabMaster) {
        tabMaster.addEventListener('click', () => cv_branchToggle('master'));
    }

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
        const panel = widgetContainer.querySelector(`#${branch}`);

        if (panel.style.display == "none") {
            const otherBranch = (branch == "master" ? "draft" : "master");
            const tab = widgetContainer.querySelector(`#tab_${branch}`);
            const otherTab = widgetContainer.querySelector(`#tab_${otherBranch}`);
            const otherPanel = widgetContainer.querySelector(`#${otherBranch}`);

            panel.style.display = "block";
            tab.classList.toggle("selected");

            otherPanel.style.display = "none";
            otherTab.classList.toggle("selected");
        }

        return false;
    }

});