import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, ShieldAlert, ArrowLeft } from 'lucide-react';
import { chatWithCompanion } from '../lib/groq';
import './CompanionPage.css';
import { useNavigate } from 'react-router-dom';

export default function CompanionPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi there. I'm here to listen. Whatever is on your mind, you can share it with me safely here. It's completely private." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input.trim() };
    const newHistory = [...messages, userMsg];
    
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    const reply = await chatWithCompanion(newHistory);
    
    setMessages([...newHistory, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  return (
    <div className="page-content fade-in cp-page">
      <div className="cp-header">
        <button className="btn-ghost cp-back" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
        <div className="cp-title-wrap">
          <div className="cp-icon" style={{ background: 'var(--primary-muted)', color: 'var(--primary)' }}>
            <Sparkles size={18} />
          </div>
          <div>
            <h2>AI Listener</h2>
            <p className="page-header-sub">Private, judgment-free space</p>
          </div>
        </div>
      </div>

      <div className="cp-privacy card-glass">
        <ShieldAlert size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
        <span>This conversation is private and not saved to the community. I'm an AI, here to listen, but not a replacement for professional help.</span>
      </div>

      <div className="cp-chat">
        {messages.map((m, i) => (
          <div key={i} className={`cp-msg-row ${m.role === 'user' ? 'cp-msg-right' : 'cp-msg-left'}`}>
            {m.role === 'assistant' && (
              <div className="avatar avatar-sm cp-avatar" style={{ background: 'var(--primary)', color: '#fff' }}>
                <Sparkles size={14} />
              </div>
            )}
            <div className={`cp-bubble ${m.role === 'user' ? 'cp-bubble-user' : 'cp-bubble-ai'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="cp-msg-row cp-msg-left">
            <div className="avatar avatar-sm cp-avatar" style={{ background: 'var(--primary)', color: '#fff' }}>
              <Sparkles size={14} />
            </div>
            <div className="cp-bubble cp-bubble-ai">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="cp-input-area" onSubmit={handleSend}>
        <input 
          className="input cp-input" 
          placeholder="I've been feeling..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="btn btn-primary cp-send" disabled={!input.trim() || loading}>
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
