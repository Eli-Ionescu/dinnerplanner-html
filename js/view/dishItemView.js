class DishItemView {

    constructor(container, model, id) {
        this.container = container;
        this.model = model;
        this.id = id;

        this.itemContainer = this.container.find("#itemViewList");
        this.dish = this.model.getDish(this.id);
        // this.init();
    }

    getHTMLImage() {
        let HTMLString = `<div class="col-md-2">
                            <div class="thumbnail">
                                <a>
                                    <img src="../images/${this.dish.image}" alt="" ${this.dish.name}>
                                    <div class="caption">
                                        <p> ${this.dish.name}<\p>
                                    </div>
                                </a>
                            </div>
                          </div>`;

        return HTMLString;
    }
}