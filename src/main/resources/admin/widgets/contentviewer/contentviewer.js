var contentLib = require('/lib/xp/content');
var portalLib = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');

function handleGet(req) {
    var uid = req.params.uid;
    var contentId = req.params.contentid;
    if (!contentId) {
        contentId = portalLib.getContent()._id;
    }
    var draft = contentLib.get({
        key: contentId,
        branch: 'draft'
    });

    var master = contentLib.get({
        key: contentId,
        branch: 'master'
    });
    var activeBranch = 'draft';

    if (master && draft) {
        activeBranch = master.modifiedTime >= draft.modifiedTime ? 'master' : 'draft';
    }

    var view = resolve('contentviewer.html');
    var params = {
        uid: uid,
        theme: 'atelier-cave-light',
        contentDraft: draft ? highlightJson(draft) : null,
        contentMaster: master ? highlightJson(master) : null,
        showMaster: activeBranch === 'master',
        showDraft: activeBranch === 'draft'
    };

    return {
        contentType: 'text/html',
        body: thymeleaf.render(view, params)
    };
}
exports.get = handleGet;

function highlightJson(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, null, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
            var cls = 'number';
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
            return '<span class="xpconview-' + cls + '">' + match + '</span>';
        });
}

function extraType(value) {
    if (value.length < 3) {
        return null;
    }
    var v = value.substring(1, value.length - 1);
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