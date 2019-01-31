class DishSearchController {
    constructor (view, model, controller) {
        this.controller = controller;

        view.searchButton.addEventListener("click",
            () => view.update(model, "search"));

        // view.dishList.on("click", '.dish_item', function() {
        //     model.setClickedDish($(this).data(''))
        //     setChosenDish($(this).data('dishid'));
        //     controller.show;
        // });
    }
}