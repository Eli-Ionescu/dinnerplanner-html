class DinnerOverviewController {

    constructor(view, model, controller) {
        this.controller = controller;
        view.button.addEventListener("click",
            () => this.controller.showPrintoutPage());
    }
}

