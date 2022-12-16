/* @jest-environment jsdom*/
 import ToDoList from "./crud.js";
// jest.mock('./crud.js')

describe("functions local storage item", () => {

  // beforeEach(() => {
  //   window.localStorage.clear();
  // });
  test("only one ID is in localStorage", () => {
    const mockId = "333";

    const mockNewData = { data: " new data" };

  
   ToDoList.setLocalStorage(mockId, mockNewData);
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockNewData));

  });
})