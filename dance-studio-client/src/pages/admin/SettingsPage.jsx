import React, { useState } from 'react';

// Mock initial settings data
const initialSettings = {
  studio: {
    name: 'Dance Studio',
    address: '123 Main St, City, Country',
    logo: null, // Would be a file or URL
    legal: {
      gst: 'GSTIN1234567890',
      regNumber: 'REG123456',
      documents: [], // Array of files
    },
    contact: {
      email: 'info@dancestudio.com',
      phone: '+1-123-456-7890',
    },
    workingHours: 'Mon-Fri: 9AM-9PM, Sat: 10AM-6PM, Sun: Closed',
  },
  branches: [
    { id: 1, name: 'Main Branch', localTax: 18, currency: 'INR', workingDays: 'Mon-Sat', timezone: 'IST' },
  ],
  departments: ['Dance', 'Yoga', 'Workshops'],
  roles: [
    { id: 1, name: 'Admin', permissions: ['all'] },
    { id: 2, name: 'Manager', permissions: ['dashboard', 'members'] },
    { id: 3, name: 'Accountant', permissions: ['billing'] },
    { id: 4, name: 'Instructor', permissions: ['classes', 'attendance'] },
  ],
  policies: {
    branchAccess: true,
    dataFilters: true,
    timeAccess: false,
  },
  auditLogs: true,
  billing: {
    invoice: {
      prefix: 'INV-',
      autoNumber: true,
      multiTax: true,
      creditNotes: true,
    },
    subscriptions: [
      { id: 1, name: 'Monthly', price: 5000, duration: 1, autoRenew: true },
      { id: 2, name: 'Quarterly', price: 12000, duration: 3, autoRenew: false },
      { id: 3, name: 'Custom', price: 0, duration: 0, autoRenew: false },
    ],
    lateFee: {
      type: 'percentage',
      value: 5,
      compound: true,
    },
    refund: true,
    recognition: 'monthly',
  },
  payroll: {
    strategy: 'hybrid',
    perClassRate: 1000,
    bonus: 'performance',
    deduction: 'per_absence',
    incentive: true,
    payslipTemplate: 'default',
  },
  paymentGateways: [
    { name: 'Razorpay', enabled: true },
    { name: 'Stripe', enabled: false },
    { name: 'Manual', enabled: true },
  ],
  notifications: {
    emailTemplates: true,
    whatsappTemplates: true,
    smsTemplates: true,
    push: true,
  },
  reminders: {
    fee: 3,
    leave: 1,
    attendance: 2,
    event: 1,
  },
  workflows: [
    { id: 1, rule: 'If Payment Overdue → Send Alert' },
    { id: 2, rule: 'If Low Attendance → Notify Parent' },
    { id: 3, rule: 'If Leave Approved → Assign Substitute' },
  ],
  cron: true,
  dataGovernance: {
    retention: '5 years',
    backup: 'daily',
    restore: true,
    export: 'CSV, PDF',
  },
  security: {
    twoFA: true,
    passwordPolicy: 'strong',
    sessionTimeout: 30,
    ipRestrictions: [],
    deviceTracking: true,
    breachMonitoring: true,
  },
  saas: {
    plan: 'Pro',
    features: {
      multiBranch: true,
      advancedReports: true,
      automation: true,
      payroll: true,
    },
    limits: {
      students: 500,
      teachers: 50,
      storage: '10GB',
      apiCalls: 10000,
    },
    history: [{ date: '2026-01-01', amount: 5000 }],
  },
};

const SettingsPage = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [activeLayer, setActiveLayer] = useState(null);
  const [formData, setFormData] = useState({});
  const [newRole, setNewRole] = useState({ name: '', permissions: '' });
  const [newBranch, setNewBranch] = useState({ name: '', localTax: 18, currency: 'INR', workingDays: 'Mon-Sat', timezone: 'IST' });
  const [newSubscription, setNewSubscription] = useState({ name: '', price: 0, duration: 0, autoRenew: false });
  const [newWorkflow, setNewWorkflow] = useState({ rule: '' });
  const [newIp, setNewIp] = useState('');

  const layers = [
    'Organization Layer',
    'Access Control Layer',
    'Financial Engine Layer',
    'Automation Layer',
    'Data Governance Layer',
    'Security Layer',
    'SaaS Subscription Layer',
  ];

  const handleInputChange = (layer, section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [layer]: {
        ...prev[layer],
        [section]: {
          ...prev[layer]?.[section],
          [field]: value,
        },
      },
    }));
  };

  const saveSettings = (layer) => {
    setSettings(prev => {
      const updated = { ...prev };
      Object.keys(formData[layer] || {}).forEach(sec => {
        updated[sec] = { ...updated[sec], ...formData[layer][sec] };
      });
      return updated;
    });
    alert(`${layer} settings saved!`);
  };

  const addRole = () => {
    setSettings(prev => ({
      ...prev,
      roles: [...prev.roles, { id: prev.roles.length + 1, name: newRole.name, permissions: newRole.permissions.split(',') }],
    }));
    setNewRole({ name: '', permissions: '' });
    alert('Role added!');
  };

  const addBranch = () => {
    setSettings(prev => ({
      ...prev,
      branches: [...prev.branches, { id: prev.branches.length + 1, ...newBranch }],
    }));
    setNewBranch({ name: '', localTax: 18, currency: 'INR', workingDays: 'Mon-Sat', timezone: 'IST' });
    alert('Branch added!');
  };

  const addSubscription = () => {
    setSettings(prev => ({
      ...prev,
      billing: {
        ...prev.billing,
        subscriptions: [...prev.billing.subscriptions, { id: prev.billing.subscriptions.length + 1, ...newSubscription }],
      },
    }));
    setNewSubscription({ name: '', price: 0, duration: 0, autoRenew: false });
    alert('Subscription added!');
  };

  const addWorkflow = () => {
    setSettings(prev => ({
      ...prev,
      workflows: [...prev.workflows, { id: prev.workflows.length + 1, ...newWorkflow }],
    }));
    setNewWorkflow({ rule: '' });
    alert('Workflow added!');
  };

  const addIpRestriction = () => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        ipRestrictions: [...prev.security.ipRestrictions, newIp],
      },
    }));
    setNewIp('');
    alert('IP added!');
  };

  const toggleLayer = (layer) => {
    setActiveLayer(prev => prev === layer ? null : layer);
  };

  return (
    <div className="w-full pb-10 animate-fade-up font-outfit">
      <header className="mb-6 md:mb-8 mt-2">
        <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-white">Settings ✨</h1>
        <p className="text-[#b0bec5] text-sm md:text-base">Configure your studio management system</p>
      </header>

      {layers.map(layer => (
        <div key={layer} className="mb-4">
          <button onClick={() => toggleLayer(layer)} className="w-full flex justify-between items-center glass rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-all text-left">
            <h2 className="text-lg font-bold text-white">{layer.replace(' Layer', '')}</h2>
            <span>{activeLayer === layer ? '▲' : '▼'}</span>
          </button>
          {activeLayer === layer && (
            <div className="glass rounded-2xl p-4 md:p-6 mt-2 space-y-6">
              {layer === 'Organization Layer' && (
                <>
                  {/* Studio Profile */}
                  <div>
                    <h3 className="text-md font-bold text-white mb-2">Studio Profile</h3>
                    <input placeholder="Studio Name" defaultValue={settings.studio.name} onChange={(e) => handleInputChange('studio', 'basic', 'name', e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input placeholder="Address" defaultValue={settings.studio.address} onChange={(e) => handleInputChange('studio', 'basic', 'address', e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input type="file" onChange={(e) => handleInputChange('studio', 'branding', 'logo', e.target.files[0])} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input placeholder="GST / Tax ID" defaultValue={settings.studio.legal.gst} onChange={(e) => handleInputChange('studio', 'legal', 'gst', e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input placeholder="Registration Number" defaultValue={settings.studio.legal.regNumber} onChange={(e) => handleInputChange('studio', 'legal', 'regNumber', e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input type="file" multiple onChange={(e) => handleInputChange('studio', 'legal', 'documents', Array.from(e.target.files))} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input placeholder="Email" defaultValue={settings.studio.contact.email} onChange={(e) => handleInputChange('studio', 'contact', 'email', e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input placeholder="Phone" defaultValue={settings.studio.contact.phone} onChange={(e) => handleInputChange('studio', 'contact', 'phone', e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input placeholder="Business Hours" defaultValue={settings.studio.workingHours} onChange={(e) => handleInputChange('studio', 'basic', 'workingHours', e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                  </div>

                  {/* Branch Management */}
                  <div>
                    <h3 className="text-md font-bold text-white mb-2">Branch Management</h3>
                    <div className="space-y-2 mb-4">
                      {settings.branches.map(branch => (
                        <div key={branch.id} className="p-2 bg-white/5 rounded">
                          <p>{branch.name} - Currency: {branch.currency}, Tax: {branch.localTax}%, Days: {branch.workingDays}, TZ: {branch.timezone}</p>
                        </div>
                      ))}
                    </div>
                    <input placeholder="Branch Name" value={newBranch.name} onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input type="number" placeholder="Local Tax %" value={newBranch.localTax} onChange={(e) => setNewBranch({ ...newBranch, localTax: parseInt(e.target.value) })} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input placeholder="Default Currency" value={newBranch.currency} onChange={(e) => setNewBranch({ ...newBranch, currency: e.target.value })} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input placeholder="Working Days" value={newBranch.workingDays} onChange={(e) => setNewBranch({ ...newBranch, workingDays: e.target.value })} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input placeholder="Timezone" value={newBranch.timezone} onChange={(e) => setNewBranch({ ...newBranch, timezone: e.target.value })} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <button onClick={addBranch} className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white font-bold">Add Branch</button>
                    <label className="flex items-center gap-2 mt-2">
                      <input type="checkbox" defaultChecked={settings.policies.branchAccess} onChange={(e) => handleInputChange('policies', '', 'branchAccess', e.target.checked)} />
                      Branch Scoped Access
                    </label>
                    <button onClick={() => alert('Viewing revenue segmentation')} className="w-full py-2 rounded-xl bg-blue-500/20 text-blue-400 font-bold mt-2">Revenue Segmentation</button>
                  </div>

                  {/* Department Setup */}
                  <div>
                    <h3 className="text-md font-bold text-white mb-2">Department Setup</h3>
                    <div className="space-y-2">
                      {settings.departments.map((dept, i) => (
                        <p key={i}>{dept}</p>
                      ))}
                    </div>
                    <input placeholder="New Department" onChange={(e) => { /* Add logic */ }} className="w-full p-2 rounded bg-white/5 text-white mt-2" />
                    <button onClick={() => alert('Department added')} className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white font-bold mt-2">Add Department</button>
                  </div>
                  <button onClick={() => saveSettings('studio')} className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white font-bold mt-4">Save Organization</button>
                </>
              )}

              {layer === 'Access Control Layer' && (
                <>
                  {/* Roles */}
                  <div>
                    <h3 className="text-md font-bold text-white mb-2">Roles</h3>
                    <div className="space-y-2 mb-4">
                      {settings.roles.map(role => (
                        <div key={role.id} className="p-2 bg-white/5 rounded flex justify-between">
                          <p>{role.name} - Permissions: {role.permissions.join(', ')}</p>
                          <button onClick={() => alert(`Editing ${role.name}`)} className="text-blue-400">Edit</button>
                        </div>
                      ))}
                    </div>
                    <input placeholder="Role Name" value={newRole.name} onChange={(e) => setNewRole({ ...newRole, name: e.target.value })} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input placeholder="Permissions (comma separated)" value={newRole.permissions} onChange={(e) => setNewRole({ ...newRole, permissions: e.target.value })} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <button onClick={addRole} className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white font-bold">Create Role</button>
                  </div>

                  {/* Permission Matrix */}
                  <div>
                    <h3 className="text-md font-bold text-white mb-2">Permission Matrix</h3>
                    <p>Module, Field, Action level permissions configured via UI grid (mock).</p>
                  </div>

                  {/* Policy Rules */}
                  <div>
                    <h3 className="text-md font-bold text-white mb-2">Policy Rules</h3>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={settings.policies.branchAccess} onChange={(e) => handleInputChange('policies', '', 'branchAccess', e.target.checked)} />
                      Branch Scoped Access
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={settings.policies.dataFilters} onChange={(e) => handleInputChange('policies', '', 'dataFilters', e.target.checked)} />
                      Data Visibility Filters
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={settings.policies.timeAccess} onChange={(e) => handleInputChange('policies', '', 'timeAccess', e.target.checked)} />
                      Time-based Access
                    </label>
                  </div>

                  {/* Audit Log Controls */}
                  <div>
                    <h3 className="text-md font-bold text-white mb-2">Audit Log Controls</h3>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={settings.auditLogs} onChange={(e) => setSettings({ ...settings, auditLogs: e.target.checked })} />
                      Enable Audit Logs
                    </label>
                  </div>
                  <button onClick={() => saveSettings('roles')} className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white font-bold mt-4">Save Access Control</button>
                </>
              )}

              {layer === 'Financial Engine Layer' && (
                <>
                  {/* Billing Settings */}
                  <div>
                    <h3 className="text-md font-bold text-white mb-2">Billing Settings</h3>
                    <h4 className="text-sm font-bold text-gray-300 mb-1">Invoice Configuration</h4>
                    <input placeholder="Prefix" defaultValue={settings.billing.invoice.prefix} onChange={(e) => handleInputChange('billing', 'invoice', 'prefix', e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={settings.billing.invoice.autoNumber} onChange={(e) => handleInputChange('billing', 'invoice', 'autoNumber', e.target.checked)} />
                      Auto Numbering
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={settings.billing.invoice.multiTax} onChange={(e) => handleInputChange('billing', 'invoice', 'multiTax', e.target.checked)} />
                      Multi-Tax Support
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={settings.billing.invoice.creditNotes} onChange={(e) => handleInputChange('billing', 'invoice', 'creditNotes', e.target.checked)} />
                      Credit Notes
                    </label>

                    <h4 className="text-sm font-bold text-gray-300 mb-1 mt-4">Subscription Plans</h4>
                    <div className="space-y-2 mb-4">
                      {settings.billing.subscriptions.map(sub => (
                        <div key={sub.id} className="p-2 bg-white/5 rounded">
                          {sub.name} - ₹{sub.price} for {sub.duration} months, Auto Renew: {sub.autoRenew ? 'Yes' : 'No'}
                        </div>
                      ))}
                    </div>
                    <input placeholder="Plan Name" value={newSubscription.name} onChange={(e) => setNewSubscription({ ...newSubscription, name: e.target.value })} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input type="number" placeholder="Price" value={newSubscription.price} onChange={(e) => setNewSubscription({ ...newSubscription, price: parseInt(e.target.value) })} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input type="number" placeholder="Duration (months)" value={newSubscription.duration} onChange={(e) => setNewSubscription({ ...newSubscription, duration: parseInt(e.target.value) })} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={newSubscription.autoRenew} onChange={(e) => setNewSubscription({ ...newSubscription, autoRenew: e.target.checked })} />
                      Auto Renew
                    </label>
                    <button onClick={addSubscription} className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white font-bold mt-2">Add Plan</button>

                    <h4 className="text-sm font-bold text-gray-300 mb-1 mt-4">Late Fee Engine</h4>
                    <select defaultValue={settings.billing.lateFee.type} onChange={(e) => handleInputChange('billing', 'lateFee', 'type', e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mb-2">
                      <option>flat</option>
                      <option>percentage</option>
                    </select>
                    <input type="number" placeholder="Value" defaultValue={settings.billing.lateFee.value} onChange={(e) => handleInputChange('billing', 'lateFee', 'value', parseInt(e.target.value))} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={settings.billing.lateFee.compound} onChange={(e) => handleInputChange('billing', 'lateFee', 'compound', e.target.checked)} />
                      Compound Logic
                    </label>

                    <label className="flex items-center gap-2 mt-4">
                      <input type="checkbox" checked={settings.billing.refund} onChange={(e) => handleInputChange('billing', '', 'refund', e.target.checked)} />
                      Refund Engine
                    </label>
                    <input placeholder="Revenue Recognition" defaultValue={settings.billing.recognition} onChange={(e) => handleInputChange('billing', '', 'recognition', e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mt-2" />
                  </div>

                  {/* Payroll Settings */}
                  <div>
                    <h3 className="text-md font-bold text-white mb-2">Payroll Settings</h3>
                    <select defaultValue={settings.payroll.strategy} onChange={(e) => handleInputChange('payroll', '', 'strategy', e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mb-2">
                      <option>fixed</option>
                      <option>per_class</option>
                      <option>hybrid</option>
                    </select>
                    <input type="number" placeholder="Per Class Rate" defaultValue={settings.payroll.perClassRate} onChange={(e) => handleInputChange('payroll', '', 'perClassRate', parseInt(e.target.value))} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input placeholder="Bonus Automation" defaultValue={settings.payroll.bonus} onChange={(e) => handleInputChange('payroll', '', 'bonus', e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input placeholder="Attendance Deduction Formula" defaultValue={settings.payroll.deduction} onChange={(e) => handleInputChange('payroll', '', 'deduction', e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={settings.payroll.incentive} onChange={(e) => handleInputChange('payroll', '', 'incentive', e.target.checked)} />
                      Performance Incentive
                    </label>
                    <input placeholder="Payslip Template" defaultValue={settings.payroll.payslipTemplate} onChange={(e) => handleInputChange('payroll', '', 'payslipTemplate', e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mt-2" />
                  </div>

                  {/* Payment Gateway Config */}
                  <div>
                    <h3 className="text-md font-bold text-white mb-2">Payment Gateway Config</h3>
                    <div className="space-y-2">
                      {settings.paymentGateways.map(gw => (
                        <label key={gw.name} className="flex items-center gap-2">
                          <input type="checkbox" checked={gw.enabled} onChange={(e) => { /* Update logic */ }} />
                          {gw.name}
                        </label>
                      ))}
                    </div>
                    <input placeholder="Webhook Security" className="w-full p-2 rounded bg-white/5 text-white mt-2" />
                  </div>
                  <button onClick={() => saveSettings('billing')} className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white font-bold mt-4">Save Financial</button>
                </>
              )}

              {layer === 'Automation Layer' && (
                <>
                  {/* Notification Engine */}
                  <div>
                    <h3 className="text-md font-bold text-white mb-2">Notification Engine</h3>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={settings.notifications.emailTemplates} onChange={(e) => handleInputChange('notifications', '', 'emailTemplates', e.target.checked)} />
                      Email Templates
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={settings.notifications.whatsappTemplates} onChange={(e) => handleInputChange('notifications', '', 'whatsappTemplates', e.target.checked)} />
                      WhatsApp Templates
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={settings.notifications.smsTemplates} onChange={(e) => handleInputChange('notifications', '', 'smsTemplates', e.target.checked)} />
                      SMS Templates
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={settings.notifications.push} onChange={(e) => handleInputChange('notifications', '', 'push', e.target.checked)} />
                      Push Notifications
                    </label>
                  </div>

                  {/* Reminder Rules */}
                  <div>
                    <h3 className="text-md font-bold text-white mb-2">Reminder Rules</h3>
                    <input type="number" placeholder="Fee Reminder (days)" defaultValue={settings.reminders.fee} onChange={(e) => handleInputChange('reminders', '', 'fee', parseInt(e.target.value))} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input type="number" placeholder="Leave Reminder (days)" defaultValue={settings.reminders.leave} onChange={(e) => handleInputChange('reminders', '', 'leave', parseInt(e.target.value))} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input type="number" placeholder="Attendance Reminder (hours)" defaultValue={settings.reminders.attendance} onChange={(e) => handleInputChange('reminders', '', 'attendance', parseInt(e.target.value))} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input type="number" placeholder="Event Reminder (days)" defaultValue={settings.reminders.event} onChange={(e) => handleInputChange('reminders', '', 'event', parseInt(e.target.value))} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                  </div>

                  {/* Workflow Builder */}
                  <div>
                    <h3 className="text-md font-bold text-white mb-2">Workflow Builder</h3>
                    <div className="space-y-2 mb-4">
                      {settings.workflows.map(wf => (
                        <div key={wf.id} className="p-2 bg-white/5 rounded">
                          {wf.rule}
                        </div>
                      ))}
                    </div>
                    <input placeholder="New Rule" value={newWorkflow.rule} onChange={(e) => setNewWorkflow({ ...newWorkflow, rule: e.target.value })} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <button onClick={addWorkflow} className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white font-bold">Add Workflow</button>
                  </div>

                  {/* Cron Job Management */}
                  <div>
                    <h3 className="text-md font-bold text-white mb-2">Cron Job Management</h3>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={settings.cron} onChange={(e) => setSettings({ ...settings, cron: e.target.checked })} />
                      Enable Cron Jobs
                    </label>
                  </div>
                  <button onClick={() => saveSettings('notifications')} className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white font-bold mt-4">Save Automation</button>
                </>
              )}

              {layer === 'Data Governance Layer' && (
                <>
                  <input placeholder="Data Retention Policy" defaultValue={settings.dataGovernance.retention} onChange={(e) => handleInputChange('dataGovernance', '', 'retention', e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                  <select defaultValue={settings.dataGovernance.backup} onChange={(e) => handleInputChange('dataGovernance', '', 'backup', e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mb-2">
                    <option>Daily</option>
                    <option>Weekly</option>
                  </select>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={settings.dataGovernance.restore} onChange={(e) => handleInputChange('dataGovernance', '', 'restore', e.target.checked)} />
                    Restore Points
                  </label>
                  <input placeholder="Export Policies" defaultValue={settings.dataGovernance.export} onChange={(e) => handleInputChange('dataGovernance', '', 'export', e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                  <button onClick={() => saveSettings('dataGovernance')} className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white font-bold">Save Data Governance</button>
                </>
              )}

              {layer === 'Security Layer' && (
                <>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={settings.security.twoFA} onChange={(e) => handleInputChange('security', '', 'twoFA', e.target.checked)} />
                    2FA Settings
                  </label>
                  <input placeholder="Password Policies" defaultValue={settings.security.passwordPolicy} onChange={(e) => handleInputChange('security', '', 'passwordPolicy', e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                  <input type="number" placeholder="Session Timeout (mins)" defaultValue={settings.security.sessionTimeout} onChange={(e) => handleInputChange('security', '', 'sessionTimeout', parseInt(e.target.value))} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                  <div className="space-y-2 mb-4">
                    {settings.security.ipRestrictions.map((ip, i) => (
                      <p key={i}>{ip}</p>
                    ))}
                  </div>
                  <input placeholder="Add IP" value={newIp} onChange={(e) => setNewIp(e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                  <button onClick={addIpRestriction} className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white font-bold">Add IP</button>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={settings.security.deviceTracking} onChange={(e) => handleInputChange('security', '', 'deviceTracking', e.target.checked)} />
                    Device Tracking
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={settings.security.breachMonitoring} onChange={(e) => handleInputChange('security', '', 'breachMonitoring', e.target.checked)} />
                    Breach Monitoring
                  </label>
                  <button onClick={() => saveSettings('security')} className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white font-bold mt-4">Save Security</button>
                </>
              )}

              {layer === 'SaaS Subscription Layer' && (
                <>
                  <p>Plan Configuration: {settings.saas.plan}</p>
                  <div>
                    <h3 className="text-md font-bold text-white mb-2">Feature Flags</h3>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={settings.saas.features.multiBranch} onChange={(e) => handleInputChange('saas', 'features', 'multiBranch', e.target.checked)} />
                      Enable Multi-Branch
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={settings.saas.features.advancedReports} onChange={(e) => handleInputChange('saas', 'features', 'advancedReports', e.target.checked)} />
                      Enable Advanced Reports
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={settings.saas.features.automation} onChange={(e) => handleInputChange('saas', 'features', 'automation', e.target.checked)} />
                      Enable Automation
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={settings.saas.features.payroll} onChange={(e) => handleInputChange('saas', 'features', 'payroll', e.target.checked)} />
                      Enable Payroll
                    </label>
                  </div>
                  <div>
                    <h3 className="text-md font-bold text-white mb-2">Usage Limits</h3>
                    <input type="number" placeholder="Max Students" defaultValue={settings.saas.limits.students} onChange={(e) => handleInputChange('saas', 'limits', 'students', parseInt(e.target.value))} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input type="number" placeholder="Max Teachers" defaultValue={settings.saas.limits.teachers} onChange={(e) => handleInputChange('saas', 'limits', 'teachers', parseInt(e.target.value))} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input placeholder="Storage Limit" defaultValue={settings.saas.limits.storage} onChange={(e) => handleInputChange('saas', 'limits', 'storage', e.target.value)} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                    <input type="number" placeholder="API Calls Limit" defaultValue={settings.saas.limits.apiCalls} onChange={(e) => handleInputChange('saas', 'limits', 'apiCalls', parseInt(e.target.value))} className="w-full p-2 rounded bg-white/5 text-white mb-2" />
                  </div>
                  <button onClick={() => alert('Upgrading/downgrading plan')} className="w-full py-2 rounded-xl bg-green-500/20 text-green-400 font-bold">Plan Upgrade / Downgrade</button>
                  <div>
                    <h3 className="text-md font-bold text-white mb-2">Billing History</h3>
                    <div className="space-y-2">
                      {settings.saas.history.map((hist, i) => (
                        <p key={i}>{hist.date} - ₹{hist.amount}</p>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => saveSettings('saas')} className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white font-bold mt-4">Save SaaS</button>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SettingsPage;