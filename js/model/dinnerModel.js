
//DinnerModel Object constructor
class DinnerModel extends Observable{

    constructor () {
		super();
		this.numberOfGuests = 3;
        this.selectedDishes = [];
        this.dishes = dishesConst;

        // Initialise the current id with the first id in the dish list
        this.currentId = this.dishes[0].id;
    }

    setCurrentId (id) {
        this.currentId = id;
    }

    getCurrentId (){
        return this.currentId;
    }

	setNumberOfGuests (num) {
		this.numberOfGuests = num;
		this.notifyObservers("numberOfGuests");
	}
	
	getNumberOfGuests () {
		return this.numberOfGuests;
	}

	//Returns the dish that is on the menu for the selected type
	getSelectedDish (type) {
	    let selectedDishes = [];
		for(let i in selectedDishes) {
			if(selectedDishes[i].type == type) {
			    selectedDishes.push(selectedDishes[i]);
			}
		}
		return selectedDishes;
	}

	//Returns all the dishes on the menu.
	getFullMenu () {
		return this.dishes;
	}

	// Returns the selected dishes
    getAllSelectedDishes () {
        return this.selectedDishes;
    }

	//Returns all ingredients for all the dishes on the menu.
	getAllIngredients () {
		let allIngredients = [];
		for(let i in this.dishes) {
			for(let ingredientIndex in this.dishes[i].ingredients) {
				allIngredients.push(this.dishes[i].ingredients[ingredientIndex]);
			}
		}
		return allIngredients;
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	getTotalMenuPrice () {
		let total = 0;
		for (let dish in this.selectedDishes) {
		    total += this.getDishPrice(this.selectedDishes[dish].id);
		}
		return total * this.numberOfGuests;
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	addDishToMenu (id) {
		let newDish = this.getDish(id);
		for(let i in this.selectedDishes) {
			if(this.selectedDishes[i].type == newDish.type) {
				this.removeDishFromMenu(this.selectedDishes[i].id);
			}
		}
        this.selectedDishes.push(newDish);
		this.notifyObservers("addDishToMenu");
	}

	//Removes dish from menu
	removeDishFromMenu (id) {
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
	  return this.dishes.filter(function(dish) {
		let found = true;
		if(filter){
			found = false;
			dish.ingredients.forEach(function(ingredient) {
				if(ingredient.name.indexOf(filter)!=-1) {
					found = true;
				}
			});
			if(dish.name.indexOf(filter) != -1)
			{
				found = true;
			}
		}
        return (type == "All" || !type) ? found : (dish.type == type && found);
	  });
	}

	//function that returns a dish of specific ID
	getDish (id) {
	  for(let key in this.dishes){
			if(this.dishes[key].id == id) {
				return this.dishes[key];
			}
		}
	}

	// Return a list with all the dish types
	getAllDishTypes () {
		let allDishTypes = [];
		for(let i in this.dishes) {
			if (!allDishTypes.includes(this.dishes[i].type)) {
				allDishTypes.push(this.dishes[i].type);
			}
		}
		return allDishTypes;
	}

	// Returns the price of a dish
	getDishPrice (id) {
		let dish = this.getDish(id);
	    let price = 0;
	    for(let key in dish.ingredients) {
            price += dish.ingredients[key].price;
        }
        return price;
    }

    getMaxNrGuests () {
        return 10;
    }
}

const dishesConst = [{
    'id':1,
    'name':'French toast',
    'type':'starter',
    'image':'toast.jpg',
    'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
    'ingredients':[{
        'name':'eggs',
        'quantity':0.5,
        'unit':'',
        'price':10
    },{
        'name':'milk',
        'quantity':30,
        'unit':'ml',
        'price':6
    },{
        'name':'brown sugar',
        'quantity':7,
        'unit':'g',
        'price':1
    },{
        'name':'ground nutmeg',
        'quantity':0.5,
        'unit':'g',
        'price':12
    },{
        'name':'white bread',
        'quantity':2,
        'unit':'slices',
        'price':2
    }]
},{
    'id':2,
    'name':'Sourdough Starter',
    'type':'starter',
    'image':'sourdough.jpg',
    'description':"Here is how you make it... Lore ipsum...",
    'ingredients':[{
        'name':'active dry yeast',
        'quantity':0.5,
        'unit':'g',
        'price':4
    },{
        'name':'warm water',
        'quantity':30,
        'unit':'ml',
        'price':0
    },{
        'name':'all-purpose flour',
        'quantity':15,
        'unit':'g',
        'price':2
    }]
},{
    'id':3,
    'name':'Baked Brie with Peaches',
    'type':'starter',
    'image':'bakedbrie.jpg',
    'description':"Here is how you make it... Lore ipsum...",
    'ingredients':[{
        'name':'round Brie cheese',
        'quantity':10,
        'unit':'g',
        'price':8
    },{
        'name':'raspberry preserves',
        'quantity':15,
        'unit':'g',
        'price':10
    },{
        'name':'peaches',
        'quantity':1,
        'unit':'',
        'price':4
    }]
},{
    'id':100,
    'name':'Meat balls',
    'type':'main dish',
    'image':'meatballs.jpg',
    'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
    'ingredients':[{
        'name':'extra lean ground beef',
        'quantity':115,
        'unit':'g',
        'price':20
    },{
        'name':'sea salt',
        'quantity':0.7,
        'unit':'g',
        'price':3
    },{
        'name':'small onion, diced',
        'quantity':0.25,
        'unit':'',
        'price':2
    },{
        'name':'garlic salt',
        'quantity':0.7,
        'unit':'g',
        'price':2
    },{
        'name':'Italian seasoning',
        'quantity':0.6,
        'unit':'g',
        'price':3
    },{
        'name':'dried oregano',
        'quantity':0.3,
        'unit':'g',
        'price':3
    },{
        'name':'crushed red pepper flakes',
        'quantity':0.6,
        'unit':'g',
        'price':3
    },{
        'name':'Worcestershire sauce',
        'quantity':6,
        'unit':'ml',
        'price':7
    },{
        'name':'milk',
        'quantity':20,
        'unit':'ml',
        'price':4
    },{
        'name':'grated Parmesan cheese',
        'quantity':5,
        'unit':'g',
        'price':8
    },{
        'name':'seasoned bread crumbs',
        'quantity':15,
        'unit':'g',
        'price':4
    }]
},{
    'id':101,
    'name':'MD 2',
    'type':'main dish',
    'image':'bakedbrie.jpg',
    'description':"Here is how you make it... Lore ipsum...",
    'ingredients':[{
        'name':'ingredient 1',
        'quantity':1,
        'unit':'pieces',
        'price':8
    },{
        'name':'ingredient 2',
        'quantity':15,
        'unit':'g',
        'price':7
    },{
        'name':'ingredient 3',
        'quantity':10,
        'unit':'ml',
        'price':4
    }]
},{
    'id':102,
    'name':'MD 3',
    'type':'main dish',
    'image':'meatballs.jpg',
    'description':"Here is how you make it... Lore ipsum...",
    'ingredients':[{
        'name':'ingredient 1',
        'quantity':2,
        'unit':'pieces',
        'price':8
    },{
        'name':'ingredient 2',
        'quantity':10,
        'unit':'g',
        'price':7
    },{
        'name':'ingredient 3',
        'quantity':5,
        'unit':'ml',
        'price':4
    }]
},{
    'id':103,
    'name':'MD 4',
    'type':'main dish',
    'image':'meatballs.jpg',
    'description':"Here is how you make it... Lore ipsum...",
    'ingredients':[{
        'name':'ingredient 1',
        'quantity':1,
        'unit':'pieces',
        'price':4
    },{
        'name':'ingredient 2',
        'quantity':12,
        'unit':'g',
        'price':7
    },{
        'name':'ingredient 3',
        'quantity':6,
        'unit':'ml',
        'price':4
    }]
},{
    'id':200,
    'name':'Chocolat Ice cream',
    'type':'dessert',
    'image':'icecream.jpg',
    'description':"Here is how you make it... Lore ipsum...",
    'ingredients':[{
        'name':'ice cream',
        'quantity':100,
        'unit':'ml',
        'price':6
    }]
},{
    'id':201,
    'name':'Vanilla Ice cream',
    'type':'dessert',
    'image':'icecream.jpg',
    'description':"Here is how you make it... Lore ipsum...",
    'ingredients':[{
        'name':'ice cream',
        'quantity':100,
        'unit':'ml',
        'price':6
    }]
},{
    'id':202,
    'name':'Strawberry',
    'type':'dessert',
    'image':'icecream.jpg',
    'description':"Here is how you make it... Lore ipsum...",
    'ingredients':[{
        'name':'ice cream',
        'quantity':100,
        'unit':'ml',
        'price':6
    }]
}
];
