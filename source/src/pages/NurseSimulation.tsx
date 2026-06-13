import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UserRound, Stethoscope, Plus, Minus, AlertTriangle,
  CheckCircle2, XCircle, Users, Bed, Activity, Phone,
  ChevronRight, Shield, Cpu, RefreshCw, AlertOctagon,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════
   DATA MODELS
   ═══════════════════════════════════════════════════ */

interface Device {
  id: string;
  name: string;
  skillCategory: string[];
  complexity: 1 | 2 | 3;
}

interface Patient {
  id: string;
  room: string;
  name: string;
  diagnosis: string;
  acuity: 1 | 2 | 3;
  devices: Device[];
}

interface Nurse {
  id: string;
  name: string;
  skills: Record<string, number>;
  maxPatients: number;
  currentAssignments: number;
  isCharge: boolean;
}

interface Assignment {
  patientId: string;
  nurseId: string;
  compatibility: number;
  unmatchedDevices: Device[];
}

/* ─── Device Catalog ─── */
const DEVICE_CATALOG: Device[] = [
  { id: 'art-line', name: 'Arterial Line', skillCategory: ['cardiac', 'criticalCare'], complexity: 2 },
  { id: 'vent', name: 'Ventilator', skillCategory: ['respiratory', 'criticalCare'], complexity: 2 },
  { id: 'chest-tube', name: 'Chest Tube', skillCategory: ['trauma', 'surgical'], complexity: 3 },
  { id: 'central-line', name: 'Central Line', skillCategory: ['criticalCare', 'generalICU'], complexity: 2 },
  { id: 'vasopressor', name: 'Vasopressor Infusion', skillCategory: ['cardiac', 'criticalCare'], complexity: 3 },
  { id: 'ecmo', name: 'ECMO', skillCategory: ['ecmo', 'respiratory', 'criticalCare'], complexity: 3 },
  { id: 'ng-tube', name: 'NG Tube', skillCategory: ['gi', 'generalICU'], complexity: 1 },
  { id: 'icp', name: 'ICP Monitor', skillCategory: ['neurology', 'criticalCare'], complexity: 3 },
  { id: 'evd', name: 'EVD', skillCategory: ['neurology', 'criticalCare'], complexity: 3 },
  { id: 'insulin-pump', name: 'Insulin Infusion Pump', skillCategory: ['generalICU'], complexity: 2 },
  { id: 'pelvic-binder', name: 'Pelvic Binder', skillCategory: ['trauma'], complexity: 2 },
  { id: 'ext-fixator', name: 'External Fixator', skillCategory: ['trauma', 'surgical'], complexity: 2 },
  { id: 'feeding-pump', name: 'Enteral Feeding Pump', skillCategory: ['nutrition', 'generalICU'], complexity: 1 },
  { id: 'crrt', name: 'CRRT', skillCategory: ['renal', 'criticalCare'], complexity: 3 },
  { id: 'eeg', name: 'EEG Monitor', skillCategory: ['neurology'], complexity: 2 },
  { id: 'cooling', name: 'Cooling Blanket', skillCategory: ['neurology', 'generalICU'], complexity: 2 },
  { id: 'wound-vac', name: 'Wound Vacuum', skillCategory: ['woundCare'], complexity: 2 },
  { id: 'fluid-resusc', name: 'Fluid Resuscitation Pump', skillCategory: ['criticalCare', 'generalICU'], complexity: 2 },
  { id: 'thermo-bed', name: 'Thermoregulatory Bed', skillCategory: ['generalICU'], complexity: 2 },
  { id: 'prone-bed', name: 'Prone Positioning Bed', skillCategory: ['respiratory', 'criticalCare'], complexity: 3 },
  { id: 'bladder-press', name: 'Bladder Pressure Monitor', skillCategory: ['gi', 'generalICU'], complexity: 1 },
  { id: 'pacemaker', name: 'Temporary Pacemaker', skillCategory: ['cardiac', 'criticalCare'], complexity: 3 },
  { id: 'impella', name: 'Impella', skillCategory: ['cardiac', 'criticalCare', 'ecmo'], complexity: 3 },
  { id: 'iabp', name: 'IABP', skillCategory: ['cardiac', 'criticalCare'], complexity: 3 },
];

/* ─── Initial Patients ─── */
const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'p1', room: '101', name: 'Patient 101',
    diagnosis: 'Post-Op CABG', acuity: 3,
    devices: [
      DEVICE_CATALOG.find(d => d.id === 'art-line')!,
      DEVICE_CATALOG.find(d => d.id === 'vent')!,
      DEVICE_CATALOG.find(d => d.id === 'chest-tube')!,
      DEVICE_CATALOG.find(d => d.id === 'pacemaker')!,
    ],
  },
  {
    id: 'p2', room: '102', name: 'Patient 102',
    diagnosis: 'Septic Shock', acuity: 3,
    devices: [
      DEVICE_CATALOG.find(d => d.id === 'central-line')!,
      DEVICE_CATALOG.find(d => d.id === 'art-line')!,
      DEVICE_CATALOG.find(d => d.id === 'vasopressor')!,
      DEVICE_CATALOG.find(d => d.id === 'vent')!,
    ],
  },
  {
    id: 'p3', room: '103', name: 'Patient 103',
    diagnosis: 'ARDS', acuity: 3,
    devices: [
      DEVICE_CATALOG.find(d => d.id === 'vent')!,
      DEVICE_CATALOG.find(d => d.id === 'prone-bed')!,
      DEVICE_CATALOG.find(d => d.id === 'art-line')!,
    ],
  },
  {
    id: 'p4', room: '104', name: 'Patient 104',
    diagnosis: 'GI Bleed / Hemodynamic Instability', acuity: 2,
    devices: [
      DEVICE_CATALOG.find(d => d.id === 'ng-tube')!,
      DEVICE_CATALOG.find(d => d.id === 'central-line')!,
      DEVICE_CATALOG.find(d => d.id === 'bladder-press')!,
    ],
  },
  {
    id: 'p5', room: '105', name: 'Patient 105',
    diagnosis: 'Post-Craniotomy', acuity: 3,
    devices: [
      DEVICE_CATALOG.find(d => d.id === 'icp')!,
      DEVICE_CATALOG.find(d => d.id === 'evd')!,
      DEVICE_CATALOG.find(d => d.id === 'vent')!,
    ],
  },
  {
    id: 'p6', room: '106', name: 'Patient 106',
    diagnosis: 'DKA / Severe Acidosis', acuity: 2,
    devices: [
      DEVICE_CATALOG.find(d => d.id === 'insulin-pump')!,
      DEVICE_CATALOG.find(d => d.id === 'central-line')!,
      DEVICE_CATALOG.find(d => d.id === 'art-line')!,
    ],
  },
  {
    id: 'p7', room: '107', name: 'Patient 107',
    diagnosis: 'Multi-Trauma', acuity: 3,
    devices: [
      DEVICE_CATALOG.find(d => d.id === 'chest-tube')!,
      DEVICE_CATALOG.find(d => d.id === 'pelvic-binder')!,
      DEVICE_CATALOG.find(d => d.id === 'ext-fixator')!,
    ],
  },
  {
    id: 'p8', room: '108', name: 'Patient 108',
    diagnosis: 'Severe Acute Pancreatitis', acuity: 2,
    devices: [
      DEVICE_CATALOG.find(d => d.id === 'feeding-pump')!,
      DEVICE_CATALOG.find(d => d.id === 'central-line')!,
      DEVICE_CATALOG.find(d => d.id === 'crrt')!,
    ],
  },
  {
    id: 'p9', room: '109', name: 'Patient 109',
    diagnosis: 'Status Epilepticus', acuity: 3,
    devices: [
      DEVICE_CATALOG.find(d => d.id === 'eeg')!,
      DEVICE_CATALOG.find(d => d.id === 'vent')!,
      DEVICE_CATALOG.find(d => d.id === 'cooling')!,
    ],
  },
  {
    id: 'p10', room: '110', name: 'Patient 110',
    diagnosis: 'Burns 35% TBSA', acuity: 3,
    devices: [
      DEVICE_CATALOG.find(d => d.id === 'wound-vac')!,
      DEVICE_CATALOG.find(d => d.id === 'fluid-resusc')!,
      DEVICE_CATALOG.find(d => d.id === 'thermo-bed')!,
    ],
  },
];

/* ─── Nurses ─── */
const NURSES: Nurse[] = [
  { id: 'n1', name: 'RN Martinez', skills: { cardiac: 4, criticalCare: 3, respiratory: 2, generalICU: 2, trauma: 1, neurology: 1, surgical: 1, gi: 1, renal: 1, nutrition: 1, woundCare: 1, ecmo: 0 }, maxPatients: 2, currentAssignments: 0, isCharge: false },
  { id: 'n2', name: 'RN Chen', skills: { respiratory: 4, ecmo: 3, criticalCare: 2, generalICU: 2, cardiac: 1, trauma: 1, neurology: 1, surgical: 1, gi: 1, renal: 1, nutrition: 1, woundCare: 1 }, maxPatients: 2, currentAssignments: 0, isCharge: false },
  { id: 'n3', name: 'RN Johnson', skills: { trauma: 4, surgical: 3, woundCare: 2, criticalCare: 2, generalICU: 2, cardiac: 1, respiratory: 1, neurology: 1, gi: 1, renal: 1, nutrition: 1, ecmo: 0 }, maxPatients: 2, currentAssignments: 0, isCharge: false },
  { id: 'n4', name: 'RN Williams', skills: { neurology: 4, criticalCare: 3, generalICU: 2, cardiac: 1, respiratory: 2, trauma: 1, surgical: 1, gi: 1, renal: 1, nutrition: 1, woundCare: 1, ecmo: 0 }, maxPatients: 2, currentAssignments: 0, isCharge: false },
  { id: 'n5', name: 'RN Patel', skills: { gi: 4, renal: 3, generalICU: 3, criticalCare: 2, nutrition: 2, cardiac: 1, respiratory: 1, trauma: 1, surgical: 1, neurology: 1, woundCare: 1, ecmo: 0 }, maxPatients: 2, currentAssignments: 0, isCharge: false },
  { id: 'n6', name: "RN O'Brien", skills: { cardiac: 5, criticalCare: 5, trauma: 3, respiratory: 3, generalICU: 3, surgical: 2, neurology: 2, gi: 2, renal: 2, nutrition: 1, woundCare: 1, ecmo: 1 }, maxPatients: 1, currentAssignments: 0, isCharge: true },
  { id: 'n7', name: 'RN Kim', skills: { respiratory: 3, generalICU: 3, criticalCare: 2, neurology: 1, cardiac: 1, trauma: 1, surgical: 1, gi: 1, renal: 1, nutrition: 1, woundCare: 1, ecmo: 0 }, maxPatients: 2, currentAssignments: 0, isCharge: false },
  { id: 'n8', name: 'RN Singh', skills: { surgical: 4, cardiac: 3, woundCare: 3, criticalCare: 2, trauma: 2, generalICU: 2, respiratory: 1, neurology: 1, gi: 1, renal: 1, nutrition: 1, ecmo: 0 }, maxPatients: 2, currentAssignments: 0, isCharge: false },
  { id: 'n9', name: 'RN Thompson', skills: { generalICU: 4, criticalCare: 3, cardiac: 2, respiratory: 2, trauma: 2, surgical: 2, neurology: 1, gi: 2, renal: 2, nutrition: 2, woundCare: 1, ecmo: 0 }, maxPatients: 2, currentAssignments: 0, isCharge: false },
  { id: 'n10', name: 'RN Garcia', skills: { criticalCare: 3, cardiac: 3, respiratory: 3, generalICU: 3, trauma: 2, surgical: 2, neurology: 2, gi: 2, renal: 2, nutrition: 1, woundCare: 1, ecmo: 0 }, maxPatients: 2, currentAssignments: 0, isCharge: false },
  { id: 'n11', name: 'RN Davis', skills: { neurology: 3, generalICU: 3, criticalCare: 2, trauma: 2, cardiac: 1, respiratory: 1, surgical: 1, gi: 1, renal: 1, nutrition: 1, woundCare: 1, ecmo: 0 }, maxPatients: 2, currentAssignments: 0, isCharge: false },
  { id: 'n12', name: 'RN Lee', skills: { renal: 4, gi: 3, criticalCare: 3, generalICU: 3, cardiac: 2, respiratory: 2, trauma: 1, surgical: 1, neurology: 1, nutrition: 2, woundCare: 1, ecmo: 1 }, maxPatients: 2, currentAssignments: 0, isCharge: false },
];

/* ═══════════════════════════════════════════════════
   ASSIGNMENT ENGINE
   ═══════════════════════════════════════════════════ */

function calculateNurseCompatibility(nurse: Nurse, patient: Patient): { score: number; unmatched: Device[] } {
  let totalScore = 0;
  let maxPossible = 0;
  const unmatched: Device[] = [];

  for (const device of patient.devices) {
    let deviceScore = 0;
    for (const skill of device.skillCategory) {
      const skillLevel = nurse.skills[skill] || 0;
      deviceScore = Math.max(deviceScore, skillLevel);
    }
    if (deviceScore === 0) {
      unmatched.push(device);
    }
    totalScore += deviceScore * device.complexity;
    maxPossible += 5 * device.complexity;
  }

  const normalized = maxPossible > 0 ? (totalScore / maxPossible) * 100 : 0;
  return { score: Math.round(normalized), unmatched };
}

function runAssignmentEngine(patients: Patient[], nurses: Nurse[]): {
  assignments: Assignment[];
  unassigned: Patient[];
  skillGaps: { patient: Patient; missingSkills: string[] }[];
  overCapacity: boolean;
} {
  const sortedPatients = [...patients].sort((a, b) => b.acuity - a.acuity);
  const availableNurses = nurses.map(n => ({ ...n, assigned: 0 }));
  const assignments: Assignment[] = [];
  const unassigned: Patient[] = [];
  const skillGaps: { patient: Patient; missingSkills: string[] }[] = [];

  for (const patient of sortedPatients) {
    let bestNurse = null;
    let bestScore = -1;
    let bestUnmatched: Device[] = [];

    for (const nurse of availableNurses) {
      if (nurse.assigned >= nurse.maxPatients) continue;
      const { score, unmatched } = calculateNurseCompatibility(nurse, patient);
      if (score > bestScore) {
        bestScore = score;
        bestNurse = nurse;
        bestUnmatched = unmatched;
      }
    }

    if (bestNurse && bestScore > 0) {
      bestNurse.assigned++;
      const missingSkillNames = [...new Set(bestUnmatched.flatMap(d => d.skillCategory))];
      if (missingSkillNames.length > 0) {
        skillGaps.push({ patient, missingSkills: missingSkillNames });
      }
      assignments.push({
        patientId: patient.id,
        nurseId: bestNurse.id,
        compatibility: bestScore,
        unmatchedDevices: bestUnmatched,
      });
    } else {
      unassigned.push(patient);
      skillGaps.push({
        patient,
        missingSkills: [...new Set(patient.devices.flatMap(d => d.skillCategory))],
      });
    }
  }

  const overCapacity = unassigned.length > 0;
  return { assignments, unassigned, skillGaps, overCapacity };
}

/* ═══════════════════════════════════════════════════
   SKILL COLOR MAP
   ═══════════════════════════════════════════════════ */

const SKILL_COLORS: Record<string, string> = {
  cardiac: '#EF4444',
  criticalCare: '#0D9488',
  respiratory: '#06B6D4',
  generalICU: '#3B82F6',
  trauma: '#F59E0B',
  surgical: '#8B5CF6',
  neurology: '#EC4899',
  gi: '#10B981',
  renal: '#6366F1',
  nutrition: '#14B8A6',
  woundCare: '#F97316',
  ecmo: '#DC2626',
};

const SKILL_LABELS: Record<string, string> = {
  cardiac: 'Cardiac',
  criticalCare: 'Critical Care',
  respiratory: 'Respiratory',
  generalICU: 'General ICU',
  trauma: 'Trauma',
  surgical: 'Surgical',
  neurology: 'Neuro',
  gi: 'GI',
  renal: 'Renal',
  nutrition: 'Nutrition',
  woundCare: 'Wound',
  ecmo: 'ECMO',
};

const ACUITY_COLORS = { 1: '#10B981', 2: '#F59E0B', 3: '#EF4444' };
const ACUITY_LABELS = { 1: 'Low', 2: 'Moderate', 3: 'High' };

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */

export default function NurseSimulation() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [showDevicePanel, setShowDevicePanel] = useState(false);
  const [showNurses, setShowNurses] = useState(false);
  // Call-in alert state managed by derived conditions below

  /* ─── Run Assignment Engine ─── */
  const result = useMemo(() => runAssignmentEngine(patients, NURSES), [patients]);

  const getAssignment = useCallback((patientId: string) => {
    return result.assignments.find(a => a.patientId === patientId);
  }, [result]);

  const getAssignedNurse = useCallback((patientId: string) => {
    const assignment = getAssignment(patientId);
    if (!assignment) return null;
    return NURSES.find(n => n.id === assignment.nurseId) || null;
  }, [getAssignment]);

  /* ─── Device Management ─── */
  const addDevice = (patientId: string, device: Device) => {
    setPatients(prev => prev.map(p => {
      if (p.id !== patientId) return p;
      if (p.devices.find(d => d.id === device.id)) return p;
      return { ...p, devices: [...p.devices, device] };
    }));
  };

  const removeDevice = (patientId: string, deviceId: string) => {
    setPatients(prev => prev.map(p => {
      if (p.id !== patientId) return p;
      return { ...p, devices: p.devices.filter(d => d.id !== deviceId) };
    }));
  };

  const resetSimulation = () => {
    setPatients(INITIAL_PATIENTS.map(p => ({ ...p, devices: [...p.devices] })));
    setSelectedPatient(null);
    setShowDevicePanel(false);
  };

  /* ─── Derived Metrics ─── */
  const totalDevices = patients.reduce((sum, p) => sum + p.devices.length, 0);
  const avgCompatibility = result.assignments.length > 0
    ? Math.round(result.assignments.reduce((s, a) => s + a.compatibility, 0) / result.assignments.length)
    : 0;
  const criticalGaps = result.skillGaps.filter(sg => sg.patient.acuity === 3 && sg.missingSkills.length > 0).length;

  /* ─── Available devices for selected patient ─── */
  const availableDevices = useMemo(() => {
    if (!selectedPatient) return [];
    const patient = patients.find(p => p.id === selectedPatient);
    if (!patient) return [];
    return DEVICE_CATALOG.filter(d => !patient.devices.find(pd => pd.id === d.id));
  }, [selectedPatient, patients]);

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
            Nurse Assignment Simulation
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={resetSimulation}
            className="flex items-center gap-1.5 px-3 py-1 rounded transition-all hover:opacity-80"
            style={{ border: '1px solid #334155', color: '#94A3B8', fontSize: '0.75rem', fontFamily: "'Inter', sans-serif" }}
          >
            <RefreshCw size={12} /> Reset
          </button>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#64748B' }}>Sutter Health</span>
        </div>
      </header>

      <div style={{ height: '56px' }} />

      <div className="mx-auto px-4 md:px-6 py-6" style={{ maxWidth: '1400px' }}>
        {/* ─── TITLE SECTION ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0D9488' }}>
              SIMULATION MODULE
            </span>
            <Cpu size={14} style={{ color: '#0D9488' }} />
          </div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#F1F5F9', letterSpacing: '-0.02em' }}>
            Device-Skill Matching Engine
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: '#94A3B8', maxWidth: '700px', marginTop: '8px' }}>
            Match 10 patients with device requirements to 12 nurses with varying skill levels. 
            Add or remove devices to see real-time assignment recalculation.
          </p>
        </motion.div>

        {/* ─── METRICS BAR ─── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
        >
          <MetricTile icon={<Bed size={18} />} label="PATIENTS" value="10" color="#0D9488" />
          <MetricTile icon={<Users size={18} />} label="NURSES ON DUTY" value="12" color="#06B6D4" />
          <MetricTile icon={<Activity size={18} />} label="TOTAL DEVICES" value={String(totalDevices)} color="#3B82F6" />
          <MetricTile
            icon={<Shield size={18} />}
            label="AVG COMPATIBILITY"
            value={`${avgCompatibility}%`}
            color={avgCompatibility >= 80 ? '#10B981' : avgCompatibility >= 60 ? '#F59E0B' : '#EF4444'}
          />
        </motion.div>

        {/* ─── CAPACITY ALERT ─── */}
        {result.overCapacity && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-4 rounded-lg p-4 flex items-start gap-3"
            style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
          >
            <AlertOctagon size={20} style={{ color: '#EF4444', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.875rem', color: '#F1F5F9' }}>
                Skill Pool Exceeded
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#94A3B8', marginTop: '4px' }}>
                {result.unassigned.length} patient(s) cannot be adequately assigned with current on-duty staff.
                <strong style={{ color: '#F1F5F9' }}> Call in additional skilled nurses who are not on duty.</strong>
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {result.skillGaps.filter(sg => sg.missingSkills.length > 0).map((sg, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded text-xs"
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#FCA5A5', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                  >
                    Room {sg.patient.room}: needs {sg.missingSkills.map(s => SKILL_LABELS[s] || s).join(', ')}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── CRITICAL GAPS WARNING (non-blocking) ─── */}
        {criticalGaps > 0 && !result.overCapacity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 rounded-lg p-3 flex items-center gap-3"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)' }}
          >
            <AlertTriangle size={18} style={{ color: '#F59E0B', flexShrink: 0 }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#FCD34D' }}>
              <strong>{criticalGaps}</strong> high-acuity patient(s) have partial skill coverage gaps. 
              Consider calling in specialty nurses for: {result.skillGaps
                .filter(sg => sg.patient.acuity === 3 && sg.missingSkills.length > 0)
                .flatMap(sg => sg.missingSkills)
                .filter((v, i, a) => a.indexOf(v) === i)
                .map(s => SKILL_LABELS[s] || s)
                .join(', ')}
            </p>
          </motion.div>
        )}

        {/* ─── MAIN GRID: PATIENTS + ASSIGNMENTS ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Patient Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
            {patients.map((patient, idx) => {
              const assignment = getAssignment(patient.id);
              const nurse = getAssignedNurse(patient.id);
              const isSelected = selectedPatient === patient.id;
              const gapInfo = result.skillGaps.find(sg => sg.patient.id === patient.id);
              const hasGap = gapInfo && gapInfo.missingSkills.length > 0;

              return (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-lg p-4 cursor-pointer transition-all"
                  style={{
                    backgroundColor: isSelected ? '#1A2332' : '#111827',
                    border: `1px solid ${isSelected ? '#334155' : '#1E293B'}`,
                    borderLeft: `4px solid ${hasGap ? '#EF4444' : ACUITY_COLORS[patient.acuity]}`,
                  }}
                  onClick={() => { setSelectedPatient(patient.id); setShowDevicePanel(true); }}
                  whileHover={{ y: -2, borderColor: '#334155' }}
                >
                  {/* Patient Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Bed size={16} style={{ color: ACUITY_COLORS[patient.acuity] }} />
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '0.875rem', color: '#F1F5F9' }}>
                        Room {patient.room}
                      </span>
                      <span
                        className="px-1.5 py-0.5 rounded text-xs"
                        style={{
                          backgroundColor: `${ACUITY_COLORS[patient.acuity]}15`,
                          color: ACUITY_COLORS[patient.acuity],
                          fontSize: '0.625rem',
                          fontWeight: 500,
                        }}
                      >
                        {ACUITY_LABELS[patient.acuity]}
                      </span>
                    </div>
                    {assignment && (
                      <span
                        className="px-2 py-0.5 rounded-full text-xs"
                        style={{
                          backgroundColor: assignment.compatibility >= 80 ? 'rgba(16, 185, 129, 0.12)' : assignment.compatibility >= 50 ? 'rgba(245, 158, 11, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                          color: assignment.compatibility >= 80 ? '#10B981' : assignment.compatibility >= 50 ? '#F59E0B' : '#EF4444',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.625rem',
                        }}
                      >
                        {assignment.compatibility}%
                      </span>
                    )}
                  </div>

                  {/* Diagnosis */}
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#94A3B8', marginBottom: '8px' }}>
                    {patient.diagnosis}
                  </p>

                  {/* Devices */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {patient.devices.map(device => (
                      <span
                        key={device.id}
                        className="px-2 py-0.5 rounded flex items-center gap-1"
                        style={{
                          backgroundColor: 'rgba(13, 148, 136, 0.08)',
                          border: '1px solid rgba(13, 148, 136, 0.2)',
                          fontSize: '0.6875rem',
                          color: '#5EEAD4',
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        <Cpu size={10} />
                        {device.name}
                      </span>
                    ))}
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedPatient(patient.id); setShowDevicePanel(true); }}
                      className="px-2 py-0.5 rounded flex items-center gap-1 transition-all hover:opacity-80"
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.08)',
                        border: '1px dashed rgba(59, 130, 246, 0.3)',
                        fontSize: '0.6875rem',
                        color: '#60A5FA',
                      }}
                    >
                      <Plus size={10} /> Add
                    </button>
                  </div>

                  {/* Assignment */}
                  {nurse && (
                    <div
                      className="flex items-center gap-2 p-2 rounded"
                      style={{
                        backgroundColor: hasGap ? 'rgba(239, 68, 68, 0.06)' : 'rgba(16, 185, 129, 0.06)',
                        border: `1px solid ${hasGap ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)'}`,
                      }}
                    >
                      <UserRound size={14} style={{ color: hasGap ? '#EF4444' : '#10B981' }} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#F1F5F9' }}>
                        {nurse.name} {nurse.isCharge && '(Charge)'}
                      </span>
                      {hasGap ? (
                        <XCircle size={12} style={{ color: '#EF4444' }} />
                      ) : (
                        <CheckCircle2 size={12} style={{ color: '#10B981' }} />
                      )}
                      {assignment && assignment.unmatchedDevices.length > 0 && (
                        <span style={{ fontSize: '0.625rem', color: '#F59E0B', marginLeft: 'auto' }}>
                          {assignment.unmatchedDevices.length} gap
                        </span>
                      )}
                    </div>
                  )}
                  {!nurse && (
                    <div
                      className="flex items-center gap-2 p-2 rounded"
                      style={{ backgroundColor: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.15)' }}
                    >
                      <AlertTriangle size={14} style={{ color: '#EF4444' }} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#FCA5A5' }}>
                        No qualified nurse available — call in additional staff
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Side Panel: Device Manager OR Assignment Summary */}
          <div className="lg:col-span-1">
            {showDevicePanel && selectedPatient ? (() => {
              const patient = patients.find(p => p.id === selectedPatient);
              if (!patient) return null;
              return (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-lg p-4 sticky top-20"
                  style={{ backgroundColor: '#111827', border: '1px solid #1E293B' }}
                >
                  {/* Panel Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '1rem', color: '#F1F5F9' }}>
                        Room {patient.room}
                      </h3>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#64748B' }}>
                        {patient.diagnosis}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowDevicePanel(false)}
                      className="p-1 rounded transition-all hover:bg-white/5"
                    >
                      <XCircle size={16} style={{ color: '#64748B' }} />
                    </button>
                  </div>

                  {/* Current Devices */}
                  <div className="mb-4">
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', letterSpacing: '0.08em', color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Current Devices ({patient.devices.length})
                    </p>
                    <div className="space-y-2">
                      {patient.devices.map(device => {
                        const assignedNurse = getAssignedNurse(patient.id);
                        const canManage = assignedNurse ? device.skillCategory.some(s => (assignedNurse.skills[s] || 0) >= device.complexity) : false;
                        return (
                          <div
                            key={device.id}
                            className="flex items-center justify-between p-2 rounded"
                            style={{ backgroundColor: '#0A0E1A', border: '1px solid #1E293B' }}
                          >
                            <div className="flex items-center gap-2">
                              <Cpu size={12} style={{ color: canManage ? '#10B981' : '#F59E0B' }} />
                              <div>
                                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#F1F5F9' }}>{device.name}</p>
                                <div className="flex gap-1 mt-0.5">
                                  {device.skillCategory.map(s => (
                                    <span key={s} style={{ fontSize: '0.625rem', color: SKILL_COLORS[s] || '#64748B' }}>
                                      {SKILL_LABELS[s] || s}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeDevice(patient.id, device.id)}
                              className="p-1 rounded transition-all hover:bg-red-500/10"
                              title="Remove device"
                            >
                              <Minus size={14} style={{ color: '#EF4444' }} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Add Devices */}
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', letterSpacing: '0.08em', color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Available Devices ({availableDevices.length})
                    </p>
                    <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                      {availableDevices.map(device => (
                        <button
                          key={device.id}
                          onClick={() => addDevice(patient.id, device)}
                          className="w-full flex items-center justify-between p-2 rounded text-left transition-all hover:bg-teal-500/5"
                          style={{ backgroundColor: '#0A0E1A', border: '1px dashed #1E293B' }}
                        >
                          <div className="flex items-center gap-2">
                            <Plus size={12} style={{ color: '#0D9488' }} />
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#94A3B8' }}>{device.name}</span>
                          </div>
                          <div className="flex gap-1">
                            {device.skillCategory.slice(0, 2).map(s => (
                              <span key={s} className="px-1 rounded" style={{ fontSize: '0.5625rem', backgroundColor: `${SKILL_COLORS[s]}15`, color: SKILL_COLORS[s] }}>
                                {SKILL_LABELS[s]}
                              </span>
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })() : (
              /* Assignment Summary Panel */
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-lg p-4 sticky top-20"
                style={{ backgroundColor: '#111827', border: '1px solid #1E293B' }}
              >
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '1rem', color: '#F1F5F9', marginBottom: '12px' }}>
                  Assignment Summary
                </h3>

                {/* Per-nurse load */}
                <div className="space-y-2 mb-4">
                  {NURSES.map(nurse => {
                    const count = result.assignments.filter(a => a.nurseId === nurse.id).length;
                    const loadPct = (count / nurse.maxPatients) * 100;
                    return (
                      <div key={nurse.id} className="flex items-center gap-2">
                        <UserRound size={12} style={{ color: nurse.isCharge ? '#F59E0B' : '#64748B' }} />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#94A3B8', width: '90px' }} className="truncate">
                          {nurse.name}
                        </span>
                        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#1E293B' }}>
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: loadPct >= 100 ? '#EF4444' : loadPct >= 70 ? '#F59E0B' : '#10B981',
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(loadPct, 100)}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.625rem', color: '#64748B', width: '30px', textAlign: 'right' }}>
                          {count}/{nurse.maxPatients}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Call-in suggestion */}
                {result.overCapacity && (
                  <div
                    className="rounded p-3 flex items-start gap-2"
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                  >
                    <Phone size={14} style={{ color: '#EF4444', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.75rem', color: '#FCA5A5' }}>
                        Call In Additional Nurses
                      </p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', color: '#94A3B8', marginTop: '2px' }}>
                        Needed skills: {result.skillGaps
                          .filter(sg => sg.missingSkills.length > 0)
                          .flatMap(sg => sg.missingSkills)
                          .filter((v, i, a) => a.indexOf(v) === i)
                          .map(s => SKILL_LABELS[s] || s)
                          .join(', ')}
                      </p>
                    </div>
                  </div>
                )}

                {/* View Nurses Toggle */}
                <button
                  onClick={() => setShowNurses(!showNurses)}
                  className="w-full mt-3 flex items-center justify-between p-2 rounded transition-all hover:bg-white/5"
                  style={{ border: '1px solid #1E293B' }}
                >
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#94A3B8' }}>
                    View Nurse Skill Matrix
                  </span>
                  <ChevronRight size={14} style={{ color: '#64748B', transform: showNurses ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* ─── NURSE SKILL MATRIX (expandable) ─── */}
        {showNurses && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="rounded-lg p-4 mb-6 overflow-x-auto"
            style={{ backgroundColor: '#111827', border: '1px solid #1E293B' }}
          >
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '1rem', color: '#F1F5F9', marginBottom: '12px' }}>
              Nurse Skill Matrix
            </h3>
            <table className="w-full" style={{ minWidth: '800px' }}>
              <thead>
                <tr>
                  <th className="text-left py-2 px-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', color: '#64748B', fontWeight: 500 }}>NURSE</th>
                  <th className="text-center py-2 px-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', color: '#64748B', fontWeight: 500 }}>ROLE</th>
                  {Object.entries(SKILL_LABELS).map(([key, label]) => (
                    <th key={key} className="text-center py-2 px-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.625rem', color: SKILL_COLORS[key] || '#64748B', fontWeight: 500 }}>
                      {label.toUpperCase()}
                    </th>
                  ))}
                  <th className="text-center py-2 px-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', color: '#64748B', fontWeight: 500 }}>MAX PTS</th>
                </tr>
              </thead>
              <tbody>
                {NURSES.map(nurse => (
                  <tr key={nurse.id} style={{ borderTop: '1px solid #1E293B' }}>
                    <td className="py-2 px-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#F1F5F9' }}>
                      {nurse.name}
                    </td>
                    <td className="text-center py-2 px-1">
                      {nurse.isCharge ? (
                        <span className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#F59E0B', fontSize: '0.625rem' }}>
                          Charge
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.625rem', color: '#64748B' }}>Staff</span>
                      )}
                    </td>
                    {Object.keys(SKILL_LABELS).map(skill => {
                      const level = nurse.skills[skill] || 0;
                      return (
                        <td key={skill} className="text-center py-2 px-1">
                          <div
                            className="mx-auto rounded flex items-center justify-center"
                            style={{
                              width: '28px',
                              height: '20px',
                              backgroundColor: level >= 4 ? `${SKILL_COLORS[skill]}20` : level >= 3 ? `${SKILL_COLORS[skill]}10` : level >= 1 ? 'rgba(100,116,139,0.08)' : 'transparent',
                              color: level >= 4 ? SKILL_COLORS[skill] : level >= 3 ? `${SKILL_COLORS[skill]}CC` : level >= 1 ? '#64748B' : '#1E293B',
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: '0.6875rem',
                              fontWeight: level >= 4 ? 600 : 400,
                            }}
                          >
                            {level > 0 ? level : '-'}
                          </div>
                        </td>
                      );
                    })}
                    <td className="text-center py-2 px-1" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#94A3B8' }}>
                      {nurse.maxPatients}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 pt-3" style={{ borderTop: '1px solid #1E293B' }}>
              <span style={{ fontSize: '0.625rem', color: '#64748B' }}>Skill Level: <strong style={{ color: '#F1F5F9' }}>1-2</strong> Basic | <strong style={{ color: '#94A3B8' }}>3</strong> Proficient | <strong style={{ color: '#5EEAD4' }}>4</strong> Advanced | <strong style={{ color: '#0D9488' }}>5</strong> Expert</span>
            </div>
          </motion.div>
        )}

        {/* ─── FOOTER ─── */}
        <footer className="mt-8 pt-6 pb-8" style={{ borderTop: '1px solid #1E293B' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Stethoscope size={14} style={{ color: '#64748B' }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#64748B' }}>
                VNC ICU Singularity — Device-Skill Matching Simulation
              </span>
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#64748B' }}>
              No patient-identifiable information is stored or displayed
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#64748B' }}>
              v1.1.0-simulation
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════ */

function MetricTile({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <motion.div
      className="rounded-lg p-3 flex items-center gap-3"
      style={{ backgroundColor: '#111827', border: '1px solid #1E293B', borderLeft: `3px solid ${color}` }}
      whileHover={{ y: -1 }}
    >
      <div style={{ color }}>{icon}</div>
      <div>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '1.25rem', color: '#F1F5F9' }}>{value}</p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.625rem', letterSpacing: '0.08em', color: '#64748B', textTransform: 'uppercase' }}>{label}</p>
      </div>
    </motion.div>
  );
}
