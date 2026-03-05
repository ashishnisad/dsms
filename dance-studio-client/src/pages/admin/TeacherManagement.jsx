import React, { useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const TeacherManagement = () => {
  // ==========================================
  // 1. THE GOD STATE (A to Z Data Structure)
  // ==========================================
  const [teachers, setTeachers] = useState([
    { 
      id: 'TCH-001', name: 'Rahul Sharma', phone: '9876543210', email: 'rahul@rhythm.com', 
      specialty: 'Hip-Hop', status: 'Active', 
      salary: { type: 'Monthly', base: 25000, bonus: 0, deduction: 0 },
      classes: [{ id: 'C1', name: 'Morning Zumba', time: '6 AM - 7 AM', room: 'Studio A' }],
      attendanceLogs: ['2026-02-24', '2026-02-25'], // YYYY-MM-DD
      leaves: [{ id: 'L1', date: '2026-02-28', reason: 'Fever', status: 'Pending', substitute: '' }],
      performance: { rating: 4.8, remarks: 'Excellent energy. Students love his vibe.' },
      lockedMonths: []
    },
    { 
      id: 'TCH-002', name: 'Sneha Kapoor', phone: '9876543211', email: 'sneha@rhythm.com', 
      specialty: 'Contemporary', status: 'Inactive', 
      salary: { type: 'Per Class', base: 500, bonus: 0, deduction: 0 },
      classes: [{ id: 'C2', name: 'Evening Batch', time: '5 PM - 6 PM', room: 'Studio B' }],
      attendanceLogs: ['2026-02-20'], 
      leaves: [],
      performance: { rating: 4.2, remarks: 'Needs to focus on beginner steps.' },
      lockedMonths: []
    },
  ]);

  // UI States
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // profile | classes | attendance | payroll | performance
  const [editingTeacher, setEditingTeacher] = useState(null); 
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [editingClassId, setEditingClassId] = useState(null);
  const [assigningLeaveId, setAssigningLeaveId] = useState(null);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [isIncrementModalOpen, setIsIncrementModalOpen] = useState(false);
  const [incrementAmount, setIncrementAmount] = useState(0);
  
  // 📅 Calendar State for Attendance Tab
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  // Available Classes (Master List)
  const [availableClasses] = useState([
    { id: 'C1', name: 'Morning Zumba', time: '6 AM - 7 AM', room: 'Studio A' },
    { id: 'C2', name: 'Evening Batch', time: '5 PM - 6 PM', room: 'Studio B' },
    { id: 'C3', name: 'Afternoon Hip-Hop', time: '3 PM - 4 PM', room: 'Studio C' },
    { id: 'C4', name: 'Night Contemporary', time: '8 PM - 9 PM', room: 'Studio A' },
  ]);

  // ==========================================
  // 2. GLOBAL ACTIONS
  // ==========================================
  const openManageModal = (teacher) => {
    if (teacher) {
      setEditingTeacher(teacher);
    } else {
      // Adding New Teacher Default Structure
      setEditingTeacher({
        id: `TCH-00${teachers.length + 1}`, name: '', phone: '', email: '', specialty: '', status: 'Active',
        salary: { type: 'Monthly', base: 10000, bonus: 0, deduction: 0 },
        classes: [], attendanceLogs: [], leaves: [], performance: { rating: 0, remarks: '' },
        lockedMonths: []
      });
    }
    setActiveTab('profile');
    setIsManageModalOpen(true);
  };

  const closeManageModal = () => {
    setIsManageModalOpen(false);
    setEditingTeacher(null);
    setIsAssignModalOpen(false);
    setIsIncrementModalOpen(false);
    setEditingClassId(null);
    setAssigningLeaveId(null);
    setActiveTab('profile');
  };

  const updateTeacherData = (updatedData) => {
    const isNew = !teachers.find(t => t.id === updatedData.id);
    if (isNew) {
      setTeachers([...teachers, updatedData]);
    } else {
      setTeachers(teachers.map(t => t.id === updatedData.id ? updatedData : t));
    }
    setEditingTeacher(updatedData); // Update modal view
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to completely delete ${name}'s record?`)) {
      setTeachers(teachers.filter(t => t.id !== id));
      toast.error(`${name} has been deleted.`);
      if (editingTeacher && editingTeacher.id === id) {
        closeManageModal();
      }
    }
  };

  const generatePayslip = (teacher) => {
    const doc = new jsPDF();
    doc.text(`Payslip for ${teacher.name}`, 10, 10);
    doc.text(`ID: ${teacher.id}`, 10, 20);
    doc.text(`Type: ${teacher.salary.type}`, 10, 30);
    doc.text(`Base: ₹${teacher.salary.base}`, 10, 40);
    doc.text(`Bonus: ₹${teacher.salary.bonus}`, 10, 50);
    doc.text(`Deduction: ₹${teacher.salary.deduction}`, 10, 60);
    const net = teacher.salary.base + teacher.salary.bonus - teacher.salary.deduction;
    doc.text(`Net: ₹${net}`, 10, 70);
    doc.save(`${teacher.name}_payslip.pdf`);
    toast.success("Payslip Generated & Downloaded!");
  };

  const exportReport = (type, format = 'pdf') => {
    if (format === 'pdf') {
      const doc = new jsPDF();
      doc.text(`${type.charAt(0).toUpperCase() + type.slice(1)} Report`, 10, 10);
      let y = 20;
      teachers.forEach(t => {
        doc.text(t.name, 10, y);
        y += 10;
        if (type === 'salary') {
          const net = t.salary.base + t.salary.bonus - t.salary.deduction;
          doc.text(`Type: ${t.salary.type}, Base: ${t.salary.base}, Bonus: ${t.salary.bonus}, Deduction: ${t.salary.deduction}, Net: ${net}`, 20, y);
          y += 10;
        } else if (type === 'attendance') {
          doc.text(`Attendance Logs: ${t.attendanceLogs.join(', ')}`, 20, y);
          y += 10;
          doc.text(`Leaves: ${t.leaves.map(l => `${l.date} (${l.status})`).join(', ')}`, 20, y);
          y += 10;
        } else if (type === 'performance') {
          doc.text(`Rating: ${t.performance.rating}, Remarks: ${t.performance.remarks}`, 20, y);
          y += 10;
        }
      });
      doc.save(`${type}_report.pdf`);
      toast.success(`${type} Report Downloaded as PDF!`);
    } else if (format === 'excel') {
      const data = [];
      if (type === 'salary') {
        data.push(['Name', 'Type', 'Base', 'Bonus', 'Deduction', 'Net']);
        teachers.forEach(t => {
          const net = t.salary.base + t.salary.bonus - t.salary.deduction;
          data.push([t.name, t.salary.type, t.salary.base, t.salary.bonus, t.salary.deduction, net]);
        });
      } else if (type === 'attendance') {
        data.push(['Name', 'Attendance Logs', 'Leaves']);
        teachers.forEach(t => {
          data.push([t.name, t.attendanceLogs.join('; '), t.leaves.map(l => `${l.date} (${l.status})`).join('; ')]);
        });
      } else if (type === 'performance') {
        data.push(['Name', 'Rating', 'Remarks']);
        teachers.forEach(t => data.push([t.name, t.performance.rating, t.performance.remarks]));
      }
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, type);
      XLSX.writeFile(wb, `${type}_report.xlsx`);
      toast.success(`${type} Report Downloaded as Excel!`);
    }
    setIsReportsModalOpen(false);
  };

  // ==========================================
  // 3. MAIN TABLE SETUP
  // ==========================================
  const columns = [
    { 
      header: 'Instructor', accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#4ECDC4] flex items-center justify-center text-sm font-bold text-white shrink-0">{row.name.charAt(0)}</div>
          <div className="flex flex-col"><span className="font-semibold text-white">{row.name}</span><span className="text-[10px] text-gray-400">{row.id}</span></div>
        </div>
      )
    },
    { 
      header: 'Specialty', accessor: 'specialty',
      render: (row) => <Badge status="Paid" className="bg-purple-500/20 text-purple-400 border-purple-500/20">{row.specialty}</Badge> 
    },
    { 
      header: 'Salary Type', accessor: 'salary',
      render: (row) => <span className="text-gray-300 text-sm">{row.salary.type}</span>
    },
    { 
      header: 'Status', accessor: 'status',
      render: (row) => <Badge status={row.status} />
    },
    {
      header: 'Actions (Control)', accessor: 'actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button variant="primary" size="sm" onClick={() => openManageModal(row)}>⚙️ Manage Panel</Button>
          <Button variant="danger" size="sm" onClick={() => handleDelete(row.id, row.name)}>🗑️</Button>
        </div>
      )
    }
  ];

  // ==========================================
  // 4. TAB RENDERERS (The Heavy Lifters)
  // ==========================================

  const renderProfileTab = () => (
    <div className="flex flex-col gap-4 animate-fade-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Full Name" value={editingTeacher.name} onChange={e => updateTeacherData({...editingTeacher, name: e.target.value})} />
        <Input label="Phone Number" value={editingTeacher.phone} onChange={e => updateTeacherData({...editingTeacher, phone: e.target.value})} />
        <Input label="Email Address" value={editingTeacher.email} onChange={e => updateTeacherData({...editingTeacher, email: e.target.value})} />
        <Input label="Dance Specialty" value={editingTeacher.specialty} onChange={e => updateTeacherData({...editingTeacher, specialty: e.target.value})} />
      </div>
      <div className="w-full">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Account Status (Activate/Deactivate)</label>
        <select value={editingTeacher.status} onChange={e => updateTeacherData({...editingTeacher, status: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-[#4ECDC4]">
          <option value="Active" className="bg-gray-900">🟢 Active</option>
          <option value="Inactive" className="bg-gray-900">🔴 Inactive</option>
        </select>
      </div>
      <Button variant="primary" className="self-end mt-4" onClick={() => toast.success("Profile details saved!")}>💾 Save Profile</Button>
    </div>
  );

  const renderClassesTab = () => (
    <div className="flex flex-col gap-4 animate-fade-up">
      <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
        <div><p className="text-white font-bold">Assign New Class</p><p className="text-xs text-gray-400">Add a batch to their schedule</p></div>
        <Button variant="glass" size="sm" onClick={() => setIsAssignModalOpen(true)}>+ Assign Class</Button>
      </div>
      
      <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mt-2">Current Schedule</p>
      {editingTeacher.classes.length > 0 ? editingTeacher.classes.map((cls, i) => (
        <div key={i} className="flex flex-col p-3 bg-black/30 rounded-xl border border-white/5 mb-2">
          {editingClassId === cls.id ? (
            <div className="grid grid-cols-2 gap-2">
              <Input label="Name" value={cls.name} onChange={e => {
                const newClasses = [...editingTeacher.classes];
                newClasses[i].name = e.target.value;
                setEditingTeacher({...editingTeacher, classes: newClasses});
              }} />
              <Input label="Time" value={cls.time} onChange={e => {
                const newClasses = [...editingTeacher.classes];
                newClasses[i].time = e.target.value;
                setEditingTeacher({...editingTeacher, classes: newClasses});
              }} />
              <Input label="Room" value={cls.room} onChange={e => {
                const newClasses = [...editingTeacher.classes];
                newClasses[i].room = e.target.value;
                setEditingTeacher({...editingTeacher, classes: newClasses});
              }} />
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div><p className="text-white font-bold">{cls.name}</p><p className="text-xs text-[#4ECDC4]">{cls.time} • {cls.room}</p></div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => setEditingClassId(cls.id)}>Edit Room/Time</Button>
                <Button variant="danger" size="sm" onClick={() => {
                  updateTeacherData({...editingTeacher, classes: editingTeacher.classes.filter((_, index) => index !== i)});
                  toast.error("Class removed from schedule");
                }}>Remove</Button>
              </div>
            </div>
          )}
          {editingClassId === cls.id && (
            <div className="flex gap-2 mt-2 self-end">
              <Button variant="primary" size="sm" onClick={() => {
                updateTeacherData(editingTeacher);
                setEditingClassId(null);
                toast.success("Class updated");
              }}>Save</Button>
              <Button variant="secondary" size="sm" onClick={() => setEditingClassId(null)}>Cancel</Button>
            </div>
          )}
        </div>
      )) : <p className="text-gray-500 text-sm">No classes assigned yet.</p>}
    </div>
  );

  const renderAttendanceTab = () => {
    // Basic Calendar Logic
    const year = currentMonthDate.getFullYear(); const month = currentMonthDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const currentMonthStr = `${year}-${String(month+1).padStart(2,'0')}`;
    const isLocked = editingTeacher.lockedMonths.includes(currentMonthStr);
    const toggleAtt = (day) => {
      if (isLocked) return;
      const dStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const newLogs = editingTeacher.attendanceLogs.includes(dStr) ? editingTeacher.attendanceLogs.filter(d => d !== dStr) : [...editingTeacher.attendanceLogs, dStr];
      updateTeacherData({...editingTeacher, attendanceLogs: newLogs});
    };

    return (
      <div className="flex flex-col gap-4 animate-fade-up">
        {/* Leave Management Section */}
        <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl">
          <p className="text-orange-500 font-bold mb-2">Leave Management</p>
          {editingTeacher.leaves.map((lv, i) => (
            <div key={i} className="flex justify-between items-center bg-black/40 p-2 rounded-lg mt-2">
              <div>
                <p className="text-white text-sm">
                  {lv.date} - {lv.reason}{lv.substitute ? ` (Sub: ${teachers.find(t => t.id === lv.substitute)?.name || ''})` : ''}
                </p>
                <Badge status={lv.status} />
              </div>
              {lv.status === 'Pending' && (
                <div className="flex gap-2">
                  {assigningLeaveId === lv.id ? (
                    <select 
                      className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-[#4ECDC4]"
                      value={lv.substitute} 
                      onChange={e => {
                        const newLeaves = [...editingTeacher.leaves];
                        newLeaves[i].substitute = e.target.value;
                        updateTeacherData({...editingTeacher, leaves: newLeaves});
                        setAssigningLeaveId(null);
                        toast.success("Substitute Assigned!");
                      }}
                    >
                      <option value="">None</option>
                      {teachers.filter(t => t.id !== editingTeacher.id && t.status === 'Active').map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  ) : (
                    <Button variant="glass" size="sm" onClick={() => setAssigningLeaveId(lv.id)}>Assign Sub</Button>
                  )}
                  <Button variant="primary" size="sm" onClick={() => {
                    const newLeaves = editingTeacher.leaves.map((l, idx) => idx === i ? {...l, status: 'Approved'} : l);
                    updateTeacherData({...editingTeacher, leaves: newLeaves});
                    toast.success("Leave Approved");
                  }}>Approve</Button>
                  <Button variant="danger" size="sm" onClick={() => {
                    const newLeaves = editingTeacher.leaves.map((l, idx) => idx === i ? {...l, status: 'Rejected'} : l);
                    updateTeacherData({...editingTeacher, leaves: newLeaves});
                    toast.error("Leave Rejected");
                  }}>Reject</Button>
                </div>
              )}
            </div>
          ))}
          {editingTeacher.leaves.length === 0 && <p className="text-gray-400 text-xs">No leave requests.</p>}
        </div>

        {/* Calendar Section */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm font-bold text-gray-400 uppercase">Monthly Attendance</p>
          <div className="flex gap-2">
            <button onClick={() => setCurrentMonthDate(new Date(year, month-1, 1))} className="text-gray-400 hover:text-white">◀</button>
            <span className="text-white font-bold">{currentMonthDate.toLocaleString('default', { month: 'short' })} {year}</span>
            <button onClick={() => setCurrentMonthDate(new Date(year, month+1, 1))} className="text-gray-400 hover:text-white">▶</button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 bg-black/20 p-2 rounded-xl border border-white/5">
          {Array.from({length: firstDay}).map((_, i) => <div key={`e-${i}`} />)}
          {Array.from({length: daysInMonth}).map((_, i) => {
            const day = i+1; const dStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
            const isPresent = editingTeacher.attendanceLogs.includes(dStr);
            return (
              <div 
                key={day} 
                onClick={isLocked ? null : () => toggleAtt(day)} 
                className={`h-8 flex items-center justify-center rounded text-xs ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'} ${isPresent ? 'bg-[#4ECDC4] text-black font-bold' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
              >
                {day}
              </div>
            )
          })}
        </div>
        
        <Button 
          variant="danger" 
          className="w-full mt-2" 
          disabled={isLocked} 
          onClick={() => {
            updateTeacherData({...editingTeacher, lockedMonths: [...editingTeacher.lockedMonths, currentMonthStr]});
            toast.success("Month Locked. Cannot edit attendance now.");
          }}
        >
          {isLocked ? "Locked" : "🔒 Lock Monthly Attendance"}
        </Button>
      </div>
    );
  };

  const renderPayrollTab = () => (
    <div className="flex flex-col gap-4 animate-fade-up">
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Salary Type</label>
          <select value={editingTeacher.salary.type} onChange={e => updateTeacherData({...editingTeacher, salary: {...editingTeacher.salary, type: e.target.value}})} className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-[#4ECDC4]">
            <option value="Monthly" className="bg-gray-900">Fixed Monthly</option>
            <option value="Per Class" className="bg-gray-900">Per Class Basis</option>
          </select>
        </div>
        <Input label="Base Amount (₹)" type="number" value={editingTeacher.salary.base} onChange={e => updateTeacherData({...editingTeacher, salary: {...editingTeacher.salary, base: Number(e.target.value)}})} />
      </div>
      
      <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
        <Input label="Add Bonus (+)" type="number" value={editingTeacher.salary.bonus} onChange={e => updateTeacherData({...editingTeacher, salary: {...editingTeacher.salary, bonus: Number(e.target.value)}})} />
        <Input label="Add Deduction (-)" type="number" value={editingTeacher.salary.deduction} onChange={e => updateTeacherData({...editingTeacher, salary: {...editingTeacher.salary, deduction: Number(e.target.value)}})} />
      </div>

      <div className="flex justify-between items-center bg-black/30 p-4 rounded-xl mt-2 border border-[#4ECDC4]/30">
        <div>
          <p className="text-gray-400 text-xs uppercase font-bold">Net Payable Salary</p>
          <p className="text-3xl font-bold text-[#4ECDC4]">₹{(editingTeacher.salary.base + editingTeacher.salary.bonus - editingTeacher.salary.deduction).toLocaleString()}</p>
        </div>
        <Button variant="primary" onClick={() => generatePayslip(editingTeacher)}>🧾 Generate Payslip</Button>
      </div>
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="flex flex-col gap-4 animate-fade-up">
      <div className="flex justify-between items-center bg-yellow-500/10 p-6 rounded-xl border border-yellow-500/20">
        <div>
          <p className="text-yellow-500 font-bold tracking-wider uppercase text-sm">Student Average Rating</p>
          <p className="text-4xl font-bold text-white mt-1">{editingTeacher.performance.rating} <span className="text-xl text-yellow-500">⭐</span></p>
        </div>
        <Button variant="glass" className="!border-yellow-500/30 !text-yellow-400" onClick={() => {setIncrementAmount(0); setIsIncrementModalOpen(true);}}>📈 Promote / Increment</Button>
      </div>

      <div className="w-full">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Admin Confidential Remarks</label>
        <textarea rows="4" value={editingTeacher.performance.remarks} onChange={e => updateTeacherData({...editingTeacher, performance: {...editingTeacher.performance, remarks: e.target.value}})} className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-[#4ECDC4] resize-none" placeholder="Add tracking notes here..."></textarea>
      </div>
      <Button variant="secondary" className="self-end" onClick={() => toast.success("Performance tracking updated")}>Save Remarks</Button>
    </div>
  );

  // Helper for Tabs
  const TabBtn = ({ id, label, icon }) => (
    <button onClick={() => setActiveTab(id)} className={`px-4 py-3 text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all border-b-2 ${activeTab === id ? 'border-[#4ECDC4] text-[#4ECDC4]' : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'}`}>
      {icon} {label}
    </button>
  );

  return (
    <div className="w-full pb-10 animate-fade-up font-outfit">
      
      {/* HEADER & REPORTS CONTROLS */}
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">HR & Teacher Control</h1>
          <p className="text-[#b0bec5] text-sm">Centralized ERP for Profiles, Payroll, Attendance & Performance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setIsReportsModalOpen(true)}>📄 Export Reports</Button>
          <Button variant="primary" onClick={() => openManageModal(null)}>+ Onboard Teacher</Button>
        </div>
      </div>

      <DataTable columns={columns} data={teachers} searchPlaceholder="Search..." itemsPerPage={5} />

      {/* ==========================================
          THE MASTER CONTROL PANEL MODAL (TABBED)
      ========================================== */}
      <Modal isOpen={isManageModalOpen} onClose={closeManageModal} title={`Managing: ${editingTeacher?.name || 'New Teacher'}`} maxWidth="max-w-4xl">
        {editingTeacher && (
          <div className="flex flex-col h-full max-h-[70vh]">
            
            {/* TABS NAVIGATION */}
            <div className="flex overflow-x-auto border-b border-white/10 mb-4 custom-scrollbar">
              <TabBtn id="profile" label="Profile & Status" icon="👤" />
              <TabBtn id="classes" label="Class Assignments" icon="📘" />
              <TabBtn id="attendance" label="Attendance & Leaves" icon="📅" />
              <TabBtn id="payroll" label="Payroll Control" icon="💰" />
              <TabBtn id="performance" label="Performance" icon="📈" />
            </div>

            {/* TAB CONTENT RENDERER */}
            <div className="overflow-y-auto pr-2 custom-scrollbar pb-4">
              {activeTab === 'profile' && renderProfileTab()}
              {activeTab === 'classes' && renderClassesTab()}
              {activeTab === 'attendance' && renderAttendanceTab()}
              {activeTab === 'payroll' && renderPayrollTab()}
              {activeTab === 'performance' && renderPerformanceTab()}
            </div>

          </div>
        )}
      </Modal>

      {/* Assign Class Modal */}
      <Modal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} title="Assign New Class">
        {editingTeacher ? (
          <div className="flex flex-col gap-4">
            {availableClasses.filter(cls => !editingTeacher.classes.some(tcls => tcls.id === cls.id)).map(cls => (
              <div key={cls.id} className="flex justify-between items-center p-3 bg-black/30 rounded-xl border border-white/5">
                <div>
                  <p className="text-white font-bold">{cls.name}</p>
                  <p className="text-xs text-[#4ECDC4]">{cls.time} • {cls.room}</p>
                </div>
                <Button variant="primary" size="sm" onClick={() => {
                  updateTeacherData({...editingTeacher, classes: [...editingTeacher.classes, cls]});
                  toast.success("Class assigned!");
                }}>Assign</Button>
              </div>
            ))}
            {availableClasses.filter(cls => !editingTeacher.classes.some(tcls => tcls.id === cls.id)).length === 0 && <p className="text-gray-500 text-sm">No available classes.</p>}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Loading...</p>
        )}
      </Modal>

      {/* Reports Modal */}
      <Modal isOpen={isReportsModalOpen} onClose={() => setIsReportsModalOpen(false)} title="Generate Reports">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-white font-bold">Salary Report</p>
            <div className="flex gap-2">
              <Button variant="primary" size="sm" onClick={() => exportReport('salary', 'pdf')}>PDF</Button>
              <Button variant="secondary" size="sm" onClick={() => exportReport('salary', 'excel')}>Excel</Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white font-bold">Attendance Report</p>
            <div className="flex gap-2">
              <Button variant="primary" size="sm" onClick={() => exportReport('attendance', 'pdf')}>PDF</Button>
              <Button variant="secondary" size="sm" onClick={() => exportReport('attendance', 'excel')}>Excel</Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white font-bold">Class Performance Report</p>
            <div className="flex gap-2">
              <Button variant="primary" size="sm" onClick={() => exportReport('performance', 'pdf')}>PDF</Button>
              <Button variant="secondary" size="sm" onClick={() => exportReport('performance', 'excel')}>Excel</Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Increment Modal */}
      <Modal isOpen={isIncrementModalOpen} onClose={() => setIsIncrementModalOpen(false)} title="Promotion / Increment">
        {editingTeacher ? (
          <div className="flex flex-col gap-4">
            <Input 
              label="Increment Amount (₹)" 
              type="number" 
              value={incrementAmount} 
              onChange={e => setIncrementAmount(Number(e.target.value))} 
            />
            <Button variant="primary" onClick={() => {
              updateTeacherData({...editingTeacher, salary: {...editingTeacher.salary, base: editingTeacher.salary.base + incrementAmount}});
              setIsIncrementModalOpen(false);
              setIncrementAmount(0);
              toast.success("Increment Applied!");
            }}>Apply Increment</Button>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Loading...</p>
        )}
      </Modal>

    </div>
  );
};

export default TeacherManagement;