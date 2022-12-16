/* @jest-environment jsdom */
import ToDoList from './crud.js';

describe('functions local storage item', () => {
  test('testing add function to add a task object in local storage', () => {
    const mockId = '333';

    const mockNewData = { data: ' new data' };

    ToDoList.setLocalStorage(mockId, mockNewData);
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockNewData));
  });

  test('testing remove function to remove a task object in local storage', () => {
    Object.defineProperty(window, 'localStorage', { value: ToDoList.localStorageMock });
    const mockId = '333';
    const mockData = { data: 'happy' };

    window.localStorage.setItem(mockId, JSON.stringify(mockData));
    ToDoList.setLocalStorage(mockId, mockData);
    ToDoList.delete(mockId);
    const allItems = window.localStorage.getAll();

    expect(Object.keys(allItems).length).toBe(1);
  });

  test('Testing updating an item completed status to update completed tasks in local storage', () => {
    Object.defineProperty(window, 'localStorage', { value: ToDoList.localStorageMock });
    const mockId = '333';
    const mockData = { data: 'json data' };

    window.localStorage.setItem(mockId, JSON.stringify(mockData));
    ToDoList.setLocalStorage(mockId, mockData);
    ToDoList.checkboxCompleted(mockId);
    const allItems = window.localStorage.getAll();

    expect(Object.keys(allItems).length).toBe(1);
  });

  test('testing Clear all completed function to clear all completed tasks in local storage', () => {
    Object.defineProperty(window, 'localStorage', { value: ToDoList.localStorageMock });
    const mockId = '333';
    const mockData = { data: 'json data' };

    window.localStorage.setItem(mockId, JSON.stringify(mockData));
    ToDoList.setLocalStorage(mockId, mockData);
    ToDoList.removeCompleted();
    const allItems = window.localStorage.getAll();

    expect(Object.keys(allItems).length).toBe(2);
  });

  test('testing function for editing the task description to edit the selected tasks in local storage', () => {
    Object.defineProperty(window, 'localStorage', { value: ToDoList.localStorageMock });
    const mockId = '333';
    const mockData = { data: 'happy' };
    const description = { data: 'json data' };

    ToDoList.updateDescription(mockId, description, mockData);
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(description));
  });
});