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
    }

    addInitialElements () {
        this.container.html(
            `<h2>Find a dish</h2>
                <form>
                    <input type="search" id="keyWords" placeholder="Enter key words">
                    <label for="dishType">Type</label>
                    <select id="dishType"></select>
                    <button class="button-search" type="submit">search</button>
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

        // List with all the dishes
        let dishList = this.container.find("#dishList");
        let allDishes = this.model.getFullMenu();
        let HTMLString = "";

        allDishes.forEach(dish => {
            HTMLString += `<div class="col-md-2">
                                <div class="thumbnail">
                                    <a>
                                        <img src=../images/${dish.image} alt=${dish.name}>
                                        <div class="caption">
                                            <p>${dish.name}<\p>
                                        </div>
                                    </a>
                                </div>
                           </div>`;
        });
        dishList.html(HTMLString);
    }

    init() {
        this.addInitialElements();
        this.addDynamicElements();
    }

    update () {
        this.addDynamicElements();
    }
}