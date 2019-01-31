class DishDetailsController {

    constructor(view, model, controller) {
        // this.controller = controller;
        view.button.addEventListener("click",
            () => model.addDishToMenu(view.id));
    }
}

