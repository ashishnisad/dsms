import React, { useState } from 'react';
import Spinner from './Spinner';

const DataTable = ({ 
  title = "Data List",
  columns = [], 
  data = [], 
  isLoading = false,
  searchPlaceholder = "Search...",
  itemsPerPage = 5,
  actionButton = null // Add new button lagane ke liye (optional)
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Search Logic: Filter data based on search term
  const filteredData = data.filter((item) => {
    return Object.values(item).some((value) => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // 2. Pagination Logic: Current page ka data nikalo
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Search handle karna
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Naya search karne par page 1 par wapas jao
  };

  return (
    <div className="glass rounded-3xl overflow-hidden border border-white/5 shadow-2xl flex flex-col w-full font-outfit">
      
      {/* --- Header & Search Bar --- */}
      <div className="p-5 md:p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.02]">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
          {actionButton && <div className="ml-auto md:ml-0">{actionButton}</div>}
        </div>
        
        {/* Search Input */}
        <div className="relative w-full md:w-72 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#4ECDC4] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#4ECDC4]/50 focus:ring-1 focus:ring-[#4ECDC4]/30 transition-all text-sm"
          />
        </div>
      </div>

      {/* --- Table Area --- */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/40 border-b border-white/10">
              {columns.map((col, index) => (
                <th key={index} className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              // Loading State
              <tr>
                <td colSpan={columns.length} className="p-10 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <Spinner size="lg" className="mb-4 text-[#4ECDC4]" />
                    <p className="animate-pulse">Loading data...</p>
                  </div>
                </td>
              </tr>
            ) : currentData.length > 0 ? (
              // Data Rows
              currentData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-white/[0.03] transition-colors group">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="p-4 text-sm text-gray-300 whitespace-nowrap group-hover:text-white transition-colors">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              // Empty State
              <tr>
                <td colSpan={columns.length} className="p-10 text-center">
                  <div className="flex flex-col items-center justify-center opacity-50">
                    <span className="text-5xl mb-4">📭</span>
                    <p className="text-white font-medium text-lg">No records found</p>
                    <p className="text-gray-400 text-sm mt-1">Try adjusting your search query.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- Pagination Footer --- */}
      {!isLoading && filteredData.length > 0 && (
        <div className="p-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 bg-black/20 text-sm">
          <span className="text-gray-400">
            Showing <strong className="text-white">{filteredData.length === 0 ? 0 : startIndex + 1}</strong> to <strong className="text-white">{Math.min(startIndex + itemsPerPage, filteredData.length)}</strong> of <strong className="text-white">{filteredData.length}</strong> entries
          </span>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg bg-white/5 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-white/5"
            >
              Prev
            </button>
            <span className="px-3 py-1.5 rounded-lg bg-[#4ECDC4]/20 text-[#4ECDC4] font-bold border border-[#4ECDC4]/30">
              {currentPage} / {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg bg-white/5 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-white/5"
            >
              Next
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default DataTable;