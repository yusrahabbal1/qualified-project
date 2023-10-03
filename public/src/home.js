// Helper function
function countItems(array, conditionFn) {
  return array.reduce((count, item) => {
    if (conditionFn(item)) {
      count++;
    }
    return count;
  }, 0);
}

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const isBorrowed = (book) => {
    const [recentTransaction] = book.borrows;
    return recentTransaction && !recentTransaction.returned;
  };
  return countItems(books, isBorrowed);
}

function getMostCommonGenres(books) {
  const genreCounts = {};

  books.forEach((book) => {
    const genre = book.genre;
    genreCounts[genre] ? genreCounts[genre]++ : (genreCounts[genre] = 1);
});

  const genreArray = Object.keys(genreCounts).map((genre) => ({
    name: genre,
    count: genreCounts[genre],
  }));

  genreArray.sort((a, b) => b.count - a.count);

  return genreArray.slice(0, 5);
};

function getMostPopularBooks(books) {
  const bookBorrowedCount = {};

  books.forEach((book) => {
    const borrows = book.borrows.length;
    bookBorrowedCount[book.title] = borrows;
  });

  const bookBorrowedArray = Object.keys(bookBorrowedCount).map((title) => ({
    name: title,
    count: bookBorrowedCount[title],
  }));

  bookBorrowedArray.sort((a, b) => b.count - a.count);

  return bookBorrowedArray.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorBorrowedCount = {};

  books.forEach((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    const authorName = `${author.name.first} ${author.name.last}`;
    if (authorBorrowedCount[authorName]) {
      authorBorrowedCount[authorName] += book.borrows.length;
    } else {
      authorBorrowedCount[authorName] = book.borrows.length;
    }
  });

  const authorArray = Object.keys(authorBorrowedCount).map((authorName) => ({
    name: authorName,
    count: authorBorrowedCount[authorName],
  }));

  authorArray.sort((a, b) => b.count - a.count);

  return authorArray.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
