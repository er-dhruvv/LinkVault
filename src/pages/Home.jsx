import React from "react";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await firebase.logout();
    navigate("/");
  };

  if (!firebase.isLoggedIn) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-950 px-4">
        <div className="max-w-md w-full text-center space-y-6 bg-slate-900 p-8 rounded-2xl border border-white/10 shadow-xl">
          <h2 className="text-3xl font-bold text-white">Access Denied</h2>
          <p className="text-gray-400">
            Please login to access your LinkVault dashboard.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all shadow-lg shadow-indigo-500/20"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8 mt-8">
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </div>

          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
              Welcome, {firebase.user?.email}
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Everything you need is right here in your LinkVault.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleLogout}
                className="px-6 py-2 border border-red-500/50 text-red-500 hover:bg-red-500/10 rounded-lg font-medium transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 hover:border-indigo-500/30 transition-all">
            <h3 className="text-xl font-bold mb-2">Quick Stats</h3>
            <p className="text-gray-400">
              Your activity overview for this week.
            </p>
            <div className="mt-4 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-2/3"></div>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 hover:border-cyan-500/30 transition-all">
            <h3 className="text-xl font-bold mb-2">Security</h3>
            <p className="text-gray-400">
              Your account is protected by LinkVault.
            </p>
            <div className="mt-4 flex items-center text-green-400 text-sm">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Fully Secured
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
