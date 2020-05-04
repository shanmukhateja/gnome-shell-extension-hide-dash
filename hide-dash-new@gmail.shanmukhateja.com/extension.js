const Lang = imports.lang;
const Main = imports.ui.main;

let hideDash;

// extension functions
function init() {
	hideDash = new HideDash();
}

function enable() {
	hideDash.enable();
}

function disable() {
	hideDash.disable();
}


// our HideDash object
const HideDash = function() {
    this.init();
}

HideDash.prototype = {

        getViewSelector: function() {
                return Main.overview._viewSelector || Main.overview.viewSelector;
        },

	init: function() {
		this.observer = null;

		// store the values we are going to override
		this.old_x = this.getViewSelector().actor.x;
		this.old_width = this.getViewSelector().actor.get_width();
	},
	
	enable: function() {
		// global.log("enable hide-dash");
		this.observer = Main.overview.connect("showing", Lang.bind(this, this.hide));
	},
	
	disable: function() {
		// global.log("disable hide-dash");
		Main.overview.disconnect(this.observer);
		this.show();
	},

	hide: function() {
		// global.log("show dash");
		Main.overview._dash.actor.hide();
		this.getViewSelector().actor.set_x(0);
		this.getViewSelector().actor.set_width(Main.overview._group.get_width());
		this.getViewSelector().actor.queue_redraw();
	},

	show: function() {
		// global.log("hide dash");
		Main.overview._dash.actor.show();
		this.getViewSelector().actor.set_x(this.old_x);
		this.getViewSelector().actor.set_width(this.old_width);
		this.getViewSelector().actor.queue_redraw();
	}
};
