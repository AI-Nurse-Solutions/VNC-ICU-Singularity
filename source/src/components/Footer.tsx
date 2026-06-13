import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#0A0E1A',
        borderTop: '1px solid #1E293B',
      }}
    >
      {/* Main footer row */}
      <motion.div
        className="mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
        style={{
          maxWidth: '1200px',
          padding: '32px 24px',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        {/* Left */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '0.875rem',
              color: '#F1F5F9',
            }}
          >
            VNC ICU Singularity
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '0.875rem',
              color: '#64748B',
            }}
          >
            A Sovereign AI Operating System
          </span>
        </div>

        {/* Center */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '0.875rem',
            color: '#94A3B8',
            textAlign: 'center',
          }}
        >
          Built for Sutter Health | 44-Bed High Acuity Medical Surgical ICU | 200 Nurses
        </span>

        {/* Right */}
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 400,
            fontSize: '0.8125rem',
            color: '#64748B',
          }}
        >
          Prototype · On-Premises
        </span>
      </motion.div>

      {/* Legal bar */}
      <div
        style={{
          backgroundColor: '#0A0E1A',
          borderTop: '1px solid #1E293B',
          padding: '16px 24px',
        }}
      >
        <div className="mx-auto flex items-center justify-center gap-2" style={{ maxWidth: '1200px' }}>
          <Shield size={14} style={{ color: '#64748B', flexShrink: 0 }} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '0.875rem',
              color: '#64748B',
              textAlign: 'center',
            }}
          >
            No patient-identifiable information is stored, processed, or displayed in this system. All clinical data is pseudonymized per HIPAA requirements. Proposal and working prototype for the Sutter Health Innovation Challenge 2026 — figures shown are illustrative pilot targets.
          </span>
        </div>
      </div>
    </footer>
  );
}
