/**
 * View for the dish selection page
 * @param container
 * @param model
 * @constructor
 */
class DishSearchView {

    constructor(container, model) {
        model.addObserver(this);
        this.container = container;
        this.model = model;

        this.init();
        this.searchButton = document.getElementById("dishSearchButton");
        this.dishList = document.getElementById("dishList");
    }

    addInitialElements () {
        this.container.html(
            `<h2>Find a dish</h2>
                <form>
                    <input type="search" id="keyWords" placeholder="Enter key words">
                    <label for="dishType">Type</label>
                    <select id="dishType"></select>
                    <button id="dishSearchButton" class="button-search" type="submit">search</button>
                </form>
                <hr>
                <div class="container">
                    <div class="row" id="dishList">
                    </div>
                </div>
            `
        );
    }

    addDynamicElements () {
        // Drop-down list for dish types
        let dishSelect = this.container.find("#dishType");
        let allDishTypes = this.model.getAllDishTypes();
        let dropDownTypeList = `<option value=> All </option>`;

        allDishTypes.forEach((dishType => {
            dropDownTypeList += `<option value=> ${dishType}</option>`;
        }));
        dishSelect.html(dropDownTypeList);

        this.renderDishList();
    }

    init() {
        this.addInitialElements();
        this.addDynamicElements();
    }

    update (model, changeDetails) {
        // get the keywords and the filter
        let filter = document.getElementById("keyWords").value;
        console.log(filter);

        let type = document.getElementById("dishType").value;
        console.log(type);

        this.renderDishList(type, filter);
    }

    renderDishList (type = null, filter = null) {
        // List with all the dishes
        let dishList = this.container.find("#dishList");
        let allDishes = this.model.getFullMenu();
        let HTMLString = "";

        // draw each dish
        allDishes.forEach(dish => {
            let dishItem = new DishItemView(this.container, this.model, dish.id);
            HTMLString += dishItem.getHTMLImage();
        });

        dishList.html(HTMLString);
    }
}