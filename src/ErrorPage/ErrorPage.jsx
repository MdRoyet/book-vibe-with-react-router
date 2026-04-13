import React from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          {/* Animated 404 Text */}
          <h1 className="text-9xl font-bold text-primary animate-bounce">
            404
          </h1>

          <h2 className="text-3xl font-semibold mt-4">You look lost!</h2>

          <p className="py-6 text-base-content/70">
            The page you are looking for doesn't exist or has been moved to a
            different galaxy. Let's get you back to safety.
          </p>

          <button
            onClick={() => navigate("/")}
            className="btn btn-primary btn-wide shadow-lg hover:scale-105 transition-transform"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
