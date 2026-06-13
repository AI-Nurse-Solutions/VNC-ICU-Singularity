import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Database, Users, ClipboardCheck, Lock,
  ShieldCheck, AlertTriangle, ShieldOff,
  CheckCircle2, Clock, Ban,
  Handshake, CalendarDays, BookOpen, TrendingUp, Award, GraduationCap,
  ArrowUp, ArrowDown, Stethoscope, Bed, UserRound, Cpu, Activity, ChevronRight,
  Zap, BrainCircuit, Eye, TrendingUp as TrendingUpIcon, Globe,
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import {
  LineChart, Line, ResponsiveContainer,
} from 'recharts';

/* ─── Clickable Card Wrapper ─── */
function ClickableCard({ children, className, style, delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const navigate = useNavigate();
  return (
    <motion.div
      className={className}
      style={{ cursor: 'pointer', ...style }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
      whileHover={{ y: -3 }}
      onClick={() => navigate('/credentials')}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = '', prefix = '', decimals = 0 }: {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? value.toFixed(decimals) : Math.round(value)}{suffix}
    </span>
  );
}

/* ─── Sparkline Data ─── */
const sparkData1 = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  value: 1.8 + Math.sin(i * 0.4) * 0.3 + i * 0.025 + Math.random() * 0.15,
}));
const sparkData2 = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  value: 88 + Math.sin(i * 0.3) * 4 + i * 0.3 + Math.random() * 2,
}));
const sparkData3 = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  value: 0.3 + Math.sin(i * 0.5) * 0.08 + Math.random() * 0.05,
}));

/* ─── Mini Sparkline ─── */
function MiniSparkline({ data, color, label }: {
  data: { day: number; value: number }[];
  color: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div style={{ width: '120px', height: '40px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.875rem',
          color: '#64748B',
          marginTop: '8px',
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HOME PAGE — Orchestration Dashboard
   ═══════════════════════════════════════════════════ */
export default function Home() {
  const navigate = useNavigate();

  /* ─── Easing ─── */
  const ease = [0, 0, 0.2, 1] as [number, number, number, number];

  /* ══════ SECTION 2: HERO ══════ */
  const HeroSection = () => (
    <section
      className="relative flex flex-col items-center justify-center text-center"
      style={{
        minHeight: '70vh',
        padding: '96px 24px 64px',
        backgroundColor: '#0A0E1A',
        backgroundImage: `url(/singularity-grid.svg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Glow */}
      <div
        className="absolute"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10 flex flex-col items-center" style={{ maxWidth: '1200px' }}>
        {/* Unit Badge */}
        <motion.div
          style={{
            padding: '8px 16px',
            borderRadius: '9999px',
            backgroundColor: '#1A2332',
            border: '1px solid #1E293B',
            marginBottom: '24px',
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3, ease }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '0.6875rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#0D9488',
            }}
          >
            44-BED HIGH ACUITY MEDICAL SURGICAL ICU
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#F1F5F9',
          }}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
        >
          VNC ICU{' '}
          <motion.span
            style={{ color: '#0D9488' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Singularity
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '1.125rem',
            lineHeight: 1.6,
            color: '#94A3B8',
            maxWidth: '640px',
            marginTop: '20px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9, ease }}
        >
          An On-Premises AI Operating System for Clinical Operations Governance
        </motion.p>

        {/* Unit Stats Bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-10"
          style={{ marginTop: '40px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2, ease }}
        >
          {[
            { value: 44, label: 'BEDS' },
            { value: 200, label: 'NURSES' },
            { value: 6, label: 'OPERATIONAL DOMAINS' },
            { value: 3, label: 'GOVERNANCE ZONES' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.2 + i * 0.15, ease }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 500,
                  fontSize: '2rem',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  color: '#F1F5F9',
                }}
              >
                <AnimatedCounter target={stat.value} />
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  color: '#64748B',
                  marginTop: '4px',
                  letterSpacing: '0.08em',
                }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Cluster */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          style={{ marginTop: '32px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.8, ease }}
        >
          <motion.button
            style={{
              padding: '12px 24px',
              borderRadius: '4px',
              backgroundColor: '#0D9488',
              color: '#0A0E1A',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
            }}
            whileHover={{ y: -1, filter: 'brightness(1.1)' }}
            onClick={() => navigate('/credentials')}
          >
            View Operational Dashboard
          </motion.button>
          <motion.button
            style={{
              padding: '12px 24px',
              borderRadius: '4px',
              backgroundColor: 'transparent',
              color: '#94A3B8',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '1rem',
              border: '1px solid #1E293B',
              cursor: 'pointer',
            }}
            whileHover={{ borderColor: 'rgba(13, 148, 136, 0.5)', color: '#0D9488' }}
            onClick={() => navigate('/governance-charter')}
          >
            View Governance Charter
          </motion.button>
        </motion.div>
      </div>
    </section>
  );

  /* ══════ SECTION 3: SYSTEM STATUS ══════ */
  const StatusSection = () => {
    const items = [
      { icon: Shield, label: 'AI Governance Engine', status: 'Online', color: '#10B981' },
      { icon: Database, label: 'Pseudonymization Pipeline', status: 'Online', color: '#10B981' },
      { icon: Users, label: 'Approval Queue System', status: 'Active', color: '#10B981' },
      { icon: ClipboardCheck, label: 'Audit Logging', status: 'Online', color: '#10B981' },
      { icon: Lock, label: 'On-Premises Security', status: 'Secure', color: '#0D9488' },
    ];

    return (
      <section
        style={{
          backgroundColor: '#111827',
          padding: '32px 24px',
        }}
      >
        <div
          className="mx-auto flex flex-wrap justify-between items-center gap-6"
          style={{ maxWidth: '1200px' }}
        >
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-2 cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1, ease }}
              onClick={() => navigate('/credentials')}
            >
              <item.icon size={20} style={{ color: item.color }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  color: '#94A3B8',
                }}
              >
                {item.label}
              </span>
              <div
                className="rounded-full"
                style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: item.color,
                  animation: i < 4 ? 'status-pulse 2s infinite' : undefined,
                }}
              />
            </motion.div>
          ))}
        </div>
      </section>
    );
  };

  /* ══════ SECTION 4: THREE-ZONE GOVERNANCE ══════ */
  const ZoneGovernanceSection = () => {
    const zones = [
      {
        color: '#10B981',
        dimColor: 'rgba(16, 185, 129, 0.12)',
        badge: 'GREEN',
        icon: ShieldCheck,
        title: 'Auto-Execute with Logging',
        description: 'Low-risk operations proceed automatically. All actions are logged for audit.',
        listIcon: CheckCircle2,
        items: ['Knowledge base retrieval', 'Scheduling grid display', 'Onboarding milestone tracking'],
        stat: '23 Workflows Governed',
      },
      {
        color: '#F59E0B',
        dimColor: 'rgba(245, 158, 11, 0.12)',
        badge: 'YELLOW',
        icon: AlertTriangle,
        title: 'Route to Human for Approval',
        description: 'Medium-risk operations require human sign-off before execution.',
        listIcon: Clock,
        items: ['Handoff packet finalization', 'Assignment changes'],
        stat: '8 Workflows Pending Review',
      },
      {
        color: '#EF4444',
        dimColor: 'rgba(239, 68, 68, 0.12)',
        badge: 'RED',
        icon: ShieldOff,
        title: 'Blocked by Default',
        description: 'High-risk clinical decisions remain exclusively human. AI provides context, never judgment.',
        listIcon: Ban,
        items: ['Clinical judgment', 'Diagnosis recommendations', 'Treatment recommendations'],
        stat: '0 Unauthorized Access Attempts',
      },
    ];

    return (
      <section
        style={{
          backgroundColor: '#0A0E1A',
          padding: '80px 24px',
        }}
      >
        <div className="mx-auto" style={{ maxWidth: '1200px' }}>
          {/* Section Header */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '0.6875rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#0D9488',
              }}
            >
              GOVERNANCE FRAMEWORK
            </span>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                color: '#F1F5F9',
                marginTop: '12px',
              }}
            >
              Three-Zone Decision Engine
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#94A3B8',
                maxWidth: '600px',
                marginTop: '12px',
              }}
            >
              Every AI-assisted workflow is classified by risk level. The system enforces the appropriate level of human oversight automatically.
            </p>
          </motion.div>

          {/* Zone Cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
            style={{ marginTop: '48px' }}
          >
            {zones.map((zone, i) => (
              <ClickableCard
                key={zone.badge}
                className="flex flex-col"
                delay={i * 0.15}
                style={{
                  backgroundColor: '#111827',
                  border: '1px solid #1E293B',
                  borderLeft: `4px solid ${zone.color}`,
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="flex items-center gap-2"
                    style={{
                      padding: '0 12px',
                      height: '28px',
                      borderRadius: '9999px',
                      background: zone.color === '#10B981'
                        ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                        : zone.color === '#F59E0B'
                          ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                          : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: '0.6875rem',
                        letterSpacing: '0.08em',
                        color: '#0A0E1A',
                      }}
                    >
                      {zone.badge}
                    </span>
                  </div>
                  <zone.icon size={20} style={{ color: zone.color }} />
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    lineHeight: 1.3,
                    color: '#F1F5F9',
                  }}
                >
                  {zone.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    color: '#94A3B8',
                    marginTop: '8px',
                  }}
                >
                  {zone.description}
                </p>

                {/* Workflow list */}
                <div className="flex flex-col gap-2" style={{ marginTop: '16px' }}>
                  {zone.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <zone.listIcon size={16} style={{ color: zone.color, flexShrink: 0 }} />
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.875rem',
                          color: '#94A3B8',
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom stat */}
                <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      letterSpacing: '0.02em',
                      color: zone.color,
                    }}
                  >
                    {zone.stat}
                  </span>
                </div>
              </ClickableCard>
            ))}
          </div>

          {/* Zone Flow Visualization */}
          <motion.div
            className="flex justify-center"
            style={{ marginTop: '48px' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <img
              src="/zone-visualization.svg"
              alt="Zone visualization"
              style={{ maxWidth: '800px', width: '100%' }}
            />
          </motion.div>
        </div>
      </section>
    );
  };

  /* ══════ SECTION 5: SIX OPERATIONAL DOMAINS ══════ */
  const DomainsSection = () => {
    const domains = [
      { icon: Handshake, color: '#0D9488', bg: 'rgba(13, 148, 136, 0.1)', num: '01', name: 'Care Coordination & Handoffs', desc: 'Structured handoff packets, open task tracking across shifts', metrics: [{ val: '97%', label: 'Handoff Completeness' }, { val: '12', label: 'Open Tasks' }] },
      { icon: CalendarDays, color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.1)', num: '02', name: 'Scheduling & Assignments', desc: 'Staffing grids, PTO workflows, assignment balancing', metrics: [{ val: '4.2h', label: 'Avg Cycle Time' }, { val: '200', label: 'Active Staff' }] },
      { icon: BookOpen, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)', num: '03', name: 'Knowledge Base', desc: 'SOPs, equipment guides, policies, unit playbooks', metrics: [{ val: '142', label: 'Documents' }, { val: '98%', label: 'Search Accuracy' }] },
      { icon: TrendingUp, color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', num: '04', name: 'Quality Improvement', desc: 'QI initiatives, evidence bundles, unit metrics tracking', metrics: [{ val: '6', label: 'Active Initiatives' }, { val: '94%', label: 'Bundle Adherence' }] },
      { icon: Award, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', num: '05', name: 'Clinical Ladders', desc: 'Ladder progression, portfolios, proof-of-work tracking', metrics: [{ val: '38', label: 'Active Portfolios' }, { val: '5', label: 'Levels' }] },
      { icon: GraduationCap, color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', num: '06', name: 'Education & Onboarding', desc: 'AI-enabled orientation, microlearning, competency tracking', metrics: [{ val: '18', label: 'Days to Competency' }, { val: '12', label: 'In Orientation' }] },
    ];

    return (
      <section
        style={{
          backgroundColor: '#111827',
          padding: '80px 24px',
        }}
      >
        <div className="mx-auto" style={{ maxWidth: '1200px' }}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '0.6875rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#0D9488',
              }}
            >
              OPERATIONAL DOMAINS
            </span>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                color: '#F1F5F9',
                marginTop: '12px',
              }}
            >
              Unified Command Across Every Function
            </h2>
          </motion.div>

          {/* Domain Cards Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            style={{ marginTop: '48px' }}
          >
            {domains.map((d, i) => (
              <ClickableCard
                key={d.num}
                className="flex flex-col"
                delay={i * 0.08}
                style={{
                  backgroundColor: '#0A0E1A',
                  border: '1px solid #1E293B',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                {/* Top: icon + number */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: d.bg,
                    }}
                  >
                    <d.icon size={20} style={{ color: d.color }} />
                  </div>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: '0.6875rem',
                      letterSpacing: '0.08em',
                      color: '#64748B',
                    }}
                  >
                    {d.num}
                  </span>
                </div>

                {/* Middle: name + description */}
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    lineHeight: 1.3,
                    color: '#F1F5F9',
                  }}
                >
                  {d.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    color: '#94A3B8',
                    marginTop: '8px',
                  }}
                >
                  {d.desc}
                </p>

                {/* Bottom: metrics */}
                <div className="flex gap-6" style={{ marginTop: 'auto', paddingTop: '16px' }}>
                  {d.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col">
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 500,
                          fontSize: '0.875rem',
                          letterSpacing: '0.02em',
                          color: '#F1F5F9',
                        }}
                      >
                        {m.val}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.6875rem',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: '#64748B',
                          marginTop: '2px',
                        }}
                      >
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </ClickableCard>
            ))}
          </div>
        </div>
      </section>
    );
  };

  /* ══════ SECTION 6: QUALITY METRICS ══════ */
  const MetricsSection = () => {
    const metrics = [
      { borderColor: '#0D9488', label: 'TIME RETURNED TO BEDSIDE', value: 2.4, suffix: ' hrs/shift', trendUp: true, trendVal: '+18%', trendColor: '#10B981', subtext: 'Measurable reduction in admin burden per nurse per shift' },
      { borderColor: '#10B981', label: 'HANDOFF COMPLETENESS', value: 97, suffix: '%', trendUp: true, trendVal: '+5%', trendColor: '#10B981', subtext: '% of packets with all required fields completed' },
      { borderColor: '#06B6D4', label: 'SCHEDULING CYCLE TIME', value: 4.2, suffix: ' hours', trendUp: false, trendVal: '-32%', trendColor: '#10B981', subtext: 'Request to confirmed assignment' },
      { borderColor: '#3B82F6', label: 'ONBOARDING TIME-TO-COMPETENCY', value: 18, suffix: ' days', trendUp: false, trendVal: '-22%', trendColor: '#10B981', subtext: 'Days from hire to competency sign-off' },
      { borderColor: '#F59E0B', label: 'OVERRIDE & ERROR RATES', valueStr: '0.3%', trendUp: true, trendVal: '+0.1%', trendColor: '#F59E0B', subtext: 'Human overrides and system errors' },
      { borderColor: '#10B981', label: 'STAFF TRUST SCORE', value: 4.6, suffix: '/5.0', trendUp: true, trendVal: '+0.3', trendColor: '#10B981', subtext: 'Zero privacy incidents to date', badge: 'ZERO PRIVACY INCIDENTS' },
    ];

    return (
      <section
        style={{
          backgroundColor: '#0A0E1A',
          padding: '80px 24px',
        }}
      >
        <div className="mx-auto" style={{ maxWidth: '1200px' }}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '0.6875rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#0D9488',
              }}
            >
              SUCCESS METRICS
            </span>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                color: '#F1F5F9',
                marginTop: '12px',
              }}
            >
              Measuring What Matters
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#94A3B8',
                maxWidth: '640px',
                marginTop: '12px',
              }}
            >
              Every metric is designed to measure time returned to the bedside and trust maintained in the system.
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            style={{ marginTop: '48px' }}
          >
            {metrics.map((m, i) => (
              <ClickableCard
                key={m.label}
                className="flex flex-col"
                delay={i * 0.08}
                style={{
                  backgroundColor: '#111827',
                  border: '1px solid #1E293B',
                  borderLeft: `4px solid ${m.borderColor}`,
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                {/* Top row: label */}
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.6875rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#64748B',
                  }}
                >
                  {m.label}
                </span>

                {/* Value */}
                <div className="flex items-baseline gap-1" style={{ marginTop: '12px' }}>
                  {'valueStr' in m ? (
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 500,
                        fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                        letterSpacing: '-0.04em',
                        lineHeight: 1,
                        color: '#F1F5F9',
                      }}
                    >
                      {m.valueStr}
                    </span>
                  ) : (
                    <>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 500,
                          fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                          letterSpacing: '-0.04em',
                          lineHeight: 1,
                          color: '#F1F5F9',
                        }}
                      >
                        <AnimatedCounter target={m.value as number} decimals={m.value === 4.6 ? 1 : m.value === 2.4 || m.value === 4.2 ? 1 : 0} />
                      </span>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                          fontSize: m.suffix === '/5.0' ? '1.125rem' : '0.875rem',
                          color: m.suffix === '/5.0' ? '#94A3B8' : '#94A3B8',
                        }}
                      >
                        {m.suffix}
                      </span>
                    </>
                  )}
                </div>

                {/* Trend */}
                <div className="flex items-center gap-1" style={{ marginTop: '8px' }}>
                  {m.trendUp ? (
                    <ArrowUp size={14} style={{ color: m.trendColor }} />
                  ) : (
                    <ArrowDown size={14} style={{ color: m.trendColor }} />
                  )}
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      color: m.trendColor,
                    }}
                  >
                    {m.trendVal}
                  </span>
                </div>

                {/* Subtext */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    color: '#64748B',
                    marginTop: '8px',
                  }}
                >
                  {m.subtext}
                </p>

                {/* Badge if applicable */}
                {'badge' in m && (
                  <div
                    className="self-start"
                    style={{
                      marginTop: '12px',
                      padding: '2px 10px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: '0.6875rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#10B981',
                      }}
                    >
                      {m.badge}
                    </span>
                  </div>
                )}
              </ClickableCard>
            ))}
          </div>

          {/* Mini Sparkline Row */}
          <motion.div
            className="flex flex-wrap justify-center gap-12"
            style={{ marginTop: '40px' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <MiniSparkline data={sparkData1} color="#0D9488" label="Bedside Time Trend (30d)" />
            <MiniSparkline data={sparkData2} color="#06B6D4" label="Handoff Quality Trend (30d)" />
            <MiniSparkline data={sparkData3} color="#3B82F6" label="System Override Trend (30d)" />
          </motion.div>
        </div>
      </section>
    );
  };

  /* ══════ SECTION 7: GOVERNANCE FLYWHEEL ══════ */
  const FlywheelSection = () => {
    const stats = [
      { value: 90, label: 'DAYS TO FEASIBILITY' },
      { value: 0, label: 'NEW FTES REQUIRED' },
      { value: 1, label: 'YEAR TO SCALE' },
    ];

    return (
      <section
        style={{
          backgroundColor: '#111827',
          padding: '80px 24px',
        }}
      >
        <div className="mx-auto" style={{ maxWidth: '1200px' }}>
          {/* Section Header */}
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '0.6875rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#0D9488',
              }}
            >
              TRUST MECHANISM
            </span>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                color: '#F1F5F9',
                marginTop: '12px',
              }}
            >
              The Governance Flywheel
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#94A3B8',
                maxWidth: '560px',
                marginTop: '12px',
              }}
            >
              Trust is not assumed — it is built, verified, and expanded through demonstrated stewardship.
            </p>
          </motion.div>

          {/* Flywheel Image */}
          <motion.div
            className="flex justify-center cursor-pointer"
            style={{ marginTop: '48px' }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            whileHover={{ rotate: 1 }}
            onClick={() => navigate('/credentials')}
          >
            <img
              src="/governance-flywheel.svg"
              alt="Governance Flywheel"
              style={{ maxWidth: '700px', width: '100%' }}
            />
          </motion.div>

          {/* Key Statistics Bar */}
          <motion.div
            className="flex flex-wrap justify-center gap-10"
            style={{
              marginTop: '48px',
              padding: '32px',
              backgroundColor: '#0A0E1A',
              borderRadius: '12px',
              border: '1px solid #1E293B',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="flex flex-col items-center cursor-pointer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
                onClick={() => navigate('/credentials')}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 500,
                    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: '#F1F5F9',
                  }}
                >
                  <AnimatedCounter target={s.value} />
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.6875rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#64748B',
                    marginTop: '8px',
                  }}
                >
                  {s.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  };

  /* ══════ SECTION 8: PILOT ROADMAP TIMELINE ══════ */
  const TimelineSection = () => {
    const phases = [
      {
        phase: 'PHASE 1 — DAYS 1-30',
        title: 'Foundation',
        color: '#0D9488',
        fillColor: '#0D9488',
        statusColor: '#10B981',
        statusText: 'COMPLETE',
        tasks: [
          'Establish governance charter',
          'Define decision-rights matrix',
          'Inventory all AI-assisted workflows',
          'Classify workflows by zone',
        ],
        isActive: true,
        isCompleted: true,
      },
      {
        phase: 'PHASE 2 — DAYS 31-60',
        title: 'Build',
        color: '#0D9488',
        fillColor: '#0D9488',
        statusColor: '#F59E0B',
        statusText: 'IN PROGRESS',
        tasks: [
          'Deploy pseudonymization pipeline',
          'Configure approval queues',
          'Implement audit logging',
          'Train first steward cohort',
        ],
        isActive: true,
        isCompleted: false,
        isInProgress: true,
      },
      {
        phase: 'PHASE 3 — DAYS 61-90',
        title: 'Launch & Measure',
        color: '#64748B',
        fillColor: '#0A0E1A',
        statusColor: '#64748B',
        statusText: 'UPCOMING',
        tasks: [
          'Launch controlled workflow pilot',
          'Measure all six success metrics',
          'Collect staff feedback',
          'Prepare scale recommendation',
        ],
        isActive: false,
        isCompleted: false,
      },
    ];

    return (
      <section
        style={{
          backgroundColor: '#0A0E1A',
          padding: '80px 24px 96px',
        }}
      >
        <div className="mx-auto" style={{ maxWidth: '1200px' }}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '0.6875rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#0D9488',
              }}
            >
              90-DAY PILOT
            </span>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                color: '#F1F5F9',
                marginTop: '12px',
              }}
            >
              Roadmap to Deployment
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#94A3B8',
                marginTop: '12px',
              }}
            >
              A phased approach to building trust, infrastructure, and measurable impact.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative" style={{ marginTop: '48px' }}>
            {/* Desktop horizontal line */}
            <div className="hidden md:block relative" style={{ height: '2px', backgroundColor: '#1E293B', marginTop: '8px' }}>
              {/* Active portion of line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '50%',
                  height: '100%',
                  backgroundColor: '#0D9488',
                }}
              />
            </div>

            {/* Phase Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ marginTop: '24px' }}>
              {phases.map((p, i) => (
                <motion.div
                  key={p.phase}
                  className="flex flex-col items-center cursor-pointer"
                  initial={{ opacity: 0, y: 25, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, delay: i * 0.4, ease }}
                  onClick={() => navigate('/credentials')}
                >
                  {/* Node */}
                  <div
                    className="rounded-full flex-shrink-0"
                    style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: p.fillColor,
                      border: p.isActive ? `2px solid ${p.color}` : '2px solid #1E293B',
                      marginBottom: '16px',
                      boxShadow: p.isInProgress ? '0 0 8px rgba(13, 148, 136, 0.5)' : undefined,
                      animation: p.isInProgress ? 'pulse-glow 2s infinite' : undefined,
                    }}
                  />

                  {/* Card */}
                  <div
                    className="w-full flex flex-col"
                    style={{
                      backgroundColor: '#111827',
                      borderRadius: '12px',
                      border: '1px solid #1E293B',
                      padding: '20px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: '0.6875rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: p.color,
                      }}
                    >
                      {p.phase}
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: '1.25rem',
                        lineHeight: 1.3,
                        color: '#F1F5F9',
                        marginTop: '8px',
                      }}
                    >
                      {p.title}
                    </h3>

                    {/* Tasks */}
                    <div className="flex flex-col gap-2" style={{ marginTop: '12px' }}>
                      {p.tasks.map((task) => (
                        <div key={task} className="flex items-center gap-2">
                          <CheckCircle2 size={14} style={{ color: '#10B981', flexShrink: 0 }} />
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: '0.875rem',
                              color: '#94A3B8',
                            }}
                          >
                            {task}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2" style={{ marginTop: '12px' }}>
                      {p.isInProgress && (
                        <div
                          className="rounded-full"
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#F59E0B',
                            animation: 'status-pulse 3s infinite',
                          }}
                        />
                      )}
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 500,
                          fontSize: '0.6875rem',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: p.statusColor,
                        }}
                      >
                        Status: {p.statusText}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  /* ══════ SECTION: NURSE ASSIGNMENT SIMULATION FEATURE ══════ */
  const SimulationBannerSection = () => {
    const stats = [
      { icon: Bed, value: '10', label: 'PATIENTS', sub: 'Med-Surg ICU', color: '#0D9488' },
      { icon: UserRound, value: '12', label: 'NURSES', sub: 'On Duty', color: '#06B6D4' },
      { icon: Cpu, value: '24', label: 'DEVICES', sub: 'Skill-Matched', color: '#3B82F6' },
      { icon: Zap, value: '100%', label: 'REAL-TIME', sub: 'Dynamic Matching', color: '#10B981' },
    ];

    return (
      <section
        style={{
          backgroundColor: '#0D1117',
          padding: '64px 24px',
          borderTop: '1px solid #1E293B',
          borderBottom: '1px solid #1E293B',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%)',
            top: '-100px',
            right: '-100px',
          }}
        />

        <div className="mx-auto" style={{ maxWidth: '1200px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Left: Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease }}
              >
                {/* Badge */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                  style={{
                    backgroundColor: 'rgba(13, 148, 136, 0.1)',
                    border: '1px solid rgba(13, 148, 136, 0.25)',
                  }}
                >
                  <Activity size={12} style={{ color: '#0D9488' }} />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: '0.625rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#0D9488',
                    }}
                  >
                    LIVE SIMULATION MODULE
                  </span>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    color: '#F1F5F9',
                  }}
                >
                  Device-Skill{' '}
                  <span style={{ color: '#0D9488' }}>Assignment Engine</span>
                </h2>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    color: '#94A3B8',
                    maxWidth: '520px',
                    marginTop: '16px',
                  }}
                >
                  Match patients to nurses based on device requirements and skill compatibility. 
                  Add or remove devices in real time and watch assignments recalculate instantly. 
                  When needs exceed the skilled pool, the system alerts you to call in reinforcements.
                </p>

                {/* Feature bullets */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5">
                  {[
                    'Add / Remove Devices',
                    'Live Compatibility Scoring',
                    'Skill Pool Alerts',
                    '12-Nurse Skill Matrix',
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-1.5">
                      <CheckCircle2 size={13} style={{ color: '#10B981' }} />
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.8125rem',
                          color: '#94A3B8',
                        }}
                      >
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  className="flex items-center gap-2 mt-6"
                  style={{
                    padding: '14px 28px',
                    borderRadius: '8px',
                    backgroundColor: '#0D9488',
                    color: '#0A0E1A',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  whileHover={{ y: -2, filter: 'brightness(1.1)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/nurse-simulation')}
                >
                  <Stethoscope size={18} />
                  Launch Assignment Simulation
                  <ChevronRight size={16} />
                </motion.button>
              </motion.div>
            </div>

            {/* Right: Stats Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="rounded-lg p-4 flex flex-col items-center text-center"
                    style={{
                      backgroundColor: '#111827',
                      border: `1px solid ${stat.color}20`,
                      borderTop: `3px solid ${stat.color}`,
                    }}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: i * 0.1, ease }}
                    whileHover={{ y: -3, borderColor: `${stat.color}50` }}
                  >
                    <stat.icon size={22} style={{ color: stat.color, marginBottom: '8px' }} />
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 500,
                        fontSize: '1.75rem',
                        color: '#F1F5F9',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: '0.625rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: stat.color,
                        marginTop: '4px',
                      }}
                    >
                      {stat.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.6875rem',
                        color: '#64748B',
                        marginTop: '2px',
                      }}
                    >
                      {stat.sub}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Mini preview hint */}
              <motion.div
                className="mt-3 rounded-lg p-3 flex items-center gap-3 cursor-pointer"
                style={{
                  backgroundColor: 'rgba(13, 148, 136, 0.05)',
                  border: '1px dashed rgba(13, 148, 136, 0.2)',
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.4 }}
                whileHover={{ backgroundColor: 'rgba(13, 148, 136, 0.1)' }}
                onClick={() => navigate('/nurse-simulation')}
              >
                <div className="flex -space-x-2">
                  {['#0D9488', '#06B6D4', '#3B82F6', '#10B981', '#8B5CF6'].map((c, i) => (
                    <div
                      key={i}
                      className="rounded-full flex items-center justify-center"
                      style={{
                        width: '28px',
                        height: '28px',
                        backgroundColor: `${c}20`,
                        border: `2px solid #0D1117`,
                        color: c,
                      }}
                    >
                      <UserRound size={13} />
                    </div>
                  ))}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: '#F1F5F9',
                    }}
                  >
                    12 Nurses On Duty
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.625rem',
                      color: '#64748B',
                    }}
                  >
                    Each with unique skill specialties across cardiac, neuro, trauma, respiratory & more
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  /* ══════ SECTION: MARKET INTELLIGENCE FEATURE ══════ */
  const MarketIntelBannerSection = () => {
    const signals = [
      { label: 'ICU Demand', value: '+12%', sub: 'YoY Growth', color: '#10B981' },
      { label: 'Occupancy', value: '78%', sub: 'Current', color: '#0D9488' },
      { label: 'Referral Retention', value: '82%', sub: 'Rate', color: '#06B6D4' },
      { label: 'Projected Growth', value: '+18%', sub: '12 Months', color: '#3B82F6' },
    ];

    return (
      <section
        style={{
          backgroundColor: '#0D1117',
          padding: '64px 24px',
          borderTop: '1px solid #1E293B',
          borderBottom: '1px solid #1E293B',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
            top: '-100px',
            left: '-100px',
          }}
        />

        <div className="mx-auto" style={{ maxWidth: '1200px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Left: Stats Grid */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-3">
                {signals.map((sig, i) => (
                  <motion.div
                    key={sig.label}
                    className="rounded-lg p-4 flex flex-col items-center text-center"
                    style={{
                      backgroundColor: '#111827',
                      border: `1px solid ${sig.color}20`,
                      borderTop: `3px solid ${sig.color}`,
                    }}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: i * 0.1, ease }}
                    whileHover={{ y: -3, borderColor: `${sig.color}50` }}
                  >
                    <TrendingUpIcon size={22} style={{ color: sig.color, marginBottom: '8px' }} />
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 500,
                        fontSize: '1.75rem',
                        color: '#F1F5F9',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {sig.value}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: '0.625rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: sig.color,
                        marginTop: '4px',
                      }}
                    >
                      {sig.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.6875rem',
                        color: '#64748B',
                        marginTop: '2px',
                      }}
                    >
                      {sig.sub}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Mini signal preview */}
              <motion.div
                className="mt-3 rounded-lg p-3 flex items-center gap-3 cursor-pointer"
                style={{
                  backgroundColor: 'rgba(6, 182, 212, 0.05)',
                  border: '1px dashed rgba(6, 182, 212, 0.2)',
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.4 }}
                whileHover={{ backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
                onClick={() => navigate('/market-intelligence')}
              >
                <div className="flex -space-x-2">
                  {['#0D9488', '#06B6D4', '#3B82F6', '#10B981', '#8B5CF6'].map((c, i) => (
                    <div
                      key={i}
                      className="rounded-full flex items-center justify-center"
                      style={{
                        width: '28px',
                        height: '28px',
                        backgroundColor: `${c}20`,
                        border: `2px solid #0D1117`,
                        color: c,
                      }}
                    >
                      <Eye size={13} />
                    </div>
                  ))}
                </div>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 500, color: '#F1F5F9' }}>
                    7 Active Market Signals
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.625rem', color: '#64748B' }}>
                    Demand, capacity, referrals, competitor activity &amp; market shifts monitored
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease }}
              >
                {/* Badge */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                  style={{
                    backgroundColor: 'rgba(6, 182, 212, 0.1)',
                    border: '1px solid rgba(6, 182, 212, 0.25)',
                  }}
                >
                  <Globe size={12} style={{ color: '#06B6D4' }} />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: '0.625rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#06B6D4',
                    }}
                  >
                    ONE SUTTER CRITICAL CARE
                  </span>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    color: '#F1F5F9',
                  }}
                >
                  Market &amp; Operational{' '}
                  <span style={{ color: '#06B6D4' }}>Signal Intelligence</span>
                </h2>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    color: '#94A3B8',
                    maxWidth: '520px',
                    marginTop: '16px',
                  }}
                >
                  AI-enabled monitoring of ICU demand signals, capacity trends, competitive dynamics, 
                  and referral patterns. A four-stage pipeline transforms raw signals into actionable 
                  decisions that maintain Sutter's leadership in cardiac and transplant critical care.
                </p>

                {/* Feature bullets */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5">
                  {[
                    'Demand Forecasting',
                    'Capacity Optimization',
                    'Competitor Tracking',
                    'Referral Leakage Detection',
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-1.5">
                      <CheckCircle2 size={13} style={{ color: '#10B981' }} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#94A3B8' }}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  className="flex items-center gap-2 mt-6"
                  style={{
                    padding: '14px 28px',
                    borderRadius: '8px',
                    backgroundColor: '#06B6D4',
                    color: '#0A0E1A',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  whileHover={{ y: -2, filter: 'brightness(1.1)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/market-intelligence')}
                >
                  <BrainCircuit size={18} />
                  View Market Intelligence
                  <ChevronRight size={16} />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  /* ══════ SECTION: HUMAN-LED CARE (Bedside Imagery) ══════ */
  const BedsideSection = () => {
    const shots = [
      {
        src: 'https://images.unsplash.com/photo-1666886573531-48d2e3c2b684?fm=jpg&w=1200&q=72&auto=format&fit=crop&crop=faces,edges',
        alt: 'Clinician reviewing patient information on a tablet',
        caption: 'AI-assisted, human-approved',
      },
      {
        src: 'https://images.unsplash.com/photo-1691139601099-932c01ec198b?fm=jpg&w=1200&q=72&auto=format&fit=crop&crop=faces,edges',
        alt: 'Two nurses collaborating on patient care',
        caption: 'Coordinated care teams',
      },
    ];
    return (
      <section style={{ backgroundColor: '#0A0E1A', padding: '80px 24px' }}>
        <div className="mx-auto" style={{ maxWidth: '1200px' }}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '0.6875rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#0D9488',
              }}
            >
              HUMAN-LED CARE
            </span>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                color: '#F1F5F9',
                marginTop: '12px',
              }}
            >
              Technology in service of the bedside
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#94A3B8',
                maxWidth: '640px',
                marginTop: '12px',
              }}
            >
              Nurses stay at the center of every decision. The system surfaces context and
              handles the busywork — so care teams spend less time on screens and more time
              with patients.
            </p>
          </motion.div>

          {/* Landscape gallery (2-up) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ marginTop: '48px' }}>
            {shots.map((s, i) => (
              <motion.div
                key={s.caption}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #1E293B',
                }}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', display: 'block' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(10,14,26,0) 50%, rgba(10,14,26,0.82) 100%)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    left: '20px',
                    bottom: '16px',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.9375rem',
                    color: '#F1F5F9',
                  }}
                >
                  {s.caption}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Attribution */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '0.75rem',
              color: '#475569',
              marginTop: '20px',
            }}
          >
            Photography via Unsplash — Nappy and CDC.
          </p>
        </div>
      </section>
    );
  };

  /* ══════ RENDER ══════ */
  return (
    <>
      <HeroSection />
      <StatusSection />
      <BedsideSection />
      <SimulationBannerSection />
      <ZoneGovernanceSection />
      <DomainsSection />
      <MetricsSection />
      <MarketIntelBannerSection />
      <FlywheelSection />
      <TimelineSection />
    </>
  );
}
