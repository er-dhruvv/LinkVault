import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy, serverTimestamp } from "firebase/firestore";

const CATEGORIES = ["All", "Work", "Education", "Entertainment", "Resources", "Personal", "Other"];

const HomePage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Resources");
  
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    if (!firebase.isLoggedIn || !firebase.user) return;

    const linksRef = collection(firebase.db, "users", firebase.user.uid, "links");
    const q = query(linksRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const linksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLinks(linksData);
    });

    return () => unsubscribe();
  }, [firebase.isLoggedIn, firebase.user, firebase.db]);

  const handleLogout = async () => {
    await firebase.logout();
    navigate("/");
  };

  const handleAddLink = async (e) => {
    e.preventDefault();
    if (!title || !url) return;
    
    let validUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      validUrl = 'https://' + url;
    }

    try {
      const linksRef = collection(firebase.db, "users", firebase.user.uid, "links");
      await addDoc(linksRef, {
        title,
        url: validUrl,
        category,
        createdAt: serverTimestamp()
      });
      setTitle("");
      setUrl("");
    } catch (error) {
      console.error("Error adding link:", error);
      alert("Error adding link: " + error.message + "\n\nTip: Check if your Firestore Security Rules allow writes for authenticated users.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const linkRef = doc(firebase.db, "users", firebase.user.uid, "links", id);
      await deleteDoc(linkRef);
    } catch (error) {
      console.error("Error deleting link:", error);
      alert("Error deleting link: " + error.message);
    }
  };

  if (!firebase.isLoggedIn) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-950 px-4">
        <div className="max-w-md w-full text-center space-y-6 bg-slate-900 p-8 rounded-2xl border border-white/10 shadow-xl">
          <h2 className="text-3xl font-bold text-white">Access Denied</h2>
          <p className="text-gray-400">Please login to access your LinkVault dashboard.</p>
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

  const filteredLinks = links.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(search.toLowerCase()) || link.url.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === "All" || link.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8 mt-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
            </svg>
          </div>
          <div className="z-10">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-1">
              Your LinkVault
            </h1>
            <p className="text-gray-400">
              Welcome back, {firebase.user?.email?.split('@')[0]}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="z-10 px-5 py-2 shrink-0 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg font-medium transition-all"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar / Add Link */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-4 text-white">Save a New Link</h2>
              <form onSubmit={handleAddLink} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. React Docs"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">URL</label>
                  <input
                    type="text"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="react.dev"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-4 pr-10 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                    >
                      {CATEGORIES.filter(c => c !== "All").map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98]"
                >
                  Save to Vault
                </button>
              </form>
            </div>
            
            {/* Quick Stats */}
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
               <h3 className="text-lg font-bold mb-2">Total Links</h3>
               <div className="text-4xl font-black text-indigo-400">{links.length}</div>
            </div>
          </div>

          {/* Main Content / Links Grid */}
          <div className="lg:col-span-2 space-y-6">
             {/* Filter & Search */}
            <div className="flex flex-col sm:flex-row gap-4">
               <div className="relative flex-1">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                 </div>
                 <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search your links..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
               </div>
               <div className="relative sm:w-48 shrink-0">
                 <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-4 pr-10 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                 </select>
                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                   <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                   </svg>
                 </div>
               </div>
            </div>

            {/* Links Grid */}
            {filteredLinks.length === 0 ? (
              <div className="bg-slate-900/30 border border-slate-800 border-dashed rounded-2xl p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">No links found</h3>
                <p className="text-gray-500">
                  {search || filterCategory !== "All" ? "Try adjusting your filters." : "Start saving your favorite links to organize them here."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredLinks.map((link) => (
                  <div key={link.id} className="group bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-5 transition-all shadow-lg hover:shadow-indigo-500/10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-3 gap-2">
                       <span className="px-2.5 py-1 bg-slate-800 text-xs font-medium text-indigo-300 rounded-md">
                         {link.category}
                       </span>
                       <button
                         onClick={() => handleDelete(link.id)}
                         className="text-gray-500 hover:text-red-400 transition-colors bg-slate-950/50 p-1.5 rounded-lg opacity-0 group-hover:opacity-100"
                         title="Delete link"
                       >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                       </button>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-2" title={link.title}>
                      {link.title}
                    </h3>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-indigo-400 text-sm truncate pr-4 flex items-center gap-1.5 transition-colors"
                      >
                         <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                         </svg>
                         <span className="truncate">{link.url.replace(/^https?:\/\//, '')}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
