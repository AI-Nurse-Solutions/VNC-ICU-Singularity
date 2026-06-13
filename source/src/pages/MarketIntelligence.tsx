import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp, Bed, Users, Building2, Globe, Brain,
  BarChart3, LineChart, Activity, ArrowRight,
  Lightbulb, Target, Heart, Stethoscope, ChevronUp,
  ChevronDown, Clock, Zap, Eye, ShieldCheck,
  Hospital, UserPlus, Repeat, Sprout, BrainCircuit,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, Cell,
} from 'recharts';

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */

// ICU Demand YoY Trend
const demandData = [
  { month: 'Jan', current: 42, prior: 38 },
  { month: 'Feb', current: 44, prior: 39 },
  { month: 'Mar', current: 43, prior: 37 },
  { month: 'Apr', current: 46, prior: 40 },
  { month: 'May', current: 48, prior: 41 },
  { month: 'Jun', current: 47, prior: 40 },
  { month: 'Jul', current: 50, prior: 42 },
  { month: 'Aug', current: 52, prior: 43 },
  { month: 'Sep', current: 51, prior: 42 },
  { month: 'Oct', current: 54, prior: 44 },
  { month: 'Nov', current: 53, prior: 43 },
  { month: 'Dec', current: 56, prior: 45 },
];

// Occupancy by unit
const occupancyData = [
  { name: 'Cardiac ICU', value: 92, fill: '#0D9488' },
  { name: 'Transplant ICU', value: 88, fill: '#06B6D4' },
  { name: 'Neuro ICU', value: 85, fill: '#3B82F6' },
  { name: 'Med-Surg ICU', value: 78, fill: '#6366F1' },
  { name: 'Trauma ICU', value: 72, fill: '#8B5CF6' },
];

// Referral retention trend
const referralData = [
  { quarter: 'Q1 2025', rate: 74 },
  { quarter: 'Q2 2025', rate: 77 },
  { quarter: 'Q3 2025', rate: 79 },
  { quarter: 'Q4 2025', rate: 82 },
  { quarter: 'Q1 2026', rate: 85 },
  { quarter: 'Q2 2026', rate: 87 },
];

// Projected growth by service line
const growthData = [
  { name: 'Cardiac Surgery', projected: 22, current: 18 },
  { name: 'Transplant', projected: 18, current: 14 },
  { name: 'ECMO Program', projected: 35, current: 22 },
  { name: 'Neuro Critical Care', projected: 28, current: 20 },
  { name: 'Cardiogenic Shock', projected: 30, current: 19 },
];

// Market shift signals
interface ShiftSignal {
  signal: string;
  trend: string;
  impact: string;
  direction: 'up' | 'down' | 'neutral';
}

const shiftSignals: ShiftSignal[] = [
  { signal: 'Aging population 65+ in catchment', trend: '+14%', impact: 'High', direction: 'up' },
  { signal: 'Competitor cardiac program expansion', trend: 'Detected', impact: 'Med', direction: 'neutral' },
  { signal: 'Payer mix shift to Medicare Advantage', trend: '+8%', impact: 'High', direction: 'up' },
  { signal: 'Regional transplant waitlist growth', trend: '+23%', impact: 'High', direction: 'up' },
  { signal: 'ECMO-capable center density', trend: 'Stable', impact: 'Low', direction: 'neutral' },
  { signal: 'Cardiogenic shock protocol adoption', trend: '+31%', impact: 'Med', direction: 'up' },
  { signal: 'Average ICU length of stay', trend: '-0.4 days', impact: 'Med', direction: 'down' },
];

// Pipeline stages
const PIPELINE_STAGES = [
  {
    num: 1,
    title: 'Signals In',
    color: '#0D9488',
    icon: Eye,
    items: [
      { icon: TrendingUp, label: 'ICU Demand Trends', desc: 'Rising acuity, utilization, and demand patterns' },
      { icon: Bed, label: 'Bed Capacity', desc: 'Availability, occupancy, and LOS trends' },
      { icon: UserPlus, label: 'Referrals', desc: 'Referral volume, sources, and conversion' },
      { icon: Building2, label: 'Competitor Activity', desc: 'Service offerings, expansions, and strategic moves' },
      { icon: Globe, label: 'Market Shifts', desc: 'Demographics, payer trends, and policy changes' },
    ],
  },
  {
    num: 2,
    title: 'AI-Enabled Insight Engine',
    color: '#06B6D4',
    icon: BrainCircuit,
    items: [
      { icon: Brain, label: 'Predictive Demand Forecasting', desc: 'AI models project 6-12 month demand by service line' },
      { icon: Activity, label: 'Capacity Optimization', desc: 'Real-time bed, staff, and equipment alignment analysis' },
      { icon: BarChart3, label: 'Referral Leakage Detection', desc: 'Identify and flag at-risk referral pathways' },
      { icon: LineChart, label: 'Competitive Position Tracking', desc: 'Monitor competitor moves and market share shifts' },
    ],
    hasCharts: true,
  },
  {
    num: 3,
    title: 'Actionable Decisions',
    color: '#3B82F6',
    icon: Target,
    items: [
      { icon: Hospital, label: 'Service Line Planning', desc: 'Align services with market needs and strategic priorities' },
      { icon: Bed, label: 'ICU Capacity Alignment', desc: 'Optimize capacity, staffing, and resources' },
      { icon: Repeat, label: 'Referral Retention', desc: 'Strengthen relationships and reduce leakage' },
      { icon: Sprout, label: 'Program Growth', desc: 'Invest in high-impact programs and innovation' },
    ],
  },
  {
    num: 4,
    title: 'Outcomes',
    color: '#10B981',
    icon: ShieldCheck,
    items: [
      { icon: TrendingUp, label: 'Earlier Growth Opportunity Identification', desc: 'Spot trends 6-9 months ahead of competitors' },
      { icon: Clock, label: 'Reduced Planning Delays', desc: 'Data-driven decisions in days, not quarters' },
      { icon: Activity, label: 'Improved ICU Capacity Alignment', desc: 'Right beds, right staff, right time' },
      { icon: Users, label: 'Better Referral Retention', desc: 'Stronger physician and system relationships' },
      { icon: Heart, label: 'Improved Access to Advanced Critical Care', desc: 'More patients served, better outcomes' },
    ],
  },
];

// Bottom KPIs
const BOTTOM_KPIS = [
  { label: 'ICU Demand (YoY)', value: '+12%', sub: 'vs prior year', icon: TrendingUp, color: '#10B981' },
  { label: 'ICU Occupancy', value: '78%', sub: 'Current', icon: Activity, color: '#0D9488' },
  { label: 'Referral Retention', value: '82%', sub: 'Rate', icon: Users, color: '#06B6D4' },
  { label: 'Projected Growth', value: '+18%', sub: '12 Months', icon: BarChart3, color: '#3B82F6' },
];

const HIGH_OPPORTUNITY_AREAS = [
  'Neuro Critical Care',
  'Cardiogenic Shock',
  'ECMO Program',
  'Cardiac Transplant',
  'VAD Program',
];

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function MarketIntelligence() {
  const navigate = useNavigate();
  const ease = [0, 0, 0.2, 1] as [number, number, number, number];

  /* ─── Custom Tooltip for Charts ─── */
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div
        className="rounded-lg p-2"
        style={{
          backgroundColor: '#1A2332',
          border: '1px solid #334155',
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.75rem',
        }}
      >
        <p style={{ color: '#94A3B8', marginBottom: '4px' }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color || '#F1F5F9' }}>
            {p.name}: {p.value}{p.unit || ''}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-[100dvh]" style={{ backgroundColor: '#0A0E1A' }}>
      {/* ─── HEADER ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6"
        style={{
          height: '56px',
          background: 'rgba(17, 24, 39, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #1E293B',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="rounded-full" style={{ width: '8px', height: '8px', backgroundColor: '#10B981', animation: 'status-pulse 2s infinite' }} />
          <button onClick={() => navigate('/')} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0D9488' }}>
            VNC ICU SINGULARITY
          </button>
          <div style={{ width: '1px', height: '20px', backgroundColor: '#1E293B' }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '0.875rem', color: '#64748B' }}>
            Market Intelligence
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#64748B' }}>Sutter Health</span>
          <div className="flex items-center gap-1.5" style={{ padding: '2px 10px', borderRadius: '9999px', backgroundColor: 'rgba(16, 185, 129, 0.12)' }}>
            <div className="rounded-full" style={{ width: '6px', height: '6px', backgroundColor: '#10B981' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#10B981' }}>
              SYSTEM ONLINE
            </span>
          </div>
        </div>
      </header>

      <div style={{ height: '56px' }} />

      <div className="mx-auto px-4 md:px-6 py-6" style={{ maxWidth: '1400px' }}>
        {/* ─── TITLE ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0D9488' }}>
              ONE SUTTER CRITICAL CARE
            </span>
            <BrainCircuit size={14} style={{ color: '#0D9488' }} />
          </div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', color: '#F1F5F9', letterSpacing: '-0.02em' }}>
            Market &amp; Operational{' '}
            <span style={{ color: '#0D9488' }}>Signal Intelligence</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: '#94A3B8', maxWidth: '700px', margin: '12px auto 0' }}>
            AI-enabled monitoring of demand signals, capacity trends, competitive dynamics, and referral 
            patterns — powering data-driven decisions to maintain Sutter's leadership in cardiac and transplant care.
          </p>
        </motion.div>

        {/* ─── 4-STAGE PIPELINE ─── */}
        <div className="mb-8">
          {/* Stage connector line (desktop) */}
          <div className="hidden lg:block relative mx-auto mb-2" style={{ maxWidth: '1200px' }}>
            <div className="absolute top-6 left-[12%] right-[12%] h-0.5" style={{ backgroundColor: '#1E293B' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PIPELINE_STAGES.map((stage, idx) => (
              <motion.div
                key={stage.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease }}
              >
                {/* Stage Header */}
                <div
                  className="flex items-center gap-2 mb-3"
                >
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: `${stage.color}15`,
                      border: `2px solid ${stage.color}40`,
                      color: stage.color,
                    }}
                  >
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: '1.25rem' }}>
                      {stage.num}
                    </span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '1rem', color: '#F1F5F9' }}>
                      {stage.title}
                    </h3>
                    {idx < 3 && (
                      <div className="lg:hidden flex items-center gap-1 mt-0.5">
                        <ArrowRight size={12} style={{ color: '#64748B' }} />
                        <span style={{ fontSize: '0.625rem', color: '#64748B' }}>Stage {stage.num + 1}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stage Card */}
                <div
                  className="rounded-lg p-4"
                  style={{
                    backgroundColor: '#111827',
                    border: `1px solid ${stage.color}15`,
                    borderTop: `3px solid ${stage.color}`,
                  }}
                >
                  {/* Items */}
                  <div className="space-y-3">
                    {stage.items.map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-2.5"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.12 + i * 0.05, duration: 0.3 }}
                      >
                        <div
                          className="flex-shrink-0 rounded-md flex items-center justify-center mt-0.5"
                          style={{
                            width: '28px',
                            height: '28px',
                            backgroundColor: `${stage.color}10`,
                          }}
                        >
                          <item.icon size={14} style={{ color: stage.color }} />
                        </div>
                        <div>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '0.8125rem', color: '#F1F5F9' }}>
                            {item.label}
                          </p>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', color: '#64748B', marginTop: '1px', lineHeight: 1.4 }}>
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stage 2: Mini charts */}
                  {stage.hasCharts && (
                    <div className="mt-4 pt-3" style={{ borderTop: '1px solid #1E293B' }}>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded p-2" style={{ backgroundColor: '#0A0E1A' }}>
                          <p style={{ fontSize: '0.5625rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>ICU Occupancy</p>
                          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.25rem', fontWeight: 500, color: '#0D9488' }}>78%</p>
                          <div style={{ height: '24px', marginTop: '4px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={demandData.slice(-6)}>
                                <Area type="monotone" dataKey="current" stroke="#0D9488" fill="#0D948820" strokeWidth={1.5} />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        <div className="rounded p-2" style={{ backgroundColor: '#0A0E1A' }}>
                          <p style={{ fontSize: '0.5625rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Referral Trend</p>
                          <div style={{ height: '40px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={referralData}>
                                <Bar dataKey="rate" fill="#06B6D4" radius={[2, 2, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                      {/* Key insight */}
                      <div
                        className="mt-2 rounded p-2 flex items-start gap-2"
                        style={{ backgroundColor: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.15)' }}
                      >
                        <Lightbulb size={12} style={{ color: '#F59E0B', flexShrink: 0, marginTop: '2px' }} />
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', color: '#FCD34D', lineHeight: 1.4 }}>
                          <strong>Key Insight:</strong> High demand growth expected in neuro critical care and cardiogenic shock programs.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── CHARTS ROW ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Demand Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease }}
            className="rounded-lg p-4"
            style={{ backgroundColor: '#111827', border: '1px solid #1E293B' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.875rem', color: '#F1F5F9' }}>
                  ICU Demand Trend
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#64748B' }}>
                  Current year vs prior year (bed-days)
                </p>
              </div>
              <span
                className="px-2 py-0.5 rounded-full"
                style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10B981', fontSize: '0.6875rem', fontWeight: 500 }}
              >
                +12% YoY
              </span>
            </div>
            <div style={{ height: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={demandData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={{ stroke: '#1E293B' }} tickLine={false} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={{ stroke: '#1E293B' }} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="current" name="Current Year" stroke="#0D9488" fill="#0D948815" strokeWidth={2} />
                  <Area type="monotone" dataKey="prior" name="Prior Year" stroke="#64748B" fill="#64748B08" strokeWidth={1.5} strokeDasharray="4 4" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Occupancy by Unit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="rounded-lg p-4"
            style={{ backgroundColor: '#111827', border: '1px solid #1E293B' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.875rem', color: '#F1F5F9' }}>
                  Occupancy by Unit
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#64748B' }}>
                  Current utilization rates
                </p>
              </div>
              <Activity size={16} style={{ color: '#06B6D4' }} />
            </div>
            <div style={{ height: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occupancyData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 11 }} axisLine={{ stroke: '#1E293B' }} tickLine={false} unit="%" />
                  <YAxis dataKey="name" type="category" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={{ stroke: '#1E293B' }} tickLine={false} width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Occupancy" radius={[0, 4, 4, 0]}>
                    {occupancyData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Projected Growth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="rounded-lg p-4"
            style={{ backgroundColor: '#111827', border: '1px solid #1E293B' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.875rem', color: '#F1F5F9' }}>
                  Projected Growth by Service
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#64748B' }}>
                  12-month case volume projection (%)
                </p>
              </div>
              <BarChart3 size={16} style={{ color: '#3B82F6' }} />
            </div>
            <div style={{ height: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 9 }} axisLine={{ stroke: '#1E293B' }} tickLine={false} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={{ stroke: '#1E293B' }} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="current" name="Current" fill="#64748B40" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="projected" name="Projected" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* ─── MARKET SHIFT SIGNALS TABLE ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease }}
          className="rounded-lg p-4 mb-6"
          style={{ backgroundColor: '#111827', border: '1px solid #1E293B' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Eye size={16} style={{ color: '#0D9488' }} />
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '1rem', color: '#F1F5F9' }}>
              Live Market Shift Signals
            </h3>
            <span
              className="ml-auto px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', fontSize: '0.625rem' }}
            >
              <div className="rounded-full" style={{ width: '5px', height: '5px', backgroundColor: '#10B981', animation: 'status-pulse 2s infinite' }} />
              Live
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1E293B' }}>
                  <th className="text-left py-2.5 px-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.625rem', letterSpacing: '0.08em', color: '#64748B', fontWeight: 500, textTransform: 'uppercase' }}>Signal</th>
                  <th className="text-left py-2.5 px-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.625rem', letterSpacing: '0.08em', color: '#64748B', fontWeight: 500, textTransform: 'uppercase' }}>Trend</th>
                  <th className="text-center py-2.5 px-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.625rem', letterSpacing: '0.08em', color: '#64748B', fontWeight: 500, textTransform: 'uppercase' }}>Impact</th>
                  <th className="text-center py-2.5 px-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.625rem', letterSpacing: '0.08em', color: '#64748B', fontWeight: 500, textTransform: 'uppercase' }}>Direction</th>
                </tr>
              </thead>
              <tbody>
                {shiftSignals.map((sig, i) => (
                  <motion.tr
                    key={i}
                    style={{ borderTop: '1px solid #1E293B' }}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <td className="py-3 px-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#F1F5F9' }}>
                      {sig.signal}
                    </td>
                    <td className="py-3 px-3" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8125rem', color: '#0D9488' }}>
                      {sig.trend}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className="px-2 py-0.5 rounded text-xs"
                        style={{
                          backgroundColor: sig.impact === 'High' ? 'rgba(239, 68, 68, 0.1)' : sig.impact === 'Med' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                          color: sig.impact === 'High' ? '#FCA5A5' : sig.impact === 'Med' ? '#FCD34D' : '#94A3B8',
                          fontSize: '0.625rem',
                          fontWeight: 500,
                        }}
                      >
                        {sig.impact}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      {sig.direction === 'up' ? (
                        <ChevronUp size={16} style={{ color: '#EF4444', display: 'inline' }} />
                      ) : sig.direction === 'down' ? (
                        <ChevronDown size={16} style={{ color: '#10B981', display: 'inline' }} />
                      ) : (
                        <span style={{ color: '#64748B', fontSize: '0.75rem' }}>—</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ─── REFERRAL RETENTION TREND ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease }}
          className="rounded-lg p-4 mb-6"
          style={{ backgroundColor: '#111827', border: '1px solid #1E293B' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users size={16} style={{ color: '#06B6D4' }} />
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '1rem', color: '#F1F5F9' }}>
                Referral Retention Rate Trend
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10B981', fontSize: '0.6875rem', fontWeight: 500 }}>
              Target: 90%
            </span>
          </div>
          <div style={{ height: '160px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={referralData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="quarter" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={{ stroke: '#1E293B' }} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fill: '#64748B', fontSize: 11 }} axisLine={{ stroke: '#1E293B' }} tickLine={false} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={90} stroke="#F59E0B" strokeDasharray="4 4" label={{ value: 'Target 90%', fill: '#F59E0B', fontSize: 10, position: 'right' }} />
                <Area type="monotone" dataKey="rate" name="Retention Rate" stroke="#06B6D4" fill="#06B6D415" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ─── HIGH OPPORTUNITY AREAS ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease }}
          className="rounded-lg p-4 mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(13,148,136,0.06) 0%, rgba(6,182,212,0.04) 100%)',
            border: '1px solid rgba(13, 148, 136, 0.2)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Target size={16} style={{ color: '#0D9488' }} />
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '1rem', color: '#F1F5F9' }}>
              High Opportunity Investment Areas
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {HIGH_OPPORTUNITY_AREAS.map((area, i) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className="rounded-lg p-3 text-center cursor-pointer transition-all hover:-translate-y-1"
                style={{ backgroundColor: '#111827', border: '1px solid #1E293B' }}
                onClick={() => navigate('/credentials')}
              >
                <div
                  className="mx-auto rounded-full flex items-center justify-center mb-2"
                  style={{ width: '36px', height: '36px', backgroundColor: 'rgba(13, 148, 136, 0.1)' }}
                >
                  {i === 0 ? <Brain size={16} style={{ color: '#0D9488' }} /> :
                   i === 1 ? <Heart size={16} style={{ color: '#EF4444' }} /> :
                   i === 2 ? <Activity size={16} style={{ color: '#06B6D4' }} /> :
                   i === 3 ? <Stethoscope size={16} style={{ color: '#3B82F6' }} /> :
                   <Zap size={16} style={{ color: '#8B5CF6' }} />}
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '0.8125rem', color: '#F1F5F9' }}>
                  {area}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.625rem', color: '#64748B', marginTop: '2px' }}>
                  {['Growing Demand', 'Emerging Program', 'Capacity Expansion', 'Leadership Focus', 'New Initiative'][i]}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── BOTTOM KPI BAR ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease }}
          className="rounded-lg p-5"
          style={{ backgroundColor: '#111827', border: '1px solid #1E293B' }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
            {BOTTOM_KPIS.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center"
              >
                <kpi.icon size={18} style={{ color: kpi.color, margin: '0 auto 6px' }} />
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '1.5rem', color: '#F1F5F9' }}>
                  {kpi.value}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.625rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748B' }}>
                  {kpi.label}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', color: '#94A3B8' }}>
                  {kpi.sub}
                </p>
              </motion.div>
            ))}
            {/* High Opportunity */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-center col-span-2 sm:col-span-3 lg:col-span-1"
            >
              <Target size={18} style={{ color: '#F59E0B', margin: '0 auto 6px' }} />
              <div className="flex flex-wrap justify-center gap-1">
                {HIGH_OPPORTUNITY_AREAS.slice(0, 3).map(a => (
                  <span
                    key={a}
                    className="px-1.5 py-0.5 rounded"
                    style={{ fontSize: '0.5625rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#FCD34D', border: '1px solid rgba(245, 158, 11, 0.2)' }}
                  >
                    {a}
                  </span>
                ))}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.625rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748B', marginTop: '4px' }}>
                High Opportunity
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* ─── FOOTER ─── */}
        <footer className="mt-8 pt-6 pb-8" style={{ borderTop: '1px solid #1E293B' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <BrainCircuit size={14} style={{ color: '#64748B' }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#64748B' }}>
                VNC ICU Singularity — Market Intelligence Module
              </span>
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#64748B' }}>
              No patient-identifiable information is stored or displayed
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#64748B' }}>
              v1.2.0-market-intel
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
