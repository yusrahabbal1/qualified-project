//This function uses the find() method to search for the account with the matching ID
function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

//This function uses the sort() method to return an alphabetically sorted array
function sortAccountsByLastName(accounts) {
  function sortByLastName(a, b) {
    // Extract the last names from the 'name' property of each account
    const lastNameA = a.name.last.toLowerCase();
    const lastNameB = b.name.last.toLowerCase();

    // Compare the last names and return the comparison result
    if (lastNameA < lastNameB) {
      return -1;
    } else if (lastNameA > lastNameB) {
      return 1;
    } else {
      return 0;
    }
  }

  // Sort the 'accounts' array using the custom sorting function
  return accounts.slice().sort(sortByLastName);
}
//This function returns a number that represents the number of times the given account's ID appears in any book's borrows array.
function getTotalNumberOfBorrows(account, books) {
  const accountID = account.id;
  
  //Use the reduce() method to count the number of times the account's ID has borrowed books
  return books.reduce((totalBorrows, book) => {
    const borrows = book.borrows;
    
    const count = borrows.filter(borrow => borrow.id === accountID).length;
    return totalBorrows + count;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountID = account.id;
  
  // Use the filter() method to find books that are currently checked out by the account
  return books.filter(book => {
    const borrows = book.borrows;
    
    // Check if the account's ID appears in the book's borrows array and if the book has not been returned
    return borrows.some(borrow => borrow.id === accountID && !borrow.returned);
  })
  .map(book => {
    // Find the author object associated with the book
    const author = authors.find(author => author.id === book.authorId); // Change "book.authorID" to "book.authorId"
    // Create a new book object that includes the author information
    return {
      ...book,
      author,
    };
  });
}



module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
