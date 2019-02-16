class HomeController {
    constructor(view, model, controller) {
        this.view = view;
        this.model = model;
        this.controller = controller;
    }

    loadData () {
        this.controller.showScreen("LOADING");
        this.model.getAllDishes()
            .then(data => {
                // show loading
                this.model.dishes = data;
            })
            .then(data => {
                this.controller.showScreen("SEARCH") })
            .catch(error => {
                console.error(error);
                alert("Error on loading data");
            });
    }
}