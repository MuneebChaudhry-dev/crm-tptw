// src/app/admin/patients/page.tsx
import { PatientsTable } from '@/components/tables/PatientsTable';
import { patientsData } from '@/data/patients';
import { Menu } from 'lucide-react';

export default function PatientsPage() {
  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='flex items-center px-6 py-4'>
          <button className='mr-4 lg:hidden'>
            <Menu className='h-6 w-6 text-gray-600' />
          </button>
          <h1 className='text-2xl font-semibold text-gray-900'>
            Patient Management
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className='p-6'>
        <div className='bg-white rounded-lg shadow'>
          <PatientsTable data={patientsData} />
        </div>
      </div>
    </div>
  );
}
