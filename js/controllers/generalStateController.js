class GeneralStateController {
    constructor () {
        this.views = [];
        this.screens = {};
    }

    hideAll() {
        for(let view of this.views){
            view.hide()
        }
    }

    hide(name) {
        let views = this.screens[name];
        for(let view of views){
            view.hide()
        }
    }

    addView(view) {
        this.views.push(view)
    }

    addScreen(name, viewsToShow) {
        this.screens[name] = viewsToShow;
    }

    showScreen(name) {
        hideAll();
        let views = this.screens[name];
        for(let view of views){
            view.show()
        }
    }
}