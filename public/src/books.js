function findAuthorById(authors, id) {
  // Use the find() method to find the author with the matching ID
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  //Use the find() method to find the book with the matching ID
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // Use the filter() method to separate books based on their return status
  const checkedOutBooks = books.filter(book => !book.borrows[0].returned);
  const returnedBooks = books.filter(book => book.borrows[0].returned);
  
  return [checkedOutBooks, returnedBooks];
}


function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  const result = [];
  
  for (const borrow of borrows) {
    const account = accounts.find(account => account.id === borrow.id);
    if (account) {
      const { id, returned } = borrow;
      const { picture, age, name, company, email, registered } = account;
      const borrower = { id, returned, picture, age, name, company, email, registered };
      result.push(borrower);
    }
    
    // Limit the result to a maximum of ten account objects
    if (result.length >= 10) {
      break;
    }
  }
  
  return result;
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
