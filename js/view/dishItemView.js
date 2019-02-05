class DishItemView extends GeneralView{

    constructor(container, model, id) {
        super(container);
        this.model = model;
        this.id = id;
        this.dish = this.model.getDish(this.id);
        this.item = this.createNewDishItem();
    }

    createNewDishItem() {
        let item = document.createElement('DIV');
        item.setAttribute("id", `dish${this.id}`);
        item.setAttribute("class", "col-md-2 dishItem");
        item.innerHTML = `<div>
                                <a>
                                    <img class="img-thumbnail" src="images/${this.dish.image}" alt="" ${this.dish.title}>
                                    <div align="center" class="caption">
                                        <p> ${this.dish.title}<\p>
                                    </div>
                                </a>
                            </div>`;
        this.container.appendChild(item);
        return item;
    }
}