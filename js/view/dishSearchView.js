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

    addInitialElements () {
        this.container.html(
            `<h2>Find a dish</h2>
                <input type="search" id="keyWords" placeholder="Enter key words">
                <label for="dishType" class="type" >Type</label>
                <select id="dishType"></select>
                <button id="dishSearchButton" class="button-search">Search</button>
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
            dropDownTypeList += `<option value=>${dishType}</option>`;
        }));
        dishSelect.html(dropDownTypeList);

        this.renderDishList();
    }

    init() {
        this.addInitialElements();
        this.addDynamicElements();
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

    renderDishList (type, filter) {
        // List with all the dishes
        let dishList = this.container.find("#dishList");
        let allDishes = this.model.getAllDishes(type, filter);
        let HTMLString = "";

        allDishes.forEach(dish => {
            let dishItem = new DishItemView(this.container, this.model, dish.id);
            HTMLString += dishItem.getHTMLImage();
        });
        dishList.html(HTMLString);
    }
}