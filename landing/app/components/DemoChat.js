// landing/app/components/DemoChat.js
"use client";

import { useState, useEffect, useRef } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

function generateSessionId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function DemoChat() {
  const [sessionId] = useState(() => generateSessionId());
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Привет! Я бот салона красоты «Луна». Спросите меня про цену, запись, адрес или режим работы.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current && messagesEndRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isLoading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/demo/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, text }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { from: "bot", text: data.reply_text }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Что-то пошло не так при обращении к демо-API. Попробуйте ещё раз чуть позже.",
        },
      ]);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="demo-chat">
      <div className="demo-chat-messages" ref={messagesContainerRef}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`demo-chat-message ${msg.from === "user" ? "user" : "bot"}`}
          >
            <div className={`demo-chat-bubble ${msg.from === "user" ? "user" : "bot"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="demo-chat-message bot typing">
            <div className="demo-chat-bubble bot">
              бот печатает...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isLoading) {
            void sendMessage();
          }
        }}
        className="demo-chat-input-row"
      >
        <textarea
          placeholder="Напишите вопрос..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!isLoading) {
                void sendMessage();
              }
            }
          }}
          className="demo-chat-input"
          rows={2}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="demo-chat-send"
        >
          Отправить
        </button>
      </form>
    </div>
  );
}