class DishSearchController {

    constructor (view, model, controller) {
        view.searchButton.addEventListener("click",
            () => view.update(model, "search"));
    }
}