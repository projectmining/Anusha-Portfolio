import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, LineChart, Line, CartesianGrid,
} from "recharts";

const StatCard = ({label, value, sub}) => (
  <div className="card p-5">
    <div className="text-sm text-slate-400">{label}</div>
    <div className="text-3xl font-bold mt-1">{value}</div>
    {sub && <div className="text-slate-400 mt-1">{sub}</div>}
  </div>
);

const Section = ({title, subtitle, children, right}) => (
  <section className="grid lg:grid-cols-2 gap-6 items-start">
    <div>
      <h2 className="text-xl lg:text-2xl">{title}</h2>
      <p className="text-slate-400 mt-2">{subtitle}</p>
      <div className="mt-4">{children}</div>
    </div>
    {right}
  </section>
);

export default function App(){
  // --- Optimization Simulator state ---
  const [org, setOrg] = useState("University");
  const [reportsPerMonth, setReportsPerMonth] = useState(40);
  const [hoursPerReport, setHoursPerReport] = useState(2);
  const [automationLevel, setAutomationLevel] = useState(60);

  // Calculation logic
  const sim = useMemo(()=>{
    const baselineHours = reportsPerMonth * hoursPerReport;
    const automationFactor = automationLevel/100; // 0..1
    const hoursSaved = Math.round(baselineHours * (0.25 + 0.35*automationFactor)); // 25%..60%
    const visibilityLift = Math.round(20 + 30*automationFactor); // 20%..50%
    const roi = (2 + 2*automationFactor).toFixed(1); // 2.0x .. 4.0x
    return { baselineHours, hoursSaved, visibilityLift, roi };
  }, [reportsPerMonth, hoursPerReport, automationLevel]);

  // Skill radar data
  const radarData = [
    { subject: "Analytics", A: 92 },
    { subject: "Automation", A: 86 },
    { subject: "Visualization", A: 90 },
    { subject: "Communication", A: 88 },
    { subject: "AI Curiosity", A: 84 },
    { subject: "Mentorship", A: 87 },
  ];

  // Live KPIs (simulated) for the Real-Time panel
  const liveSeries = Array.from({length: 12}, (_,i)=> ({
    name: `Q${(i%4)+1} ${(2022 + Math.floor(i/4))}`,
    accuracy: 96 + (i%3),
    efficiency: 70 + (i*2)%20,
    impact: 3 + (i%5)/2,
  }));

  // Data stories (mocked)
  const stories = [
    {
      title: "HR Analytics @ NJ Transit",
      bullets: [
        "Contingent Workforce Dashboard (headcount, cost, tenure, DEI)",
        "HR Analytics Dashboard (hiring, retention, grievances, turnover)",
        "Saved 15+ hrs/month and flagged trends 30% faster"
      ],
    },
    {
      title: "BI Automation @ USEReady",
      bullets: [
        "Migrated 100+ reports to Power BI & Snowflake",
        "DAX + RLS + incremental refresh → 30% faster processing",
        "Standard templates saved 100+ hrs/year"
      ],
    },
    {
      title: "Public Health @ BBMP",
      bullets: [
        "Real-time dashboards for hospitalization & resources",
        "25% faster emergency allocation via data insights"
      ],
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl lg:text-4xl font-bold"
          >
            Anusha Hegde — <span className="text-accent-500">Analytics Portfolio</span>
          </motion.h1>
          <p className="text-slate-400 mt-2 max-w-2xl">
            Where data meets decisions. Explore interactive scenarios, live-style KPIs, and the stories behind the impact.
          </p>
        </div>
        <div className="flex gap-3">
          <a href="#" className="card px-4 py-2 hover:bg-slate-800 transition-colors">Download Résumé</a>
          <a href="#" className="card px-4 py-2 hover:bg-slate-800 transition-colors">Contact</a>
        </div>
      </header>

      {/* Optimization Simulator */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl lg:text-2xl">Optimization Simulator</h2>
        <p className="text-slate-400 mt-1">
          Estimate how much time and value Anusha could unlock for your {org}.
        </p>

        <div className="grid lg:grid-cols-4 gap-6 mt-6">
          <div>
            <label className="text-sm text-slate-400">Organization</label>
            <select value={org} onChange={e=>setOrg(e.target.value)}
              className="mt-1 w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
              <option>University</option>
              <option>Healthcare</option>
              <option>Public Transport</option>
              <option>Tech</option>
              <option>Retail</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-400">Reports per month</label>
            <input type="range" min={10} max={200} value={reportsPerMonth} onChange={e=>setReportsPerMonth(+e.target.value)} className="w-full" />
            <div className="text-sm mt-1">{reportsPerMonth}</div>
          </div>

          <div>
            <label className="text-sm text-slate-400">Hours per report</label>
            <input type="range" min={1} max={8} value={hoursPerReport} onChange={e=>setHoursPerReport(+e.target.value)} className="w-full" />
            <div className="text-sm mt-1">{hoursPerReport} hrs</div>
          </div>

          <div>
            <label className="text-sm text-slate-400">Automation level</label>
            <input type="range" min={0} max={100} value={automationLevel} onChange={e=>setAutomationLevel(+e.target.value)} className="w-full" />
            <div className="text-sm mt-1">{automationLevel}%</div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">
          <StatCard label="Baseline monthly hours" value={`${sim.baselineHours}h`} />
          <StatCard label="Hours saved" value={`${sim.hoursSaved}h`} sub="via automation & templates" />
          <StatCard label="Decision visibility lift" value={`${sim.visibilityLift}%`} />
          <StatCard label="Projected ROI" value={`${sim.roi}×`} />
        </div>
      </div>

      {/* Skill Radar + Live KPIs */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="card p-6">
          <h2 className="text-xl lg:text-2xl mb-3">Skill Radar</h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Anusha" dataKey="A" stroke="#EB602D" fill="#EB602D" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl lg:text-2xl mb-3">Real-Time Style KPIs</h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={liveSeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="accuracy" stroke="#34D399" strokeWidth={2} />
                <Line type="monotone" dataKey="efficiency" stroke="#60A5FA" strokeWidth={2} />
                <Line type="monotone" dataKey="impact" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Data Stories */}
      <div className="mb-8">
        <h2 className="text-xl lg:text-2xl mb-3">Data Stories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((s, idx)=> (
            <div key={idx} className="card p-5">
              <div className="text-lg font-semibold">{s.title}</div>
              <ul className="list-disc list-inside text-slate-300 mt-2 space-y-1">
                {s.bullets.map((b, i)=><li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Predictive Insight Playground */}
      <div className="card p-6 mb-10">
        <h2 className="text-xl lg:text-2xl">Predictive Insight Playground</h2>
        <p className="text-slate-400 mt-1">Enter a few numbers and see potential gains from automation & BI.</p>
        <div className="grid md:grid-cols-4 gap-6 mt-5">
          <div className="card p-4">
            <div className="text-sm text-slate-400">Manual reports/month</div>
            <input type="number" value={reportsPerMonth} onChange={e=>setReportsPerMonth(+e.target.value||0)} className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2" />
          </div>
          <div className="card p-4">
            <div className="text-sm text-slate-400">Avg hours/report</div>
            <input type="number" value={hoursPerReport} onChange={e=>setHoursPerReport(+e.target.value||0)} className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2" />
          </div>
          <div className="card p-4">
            <div className="text-sm text-slate-400">Automation level (%)</div>
            <input type="number" value={automationLevel} onChange={e=>setAutomationLevel(Math.min(100, Math.max(0, +e.target.value||0)))} className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            <StatCard label="Projected save" value={`${sim.hoursSaved}h/mo`} />
            <StatCard label="ROI" value={`${sim.roi}×`} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Anusha Hegde — Built with React, Tailwind, Recharts & Framer Motion
      </footer>
    </div>
  );
}
