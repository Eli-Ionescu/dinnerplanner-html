class DishItemView extends GeneralView{

    constructor(container, model, id, title, image) {
        super(container);
        this.model = model;
        this.id = id;
        this.title = title;
        this.image = image;
        this.item = this.createNewDishItem();
    }

    createNewDishItem() {
        let item = document.createElement('DIV');
        item.setAttribute("id", `dish${this.id}`);
        item.setAttribute("class", "col-md-2 dishItem");
        item.innerHTML = `<div>
                                <a>
                                    <img class="img-thumbnail" src="${this.model.baseUri}${this.image}" alt="${this.title}">
                                    <div align="center" class="caption">
                                        <p>${this.title}<\p>
                                    </div>
                                </a>
                            </div>`;
        this.container.appendChild(item);
        return item;
    }
}
