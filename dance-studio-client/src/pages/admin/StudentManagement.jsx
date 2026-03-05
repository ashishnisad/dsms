import React, { useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const StudentManagement = () => {
  // ==========================================
  // 1. THE GOD STATE (A to Z Data Structure)
  // ==========================================
  const [students, setStudents] = useState([
    { 
      id: 'STU-001', name: 'Aarav Patel', phone: '+91 9876543210', email: 'aarav@rhythm.com', 
      status: 'Active', joinDate: '2026-01-10',
      batches: [{ id: 'B1', name: 'Morning Zumba', level: 'Beginner' }],
      attendanceLogs: ['2026-02-24', '2026-02-25'], // YYYY-MM-DD
      fee: { plan: 'Monthly', amount: 2000, payments: [{ date: '2026-01-10', amount: 2000 }], dues: 0, discount: 0 },
      performance: { skillLevel: 'Beginner', remarks: 'Good progress.', history: ['Joined as Beginner'] },
    },
    { 
      id: 'STU-002', name: 'Priya Singh', phone: '+91 9876543211', email: 'priya@rhythm.com', 
      status: 'Active', joinDate: '2026-01-12',
      batches: [{ id: 'B2', name: 'Hip-Hop Beginner', level: 'Beginner' }],
      attendanceLogs: ['2026-02-20'], 
      fee: { plan: 'Per Class', amount: 200, payments: [], dues: 400, discount: 0 },
      performance: { skillLevel: 'Beginner', remarks: 'Needs more practice.', history: [] },
    },
    // Add more dummy data as needed
  ]);

  // UI States
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // profile | batches | attendance | fee | performance | notifications
  const [editingStudent, setEditingStudent] = useState(null); 
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [editingBatchId, setEditingBatchId] = useState(null);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [notificationType, setNotificationType] = useState('Payment Reminder');
  const [notificationMessage, setNotificationMessage] = useState('');
  
  // 📅 Calendar State for Attendance Tab
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date(2026, 1, 26)); // February 26, 2026

  // Available Batches (Master List)
  const [availableBatches] = useState([
    { id: 'B1', name: 'Morning Zumba', level: 'Beginner' },
    { id: 'B2', name: 'Hip-Hop Beginner', level: 'Beginner' },
    { id: 'B3', name: 'Salsa Advanced', level: 'Advanced' },
    { id: 'B4', name: 'Contemporary Flow', level: 'Intermediate' },
  ]);

  // ==========================================
  // 2. GLOBAL ACTIONS
  // ==========================================
  const openManageModal = (student) => {
    if (student) {
      setEditingStudent(student);
    } else {
      // Adding New Student Default Structure
      setEditingStudent({
        id: `STU-00${students.length + 1}`, name: '', phone: '', email: '', status: 'Active', joinDate: new Date().toISOString().split('T')[0],
        batches: [], attendanceLogs: [], 
        fee: { plan: 'Monthly', amount: 2000, payments: [], dues: 0, discount: 0 },
        performance: { skillLevel: 'Beginner', remarks: '', history: [] },
      });
    }
    setActiveTab('profile');
    setIsManageModalOpen(true);
  };

  const closeManageModal = () => {
    setIsManageModalOpen(false);
    setEditingStudent(null);
    setIsAssignModalOpen(false);
    setEditingBatchId(null);
    setActiveTab('profile');
  };

  const updateStudentData = (updatedData) => {
    const isNew = !students.find(s => s.id === updatedData.id);
    if (isNew) {
      setStudents([...students, updatedData]);
    } else {
      setStudents(students.map(s => s.id === updatedData.id ? updatedData : s));
    }
    setEditingStudent(updatedData); // Update modal view
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to completely delete ${name}'s record?`)) {
      setStudents(students.filter(s => s.id !== id));
      toast.error(`${name} has been deleted.`);
      if (editingStudent && editingStudent.id === id) {
        closeManageModal();
      }
    }
  };

  const generateReceipt = (student) => {
    const doc = new jsPDF();
    doc.text(`Receipt for ${student.name}`, 10, 10);
    doc.text(`ID: ${student.id}`, 10, 20);
    doc.text(`Plan: ${student.fee.plan}`, 10, 30);
    doc.text(`Amount: ₹${student.fee.amount}`, 10, 40);
    doc.text(`Discount: ₹${student.fee.discount}`, 10, 50);
    doc.text(`Dues: ₹${student.fee.dues}`, 10, 60);
    doc.text(`Payments: ${student.fee.payments.map(p => `₹${p.amount} on ${p.date}`).join(', ')}`, 10, 70);
    doc.save(`${student.name}_receipt.pdf`);
    toast.success("Receipt Generated & Downloaded!");
  };

  const exportReport = (type, format = 'pdf') => {
    if (format === 'pdf') {
      const doc = new jsPDF();
      doc.text(`${type.charAt(0).toUpperCase() + type.slice(1)} Report`, 10, 10);
      let y = 20;
      if (type === 'fee') {
        students.forEach(s => {
          doc.text(s.name, 10, y);
          y += 10;
          doc.text(`Plan: ${s.fee.plan}, Amount: ${s.fee.amount}, Dues: ${s.fee.dues}`, 20, y);
          y += 10;
        });
      } else if (type === 'attendance') {
        students.forEach(s => {
          doc.text(s.name, 10, y);
          y += 10;
          doc.text(`Attendance Logs: ${s.attendanceLogs.join(', ')}`, 20, y);
          y += 10;
        });
      } else if (type === 'batch') {
        const batchCounts = availableBatches.map(b => ({
          name: b.name,
          count: students.filter(s => s.batches.some(sb => sb.id === b.id)).length
        }));
        batchCounts.forEach(b => {
          doc.text(`${b.name}: ${b.count} students`, 10, y);
          y += 10;
        });
      }
      doc.save(`${type}_report.pdf`);
      toast.success(`${type} Report Downloaded as PDF!`);
    } else if (format === 'excel') {
      const data = [];
      if (type === 'fee') {
        data.push(['Name', 'Plan', 'Amount', 'Dues']);
        students.forEach(s => data.push([s.name, s.fee.plan, s.fee.amount, s.fee.dues]));
      } else if (type === 'attendance') {
        data.push(['Name', 'Attendance Logs']);
        students.forEach(s => data.push([s.name, s.attendanceLogs.join('; ')]));
      } else if (type === 'batch') {
        data.push(['Batch Name', 'Student Count']);
        const batchCounts = availableBatches.map(b => ({
          name: b.name,
          count: students.filter(s => s.batches.some(sb => sb.id === b.id)).length
        }));
        batchCounts.forEach(b => data.push([b.name, b.count]));
      }
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, type);
      XLSX.writeFile(wb, `${type}_report.xlsx`);
      toast.success(`${type} Report Downloaded as Excel!`);
    }
    setIsReportsModalOpen(false);
  };

  const sendNotification = () => {
    toast.success(`Notification sent: ${notificationType} - ${notificationMessage}`);
    setNotificationMessage('');
  };

  // ==========================================
  // 3. MAIN TABLE SETUP
  // ==========================================
  const columns = [
    { header: 'ID', accessor: 'id' },
    { 
      header: 'Student Name', 
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] flex items-center justify-center text-xs font-bold text-white shadow-inner shrink-0">
            {row.name.charAt(0)}
          </div>
          <span className="font-semibold text-white truncate">{row.name}</span>
        </div>
      )
    },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Batch', accessor: 'batches', render: (row) => row.batches.map(b => b.name).join(', ') || 'None' },
    { 
      header: 'Fees', 
      accessor: 'fee',
      render: (row) => <Badge status={row.fee.dues > 0 ? 'Pending' : 'Paid'} />
    },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => <Badge status={row.status} />
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="flex gap-2 flex-wrap">
          <Button variant="primary" size="sm" onClick={() => openManageModal(row)}>⚙️ Manage</Button>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Full Name" value={editingStudent.name} onChange={e => updateStudentData({...editingStudent, name: e.target.value})} />
        <Input label="Phone Number" value={editingStudent.phone} onChange={e => updateStudentData({...editingStudent, phone: e.target.value})} />
        <Input label="Email Address" value={editingStudent.email} onChange={e => updateStudentData({...editingStudent, email: e.target.value})} />
        <Input label="Join Date" type="date" value={editingStudent.joinDate} onChange={e => updateStudentData({...editingStudent, joinDate: e.target.value})} />
      </div>
      <div className="w-full">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Account Status (Activate/Deactivate)</label>
        <select value={editingStudent.status} onChange={e => updateStudentData({...editingStudent, status: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-[#4ECDC4]">
          <option value="Active" className="bg-gray-900">🟢 Active</option>
          <option value="Inactive" className="bg-gray-900">🔴 Inactive</option>
        </select>
      </div>
      <Button variant="primary" className="self-end mt-4" onClick={() => toast.success("Profile details saved!")}>💾 Save Profile</Button>
    </div>
  );

  const renderBatchesTab = () => (
    <div className="flex flex-col gap-4 animate-fade-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/5 p-4 rounded-xl border border-white/10 gap-4 sm:gap-0">
        <div><p className="text-white font-bold">Assign New Batch</p><p className="text-xs text-gray-400">Add a batch to their schedule</p></div>
        <Button variant="glass" size="sm" onClick={() => setIsAssignModalOpen(true)}>+ Assign Batch</Button>
      </div>
      
      <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mt-2">Current Batches</p>
      {editingStudent.batches.length > 0 ? editingStudent.batches.map((batch, i) => (
        <div key={i} className="flex flex-col p-3 bg-black/30 rounded-xl border border-white/5 mb-2 gap-4">
          {editingBatchId === batch.id ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Input label="Name" value={batch.name} onChange={e => {
                const newBatches = [...editingStudent.batches];
                newBatches[i].name = e.target.value;
                setEditingStudent({...editingStudent, batches: newBatches});
              }} />
              <div className="w-full">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Level</label>
                <select value={batch.level} onChange={e => {
                  const newBatches = [...editingStudent.batches];
                  newBatches[i].level = e.target.value;
                  setEditingStudent({...editingStudent, batches: newBatches});
                }} className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-[#4ECDC4]">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
              <div><p className="text-white font-bold">{batch.name}</p><p className="text-xs text-[#4ECDC4]">{batch.level}</p></div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="secondary" size="sm" onClick={() => setEditingBatchId(batch.id)}>Change Batch/Level</Button>
                <Button variant="danger" size="sm" onClick={() => {
                  updateStudentData({...editingStudent, batches: editingStudent.batches.filter((_, index) => index !== i)});
                  toast.error("Batch removed");
                }}>Remove</Button>
              </div>
            </div>
          )}
          {editingBatchId === batch.id && (
            <div className="flex gap-2 mt-2 self-end">
              <Button variant="primary" size="sm" onClick={() => {
                updateStudentData(editingStudent);
                setEditingBatchId(null);
                toast.success("Batch updated");
              }}>Save</Button>
              <Button variant="secondary" size="sm" onClick={() => setEditingBatchId(null)}>Cancel</Button>
            </div>
          )}
        </div>
      )) : <p className="text-gray-500 text-sm">No batches assigned yet.</p>}
    </div>
  );

  const renderAttendanceTab = () => {
    // Basic Calendar Logic
    const year = currentMonthDate.getFullYear(); const month = currentMonthDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const toggleAtt = (day) => {
      const dStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const newLogs = editingStudent.attendanceLogs.includes(dStr) ? editingStudent.attendanceLogs.filter(d => d !== dStr) : [...editingStudent.attendanceLogs, dStr];
      updateStudentData({...editingStudent, attendanceLogs: newLogs});
    };

    return (
      <div className="flex flex-col gap-4 animate-fade-up">
        {/* Calendar Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-4 sm:gap-0">
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
            const isPresent = editingStudent.attendanceLogs.includes(dStr);
            return (
              <div 
                key={day} 
                onClick={() => toggleAtt(day)} 
                className={`h-8 flex items-center justify-center rounded text-xs cursor-pointer ${isPresent ? 'bg-[#4ECDC4] text-black font-bold' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
              >
                {day}
              </div>
            )
          })}
        </div>
      </div>
    );
  };

  const renderFeeTab = () => (
    <div className="flex flex-col gap-4 animate-fade-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Fee Plan</label>
          <select value={editingStudent.fee.plan} onChange={e => updateStudentData({...editingStudent, fee: {...editingStudent.fee, plan: e.target.value}})} className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-[#4ECDC4]">
            <option value="Monthly">Monthly</option>
            <option value="Per Class">Per Class</option>
          </select>
        </div>
        <Input label="Amount (₹)" type="number" value={editingStudent.fee.amount} onChange={e => updateStudentData({...editingStudent, fee: {...editingStudent.fee, amount: Number(e.target.value)}})} />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
        <div className="flex flex-col gap-2">
          <Input label="Record Payment (₹)" type="number" value={paymentAmount} onChange={e => setPaymentAmount(Number(e.target.value))} />
          <Button variant="primary" size="sm" onClick={() => {
            const newPayments = [...editingStudent.fee.payments, { date: new Date().toISOString().split('T')[0], amount: paymentAmount }];
            const newDues = editingStudent.fee.dues - paymentAmount;
            updateStudentData({...editingStudent, fee: {...editingStudent.fee, payments: newPayments, dues: newDues > 0 ? newDues : 0}});
            setPaymentAmount(0);
            toast.success("Payment Recorded!");
          }}>Record</Button>
        </div>
        <div className="flex flex-col gap-2">
          <Input label="Add Discount (₹)" type="number" value={discountAmount} onChange={e => setDiscountAmount(Number(e.target.value))} />
          <Button variant="secondary" size="sm" onClick={() => {
            const newDiscount = editingStudent.fee.discount + discountAmount;
            const newDues = editingStudent.fee.dues - discountAmount;
            updateStudentData({...editingStudent, fee: {...editingStudent.fee, discount: newDiscount, dues: newDues > 0 ? newDues : 0}});
            setDiscountAmount(0);
            toast.success("Discount Applied!");
          }}>Apply</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black/30 p-4 rounded-xl mt-2 border border-[#4ECDC4]/30 gap-4 sm:gap-0">
        <div>
          <p className="text-gray-400 text-xs uppercase font-bold">Pending Dues</p>
          <p className="text-3xl font-bold text-[#4ECDC4]">₹{editingStudent.fee.dues.toLocaleString()}</p>
        </div>
        <Button variant="primary" onClick={() => generateReceipt(editingStudent)}>🧾 Generate Receipt</Button>
      </div>
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="flex flex-col gap-4 animate-fade-up">
      <div className="w-full">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Skill Level</label>
        <select value={editingStudent.performance.skillLevel} onChange={e => updateStudentData({...editingStudent, performance: {...editingStudent.performance, skillLevel: e.target.value}})} className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-[#4ECDC4]">
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div className="w-full">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Instructor Remarks</label>
        <textarea rows="4" value={editingStudent.performance.remarks} onChange={e => updateStudentData({...editingStudent, performance: {...editingStudent.performance, remarks: e.target.value}})} className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-[#4ECDC4] resize-none" placeholder="Add remarks here..."></textarea>
      </div>

      <div className="w-full">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Progress History</label>
        <ul className="list-disc pl-5 text-gray-300">
          {editingStudent.performance.history.map((entry, i) => <li key={i}>{entry}</li>)}
        </ul>
        <Input label="Add History Entry" value="" onChange={e => {}} placeholder="e.g., Promoted to Intermediate" />
        <Button variant="secondary" className="mt-2" onClick={() => {
          const newHistory = [...editingStudent.performance.history, 'New entry']; // Replace with actual input
          updateStudentData({...editingStudent, performance: {...editingStudent.performance, history: newHistory}});
          toast.success("History updated");
        }}>Add Entry</Button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="flex flex-col gap-4 animate-fade-up">
      <div className="w-full">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Notification Type</label>
        <select value={notificationType} onChange={e => setNotificationType(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-[#4ECDC4]">
          <option value="Payment Reminder">Payment Reminder</option>
          <option value="Class Cancellation">Class Cancellation</option>
          <option value="Event Announcement">Event Announcement</option>
        </select>
      </div>
      <div className="w-full">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Message</label>
        <textarea rows="4" value={notificationMessage} onChange={e => setNotificationMessage(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-[#4ECDC4] resize-none" placeholder="Enter message..."></textarea>
      </div>
      <Button variant="primary" className="self-end" onClick={sendNotification}>Send Notification</Button>
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Student Directory</h1>
          <p className="text-[#b0bec5] text-sm">Manage all registered students, their batches, and fee status.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="secondary" onClick={() => setIsReportsModalOpen(true)}>📄 Export Reports</Button>
          <Button variant="primary" onClick={() => openManageModal(null)}>+ Add New Student</Button>
        </div>
      </div>

      <DataTable columns={columns} data={students} searchPlaceholder="Search by name, phone, or batch..." itemsPerPage={5} />

      {/* MASTER CONTROL PANEL MODAL */}
      <Modal isOpen={isManageModalOpen} onClose={closeManageModal} title={`Managing: ${editingStudent?.name || 'New Student'}`} maxWidth="max-w-full sm:max-w-4xl">
        {editingStudent && (
          <div className="flex flex-col h-full max-h-[70vh]">
            {/* TABS NAVIGATION */}
            <div className="flex overflow-x-auto border-b border-white/10 mb-4 custom-scrollbar">
              <TabBtn id="profile" label="Profile & Status" icon="👤" />
              <TabBtn id="batches" label="Batch Assignments" icon="📘" />
              <TabBtn id="attendance" label="Attendance" icon="📅" />
              <TabBtn id="fee" label="Fee Management" icon="💰" />
              <TabBtn id="performance" label="Performance" icon="📈" />
              <TabBtn id="notifications" label="Notifications" icon="🔔" />
            </div>

            {/* TAB CONTENT RENDERER */}
            <div className="overflow-y-auto pr-2 custom-scrollbar pb-4">
              {activeTab === 'profile' && renderProfileTab()}
              {activeTab === 'batches' && renderBatchesTab()}
              {activeTab === 'attendance' && renderAttendanceTab()}
              {activeTab === 'fee' && renderFeeTab()}
              {activeTab === 'performance' && renderPerformanceTab()}
              {activeTab === 'notifications' && renderNotificationsTab()}
            </div>
          </div>
        )}
      </Modal>

      {/* Assign Batch Modal */}
      <Modal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} title="Assign New Batch">
        {editingStudent ? (
          <div className="flex flex-col gap-4">
            {availableBatches.filter(b => !editingStudent.batches.some(sb => sb.id === b.id)).map(b => (
              <div key={b.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-black/30 rounded-xl border border-white/5 gap-4 sm:gap-0">
                <div>
                  <p className="text-white font-bold">{b.name}</p>
                  <p className="text-xs text-[#4ECDC4]">{b.level}</p>
                </div>
                <Button variant="primary" size="sm" onClick={() => {
                  updateStudentData({...editingStudent, batches: [...editingStudent.batches, b]});
                  toast.success("Batch assigned!");
                }}>Assign</Button>
              </div>
            ))}
            {availableBatches.filter(b => !editingStudent.batches.some(sb => sb.id === b.id)).length === 0 && <p className="text-gray-500 text-sm">No available batches.</p>}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Loading...</p>
        )}
      </Modal>

      {/* Reports Modal */}
      <Modal isOpen={isReportsModalOpen} onClose={() => setIsReportsModalOpen(false)} title="Generate Reports">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-white font-bold">Fee Collection Report</p>
            <div className="flex gap-2 flex-wrap">
              <Button variant="primary" size="sm" onClick={() => exportReport('fee', 'pdf')}>PDF</Button>
              <Button variant="secondary" size="sm" onClick={() => exportReport('fee', 'excel')}>Excel</Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white font-bold">Attendance Report</p>
            <div className="flex gap-2 flex-wrap">
              <Button variant="primary" size="sm" onClick={() => exportReport('attendance', 'pdf')}>PDF</Button>
              <Button variant="secondary" size="sm" onClick={() => exportReport('attendance', 'excel')}>Excel</Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white font-bold">Batch Strength Report</p>
            <div className="flex gap-2 flex-wrap">
              <Button variant="primary" size="sm" onClick={() => exportReport('batch', 'pdf')}>PDF</Button>
              <Button variant="secondary" size="sm" onClick={() => exportReport('batch', 'excel')}>Excel</Button>
            </div>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default StudentManagement;