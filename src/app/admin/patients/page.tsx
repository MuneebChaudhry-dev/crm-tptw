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
          <button className='p-2 pr-8 mr-8 hover:cursor-pointer border-r border-[#DADCE0]'>
            <Menu className='text-[#8CA9B1]' strokeWidth={3} size={30} />
          </button>
          <h1 className='text-2xl font-semibold text-gray-800'>Patients</h1>
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
<Menu strokeWidth={3} />;