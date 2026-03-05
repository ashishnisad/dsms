import React, { useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { toast } from 'react-toastify'; // 👈 Remote Control for Toast

const ClassesPage = () => {
  // --- 1. State Management ---
  const [classes, setClasses] = useState([
    { id: 'CLS-001', name: 'Morning Zumba', instructor: 'Sneha Kapoor', time: '06:00 AM - 07:00 AM', days: 'Mon, Wed, Fri', capacity: 20, enrolled: 15, status: 'Active' },
    { id: 'CLS-002', name: 'Advanced Hip-Hop', instructor: 'Rahul Sharma', time: '05:00 PM - 06:30 PM', days: 'Tue, Thu, Sat', capacity: 15, enrolled: 15, status: 'Full' },
    { id: 'CLS-003', name: 'Salsa Beginners', instructor: 'Amit Verma', time: '07:00 PM - 08:00 PM', days: 'Weekends', capacity: 25, enrolled: 10, status: 'Active' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  
  const [formData, setFormData] = useState({ 
    name: '', instructor: '', time: '', days: '', capacity: '' 
  });

  // --- 2. Action Handlers ---
  const openModal = (cls = null) => {
    if (cls) {
      setEditingClass(cls);
      setFormData(cls);
    } else {
      setEditingClass(null);
      setFormData({ name: '', instructor: '', time: '', days: '', capacity: '' });
    }
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveClass = () => {
    if (!formData.name || !formData.time) {
      toast.error("Class Name and Timing are required!");
      return;
    }

    if (editingClass) {
      // Update logic
      setClasses(classes.map(c => c.id === editingClass.id ? { ...c, ...formData } : c));
      toast.success(`${formData.name} batch updated!`);
    } else {
      // Add logic
      const newClass = { 
        ...formData, 
        id: `CLS-00${classes.length + 1}`, 
        enrolled: 0, 
        status: 'Active' 
      };
      setClasses([...classes, newClass]);
      toast.success(`${formData.name} batch created!`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete the ${name} batch?`)) {
      setClasses(classes.filter(c => c.id !== id));
      toast.error(`${name} batch has been deleted.`);
    }
  };

  // --- 3. Table Columns Setup ---
  const columns = [
    { 
      header: 'Batch Details', 
      accessor: 'name',
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-bold text-white text-base">{row.name}</span>
          <span className="text-xs text-[#4ECDC4]">ID: {row.id}</span>
        </div>
      )
    },
    { 
      header: 'Schedule', 
      accessor: 'time',
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-gray-300 font-medium">🕒 {row.time}</span>
          <span className="text-gray-500 text-xs">📅 {row.days}</span>
        </div>
      )
    },
    { 
      header: 'Instructor', 
      accessor: 'instructor',
      render: (row) => <span className="text-gray-300">👨‍🏫 {row.instructor || 'Unassigned'}</span>
    },
    { 
      header: 'Capacity', 
      accessor: 'capacity',
      render: (row) => {
        const isFull = row.enrolled >= row.capacity;
        return (
          <div className="flex items-center gap-2">
            <div className="w-full bg-black/40 rounded-full h-2 max-w-[80px]">
              <div 
                className={`h-2 rounded-full ${isFull ? 'bg-red-500' : 'bg-[#4ECDC4]'}`} 
                style={{ width: `${(row.enrolled / row.capacity) * 100}%` }}
              ></div>
            </div>
            <span className={`text-xs ${isFull ? 'text-red-400 font-bold' : 'text-gray-400'}`}>
              {row.enrolled}/{row.capacity}
            </span>
          </div>
        )
      }
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
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => openModal(row)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => handleDelete(row.id, row.name)}>Delete</Button>
        </div>
      )
    }
  ];

  return (
    <div className="w-full pb-10 animate-fade-up font-outfit">
      
      {/* Page Header */}
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Classes & Batches</h1>
          <p className="text-[#b0bec5] text-sm">Manage dance batches, schedules, and instructor assignments.</p>
        </div>
        
        <Button variant="primary" className="shrink-0" onClick={() => openModal(null)}>
          <span className="mr-2 text-lg">+</span> Create New Batch
        </Button>
      </div>

      {/* The Master Data Grid */}
      <DataTable 
        title="Active Batches"
        columns={columns}
        data={classes}
        searchPlaceholder="Search by batch name, instructor, or days..."
        itemsPerPage={5}
      />

      {/* --- MODAL: ADD / EDIT CLASS --- */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingClass ? "Edit Batch Details" : "Create New Batch"}
      >
        <div className="flex flex-col gap-4">
          <Input 
            label="Batch Name" name="name" placeholder="e.g. Morning Zumba" 
            value={formData.name} onChange={handleInputChange} required
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Timings" name="time" placeholder="e.g. 06:00 AM - 07:00 AM" 
              value={formData.time} onChange={handleInputChange} required
            />
            <Input 
              label="Days" name="days" placeholder="e.g. Mon, Wed, Fri" 
              value={formData.days} onChange={handleInputChange} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Instructor</label>
              <select 
                name="instructor" 
                value={formData.instructor} 
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-[#4ECDC4] transition-all cursor-pointer"
              >
                <option value="" className="bg-gray-900">-- Select Teacher --</option>
                <option value="Sneha Kapoor" className="bg-gray-900">Sneha Kapoor</option>
                <option value="Rahul Sharma" className="bg-gray-900">Rahul Sharma</option>
                <option value="Amit Verma" className="bg-gray-900">Amit Verma</option>
              </select>
            </div>
            
            <Input 
              label="Max Capacity" name="capacity" type="number" placeholder="e.g. 25" 
              value={formData.capacity} onChange={handleInputChange} 
            />
          </div>
          
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/10">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSaveClass}>
              {editingClass ? 'Update Batch' : 'Create Batch'}
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default ClassesPage;