import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Lock,
  ArrowLeft,
  Mail,
  Shield,
  Server,
  EyeOff,
  AlertTriangle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const easeEnter = [0, 0, 0.2, 1] as [number, number, number, number];
const easeSpring = [0.34, 1.56, 0.64, 1] as [number, number, number, number];
const easeClinical = [0.4, 0, 0.2, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  Sub-components (isolated perpetual animations)                    */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function Credentials() {
  const navigate = useNavigate();
  const [requested, setRequested] = useState(false);

  /* ---- Lock icon slow pulse using CSS animation (per spec) ---- */
  useEffect(() => {
    const styleId = 'credentials-lock-pulse';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes lock-pulse {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 0.7; }
        }
        .lock-pulse-anim {
          animation: lock-pulse 4s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }
    return () => {
      const existing = document.getElementById(styleId);
      if (existing) document.head.removeChild(existing);
    };
  }, []);

  /* ---- Request Access handler ---- */
  const handleRequestAccess = () => {
    setRequested(true);
    toast.success('Access requests are reviewed by VNC ICU administrators', {
      description: 'Your request has been logged for administrator review.',
      duration: 4000,
    });
    setTimeout(() => setRequested(false), 3000);
  };

  return (
    <div
      className="relative flex flex-col"
      style={{
        minHeight: '100dvh',
        backgroundColor: '#0A0E1A',
      }}
    >
      {/* Navbar — still visible at top per spec */}
      <Navbar />

      {/* Spacer for fixed 56px navbar */}
      <div style={{ height: '56px' }} />

      {/* ---- Background grid + glow ---- */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/singularity-grid.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2,
          zIndex: 0,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* ---- Main content ---- */}
      <div
        className="relative flex flex-1 flex-col items-center justify-center px-6"
        style={{ zIndex: 1 }}
      >
        <motion.div
          className="flex flex-col items-center text-center"
          style={{ maxWidth: '560px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeEnter, delay: 0.1 }}
        >
          {/* ── Lock Icon with ring ── */}
          <motion.div
            className="relative flex items-center justify-center"
            style={{ marginBottom: '32px' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: easeSpring, delay: 0.3 }}
          >
            {/* Ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '120px',
                height: '120px',
                border: '1px solid #1E293B',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            {/* Lock */}
            <div
              className="lock-pulse-anim"
              style={{
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Lock
                size={80}
                strokeWidth={1.2}
                style={{ color: 'rgba(13, 148, 136, 0.6)' }}
              />
            </div>
          </motion.div>

          {/* ── 401 Status Code ── */}
          <motion.span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 500,
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              color: '#64748B',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: easeEnter, delay: 0.5 }}
          >
            401
          </motion.span>

          {/* ── Main Heading ── */}
          <motion.h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: '#F1F5F9',
              marginTop: '16px',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: easeEnter, delay: 0.65 }}
          >
            Authentication Required
          </motion.h1>

          {/* ── Divider ── */}
          <motion.div
            style={{
              height: '1px',
              backgroundColor: '#1E293B',
              marginTop: '24px',
              marginBottom: '24px',
            }}
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.3, ease: easeClinical, delay: 0.8 }}
          />

          {/* ── Primary Message ── */}
          <motion.p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '1.125rem',
              lineHeight: 1.7,
              color: '#94A3B8',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: easeEnter, delay: 0.95 }}
          >
            You need the proper credentials to operate this system.
          </motion.p>

          {/* ── Secondary Message ── */}
          <motion.p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '1rem',
              color: '#0D9488',
              marginTop: '12px',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: easeEnter, delay: 0.95 }}
          >
            Contact VNC ICU administrators.
          </motion.p>

          {/* ── Action Buttons ── */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4"
            style={{ marginTop: '40px' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: easeEnter, delay: 1.35 }}
          >
            {/* Request Access */}
            <motion.button
              className="flex items-center gap-2 cursor-pointer"
              style={{
                padding: '12px 24px',
                borderRadius: '4px',
                backgroundColor: '#0D9488',
                color: '#0A0E1A',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '1rem',
                border: 'none',
              }}
              whileHover={{
                y: -1,
                filter: 'brightness(1.1)',
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRequestAccess}
            >
              <Mail size={16} />
              {requested ? 'Request Submitted' : 'Request Access'}
            </motion.button>

            {/* Return to Dashboard */}
            <motion.button
              className="flex items-center gap-2 cursor-pointer"
              style={{
                padding: '12px 24px',
                borderRadius: '4px',
                backgroundColor: 'transparent',
                color: '#94A3B8',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '1rem',
                border: '1px solid #1E293B',
              }}
              whileHover={{
                borderColor: 'rgba(13, 148, 136, 0.5)',
                color: '#0D9488',
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/')}
            >
              <ArrowLeft size={16} />
              Return to Dashboard
            </motion.button>
          </motion.div>

          {/* ── Security Indicators ── */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-6"
            style={{ marginTop: '64px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: easeEnter, delay: 1.85 }}
          >
            {/* HIPAA Compliant */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.85 }}
            >
              <Shield size={16} style={{ color: '#10B981' }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  color: '#10B981',
                }}
              >
                HIPAA Compliant
              </span>
            </motion.div>

            {/* On-Premises */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.95 }}
            >
              <Server size={16} style={{ color: '#0D9488' }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  color: '#0D9488',
                }}
              >
                On-Premises
              </span>
            </motion.div>

            {/* Zero PII Exposure */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 2.05 }}
            >
              <EyeOff size={16} style={{ color: '#06B6D4' }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  color: '#06B6D4',
                }}
              >
                Zero PII Exposure
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Warning Banner ── */}
      <motion.div
        className="flex items-center justify-center gap-2"
        style={{
          width: '100%',
          padding: '12px 24px',
          backgroundColor: 'rgba(245, 158, 11, 0.12)',
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: easeEnter, delay: 2.0 }}
      >
        <AlertTriangle size={16} style={{ color: '#F59E0B', flexShrink: 0 }} />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.875rem',
            color: '#F59E0B',
            textAlign: 'center',
          }}
        >
          This is a credential-protected system. Unauthorized access attempts are
          logged and reviewed.
        </span>
      </motion.div>
    </div>
  );
}
