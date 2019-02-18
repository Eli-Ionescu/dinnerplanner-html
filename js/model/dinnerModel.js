//DinnerModel Object constructor
class DinnerModel extends Observable {
    constructor() {
        super();
        this.numberOfGuests = 3;
        this.selectedDishes = [];
        // Initialise the current id with the first id in the dish list
        this.currentDish = new Dish(0, "", "", [], "", "");
        this.fetchHeaders = fetchHeaders;
        this.fetchHeaders["X-Mashape-Key"] = API_KEY;
    }

    // Function that returns a promise of a dish of specific ID or empty dish if the ID is not in the list
    getDish(id) {
        return fetch(`${searchApi}/${id}/information`, {
            headers: this.fetchHeaders
        }).then(response => response.json())
            .catch(error => {
                alert(error);
                console.log(error);
            });
    }

    setCurrentDish(id) {
        this.currentDish = this.getDish(id);
        this.notifyObservers("currentDish");
    }

    getCurrentDish() {
        return this.currentDish;
    }

    setNumberOfGuests(num) {
        this.numberOfGuests = num;
            this.notifyObservers("numberOfGuests");
    }

    getNumberOfGuests() {
        return this.numberOfGuests;
    }

    // Returns the selected dishes
    getAllSelectedDishes() {
        return this.selectedDishes;
    }

    //Returns the total price of the menu (all the ingredients multiplied by number of guests).
    getTotalMenuPrice() {
        let total = 0;
        for (let dish of this.selectedDishes) {
            total += dish.pricePerServing;
        }
        return total * this.numberOfGuests;
    }

    //Adds the passed dish to the menu
    addDishToMenu(dish) {
        this.selectedDishes.push(dish);
        this.notifyObservers("addDishToMenu");
    }

    //Removes dish from menu
    removeDishFromMenu(id) {
        let index = this.selectedDishes.indexOf(this.getDish(id));
        if (index > -1) {
            this.selectedDishes.splice(index, 1);
        }
        this.notifyObservers("removeDishFromMenu");
    }

    //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
    //you can use the filter argument to filter out the dish by name or ingredient (use for search)
    //if you don't pass any filter all the dishes will be returned
    getAllDishes (type,filter) {
        let searchUrl = "";
        if ((!type || type == "All") && !filter) {
            searchUrl = searchApi + "/search?number=20";
        } else {
            searchUrl = searchApi + "/search?number=20" +
                (type ? `&type=${type}` : "") +
                (filter ? `&query=${filter}` : "");
        }

        return fetch(searchUrl, {
            headers: this.fetchHeaders,
        }).then(response => response.json())
            .then(data => data.results)
            .catch(error => {
                alert("Internet connection problem.");
                console.error(error);
            })
    }

    // Return a list with all the dish types
    getAllDishTypes () {
        return dishTypes;
    }

    getMaxNrGuests() {
        return 10;
    }
}

const dishTypes = ["main course", "side dish", "dessert", "appetizer", "salad", "bread",
    "breakfast", "soup", "beverage", "sauce", "drink"];

const searchApi =  "http://sunset.nada.kth.se:8080/iprog/group/45/recipes";

const fetchHeaders = {
    'X-Mashape-Key': "",};