//DinnerModel Object constructor
class DinnerModel extends Observable {
    constructor() {
        super();
        this.numberOfGuests = 3;
        this.selectedDishes = [];
        this.dishTypes = dishTypes;

        this.dishes = [];
        this.getAllData()
            .then(data => {
                this.dishes = data;
            })
            .catch(error => console.error(error));
        // Initialise the current id with the first id in the dish list
        this.currentId = 0;
        this.dummyDish = new Dish(0, "", "", [], "", "");
    }

    // Returns the list of the ingredients for a specific dish or empty list if the dish doesn't exist
    getDishIngredients(id) {
        let theDish = this.dishes.filter(dish => dish.id = id);
        if (theDish) {
            return theDish[0].ingredients;
        }
        return [];
    }

    // function that returns a dish of specific ID or empty dish if the ID is not in the list
    getDish(id) {
        for (let key in this.dishes) {
            if (this.dishes[key].id == id) {
                return this.dishes[key];
            }
        }
        return this.dummyDish;
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
    getSelectedDish(type) {
        let dishes = [];
        for (let i in this.selectedDishes) {
            if (this.selectedDishes[i].type.findIndex(type) != -1) {
                dishes.push(this.selectedDishes[i]);
            }
        }
        return dishes;
    }

    //Returns all the dishes on the menu.
    getFullMenu() {
        return this.dishes;
    }

    // Returns the selected dishes
    getAllSelectedDishes() {
        return this.selectedDishes;
    }

    //Returns the total price of the menu (all the ingredients multiplied by number of guests).
    getTotalMenuPrice() {
        let total = 0;
        for (let dish of this.selectedDishes) {
            total += dish.price;
        }
        return total * this.numberOfGuests;
    }

    //Adds the passed dish to the menu
    addDishToMenu(id) {
        let newDish = this.getDish(id);
        this.selectedDishes.push(newDish);
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
        if (!type && !filter) return this.dishes;
        return this.dishes.filter(function(dish) {
            let found = true;
            if(filter){
                found = false;
                dish.ingredients.forEach(function(ingredient) {
                    if(ingredient.name.indexOf(filter)!=-1) {
                        found = true;
                    }
                });
                if(dish.title.indexOf(filter) != -1) {
                    found = true;
                }
            }

            return (type == "All" || !type) ? found : ((dish.types.indexOf(type) != -1) && found);
        });
    }

    // Return a list with all the dish types
    getAllDishTypes () {
        return dishTypes;
    }

    getMaxNrGuests() {
        return 10;
    }

    getAllData() {
        let dishes = [];
        let promise = fetch(`${searchApi}/search`,
            {headers: {'X-Mashape-Key': API_KEY}})
            .then(response => response.json())
            .then(data => {
                data.results.forEach(dish => {
                    dishes.push(new Dish(dish.id, dish.title));
                });
                return dishes
            })
            .then(dishes => {
                dishes.forEach(dish => {
                    if (dish.id != 752320) {

                        fetch(`${searchApi}/informationBulk?ids=${dish.id}`, {
                            headers: {'X-Mashape-Key': API_KEY}
                        }).then(response => response.json())
                            .then(data => {
                                if (!data || !data[0]) { return dish;}
                                dish.image = data[0].image;
                                dish.ingredients = data[0].extendedIngredients;
                                dish.types = data[0].dishTypes;
                                dish.preparation = data[0].instructions;
                                dish.price = data[0].pricePerServing;
                                return dish;
                            }).catch(console.error);

                        fetch(`${searchApi}/${dish.id}/summary`, {
                            headers: {'X-Mashape-Key': API_KEY}
                        })
                            .then(response => response.json())
                            .then(data => {
                                dish.description = data["summary"];
                                return dish;
                            })
                            .catch(console.error);
                    } });
                return dishes;
            }).catch(error => console.error(error + "Last one!"));
        return promise;
    }
}

const dishTypes = ["main course", "side dish", "dessert", "appetizer", "salad", "bread",
    "breakfast", "soup", "beverage", "sauce", "drink"];

const searchApi = "http://sunset.nada.kth.se:8080/iprog/group/45/recipes";
