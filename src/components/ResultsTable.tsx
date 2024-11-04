import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Prediction } from '../types';
import { Search, Download, Printer, List, ChevronLeft, ChevronRight } from 'lucide-react';

interface ResultsTableProps {
  predictions: Prediction[];
}

const columnHelper = createColumnHelper<Prediction>();

const columns = [
  columnHelper.accessor('hla', {
    header: 'HLA',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('mhc', {
    header: 'MHC',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('peptide', {
    header: 'Peptide',
    cell: info => {
      const value = info.getValue();
      return <span className={value.includes('L') ? 'text-red-500' : ''}>{value}</span>;
    },
  }),
  columnHelper.accessor('prediction', {
    header: 'Prediction',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('score', {
    header: 'Score',
    cell: info => info.getValue().toFixed(12),
  }),
];

const ResultsTable: React.FC<ResultsTableProps> = ({ predictions }) => {
  const [rowSelection, setRowSelection] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const table = useReactTable({
    data: predictions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Predictions</h2>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <Search className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <Download className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <Printer className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="w-full text-left">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="bg-gray-900">
                <th className="w-12 p-4">
                  <input
                    type="checkbox"
                    className="rounded bg-gray-700 border-gray-600"
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                  />
                </th>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="p-4 font-medium text-gray-300">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-800">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-800">
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded bg-gray-700 border-gray-600"
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                  />
                </td>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center px-2 text-sm text-gray-400">
        <div className="flex items-center space-x-2">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="bg-gray-800 border border-gray-700 rounded px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <span>{`${currentPage}-${predictions.length} of ${predictions.length}`}</span>
          <div className="flex space-x-2">
            <button
              className="p-1 hover:bg-gray-700 rounded-full disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              className="p-1 hover:bg-gray-700 rounded-full disabled:opacity-50"
              disabled={currentPage * pageSize >= predictions.length}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;