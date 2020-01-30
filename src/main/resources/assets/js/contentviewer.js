(() => {
    const widgetId = document.currentScript.getAttribute('widget-id');
    const widgetContainer = document.getElementById('widget-' + widgetId);

    const tabDraft = widgetContainer.querySelector('#tab_draft');
    const tabMaster = widgetContainer.querySelector('#tab_master');

    const initClipboard = (branch) => {
        new Clipboard(`.xp-contentviewer-copy.${branch}`, {
            text: function () {
                const tooltip = widgetContainer.querySelector(`.xpcontentviewer-tooltip.${branch}`);
                tooltip.style.display = 'block';
                setTimeout(function () {
                    tooltip.style.display = 'none';
                }, 1500);
                return widgetContainer.querySelector(`.xpcontentviewer-content.${branch}`).textContent.trim();
            }
        });
    };

    if (tabDraft) {
        tabDraft.addEventListener('click', () => cv_branchToggle('draft'));
        initClipboard('draft');
    }
    if (tabMaster) {
        tabMaster.addEventListener('click', () => cv_branchToggle('master'));
        initClipboard('master');
    }

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
})();
