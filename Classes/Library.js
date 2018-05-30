class Media {
  constructor(title) {
    this._title = title;
    this._isCheckedOut = false;
    this._ratings = [];
  }

  get title() {
    return this._title;
  }

  get isCheckedOut() {
    return this._isCheckedOut;
  }

  get ratings() {
    return this._ratings;
  }

  set isCheckedOut(sets) {
    this._isCheckedOut = sets;
  }

  addRating(initrates) {
    this._ratings.push(initrates);
  }

  getAverageRating() {
    const len = this._ratings.length;
    let sum = this._ratings.reduce((total, amount) => total + amount, 0);
    let avg = sum / len;
    return Math.floor(avg);
  }

  toggleCheckOutStatus() {
    if (this._isCheckedOut == true) {
      return this._isCheckedOut = false;
    } else if (this._isCheckedOut == false) {
      return this._isCheckedOut = true;
    } //else { return this._isCheckedOut;}
  }

}

class Book extends Media {
  constructor(author, title, pages) {
    super(title);
    this._author = author;
    this._pages = pages;
  }

  get author() {
    return this._author;
  }

  get pages() {
    return this._pages;
  }

}

class Movie extends Media {
  constructor(director, title, runTime) {
    super(title);
    this._director = director;
    this._runTime = runTime;
  }

  get director() {
    return this._director;
  }

  get runTime() {
    return this._runTime;
  }
}

class CD extends Media {
  constructor(artist, title, songs) {
    super(title);
    this._artist = artist;
    this._songs = songs;
  }

  get artist() {
    return this._artist;
  }

  get songs() {
    return this._songs;
  }

}

const historyOfEverything = new Book('Bill Bryson', 'A Short History of Nearly Everything', 554);
historyOfEverything.toggleCheckOutStatus();
console.log(historyOfEverything.isCheckedOut);
historyOfEverything.addRating(4);
historyOfEverything.addRating(5);
historyOfEverything.addRating(5);
console.log(historyOfEverything.getAverageRating());
console.log(historyOfEverything);

const speed = new Movie('Jan de Bant', 'Speed', 116);
speed.toggleCheckOutStatus();
console.log(speed.isCheckedOut);
speed.addRating(1);
speed.addRating(1);
speed.addRating(5);
console.log(speed.getAverageRating());
console.log(speed);
