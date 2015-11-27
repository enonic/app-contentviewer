var contentLib = require('/lib/xp/content');
var portalLib = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');


function handleGet(req) {

    log.info("req" + JSON.stringify(req, null, 2));

    var view = resolve('contentviewer.html');

    var content = portalLib.getContent();

    var uid = req.url.split('?uid=')[1];
    var draft = contentLib.get({
        key: content._id,
        branch: 'draft'
    });
    var master = contentLib.get({
        key: content._id,
        branch: 'master'
    });

    var params = {
        uid: uid,
        contentDraft: draft ? JSON.stringify(draft, null, 2) : null,
        contentMaster: master ? JSON.stringify(master, null, 2) : null
    };

    return {
        contentType: 'text/html',
        body: thymeleaf.render(view, params)
    };
}
exports.get = handleGet;