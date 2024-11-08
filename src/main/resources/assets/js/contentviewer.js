import ClipboardJS from './clipboard.min.js';

const cv_branchToggle = function (branch, widgetContainer) {
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

const initClipboard = (branch, widgetContainer) => {
    new ClipboardJS(`.xp-contentviewer-copy.${branch}`, {
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

const initTab = (branch, widgetContainer) => {
    const tab = widgetContainer.querySelector(`#tab_${branch}`);
    if (tab) {
        tab.addEventListener('click', () => cv_branchToggle(branch, widgetContainer));
        initClipboard(branch, widgetContainer);
    }
};

(() => {
    if (!document.currentScript) {
        throw 'Legacy browsers are not supported';
    }

    const widgetId = document.currentScript.getAttribute('data-widget-id');
    const widgetContainer = document.getElementById(widgetId);

    if (!widgetContainer) {
        throw 'Failed to render widget container';
    }

    initTab('draft', widgetContainer);
    initTab('master', widgetContainer);
})();
