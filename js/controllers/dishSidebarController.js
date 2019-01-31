class DishSidebarController {

    constructor(view, model, controller) {
        this.controller = controller;
        this.model = model;

        // Update number of people
        view.people.addEventListener("click",
            () => this.model.setNumberOfGuests(view.people.selectedIndex + 1)); // selectedIndex is lower with 1 than guest nr

        // Confirm dinner button -> overview
        view.confirmButton.addEventListener("click",
            () => this.controller.showDinnerOverviewPage());

        // Set the event listener for each delete button
        let buttons = view.getSelectedDishesDeleteButtons();
        for (let i in buttons){
            console.log("button");
            buttons[i].addEventListener("click",
                () => this.model.removeDishFromMenu(view.getDishDeleteId(buttons[i])));
        }
    }
}