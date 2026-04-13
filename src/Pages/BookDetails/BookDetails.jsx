import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget the CSS!

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch("/booksData.json")
      .then((res) => res.json())
      .then((data) => {
        const foundBook = data.find((b) => b.bookId === parseInt(bookId));
        setBook(foundBook);
      })
      .catch((err) => console.error("Error fetching books:", err));
  }, [bookId]);

  // --- ADD TO READ FUNCTION ---
  const handleMarkAsRead = (currentBook) => {
    // 1. Get existing saved books from LocalStorage (or an empty array if none exist)
    const savedReadBooks = JSON.parse(localStorage.getItem("readBooks")) || [];

    // 2. Check if it already exists
    const isExist = savedReadBooks.find((b) => b.bookId === currentBook.bookId);

    if (isExist) {
      // 3. Show Warning Toast
      toast.warn("You have already read this book!");
    } else {
      // 4. Add to array, save back to LocalStorage, and Show Success Toast
      savedReadBooks.push(currentBook);
      localStorage.setItem("readBooks", JSON.stringify(savedReadBooks));
      toast.success("Book added to Read list successfully!");
    }
  };

  // --- ADD TO WISHLIST FUNCTION ---
  const handleAddToWishlist = (currentBook) => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlistBooks")) || [];

    // Optional (but recommended) logic: You usually shouldn't wishlist a book you've already read!
    const savedReadBooks = JSON.parse(localStorage.getItem("readBooks")) || [];
    const isAlreadyRead = savedReadBooks.find(
      (b) => b.bookId === currentBook.bookId,
    );

    if (isAlreadyRead) {
      toast.error("You have already read this book!");
      return;
    }

    const isExist = savedWishlist.find((b) => b.bookId === currentBook.bookId);

    if (isExist) {
      toast.warn("This book is already in your Wishlist!");
    } else {
      savedWishlist.push(currentBook);
      localStorage.setItem("wishlistBooks", JSON.stringify(savedWishlist));
      toast.success("Book added to Wishlist!");
    }
  };

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#23BE0A]"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* ToastContainer is required anywhere you want toasts to pop up */}
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* --- LEFT COLUMN: IMAGE --- */}
        <div className="w-full lg:w-1/2 bg-[#131313]/[0.05] rounded-3xl p-12 flex justify-center items-center h-auto lg:h-[700px]">
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

          {/* Tags */}
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

          {/* Details Grid */}
          <div className="flex flex-col gap-3 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-3">
              <span className="text-gray-500">Number of Pages:</span>
              <span className="font-semibold text-base-content">
                {book.totalPages}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3">
              <span className="text-gray-500">Publisher:</span>
              <span className="font-semibold text-base-content">
                {book.publisher}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3">
              <span className="text-gray-500">Year of Publishing:</span>
              <span className="font-semibold text-base-content">
                {book.yearOfPublishing}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3">
              <span className="text-gray-500">Rating:</span>
              <span className="font-semibold text-base-content">
                {book.rating}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              // Note: Passing the ENTIRE book object now, not just the ID
              onClick={() => handleMarkAsRead(book)}
              className="btn btn-outline border-base-300 text-base-content px-8 hover:bg-base-200 hover:border-base-300 bg-transparent font-bold"
            >
              Read
            </button>
            <button
              onClick={() => handleAddToWishlist(book)}
              className="btn bg-[#59C6D2] text-white border-none px-8 hover:bg-[#4ab0bc] font-bold"
            >
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
