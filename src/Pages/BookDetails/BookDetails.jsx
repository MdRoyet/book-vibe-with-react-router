import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const BookDetails = () => {
  // 1. Grab the ID from the URL (e.g., "8")
  // Note: Ensure your route in main.jsx is set up like path: "/book/:bookId"
  const { bookId } = useParams();

  // 2. Set up state to hold our specific book data
  const [book, setBook] = useState("");

  // 3. Fetch data when the component loads
  useEffect(() => {
    fetch("/booksData.json")
      .then((res) => res.json())
      .then((data) => {
        // Find the book whose ID matches the URL parameter.
        // Important: bookId from the URL is a String ("8"), but in your JSON it's a Number (8).
        // We use parseInt() to convert the URL string to a number so they match perfectly.
        const foundBook = data.find((b) => b.bookId === parseInt(bookId));
        setBook(foundBook);
      })
      .catch((err) => console.error("Error fetching books:", err));
  }, [bookId]); // Re-run if the URL ID changes

  // 4. Show a loading indicator while the data is being fetched
  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#23BE0A]"></span>
      </div>
    );
  }

  const handleMarkAsRead = () => {};

  // 5. Once data is found, render the UI using the dynamic 'book' state
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* --- LEFT COLUMN: IMAGE --- */}
        <div className="w-full lg:w-1/2 bg-[#131313]/[0.05] rounded-3xl p-12 flex justify-center items-center h-auto lg:h-[800px]">
          <img
            src={book.image}
            alt={book.bookName}
            className="max-h-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* --- RIGHT COLUMN: DETAILS --- */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-base-content mb-4">
            {book.bookName}
          </h1>
          <p className="text-lg text-gray-500 font-medium mb-6">
            By : {book.author}
          </p>

          <div className="border-t border-base-300 w-full mb-4"></div>

          <p className="text-lg text-gray-500 font-medium mb-4">
            {book.category}
          </p>

          <div className="border-t border-base-300 w-full mb-6"></div>

          <p className="text-gray-500 leading-relaxed mb-8">
            <span className="font-bold text-base-content">Review : </span>
            {book.review}
          </p>

          {/* Dynamic Tags */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-bold text-base-content">Tag</span>
            {book.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-1.5 text-[#23BE0A] bg-[#23BE0A]/10 rounded-full text-sm font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="border-t border-base-300 w-full mb-6"></div>

          <div className="flex flex-col gap-3 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-3">
              <span className="text-gray-500">Number of Pages:</span>
              <span className="font-semibold text-base-content col-span-1 md:col-span-2">
                {book.totalPages}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3">
              <span className="text-gray-500">Publisher:</span>
              <span className="font-semibold text-base-content col-span-1 md:col-span-2">
                {book.publisher}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3">
              <span className="text-gray-500">Year of Publishing:</span>
              <span className="font-semibold text-base-content col-span-1 md:col-span-2">
                {book.yearOfPublishing}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3">
              <span className="text-gray-500">Rating:</span>
              <span className="font-semibold text-base-content col-span-1 md:col-span-2">
                {book.rating}
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="btn btn-outline border-base-300 text-base-content px-8 hover:bg-base-200 hover:border-base-300 bg-transparent font-bold">
              Mark as Read
            </button>
            <button className="btn bg-[#59C6D2] text-white border-none px-8 hover:bg-[#4ab0bc] font-bold">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
