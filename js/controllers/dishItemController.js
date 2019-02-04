class DishItemController {
    constructor (item, dish, app) {
        this.app = app;
        item.addEventListener('click',
            () => {this.app.showDishDetailsPage(dish.id)});
    }
}