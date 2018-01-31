import StoreService from './StoreService';

import localStorageMock from './__mocks__/localStorage';
window.localStorage = localStorageMock;

describe('StoreService', () => {
  it('Should be able to create a new store for our model', () => {
    const testStore = new StoreService('test');
  });

  it("Shouldn't create a new store without a specific name", () => {
    expect(() => {
      const testStore = new StoreService();
    }).toThrowError(
      'You need to pass a modelName to the StoreService for creating store for your model'
    );
  });

  describe('StoreService, working with storage', () => {
    let storeName = 'test';
    let testStore;

    beforeEach(() => {
      localStorage.clear();
      testStore = new StoreService(storeName);
    });

    /**
     * Get elements
     */

    it('Should be able to get an empty store after initialization', () => {
      const storeData = testStore.getAll();

      expect(storeData).toEqual({});
    });

    it('Should be able to return undefined, when there isnt element with such id', () => {
      const element = testStore.getById('fakeId');

      expect(element).toBeUndefined();
    });

    /**
     * Add elements
     */

    it('Should be able to add new element without errors', () => {
      const fakeElement = {
        property: 'test'
      };

      const element = testStore.add(fakeElement);

      expect(element).toEqual({
        ...fakeElement,
        id: element.id
      });
    });

    /**
     * Delete
     */

    it('Should be able to throw error, when try to delete item with unknown id', () => {
      expect(() => {
        testStore.delete('fakeId');
      }).toThrow();
    });

    it('Should be able to delete element by id', () => {
      const fakeElement = {
        property: 'delete test'
      };

      const element = testStore.add(fakeElement);

      testStore.delete(element.id);

      expect(testStore.getAll()).toEqual({});
    });

    /**
     * Update
     */

    it('Should be able to throw error, when try to update item with unknown id', () => {
      expect(() => {
        testStore.update('fakeId');
      }).toThrow();
    });

    it('Should be able to update element by id', () => {
      const fakePureElement = {
        property: 'pure'
      };

      const fakeUnpureElement = {
        property: 'unpure'
      };

      const elementInStore = testStore.add(fakePureElement);
      const updatedElementInStore = testStore.update(
        elementInStore.id,
        fakeUnpureElement
      );

      expect(testStore.getById(elementInStore.id)).toEqual(fakeUnpureElement);
    });
  });
});
