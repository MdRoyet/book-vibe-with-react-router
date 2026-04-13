import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // For the "View Details" button

const ListedBooks = () => {
  // 1. State for our books and the active tab
  const [readBooks, setReadBooks] = useState([]);
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [activeTab, setActiveTab] = useState("read"); // 'read' or 'wishlist'

  // 2. Retrieve data from LocalStorage when the page loads
  useEffect(() => {
    const storedRead = JSON.parse(localStorage.getItem("readBooks")) || [];
    const storedWishlist =
      JSON.parse(localStorage.getItem("wishlistBooks")) || [];

    setReadBooks(storedRead);
    setWishlistBooks(storedWishlist);
  }, []);

  // 3. Determine which array to display based on the active tab
  const displayBooks = activeTab === "read" ? readBooks : wishlistBooks;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* --- HEADER --- */}
      <div className="bg-[#131313]/[0.05] py-8 rounded-3xl mb-8 flex justify-center">
        <h1 className="text-3xl font-bold text-base-content font-sans">
          Books
        </h1>
      </div>

      {/* --- SORT DROPDOWN (UI Only for now) --- */}
      <div className="flex justify-center mb-12">
        <div className="dropdown dropdown-bottom">
          <div
            tabIndex={0}
            role="button"
            className="btn bg-[#23BE0A] text-white hover:bg-[#1fa109] border-none px-8"
          >
            Sort By
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
          >
            <li>
              <a>Rating</a>
            </li>
            <li>
              <a>Number of pages</a>
            </li>
            <li>
              <a>Publisher year</a>
            </li>
          </ul>
        </div>
      </div>

      {/* --- TABS --- */}
      {/* We use daisyUI's 'tabs-lifted' to match the exact border style from your screenshot */}
      <div className="flex items-center mb-8 border-b border-base-300">
        <div role="tablist" className="tabs tabs-lifted justify-start w-full">
          <a
            role="tab"
            className={`tab text-lg h-12 ${activeTab === "read" ? "tab-active font-bold border-base-300 border-b-transparent" : "text-gray-500"}`}
            onClick={() => setActiveTab("read")}
          >
            Read Books
          </a>
          <a
            role="tab"
            className={`tab text-lg h-12 ${activeTab === "wishlist" ? "tab-active font-bold border-base-300 border-b-transparent" : "text-gray-500"}`}
            onClick={() => setActiveTab("wishlist")}
          >
            Wishlist Books
          </a>
        </div>
      </div>

      {/* --- BOOK CARDS --- */}
      <div className="flex flex-col gap-6">
        {displayBooks.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-xl">
            No books found in this list yet!
          </div>
        ) : (
          displayBooks.map((book) => (
            <div
              key={book.bookId}
              className="flex flex-col md:flex-row border border-base-300 rounded-2xl p-6 gap-8 hover:shadow-md transition-shadow bg-base-100"
            >
              {/* Image Container */}
              <div className="bg-[#131313]/[0.05] rounded-2xl w-full md:w-60 h-60 flex justify-center items-center flex-shrink-0 p-4">
                <img
                  src={book.image}
                  alt={book.bookName}
                  className="max-h-full object-contain drop-shadow-md"
                />
              </div>

              {/* Content Container */}
              <div className="flex flex-col flex-grow justify-center">
                <h2 className="text-3xl font-bold font-serif text-base-content mb-2">
                  {book.bookName}
                </h2>
                <p className="font-medium text-gray-500 mb-4">
                  By : {book.author}
                </p>

                {/* Tags and Year */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-base-content">Tag</span>
                    {book.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-1 text-[#23BE0A] bg-[#23BE0A]/10 rounded-full text-sm font-semibold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 font-medium">
                    {/* Location/Calendar Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Year of Publishing: {book.yearOfPublishing}</span>
                  </div>
                </div>

                {/* Publisher and Pages */}
                <div className="flex flex-wrap items-center gap-6 text-gray-500 font-medium mb-4">
                  <div className="flex items-center gap-2">
                    {/* Publisher User Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span>Publisher: {book.publisher}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Document Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>Page {book.totalPages}</span>
                  </div>
                </div>

                <div className="border-t border-base-300 w-full my-2"></div>

                {/* Footer Badges and Button */}
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <span className="px-5 py-2 text-[#328EFF] bg-[#328EFF]/10 rounded-full text-sm font-semibold">
                    Category: {book.category}
                  </span>
                  <span className="px-5 py-2 text-[#FFAC33] bg-[#FFAC33]/10 rounded-full text-sm font-semibold">
                    Rating: {book.rating}
                  </span>

                  {/* View Details Button pointing back to the dynamic route */}
                  <Link
                    to={`/book/${book.bookId}`}
                    className="btn bg-[#23BE0A] text-white hover:bg-[#1fa109] border-none rounded-full px-8 ml-auto"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListedBooks;
