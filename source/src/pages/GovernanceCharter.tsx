import { useNavigate } from 'react-router-dom';
import {
  Server, Cpu, ClipboardCheck, HeartHandshake, ShieldCheck, Lock,
  ArrowLeft, Scale, CircleCheck, CircleAlert, CircleSlash,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

const ease = [0, 0, 0.2, 1] as [number, number, number, number];

const principles = [
  {
    icon: Server,
    title: 'Sovereign by design',
    body:
      'The orchestration and intelligence layer runs entirely on-premise. Patient data and model compute never leave the institution’s control — no cloud dependency, no external transmission, no third-party custody.',
  },
  {
    icon: Cpu,
    title: 'An orchestration layer, not an authority',
    body:
      'Intelligence coordinates workflows, surfaces context, and removes busywork. It proposes; it never decides. Clinical authority always remains with people.',
  },
  {
    icon: ClipboardCheck,
    title: 'The clinician in the loop',
    body:
      'Every consequential action passes through a human checkpoint. Approval is explicit, attributable, and revocable. Automation accelerates judgment — it never substitutes for it.',
  },
  {
    icon: HeartHandshake,
    title: 'Nurses provide the human touch',
    body:
      'Care, empathy, and bedside judgment are irreducibly human. The system exists to return time to the bedside, never to mediate the relationship between nurse and patient.',
  },
  {
    icon: ShieldCheck,
    title: 'Accountable and auditable',
    body:
      'Every recommendation, approval, and override is logged, timestamped, and explainable. Governance is demonstrated, not assumed.',
  },
  {
    icon: Lock,
    title: 'Privacy by construction',
    body:
      'Data is pseudonymized before it is processed. Only the minimum necessary is used; the rest is never exposed.',
  },
];

const articles = [
  {
    num: 'I',
    title: 'Sovereignty of data and compute',
    body:
      'All inference and orchestration occur within the institution’s own infrastructure. The system is operable in full isolation. No patient information is required to leave the premises for the platform to function.',
  },
  {
    num: 'II',
    title: 'Human authority over clinical decisions',
    body:
      'No diagnosis, treatment, or care decision is ever executed autonomously. The intelligence layer informs the clinician; the clinician directs the care.',
  },
  {
    num: 'III',
    title: 'The three-zone standard of oversight',
    body:
      'Every AI-assisted workflow is classified by risk and governed accordingly — from autonomous low-risk support, to human-approved actions, to decisions reserved exclusively for clinicians.',
  },
  {
    num: 'IV',
    title: 'Transparency and auditability',
    body:
      'The reasoning behind every suggestion is inspectable, and every action is recorded in an immutable audit trail available to clinical and governance leadership.',
  },
  {
    num: 'V',
    title: 'The primacy of care',
    body:
      'The measure of the system is time returned to the bedside and trust maintained with patients. Efficiency that erodes the human relationship is not progress.',
  },
  {
    num: 'VI',
    title: 'Continuous stewardship',
    body:
      'Trust is earned, verified, and expanded through demonstrated stewardship. Authority granted to automation grows only as accountability is proven.',
  },
];

const zones = [
  {
    icon: CircleCheck,
    color: '#10B981',
    tag: 'GREEN',
    title: 'Autonomous, low-risk',
    body: 'Routine, reversible support tasks the system may perform with logging and review.',
  },
  {
    icon: CircleAlert,
    color: '#F59E0B',
    tag: 'AMBER',
    title: 'Human-approved',
    body: 'Recommendations that require explicit clinician approval before they take effect.',
  },
  {
    icon: CircleSlash,
    color: '#EF4444',
    tag: 'RED',
    title: 'Human-only',
    body: 'High-stakes clinical judgment that remains exclusively with people. AI provides context, never a verdict.',
  },
];

export default function GovernanceCharter() {
  const navigate = useNavigate();

  const headingFont = "'Inter', sans-serif";

  return (
    <Layout>
      {/* Hero */}
      <section
        style={{
          backgroundColor: '#0A0E1A',
          backgroundImage: 'url(/singularity-grid.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '88px 24px 64px',
        }}
      >
        <div className="mx-auto" style={{ maxWidth: '880px' }}>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              fontFamily: headingFont,
              fontSize: '0.875rem',
              cursor: 'pointer',
              marginBottom: '28px',
            }}
            whileHover={{ color: '#0D9488' }}
          >
            <ArrowLeft size={16} /> Back to overview
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span
              className="flex items-center gap-2"
              style={{
                fontFamily: headingFont,
                fontWeight: 500,
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#0D9488',
              }}
            >
              <Scale size={14} /> Governance Charter
            </span>
            <h1
              style={{
                fontFamily: headingFont,
                fontWeight: 300,
                fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#F1F5F9',
                marginTop: '16px',
              }}
            >
              The VNC ICU Governance Charter
            </h1>
            <p
              style={{
                fontFamily: headingFont,
                fontWeight: 400,
                fontSize: '1.1875rem',
                lineHeight: 1.65,
                color: '#94A3B8',
                marginTop: '20px',
              }}
            >
              A sovereign, on-premise orchestration and intelligence layer for the intensive
              care unit — built so that technology serves care, and the clinician remains
              in command. This charter sets out the principles by which that promise is kept.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Preamble */}
      <section style={{ backgroundColor: '#111827', padding: '64px 24px' }}>
        <div className="mx-auto" style={{ maxWidth: '880px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease }}
            style={{ borderLeft: '3px solid #0D9488', paddingLeft: '24px' }}
          >
            <p
              style={{
                fontFamily: headingFont,
                fontWeight: 300,
                fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)',
                lineHeight: 1.5,
                color: '#E2E8F0',
              }}
            >
              We hold that intelligence in the intensive care unit must be sovereign in its
              infrastructure, transparent in its reasoning, and subordinate to human judgment.
              It exists to give nurses and clinicians back their time and attention — so the
              care that only people can provide is never displaced by the systems meant to
              support it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Foundational Principles */}
      <section style={{ backgroundColor: '#0A0E1A', padding: '80px 24px' }}>
        <div className="mx-auto" style={{ maxWidth: '1100px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease }}
          >
            <span
              style={{
                fontFamily: headingFont, fontWeight: 500, fontSize: '0.6875rem',
                letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0D9488',
              }}
            >
              Foundational Principles
            </span>
            <h2
              style={{
                fontFamily: headingFont, fontWeight: 300, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                letterSpacing: '-0.02em', lineHeight: 1.15, color: '#F1F5F9', marginTop: '12px',
              }}
            >
              What the system will and will not do
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ marginTop: '40px' }}>
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease }}
                  style={{
                    backgroundColor: '#111827',
                    border: '1px solid #1E293B',
                    borderRadius: '12px',
                    padding: '24px',
                  }}
                >
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: '40px', height: '40px', borderRadius: '8px',
                      backgroundColor: 'rgba(13, 148, 136, 0.12)', color: '#2DD4BF',
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3
                    style={{
                      fontFamily: headingFont, fontWeight: 500, fontSize: '1.0625rem',
                      color: '#F1F5F9', marginTop: '16px',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: headingFont, fontWeight: 400, fontSize: '0.9375rem',
                      lineHeight: 1.6, color: '#94A3B8', marginTop: '8px',
                    }}
                  >
                    {p.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Three-Zone Standard */}
      <section
        style={{
          backgroundColor: '#0D1117',
          padding: '72px 24px',
          borderTop: '1px solid #1E293B',
          borderBottom: '1px solid #1E293B',
        }}
      >
        <div className="mx-auto" style={{ maxWidth: '1100px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease }}
          >
            <span
              style={{
                fontFamily: headingFont, fontWeight: 500, fontSize: '0.6875rem',
                letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0D9488',
              }}
            >
              Article III in practice
            </span>
            <h2
              style={{
                fontFamily: headingFont, fontWeight: 300, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                letterSpacing: '-0.02em', lineHeight: 1.15, color: '#F1F5F9', marginTop: '12px',
              }}
            >
              The three-zone standard of oversight
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ marginTop: '40px' }}>
            {zones.map((z, i) => {
              const Icon = z.icon;
              return (
                <motion.div
                  key={z.tag}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease }}
                  style={{
                    backgroundColor: '#111827',
                    border: '1px solid #1E293B',
                    borderTop: `3px solid ${z.color}`,
                    borderRadius: '12px',
                    padding: '24px',
                  }}
                >
                  <div className="flex items-center gap-2" style={{ color: z.color }}>
                    <Icon size={20} />
                    <span
                      style={{
                        fontFamily: headingFont, fontWeight: 600, fontSize: '0.75rem',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {z.tag}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: headingFont, fontWeight: 500, fontSize: '1.0625rem',
                      color: '#F1F5F9', marginTop: '14px',
                    }}
                  >
                    {z.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: headingFont, fontWeight: 400, fontSize: '0.9375rem',
                      lineHeight: 1.6, color: '#94A3B8', marginTop: '8px',
                    }}
                  >
                    {z.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles of Governance */}
      <section style={{ backgroundColor: '#0A0E1A', padding: '80px 24px' }}>
        <div className="mx-auto" style={{ maxWidth: '880px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease }}
          >
            <span
              style={{
                fontFamily: headingFont, fontWeight: 500, fontSize: '0.6875rem',
                letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0D9488',
              }}
            >
              Articles of Governance
            </span>
            <h2
              style={{
                fontFamily: headingFont, fontWeight: 300, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                letterSpacing: '-0.02em', lineHeight: 1.15, color: '#F1F5F9', marginTop: '12px',
              }}
            >
              Our commitments, in writing
            </h2>
          </motion.div>

          <div style={{ marginTop: '40px' }}>
            {articles.map((a, i) => (
              <motion.div
                key={a.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease }}
                className="flex gap-5"
                style={{
                  padding: '24px 0',
                  borderBottom: i < articles.length - 1 ? '1px solid #1E293B' : 'none',
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: '48px', height: '48px', borderRadius: '10px',
                    border: '1px solid #1E293B', backgroundColor: '#111827',
                    fontFamily: headingFont, fontWeight: 500, fontSize: '1rem', color: '#2DD4BF',
                  }}
                >
                  {a.num}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: headingFont, fontWeight: 500, fontSize: '1.125rem',
                      color: '#F1F5F9',
                    }}
                  >
                    Article {a.num} — {a.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: headingFont, fontWeight: 400, fontSize: '1rem',
                      lineHeight: 1.65, color: '#94A3B8', marginTop: '6px',
                    }}
                  >
                    {a.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section style={{ backgroundColor: '#111827', padding: '72px 24px' }}>
        <div className="mx-auto text-center" style={{ maxWidth: '720px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease }}
          >
            <HeartHandshake size={28} style={{ color: '#2DD4BF', margin: '0 auto' }} />
            <p
              style={{
                fontFamily: headingFont, fontWeight: 300,
                fontSize: 'clamp(1.25rem, 2.4vw, 1.5rem)', lineHeight: 1.5,
                color: '#E2E8F0', marginTop: '20px',
              }}
            >
              Sovereign infrastructure. Transparent intelligence. The clinician in command,
              and the nurse at the bedside — where care belongs.
            </p>
            <button
              onClick={() => navigate('/')}
              style={{
                marginTop: '32px', padding: '12px 28px', borderRadius: '4px',
                backgroundColor: '#0D9488', color: '#0A0E1A', border: 'none',
                fontFamily: headingFont, fontWeight: 500, fontSize: '1rem', cursor: 'pointer',
              }}
            >
              Return to overview
            </button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
