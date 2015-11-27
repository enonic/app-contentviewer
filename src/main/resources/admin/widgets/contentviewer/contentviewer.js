var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');


function handleGet(req) {
    var view = resolve('contentviewer.html');

    var uid = req.url.split('?uid=')[1];
    var content = portal.getContent();

    var params = {
        uid: uid,
        content: content
    };

    return {
        contentType: 'text/html',
        body: thymeleaf.render(view, params)
    };
}
exports.get = handleGet;