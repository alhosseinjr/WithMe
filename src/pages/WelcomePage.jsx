import React from 'react';
import { Link } from 'react-router-dom';
import { Handshake, ArrowRight, Shield, Users, Heart } from 'lucide-react';
import './WelcomePage.css';

const TAGS = ['Anxiety', 'Grief', 'Burnout', 'Loneliness', 'Stress'];

const FEATURES = [
  { icon: Users, title: 'Support Circles', desc: 'Join groups organized by what you\'re going through' },
  { icon: Shield, title: 'Safe & Anonymous', desc: '100% private. Share without judgment.' },
  { icon: Heart, title: 'Real Human Presence', desc: 'Not bots, not advice — just people who get it' },
];

export default function WelcomePage() {
  return (
    <div className="welcome-page">
      <div className="welcome-glow glow-1" />
      <div className="welcome-glow glow-2" />

      <div className="welcome-container fade-in">
        <div className="welcome-hero">
          <div className="hero-brand-mark">
            <Handshake size={32} />
          </div>
          <h1 className="hero-title">WithMe</h1>
          <p className="hero-tagline">
            You don't have to go through it alone.
          </p>
        </div>

        <div className="welcome-tags">
          {TAGS.map((t) => (
            <span key={t} className="badge badge-primary">{t}</span>
          ))}
        </div>

        <div className="welcome-features">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card card-glass">
              <div className="feature-icon-wrap">
                <f.icon size={20} />
              </div>
              <div>
                <h4 className="feature-title">{f.title}</h4>
                <p className="feature-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="welcome-actions">
          <Link to="/signup" className="btn btn-primary btn-lg welcome-btn">
            Get started free <ArrowRight size={18} />
          </Link>
          <Link to="/login" className="btn btn-secondary btn-lg welcome-btn">
            Sign in to your account
          </Link>
        </div>

        <p className="welcome-disclaimer">
          WithMe is a peer support community, not a substitute for professional help.
        </p>
      </div>
    </div>
  );
}
