const contextLib = require('/lib/xp/context');
const contentLib = require('/lib/xp/content');
const portalLib = require('/lib/xp/portal');
const thymeleaf = require('/lib/thymeleaf');

const view = resolve('contentviewer.html');

function handleGet(req) {
    let contentId = req.params.contentId;
    if (!contentId && portalLib.getContent()) {
        contentId = portalLib.getContent()._id;
    }

    if (!contentId) {
        return {
            contentType: 'text/html',
            body: '<widget class="error">No content selected</widget>'
        };
    }

    const draftContent = fetchContentFromBranch(contentId, 'draft');
    const masterContent = fetchContentFromBranch(contentId, 'master');

    let activeBranch = 'draft';

    if (masterContent && draftContent) {
        activeBranch = masterContent.modifiedTime >= draftContent.modifiedTime ? 'master' : 'draft';
    }

    const params = {
        contentDraft: draftContent ? highlightJson(draftContent) : null,
        contentMaster: masterContent ? highlightJson(masterContent) : null,
        showMaster: activeBranch === 'master',
        showDraft: activeBranch === 'draft',
        widgetId: app.name
    };

    return {
        contentType: 'text/html',
        body: thymeleaf.render(view, params)
    };
}
exports.get = handleGet;

function fetchContentFromBranch(contentId, branch) {
    return contextLib.run({
        branch: branch
    }, function() {
        return contentLib.get({
            key: contentId
        })
    });

}

function highlightJson(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, null, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
            let cls = 'number', title;
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = extraType(match) || 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }

            if (cls === 'id') {
                const id = match.substring(1, match.length - 1);
                try {
                    title = getContentTitle(id);
                }
                catch(e) {
                    title = 'Content not found';
                }
            }
            return '<span class="xpconview-' + cls + '"' + (title ? ' title="' + title + '"' : '') + '>' + match + '</span>';
        });
}

function getContentTitle(id) {
    const content = contentLib.get({key: id});
    if (content) {
        return sanitize(content.displayName);
    }

    return null;
}

function sanitize(value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function extraType(value) {
    if (value.length < 3) {
        return null;
    }
    const v = value.substring(1, value.length - 1);
    if (/^([^\/]:)?(\/[^\/]+)+$/g.test(v)) {
        return 'path';
    }
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v)) {
        return 'id'; // "2c17479b-c9be-406f-91e1-075f86bb9cde"
    }
    if (/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(v)) {
        return 'datetime'; // "2016-05-13T10:28:23.910Z"
    }
    if (/([01]\d|2[0-3]):([0-5]\d)/.test(v)) {
        return 'datetime'; // "00:01"
    }
    if (/^([0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])$/.test(v)) {
        return 'datetime'; // "2016-05-13"
    }

    return null;
}
