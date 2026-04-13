import React from "react";
// 1. IMPORT YOUR LOCAL IMAGE FROM ASSETS
import bookImg from "../../assets/pngwing 1.png"; // Adjust path if needed

const Banner = () => {
  return (
    // Outer container for spacing and centering
    <div className="flex items-center justify-center p-4 md:p-12">
      {/* 2. The Rounded Card Container */}
      {/* We use a custom light gray background to match the image precisely */}
      <div className="hero bg-[#131313]/[0.05] rounded-3xl min-h-[550px] p-8 md:p-20">
        <div className="hero-content flex-col lg:flex-row gap-12 lg:gap-20">
          {/* 3. The Text Area (Left on Desktop) */}
          {/* We use a max-width to control where the lines break */}
          <div className="lg:max-w-2xl">
            {/* 4. The Serif Font Title */}
            {/* Adding 'font-serif' makes a huge difference to match the image feel */}
            <h1 className="text-6xl md:text-7xl font-serif font-bold text-base-content leading-tight">
              Books to freshen up your bookshelf
            </h1>

            {/* 5. Removed description paragraph as per design image */}

            {/* 6. The Brand Green Button */}
            {/* Using the same green hex from the NavBar steps */}
            <div className="mt-12">
              <button className="btn bg-[#23BE0A] text-white border-none text-xl px-10 h-16 rounded-xl font-semibold hover:bg-[#1fa109]">
                View The List
              </button>
            </div>
          </div>

          {/* 7. The Image (Right on Desktop) */}
          {/* Use 'object-contain' to ensure the asset doesn't distort */}
          <div className="flex-shrink-0">
            <img
              src={bookImg}
              alt="Book illustration"
              className="max-w-[300px] md:max-w-[400px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
