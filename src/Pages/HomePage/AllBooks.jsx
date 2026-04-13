import React, { use } from "react";

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
          <div
            key={book.bookId}
            className="border border-base-300 rounded-2xl p-6 flex flex-col hover:shadow-lg transition-shadow bg-base-100 cursor-pointer"
          >
            {/* --- Image Container --- */}
            {/* Uses a light gray background to make the book cover pop */}
            <div className="bg-[#F3F3F3] rounded-xl h-64 flex items-center justify-center p-4">
              <img
                src={book.image}
                alt={book.bookName}
                className="h-full object-contain drop-shadow-md"
              />
            </div>

            {/* --- Tags --- */}
            <div className="flex gap-3 mt-6">
              {book.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-1 text-[#23BE0A] bg-[#23BE0A]/10 rounded-full text-sm font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* --- Title & Author --- */}
            {/* flex-grow ensures the cards stay the same height even if titles are long */}
            <h3 className="text-2xl font-bold mt-4 font-serif text-base-content flex-grow">
              {book.bookName}
            </h3>
            <p className="text-gray-500 font-medium mt-2">By : {book.author}</p>

            {/* --- Dashed Divider --- */}
            <div className="border-t-2 border-dashed border-base-300 my-5"></div>

            {/* --- Footer (Category & Rating) --- */}
            <div className="flex justify-between items-center text-gray-500 font-medium">
              <span>{book.category}</span>

              <div className="flex items-center gap-2">
                <span>{book.rating.toFixed(2)}</span>
                {/* Star SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
