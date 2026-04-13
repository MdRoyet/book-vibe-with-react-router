import React, { use } from "react";
import BookCards from "../../UI/BookCards";

// 1. Fixed the missing parentheses on res.json()
const booksPromise = fetch("/booksData.json").then((res) => res.json());

const AllBooks = () => {
  // 2. Fetch the data using React's new use() hook
  const books = use(booksPromise);

  return (
    <div className="py-12 container mx-auto px-4">
      {/* Section Title */}
      <h2 className="font-bold text-4xl text-center mb-10 text-base-content">
        Books
      </h2>

      {/* 3. The Grid Layout (1 col mobile, 2 col tablet, 3 col desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 4. Map through the books array */}
        {books.map((book) => (
          <BookCards book={book}></BookCards>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
