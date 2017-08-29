"use strict"

export function booksReducers(state = {
    books: []

}, action) {
    switch (action.type) {

        case 'GET_BOOKS':
            return {...state, books: [...action.payload]}
            break;

        case 'POST_BOOK':
            let books = state.books.concat(action.payload);
            return {
                books: [...state.books, ...action.payload], msg: 'Saved! Click to continue', style: 'success'
            };
            break;

        case 'POST_BOOK_REJECTED':
            return {
                ...state, msg: 'please try again', style: 'danger'
            };
            break;

        case 'RESET_BUTTON':
            return {
                ...state, msg: null, style: 'primary'
            };
            break;

        case 'DELETE_BOOK':
            debugger;
            const currentBookToDelete = [...state.books];
            //Determine at which index to be DELETED
            const indexToDelete = currentBookToDelete.findIndex(
                function (book) {
                    return book._id.toString() === action.payload;
                });

            return {
                books: [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]
            }
            break;

        case 'UPDATE_BOOK':
            const currentBookToUpdate = [...state.books];

            //Determine at which index to be DELETED

            const indexToUpdate = currentBookToUpdate.findIndex(
                function (book) {
                    return book._id === action.payload._id;
                });

            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                title: action.payload.title
            };

            return {
                books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]
            };

            break;
    }
    return state;
}
