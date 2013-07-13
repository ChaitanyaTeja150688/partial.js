exports.install = function(framework) {

	//var db = framework.database('images');
	//db.insert({ file: db.binary.insert('logo.png', 'image/png', require('fs').readFileSync('/users/petersirka/desktop/logo.png')) });
	
	framework.route('/', view_homepage);
    framework.file('load image from database', function(req) { return req.url.indexOf(".png") !== -1; }, static_image);
};

function view_homepage() {
    var self = this;
	self.plain('http://{0}:{1}/13658557803674rjurf6r.png'.format(self.framework.ip, self.framework.port));
}

// Serve image from database products
function static_image(req, res) {
    
    // this === framework
    var self = this;

    var db = self.database('images');
    var id = req.uri.pathname.replace('/', '').replace('.png', '');

    // check client cache via etag
    // if not modified - framework send automatically 304
    // id === etag
    if (self.notModified(req, res, id))
        return;

    db.binary.read(id, function(err, stream, header) {

        if (err) {
            self.response404(req, res);
            return;
        }

        // set client cache via etag
        self.setModified(req, res, id);

        // req, res, filename, stream, [downloadname], [headers]
        self.responseStream(req, res, 'image/png', stream);
    });
}