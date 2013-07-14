exports.install = function(framework) {
	framework.route('/share/', view_share);
	framework.route('/share/a/', view_share_a);
};

exports.functions = {
	message: function () {
		return 'message';
	}
};

exports.models = {
	user: {
		name: 'Peter',
		age: 28
	}
};

function view_share() {
	this.layout('');
	this.view('index');
}

function view_share_a() {
	this.layout('');
	this.view('a');
}