import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { STRUGGLES } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import Icon from '../components/Icon';
import './CirclesPage.css';

const getStruggle = (id) => STRUGGLES.find((s) => s.id === id) || {};

export default function CirclesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [circles, setCircles] = useState([]);
  const [myCircles, setMyCircles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('discover');
  const [search, setSearch] = useState('');

  const fetchCircles = useCallback(async () => {
    const { data: allCircles } = await supabase.from('circles').select('*, circle_members(count)').order('created_at', { ascending: false });
    const { data: memberships } = await supabase.from('circle_members').select('circle_id').eq('user_id', user.id);
    const myIds = (memberships || []).map((m) => m.circle_id);
    setMyCircles(myIds);
    setCircles(allCircles || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchCircles(); }, [fetchCircles]);

  const joinCircle = async (circleId) => {
    if (myCircles.includes(circleId)) { navigate(`/circles/${circleId}`); return; }
    await supabase.from('circle_members').insert({ circle_id: circleId, user_id: user.id });
    setMyCircles((prev) => [...prev, circleId]);
    navigate(`/circles/${circleId}`);
  };

  let displayed = tab === 'mine' ? circles.filter((c) => myCircles.includes(c.id)) : circles;
  if (search.trim()) displayed = displayed.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-content fade-in">
      <div className="page-header">
        <div>
          <h2>Circles</h2>
          <p className="page-header-sub">Safe spaces organized by what you're going through</p>
        </div>
      </div>

      <div className="circles-toolbar">
        <div className="circles-tabs">
          <button className={`tab-btn${tab === 'discover' ? ' active' : ''}`} onClick={() => setTab('discover')}>Discover</button>
          <button className={`tab-btn${tab === 'mine' ? ' active' : ''}`} onClick={() => setTab('mine')}>
            My circles{myCircles.length > 0 ? ` (${myCircles.length})` : ''}
          </button>
        </div>
        <div className="search-wrap">
          <Search size={16} className="search-icon" />
          <input className="search-input" placeholder="Search circles..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 60 }}>
          <div className="spinner" style={{ color: 'var(--primary)', width: 28, height: 28 }} />
        </div>
      ) : displayed.length === 0 ? (
        <div className="empty-state">
          <Users className="empty-icon" />
          <div className="empty-title">{tab === 'mine' ? 'No circles joined yet' : 'No circles found'}</div>
          <div className="empty-desc">{tab === 'mine' ? 'Explore Discover to find and join circles.' : 'Try a different search term.'}</div>
        </div>
      ) : (
        <div className="circles-list">
          {displayed.map((c) => {
            const s = getStruggle(c.struggle_type);
            const isMember = myCircles.includes(c.id);
            const count = c.circle_members?.[0]?.count || 0;

            return (
              <button key={c.id} className="circle-row card card-hover" onClick={() => joinCircle(c.id)}>
                <div className="circle-row-icon" style={{ background: (s.color || 'var(--primary)') + '18', color: s.color || 'var(--primary)' }}>
                  {s.icon ? <Icon name={s.icon} size={20} /> : <Users size={20} />}
                </div>
                <div className="circle-row-body">
                  <div className="circle-row-top">
                    <span className="circle-row-name">{c.name}</span>
                    {isMember && <span className="badge badge-accent">Joined</span>}
                  </div>
                  <p className="circle-row-desc">{c.description}</p>
                  <div className="circle-row-meta">
                    <span className="circle-row-members"><Users size={13} /> {count} members</span>
                    {s.label && (
                      <span className="circle-row-tag" style={{ background: (s.color || 'var(--primary)') + '18', color: s.color || 'var(--primary)' }}>
                        {s.label}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
