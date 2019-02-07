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
    }

    addDynamicElements () {
        // Drop-down list for dish types
        let dishSelect = this.container.querySelector("#dishType");
        let allDishTypes = this.model.getAllDishTypes();
        let dropDownTypeList = dishSelect.innerHTML;

        allDishTypes.forEach((dishType => {
            dropDownTypeList += `<option value=>${dishType}</option>`;
        }));
        dishSelect.innerHTML = dropDownTypeList;

        this.renderDishList();
    }

    renderDishList (type, filter) {
        // List with all the dishes
        let dishList = document.getElementById("dishList");
        let allDishes = this.model.getAllDishes(type, filter);
        dishList.innerHTML = "";
        allDishes.forEach(dish => {
            let dishItem = new DishItemView(dishList, this.model, dish.id, dish.title, dish.image);
            new DishItemController(dishItem.item, dish, this.app);
        });
    }

    update (model, changeDetails) {
        this.model = model;
        // get the keywords and the filter
        if (changeDetails == "search") {
            let filterValue = this.filter.value;
            let typeValue = this.type.options[this.type.selectedIndex].text;
            this.renderDishList(typeValue, filterValue);
        }
    }
}
