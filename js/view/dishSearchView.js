/**
 * View for the dish selection page
 * @param container
 * @param model
 * @constructor
 */
class DishSearchView {

    constructor(container, model) {
        this.container = container;
        this.model = model;
    }

    init() {
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
}