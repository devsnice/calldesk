import shortid from 'shortid';

/*
 *  Storage 
 * 
**/

const Storage = {
  get: name => {
    return JSON.parse(localStorage.getItem(name));
  },

  set: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  }
};

/*
 *  Store service class,
 *  creates a new instance for connection a specific model with Storage
**/

class StoreService {
  constructor(modelName) {
    if (!modelName) {
      throw new Error(
        'You need to pass a modelName to the StoreService for creating store for your model'
      );
    }

    this.modelName = modelName;
  }

  /*
   *  Get all elements
  **/

  getAll = () => {
    const items = Storage.get(this.modelName);

    return items || {};
  };

  /*
   *  Get an element with id
  **/

  getById = id => {
    const items = this.getAll();
    const item = items[id];

    return item;
  };

  /*
   *  Add a new element
  **/

  add = item => {
    const items = this.getAll();
    const id = shortid.generate();

    items[id] = item;

    Storage.set(this.modelName, items);

    return { ...item, id };
  };

  /*
   *  Update an element with id
  **/

  update = (id, newItem) => {
    const items = this.getAll();

    if (!items[id]) throw new Error(`Couldn't update, unknown id ${id}`);

    items[id] = newItem;

    Storage.set(this.modelName, items);

    return { ...newItem, id };
  };

  /*
   *  Delete an element with id
  **/

  delete = id => {
    const items = this.getAll();

    if (!items[id]) throw new Error(`Couldn't update, unknown id ${id}`);

    delete items[id];

    Storage.set(this.modelName, items);

    return { id };
  };
}

export default StoreService;
