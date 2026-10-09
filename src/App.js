import React, { useState } from 'react';
import {
  Building2,
  Users,
  CreditCard,
  BellRing,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Plus,
  Send,
  Sparkles,
  DollarSign,
  ArrowUpRight,
  ShieldAlert,
  ChevronRight,
  Filter
} from 'lucide-react';

// Mock Data matching your PG/Hostel rent collection workflow
const MOCK_PROPERTIES = [
  { id: '1', name: 'RKGIT Boys Hostel - Block A', totalRooms: 40, occupiedRooms: 36, monthlyTarget: 280000, collected: 238000 },
  { id: '2', name: 'Green Park PG for Students', totalRooms: 15, occupiedRooms: 14, monthlyTarget: 120000, collected: 95000 },
];

const MOCK_TENANTS = [
  { id: 'T1', name: 'Rahul Verma', room: '102 - Block A', rent: 7000, status: 'Paid', riskLevel: 'Low', riskScore: '12%', phone: '+91 9876543210', lastPaid: '2026-10-02' },
  { id: 'T2', name: 'Aman Sharma', room: '105 - Block A', rent: 7000, status: 'Pending', riskLevel: 'High', riskScore: '84%', phone: '+91 9876543211', lastPaid: '2026-09-05' },
  { id: 'T3', name: 'Priya Singh', room: '201 - Green Park', rent: 8500, status: 'Overdue', riskLevel: 'High', riskScore: '91%', phone: '+91 9876543212', lastPaid: '2026-08-28' },
  { id: 'T4', name: 'Vikas Kumar', room: '108 - Block A', rent: 7000, status: 'Partial', riskLevel: 'Medium', riskScore: '48%', phone: '+91 9876543213', lastPaid: '2026-10-01' },
];

const MOCK_RECONCILIATION = [
  { id: 'TXN1092', tenant: 'Rahul Verma', amount: 7000, gateway: 'UPI (PhonePe)', webhookStatus: 'Auto-Reconciled', date: '2026-10-02 10:14 AM' },
  { id: 'TXN1091', tenant: 'Vikas Kumar', amount: 3500, gateway: 'UPI (GPay)', webhookStatus: 'Partial Match', date: '2026-10-01 04:30 PM' },
  { id: 'TXN1088', tenant: 'Suresh Patel', amount: 8500, gateway: 'Bank Transfer', webhookStatus: 'Manual Verification', date: '2026-09-30 11:20 AM' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tenants, setTenants] = useState(MOCK_TENANTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationSent, setNotificationSent] = useState(false);

  const handleSendReminder = (tenantName) => {
    setNotificationSent(tenantName);
    setTimeout(() => setNotificationSent(false), 3000);
  };

  const filteredTenants = tenants.filter(tenant => 
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between p-4 shadow-xl shrink-0">
        <div>
          <div className="flex items-center gap-3 px-2 py-4 border-b border-slate-800">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">PayFlow AI</h1>
              <p className="text-xs text-slate-400">Recurring Payment SaaS</p>
            </div>
          </div>

          <nav className="mt-6 space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'properties', label: 'Properties & Rooms', icon: Building2 },
              { id: 'tenants', label: 'Tenants & Risk Profile', icon: Users },
              { id: 'payments', label: 'Reconciliation Ledger', icon: CreditCard },
              { id: 'notifications', label: 'Smart Notifications', icon: BellRing },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
            <Sparkles className="h-4 w-4" /> ML Delay Engine Active
          </div>
          <p className="text-xs text-slate-400">Gradient Boosting Classifier v1.2</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 capitalize">{activeTab.replace('-', ' ')}</h2>
            <p className="text-sm text-slate-500">Manage payment flows, automated reminders, and predict delinquency</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tenant or room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow">
              <Plus className="h-4 w-4" /> Add Tenant
            </button>
          </div>
        </header>

        {notificationSent && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span>Risk-aware WhatsApp notification triggered for <strong>{notificationSent}</strong>!</span>
            </div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">Expected Rent</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">₹4,00,000</h3>
                  </div>
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><DollarSign className="h-5 w-5" /></div>
                </div>
                <span className="inline-flex items-center text-xs text-emerald-600 mt-3 font-medium">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> +12% from last month
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">Collected Revenue</p>
                    <h3 className="text-2xl font-bold text-emerald-600 mt-1">₹3,33,000</h3>
                  </div>
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><CheckCircle2 className="h-5 w-5" /></div>
                </div>
                <p className="text-xs text-slate-500 mt-3">83.25% Collection Rate</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">Pending / Overdue</p>
                    <h3 className="text-2xl font-bold text-amber-600 mt-1">₹67,000</h3>
                  </div>
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Clock className="h-5 w-5" /></div>
                </div>
                <p className="text-xs text-slate-500 mt-3">12 Pending / 3 Overdue</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">High Delay Risk</p>
                    <h3 className="text-2xl font-bold text-rose-600 mt-1">2 Tenants</h3>
                  </div>
                  <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><ShieldAlert className="h-5 w-5" /></div>
                </div>
                <p className="text-xs text-rose-600 mt-3 font-medium">Requires Automated Intervention</p>
              </div>
            </div>

            {/* Delay Risk Predictions & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Predictive Payment Delay Matrix</h3>
                    <p className="text-xs text-slate-500">ML model predictions for upcoming due dates</p>
                  </div>
                  <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-semibold">
                    Risk-based Scheduling
                  </span>
                </div>
                <div className="divide-y divide-slate-100">
                  {filteredTenants.map((tenant) => (
                    <div key={tenant.id} className="py-3 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{tenant.name}</p>
                        <p className="text-xs text-slate-500">{tenant.room} • ₹{tenant.rent}/mo</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-xs text-slate-500">Delay Risk Score</p>
                          <span className={`text-xs font-bold ${
                            tenant.riskLevel === 'High' ? 'text-rose-600' : tenant.riskLevel === 'Medium' ? 'text-amber-600' : 'text-emerald-600'
                          }`}>
                            {tenant.riskScore} ({tenant.riskLevel})
                          </span>
                        </div>
                        <button
                          onClick={() => handleSendReminder(tenant.name)}
                          className="flex items-center gap-1 text-xs bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg transition"
                        >
                          <Send className="h-3 w-3" /> Remind
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Webhook Activity */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Live Reconciliation</h3>
                <p className="text-xs text-slate-500 mb-4">UPI Gateway Webhook Streams</p>
                <div className="space-y-4">
                  {MOCK_RECONCILIATION.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-xs text-slate-900">{item.tenant}</span>
                        <span className="text-xs font-bold text-emerald-600">+₹{item.amount}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{item.gateway}</p>
                      <div className="mt-2 flex justify-between items-center text-[10px]">
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                          {item.webhookStatus}
                        </span>
                        <span className="text-slate-400">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tenants & Risk Profile Tab */}
        {activeTab === 'tenants' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Tenant Billing & Risk Directory</h3>
              <button className="flex items-center gap-1 text-xs border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50">
                <Filter className="h-3.5 w-3.5" /> Filter Status
              </button>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-xs text-slate-500 uppercase border-b border-slate-200">
                  <th className="p-4">Tenant Name</th>
                  <th className="p-4">Room / Property</th>
                  <th className="p-4">Monthly Rent</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Predicted Delay Risk</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-900">{tenant.name}</td>
                    <td className="p-4 text-slate-600">{tenant.room}</td>
                    <td className="p-4 font-medium">₹{tenant.rent}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        tenant.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                        tenant.status === 'Overdue' ? 'bg-rose-100 text-rose-700' :
                        tenant.status === 'Partial' ? 'bg-indigo-100 text-indigo-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {tenant.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-xs ${
                          tenant.riskLevel === 'High' ? 'text-rose-600' : tenant.riskLevel === 'Medium' ? 'text-amber-600' : 'text-emerald-600'
                        }`}>
                          {tenant.riskScore}
                        </span>
                        <span className="text-xs text-slate-400">({tenant.riskLevel} Risk)</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleSendReminder(tenant.name)}
                        className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-xs font-semibold"
                      >
                        WhatsApp Reminder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Smart Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Automated Risk-Aware Notification Setup</h3>
              <p className="text-xs text-slate-500 mb-6">
                Triggers customized payment reminders via WhatsApp Business API based on predicted payment delays.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-800 mb-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Low Risk Strategy
                  </div>
                  <p className="text-xs text-slate-600 mb-3">Soft reminder sent 1 day before due date via WhatsApp.</p>
                  <div className="text-[11px] bg-white p-2 rounded border border-slate-200 text-slate-500 font-mono">
                    "Hi [Name], friendly reminder that rent for [Room] is due tomorrow."
                  </div>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-800 mb-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span> Medium Risk Strategy
                  </div>
                  <p className="text-xs text-slate-600 mb-3">Reminders sent 3 days before and on due date with direct UPI link.</p>
                  <div className="text-[11px] bg-white p-2 rounded border border-slate-200 text-slate-500 font-mono">
                    "Hi [Name], rent is due in 3 days. Pay directly via UPI: [UPI_LINK]"
                  </div>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-800 mb-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span> High Risk Strategy
                  </div>
                  <p className="text-xs text-slate-600 mb-3">Frequent escalation via WhatsApp & Email starting 5 days prior.</p>
                  <div className="text-[11px] bg-white p-2 rounded border border-slate-200 text-slate-500 font-mono">
                    "Important: Rent for [Room] is due soon. Please avoid late charges."
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Properties / Reconciliation Generic View */}
        {(activeTab === 'properties' || activeTab === 'payments') && (
          <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
            <Building2 className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800">Module View Active</h3>
            <p className="text-xs text-slate-500 mt-1">This section is ready for API integration with your Node.js backend.</p>
          </div>
        )}
      </main>
    </div>
  );
}