/**
 * View for the dish selection page
 * @param container
 * @param model
 * @constructor
 */
class DishSearchView extends GeneralView{

    constructor(container, model, app) {
        super(container);
        model.addObserver(this);
        this.model = model;
        this.app = app;

        this.addDynamicElements();
        this.searchButton = document.getElementById("dishSearchButton");
        this.filter = document.getElementById("keyWords");
        this.type = document.getElementById("dishType");
        this.dishList = this.getDishesImages();
    }

    getDishesImages () {
        let images = [];
        let dishList = document.getElementById("dishList");
        for (let i = 0; i < dishList.children.length; i++) {
            images.push(dishList.children[i]);
        }
        return images;
    }

    getDishId (dishElement) {
        return dishElement.id.replace("dish", "");
    }

    addDynamicElements () {
        // Drop-down list for dish types
        let dishSelect = this.container.find("#dishType");
        let allDishTypes = this.model.getAllDishTypes();
        let dropDownTypeList = `<option value=> All </option>`;

        allDishTypes.forEach((dishType => {
            dropDownTypeList += `<option value=>${dishType}</option>`;
        }));
        dishSelect.html(dropDownTypeList);

        this.renderDishList();
    }

    // TODO: modify it
    update (model, changeDetails) {
        this.model = model;
        // get the keywords and the filter
        if (changeDetails == "search") {
            let filterValue = this.filter.value;
            let typeValue = this.type.options[this.type.selectedIndex].text;
            this.renderDishList(typeValue, filterValue);
        }
    }

    renderDishList (type, filter) {
        // List with all the dishes
        let dishList = document.getElementById("dishList");
        let allDishes = this.model.getAllDishes(type, filter);

        // Make the list empty and add the items based on the search
        dishList.innerHTML = "";
        allDishes.forEach(dish => {
            let dishItem = new DishItemView(dishList, this.model, dish.id);
            new DishItemController(dishItem.item, dish, this.app);
        });
    }
}