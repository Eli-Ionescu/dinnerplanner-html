class DishSearchController {
    constructor (view, model, controller) {
        this.controller = controller;

        view.searchButton.addEventListener("click",
            () => view.update(model, "search"));


        for (let i = 0; i < view.dishList.length; i++) {
            view.dishList[i].addEventListener("click",
                () => this.controller.showDishDetailsPage(view.getDishId(view.dishList[i])));
        }
    }
}