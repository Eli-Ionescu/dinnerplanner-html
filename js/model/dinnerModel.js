//DinnerModel Object constructor
class DinnerModel extends Observable {
    constructor() {
        super();
        this.numberOfGuests = 3;
        this.selectedDishes = [];
        this.dishTypes = dishTypes;

        this.dishes = [];
        // Initialise the current id with the first id in the dish list
        this.currentId = 0;
        this.dummyDish = new Dish(0, "", "", [], "", "");
        this.fetchHeaders = fetchHeaders;
        this.fetchHeaders["X-Mashape-Key"] = API_KEY;
    }

    // Returns the list of the ingredients for a specific dish or empty list if the dish doesn't exist
    // getDishIngredients(id) {
    //     let theDish = this.dishes.filter(dish => dish.id = id);
    //     if (theDish) {
    //         return theDish[0].ingredients;
    //     }
    //     return [];
    // }

    // Function that returns a promise of a dish of specific ID or empty dish if the ID is not in the list
    getDish(id) {
        return fetch(`${searchApi}/${id}/information`, {
            headers: this.fetchHeaders
        }).then(response => response.json())
            .catch(error => {
                console.log(error);
            });
    }

    setCurrentId(id) {
        this.currentId = id;
        this.notifyObservers("currentDish");
    }

    getCurrentId() {
        return this.currentId;
    }

    setNumberOfGuests(num) {
        this.numberOfGuests = num;
        this.notifyObservers("numberOfGuests");
    }

    getNumberOfGuests() {
        return this.numberOfGuests;
    }

    //Returns the dish that is on the menu for the selected type
    // getSelectedDish(type) {
    //     let dishes = [];
    //     for (let i in this.selectedDishes) {
    //         if (this.selectedDishes[i].type.findIndex(type) != -1) {
    //             dishes.push(this.selectedDishes[i]);
    //         }
    //     }
    //     return dishes;
    // }

    //Returns all the dishes on the menu.
    // getFullMenu() {
    //     return this.dishes;
    // }

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
    addDishToMenu(id) {
        this.getDish(id).then(dish => {
            this.selectedDishes.push(dish);
            this.notifyObservers("addDishToMenu");
        }).catch(error => {
            console.log(error);
        });
        // let newDish = this.getDish(id);
        // this.selectedDishes.push(newDish);
        // this.notifyObservers("addDishToMenu");
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
                type ? `&type=${type}` : "" +
                filter ? `&query=${filter}` : "";
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

// const proxyurl = "https://cors-anywhere.herokuapp.com/";
// const searchApi =  proxyurl + "http://sunset.nada.kth.se:8080/iprog/group/45/recipes";
const searchApi =  "http://sunset.nada.kth.se:8080/iprog/group/45/recipes";

const fetchHeaders = {
    'X-Mashape-Key': "",};