import React, { useState, useEffect, useRef } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("en");
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "pt", name: "Portuguese" },
    { code: "it", name: "Italian" },
    { code: "ko", name: "Korean" },
    { code: "ru", name: "Russian" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username) return;
    setIsLoggedIn(true);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setInputText("");
  };

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-500 to-purple-600 p-4">
        <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">🌍 PolyChat</h1>
            <p className="text-gray-500 mt-2">Chat globally. Read locally.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white transition"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition duration-200 shadow-md"
            >
              Join Room
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="flex flex-col w-full max-w-2xl h-screen bg-white shadow-2xl">
        <header className="p-4 bg-purple-600 text-white flex justify-between items-center shadow-md z-10">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>💬</span> PolyChat
          </h2>
          <div className="flex justify-between items-center">
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
              }}
              className="w-full bg-purple-700 p-2 rounded-xl border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition uppercase"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg, index) => {
            const isMe = msg.user === username;
            return (
              <div
                key={index}
                className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`relative max-w-[75%] px-4 py-2 rounded-2xl shadow-sm ${
                    isMe
                      ? "bg-purple-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  <div
                    className={`text-[10px] font-bold mb-1 opacity-70 ${isMe ? "text-purple-100 text-right" : "text-gray-500"}`}
                  >
                    {msg.user}
                  </div>
                  <div className="text-sm leading-relaxed wrap-break-words">
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <form
          className="p-4 bg-white border-t border-gray-100 flex gap-3 items-center"
          onSubmit={sendMessage}
        >
          <input
            type="text"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 p-3 bg-gray-100 border-transparent rounded-full focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-md transition transform active:scale-95 flex items-center justify-center w-12 h-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
