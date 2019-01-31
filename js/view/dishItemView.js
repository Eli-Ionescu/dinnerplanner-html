class DishItemView {

    constructor(container, model, id) {
        this.container = container;
        this.model = model;
        this.id = id;

        this.dish = this.model.getDish(this.id);
    }

    getHTMLImage() {
        let HTMLString = `<div class="col-md-2 dishItem" id="dish${this.id}" dishId="${this.id}">
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