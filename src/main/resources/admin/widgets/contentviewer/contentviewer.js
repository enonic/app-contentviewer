var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');


function handleGet(req) {
    var view = resolve('contentviewer-tmp.html');

    var uid = req.url.split('?uid=')[1];

    log.info("aa");
    log.info(portal.assetUrl({path: 'js/contentviewer.js'}));
    var params = {
        contentViewerJsUrl: portal.assetUrl({path: 'js/contentviewer.js'}),
        uid: uid
    }

    return {
        contentType: 'text/html',
        body: thymeleaf.render(view, params)
    };
}
exports.get = handleGet;