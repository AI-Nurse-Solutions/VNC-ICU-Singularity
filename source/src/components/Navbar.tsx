import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CalendarClock, Stethoscope, BrainCircuit, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [time, setTime] = useState('');
  const isSim = location.pathname === '/nurse-simulation';
  const isMarket = location.pathname === '/market-intelligence';

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      setTime(`${h}:${m}:${s} UTC`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6"
      style={{
        height: '56px',
        background: 'rgba(17, 24, 39, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1E293B',
      }}
    >
      {/* Left cluster */}
      <div className="flex items-center gap-3">
        {/* Pulsing status dot */}
        <div
          className="rounded-full"
          style={{
            width: '8px',
            height: '8px',
            backgroundColor: '#10B981',
            animation: 'status-pulse 2s infinite',
          }}
        />
        {/* System name */}
        <span
          className="cursor-pointer"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: '0.6875rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            color: '#0D9488',
          }}
          onClick={() => navigate('/')}
        >
          VNC ICU SINGULARITY
        </span>
        {/* Divider */}
        <div style={{ width: '1px', height: '20px', backgroundColor: '#1E293B' }} />
        {/* Subtitle */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '0.875rem',
            color: '#64748B',
          }}
        >
          Sovereign AI Operating System
        </span>
      </div>

      {/* Nav links — hidden on pages with their own headers */}
      {!isSim && !isMarket && (
        <div className="hidden md:flex items-center gap-1">
          <button
            onClick={() => navigate('/')}
            className="px-3 py-1 rounded transition-all"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#0D9488',
              backgroundColor: 'rgba(13, 148, 136, 0.08)',
            }}
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('/nurse-simulation')}
            className="px-3 py-1 rounded transition-all flex items-center gap-1 hover:bg-white/5"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#64748B',
            }}
          >
            <Stethoscope size={12} />
            Assignment Sim
          </button>
          <button
            onClick={() => navigate('/market-intelligence')}
            className="px-3 py-1 rounded transition-all flex items-center gap-1 hover:bg-white/5"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#64748B',
            }}
          >
            <BrainCircuit size={12} />
            Market Intel
          </button>
          <button
            onClick={() => navigate('/strategic-case')}
            className="px-3 py-1 rounded transition-all flex items-center gap-1"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#2DD4BF',
              backgroundColor: 'rgba(13, 148, 136, 0.12)',
              border: '1px solid rgba(13, 148, 136, 0.3)',
            }}
          >
            <Award size={12} />
            Strategic Case
          </button>
        </div>
      )}

      {/* Center cluster */}
      <div className="flex items-center gap-2">
        <CalendarClock size={16} style={{ color: '#64748B' }} />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            fontSize: '1rem',
            color: '#F1F5F9',
          }}
        >
          {time}
        </span>
      </div>

      {/* Right cluster */}
      <div className="flex items-center gap-4">
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '0.875rem',
            color: '#64748B',
          }}
        >
          Sutter Health
        </span>
        {/* Status pill */}
        <motion.div
          className="flex items-center gap-1.5 cursor-pointer"
          style={{
            padding: '2px 10px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
          }}
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/credentials')}
        >
          <div
            className="rounded-full"
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: '#10B981',
            }}
          />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '0.6875rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: '#10B981',
            }}
          >
            SYSTEM ONLINE
          </span>
        </motion.div>
      </div>
    </nav>
  );
}
