class DishDetailsController {

    constructor(view, model, controller) {
        this.model = model;
        this.controller = controller;

        view.button.addEventListener("click",
            () => this.model.addDishToMenu(view.currentDish));

        view.backButton.addEventListener("click",
            () => this.controller.showSelectDishPage())
    }
}

