import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, TrendingUp, ShieldCheck, Server, Layers,
  Gauge, Target, CircleCheck, Rocket, HeartHandshake, Building2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

const ease = [0, 0, 0.2, 1] as [number, number, number, number];
const F = "'Inter', sans-serif";

const advantages = [
  {
    icon: HeartHandshake,
    title: 'Attacks Sutter’s costliest constraint: nursing capacity',
    body:
      'Nursing labor is the largest controllable cost in the ICU, and turnover is among the most expensive events in the system. By returning an estimated 2.4 hours per nurse per shift to the bedside, the platform directly improves retention, throughput, and safety — the levers that move both margin and mission.',
  },
  {
    icon: ShieldCheck,
    title: 'Sovereign and compliant by design',
    body:
      'All inference and orchestration run on-premise. Patient data never leaves Sutter’s control — no cloud dependency, no third-party custody, pseudonymization before processing. This is the board-friendly, HIPAA-aligned way to adopt AI, and it removes the single biggest objection to clinical AI at scale.',
  },
  {
    icon: Layers,
    title: 'Governance-first — a template, not just a tool',
    body:
      'The three-zone decision model and clinician-in-the-loop design make this the safest path for Sutter to scale AI. Adopting it gives Sutter a reusable governance framework for every future AI initiative — turning a single ICU project into an enterprise capability.',
  },
  {
    icon: Rocket,
    title: 'Capital-light and fast to value',
    body:
      'Zero new FTEs required, a 90-day path to feasibility, and a one-year path to scale. It runs on existing staff and infrastructure, so the investment is implementation effort — not headcount or new platforms — and value is measurable within a single budget cycle.',
  },
  {
    icon: Building2,
    title: 'Proven on one unit, built to scale across the system',
    body:
      'Designed on a 44-bed high-acuity ICU spanning six operational domains, the architecture is replicable across Sutter’s ICUs and adjacent service lines. A successful pilot becomes a system-wide platform play, not a one-off.',
  },
  {
    icon: Gauge,
    title: 'Measurable, board-ready outcomes',
    body:
      'Every claim maps to a tracked KPI — handoff completeness, scheduling cycle time, time-to-competency, override rates, and staff trust — so leadership can govern the program by numbers, not anecdotes, from day one.',
  },
];

const metrics = [
  { value: '2.4 hrs', label: 'Returned to the bedside, per nurse per shift' },
  { value: '0', label: 'New FTEs required to deploy' },
  { value: '90 days', label: 'To demonstrated feasibility' },
  { value: '97%', label: 'Handoff completeness' },
  { value: '−32%', label: 'Scheduling cycle time' },
  { value: '−22%', label: 'Onboarding time-to-competency' },
  { value: '4.6 / 5', label: 'Staff trust score' },
  { value: '0', label: 'Privacy incidents to date' },
];

const fit = [
  {
    icon: Target,
    title: 'Measurable impact',
    body:
      'The Challenge rewards ideas that translate into measurable improvement in care. This proposal arrives with a defined KPI set and a pilot already modeled — impact is the starting point, not an aspiration.',
  },
  {
    icon: Server,
    title: 'Implementation-ready',
    body:
      'No new hiring, no new cloud contracts, a 90-day feasibility window. It is built to be stood up inside Sutter’s existing environment, which makes it one of the most fundable ideas in the cohort.',
  },
  {
    icon: TrendingUp,
    title: 'Strategically timed',
    body:
      'ICU demand is up 12% year over year with occupancy near 78% and double-digit projected growth. Capacity is the binding constraint, and AI governance is becoming a board-level mandate. Moving first makes Sutter the reference model for safe clinical AI.',
  },
];

export default function StrategicCase() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero */}
      <section
        style={{
          backgroundColor: '#0A0E1A',
          backgroundImage: 'url(/singularity-grid.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '88px 24px 72px',
        }}
      >
        <div className="mx-auto" style={{ maxWidth: '900px' }}>
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
            style={{ background: 'transparent', border: 'none', color: '#94A3B8', fontFamily: F, fontSize: '0.875rem', cursor: 'pointer', marginBottom: '28px' }}
            whileHover={{ color: '#0D9488' }}
          >
            <ArrowLeft size={16} /> Back to overview
          </motion.button>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <span
              className="inline-flex items-center gap-2"
              style={{
                padding: '6px 14px', borderRadius: '9999px',
                backgroundColor: 'rgba(13, 148, 136, 0.12)', border: '1px solid rgba(13,148,136,0.35)',
                fontFamily: F, fontWeight: 600, fontSize: '0.6875rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#2DD4BF',
              }}
            >
              Sutter Health Innovation Challenge 2026
            </span>
            <h1
              style={{
                fontFamily: F, fontWeight: 300, fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                letterSpacing: '-0.02em', lineHeight: 1.1, color: '#F1F5F9', marginTop: '20px',
              }}
            >
              The strategic case for{' '}
              <span style={{ color: '#0D9488' }}>finalist selection</span>
            </h1>
            <p style={{ fontFamily: F, fontWeight: 400, fontSize: '1.1875rem', lineHeight: 1.65, color: '#94A3B8', marginTop: '20px' }}>
              A briefing for Sutter Health leadership and innovation investors on why
              VNC ICU Singularity — a sovereign, on-premise AI operating system that returns
              nurses to the bedside while keeping clinicians in command — merits advancement
              to the finalist round.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Thesis */}
      <section style={{ backgroundColor: '#111827', padding: '64px 24px' }}>
        <div className="mx-auto" style={{ maxWidth: '900px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, ease }}
            style={{ borderLeft: '3px solid #0D9488', paddingLeft: '24px' }}
          >
            <span style={{ fontFamily: F, fontWeight: 500, fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0D9488' }}>
              The thesis
            </span>
            <p style={{ fontFamily: F, fontWeight: 300, fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)', lineHeight: 1.5, color: '#E2E8F0', marginTop: '14px' }}>
              The ICU’s scarcest resource is not technology — it is nursing time and trust.
              VNC ICU Singularity converts administrative burden into bedside hours without
              adding headcount, without sending a single record to the cloud, and without ever
              removing the clinician from the decision. It is the rare proposal that improves
              margin and mission at the same time, and de-risks every AI initiative that follows it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Strategic advantages */}
      <section style={{ backgroundColor: '#0A0E1A', padding: '80px 24px' }}>
        <div className="mx-auto" style={{ maxWidth: '1100px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease }}
          >
            <span style={{ fontFamily: F, fontWeight: 500, fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0D9488' }}>
              Strategic advantage
            </span>
            <h2 style={{ fontFamily: F, fontWeight: 300, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em', lineHeight: 1.15, color: '#F1F5F9', marginTop: '12px' }}>
              Six reasons this wins
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ marginTop: '40px' }}>
            {advantages.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: i * 0.06, ease }}
                  style={{ backgroundColor: '#111827', border: '1px solid #1E293B', borderRadius: '12px', padding: '24px' }}
                >
                  <div className="flex items-center justify-center" style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(13, 148, 136, 0.12)', color: '#2DD4BF' }}>
                    <Icon size={20} />
                  </div>
                  <h3 style={{ fontFamily: F, fontWeight: 500, fontSize: '1.0625rem', color: '#F1F5F9', marginTop: '16px' }}>
                    {a.title}
                  </h3>
                  <p style={{ fontFamily: F, fontWeight: 400, fontSize: '0.9375rem', lineHeight: 1.6, color: '#94A3B8', marginTop: '8px' }}>
                    {a.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section style={{ backgroundColor: '#0D1117', padding: '72px 24px', borderTop: '1px solid #1E293B', borderBottom: '1px solid #1E293B' }}>
        <div className="mx-auto" style={{ maxWidth: '1100px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease }}
          >
            <span style={{ fontFamily: F, fontWeight: 500, fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0D9488' }}>
              The numbers leadership cares about
            </span>
            <h2 style={{ fontFamily: F, fontWeight: 300, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em', lineHeight: 1.15, color: '#F1F5F9', marginTop: '12px' }}>
              Pilot targets, ready to be governed
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ marginTop: '40px' }}>
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: i * 0.05, ease }}
                style={{ backgroundColor: '#111827', border: '1px solid #1E293B', borderRadius: '12px', padding: '20px' }}
              >
                <div style={{ fontFamily: F, fontWeight: 300, fontSize: '1.875rem', color: '#2DD4BF', letterSpacing: '-0.02em' }}>
                  {m.value}
                </div>
                <div style={{ fontFamily: F, fontWeight: 400, fontSize: '0.8125rem', lineHeight: 1.45, color: '#94A3B8', marginTop: '8px' }}>
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
          <p style={{ fontFamily: F, fontWeight: 400, fontSize: '0.75rem', color: '#475569', marginTop: '20px' }}>
            Figures represent pilot targets and modeled outcomes for the reference 44-bed ICU deployment.
          </p>
        </div>
      </section>

      {/* Fit with the challenge */}
      <section style={{ backgroundColor: '#0A0E1A', padding: '80px 24px' }}>
        <div className="mx-auto" style={{ maxWidth: '1100px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease }}
          >
            <span style={{ fontFamily: F, fontWeight: 500, fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0D9488' }}>
              Why it fits the challenge
            </span>
            <h2 style={{ fontFamily: F, fontWeight: 300, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em', lineHeight: 1.15, color: '#F1F5F9', marginTop: '12px' }}>
              Aligned with Sutter’s mission and judging criteria
            </h2>
            <p style={{ fontFamily: F, fontWeight: 400, fontSize: '1.0625rem', lineHeight: 1.6, color: '#94A3B8', maxWidth: '720px', marginTop: '12px' }}>
              Sutter Health serves more than 3.5 million Californians, and the Innovation
              Challenge exists to turn clinician-originated ideas into measurable impact at scale.
              This proposal is built for exactly that bar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ marginTop: '40px' }}>
            {fit.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: i * 0.08, ease }}
                  style={{ backgroundColor: '#111827', border: '1px solid #1E293B', borderRadius: '12px', padding: '24px' }}
                >
                  <div className="flex items-center justify-center" style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(13, 148, 136, 0.12)', color: '#2DD4BF' }}>
                    <Icon size={20} />
                  </div>
                  <h3 style={{ fontFamily: F, fontWeight: 500, fontSize: '1.0625rem', color: '#F1F5F9', marginTop: '16px' }}>
                    {f.title}
                  </h3>
                  <p style={{ fontFamily: F, fontWeight: 400, fontSize: '0.9375rem', lineHeight: 1.6, color: '#94A3B8', marginTop: '8px' }}>
                    {f.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The ask */}
      <section style={{ backgroundColor: '#111827', padding: '80px 24px' }}>
        <div className="mx-auto text-center" style={{ maxWidth: '760px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, ease }}
          >
            <span style={{ fontFamily: F, fontWeight: 500, fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0D9488' }}>
              The ask
            </span>
            <h2 style={{ fontFamily: F, fontWeight: 300, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em', lineHeight: 1.2, color: '#F1F5F9', marginTop: '12px' }}>
              Advance VNC ICU Singularity to the finalist round
            </h2>
            <p style={{ fontFamily: F, fontWeight: 400, fontSize: '1.0625rem', lineHeight: 1.65, color: '#94A3B8', marginTop: '16px' }}>
              We are asking for finalist sponsorship: a unit champion, access to a reference ICU,
              and the mentorship the Challenge provides. In return, Sutter gains a governed,
              capital-light path to AI-enabled clinical operations — and a framework it can reuse
              across the system. The downside is bounded by design; the upside compounds.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3" style={{ marginTop: '32px' }}>
              <motion.button
                onClick={() => navigate('/governance-charter')}
                whileHover={{ y: -1 }}
                style={{ padding: '12px 24px', borderRadius: '4px', backgroundColor: '#0D9488', color: '#0A0E1A', border: 'none', fontFamily: F, fontWeight: 500, fontSize: '1rem', cursor: 'pointer' }}
                className="flex items-center gap-2"
              >
                Read the Governance Charter <ArrowRight size={16} />
              </motion.button>
              <motion.button
                onClick={() => navigate('/')}
                whileHover={{ borderColor: 'rgba(13, 148, 136, 0.5)', color: '#0D9488' }}
                style={{ padding: '12px 24px', borderRadius: '4px', backgroundColor: 'transparent', color: '#94A3B8', border: '1px solid #1E293B', fontFamily: F, fontWeight: 500, fontSize: '1rem', cursor: 'pointer' }}
                className="flex items-center gap-2"
              >
                <CircleCheck size={16} /> Explore the platform
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
