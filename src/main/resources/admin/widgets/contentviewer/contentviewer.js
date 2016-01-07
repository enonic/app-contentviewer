var contentLib = require('/lib/xp/content');
var portalLib = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');

function handleGet(req) {
    var uid = req.url.split('?uid=')[1];
    var view = resolve('contentviewer.html');

    var content = portalLib.getContent();

    var draft = contentLib.get({
        key: content._id,
        branch: 'draft'
    });
    var master = contentLib.get({
        key: content._id,
        branch: 'master'
    });

    var activeBranch = 'draft';
    if (master && draft) {
        activeBranch = master.modifiedTime >= draft.modifiedTime ? 'master' : 'draft';
    }

    var params = {
        uid: uid,
        theme: 'atelier-cave-light',
        contentDraft: draft ? JSON.stringify(draft, null, 2) : null,
        contentMaster: master ? JSON.stringify(master, null, 2) : null,
        showMaster: activeBranch === 'master',
        showDraft: activeBranch === 'draft'
    };

    return {
        contentType: 'text/html',
        body: thymeleaf.render(view, params)
    };
}
exports.get = handleGet;