const menu = {
  _courses: {
  	_appetizers: [],
  	_mains: [],
    _desserts: [],
  set appetizers (apps) {
  	this._appetizers = apps;
	},
  set mains (mains) {
    this._mains = mains;
  },
	set desserts (dess) {
    this._desserts = dess;
  },
  get appetizers () {
  	return this._appetizers;
	},
  get mains () {
    return this._mains;
  },
	get desserts () {
    return this._desserts;
  }

	},
  get courses () {
    return {
      appetizers: this._courses.appetizers,
       mains: this._courses.mains,
        desserts: this._courses.desserts
    };
  },
  addDishToCourse(courseName, dishName, dishPrice)    {
    const dish = {
      name: dishName,
      price: dishPrice
    };
    this._courses[courseName].push(dish);
  },
  getRandomDishFromCourse(courseName) {
    let dishes = this._courses[courseName];
    let index = Math.floor(Math.random() * dishes.length);
    return dishes[index];
  },
  generateRandomMeal() {
    appetizer = this.getRandomDishFromCourse('appetizers');
    main =
this.getRandomDishFromCourse('mains');
    dessert = this.getRandomDishFromCourse('desserts');
    totalPrice = appetizer.price + main.price + dessert.price;
    return `Your meal is ${appetizer.name}, ${main.name}, ${dessert.name}. The price is $${totalPrice}.`;
  }
};

menu.addDishToCourse('appetizers', 'salade', 3.00);
menu.addDishToCourse('appetizers', 'Escargots', 3.00);
menu.addDishToCourse('mains', 'chicken', 16.00);
menu.addDishToCourse('mains', 'Magret', 17.00);
menu.addDishToCourse('desserts', 'chocolate', 4.50);
menu.addDishToCourse('desserts', 'Isles', 6.50);


let meal = menu.generateRandomMeal();
console.log(meal);
