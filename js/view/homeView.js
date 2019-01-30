class HomeView {
    constructor(container) {
        this.container = container;

        this.init();
    }

    init () {
        this.container.html(
            `<div class="text-center">
                <p>Here you can plan your dinner</p>
                <button class="button" id="newDinnerButton">Create new dinner</button>
             </div>`);
    }
}