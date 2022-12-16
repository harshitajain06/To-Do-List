/* @jest-environment jsdom */
import ToDoList from './crud.js';
// jest.mock('./crud.js')

describe('functions local storage item', () => {
  // beforeEach(() => {
  //   window.localStorage.clear();
  // });
  test('testing add function to add a task object in local storage', () => {
    const mockId = '333';

    const mockNewData = { data: ' new data' };

    ToDoList.setLocalStorage(mockId, mockNewData);
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockNewData));
  });

  test('testing remove function to remove a task object in local storage', () => {
    Object.defineProperty(window, 'localStorage', { value: ToDoList.localStorageMock });
    const mockId = '333';
    const mockData = { data: 'json data' };

    window.localStorage.setItem(mockId, JSON.stringify(mockData));
    ToDoList.setLocalStorage(mockId, mockData);
    ToDoList.delete(mockId);
    const allItems = window.localStorage.getAll();

    expect(Object.keys(allItems).length).toBe(1);
  });
});