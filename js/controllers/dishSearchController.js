class DishSearchController {
    constructor (view, model, controller) {
        this.controller = controller;

        view.searchButton.addEventListener("click",
            () => view.update(model, "search"));

    }
}