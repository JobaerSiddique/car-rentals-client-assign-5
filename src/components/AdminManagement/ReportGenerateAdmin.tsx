import React, { useState } from 'react';
import ReportChart from './ReportChart';
import { useReportGenerateQuery } from '../../redux/features/bookings/bookingApi';
import { FiPrinter } from "react-icons/fi";
import jsPDF from 'jspdf';
const ReportGenerateAdmin = () => {
  const [reports,setReports]=useState('')
   const {data:report,isLoading,error} = useReportGenerateQuery(reports)
   
   const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text('Report Summary', 10, 10);

    // Add table with report details
    doc.autoTable({
      head: [['Report Type', 'Total Bookings', 'Available Cars', 'Total Revenue']],
      body: [
        [
          reports,
          report?.data?.bookingCount,
          report?.data?.availableCars,
          `$ ${report?.data?.totalRevenue}`,
        ],
      ],
    });

    // Save the PDF
    doc.save(`${reports}_report.pdf`);
  };
    return (
        <>
      <h1 className='text-center font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Reports Section </h1>

        <div className=' flex justify-between'>
          <div>
            <button onClick={handleGeneratePDF} className='btn btn-outline btn-success'><FiPrinter /></button>
          </div>
        <select onChange={(e)=>setReports(e.target.value)} className="select select-info  ">
  <option disabled selected>Select Report</option>
  <option>Daily</option>
  <option>Weekly</option>
  <option>Monthly</option>
  <option>Yearly</option>
</select>
        </div>

        <div className="card bg-base-100 w-full shadow-2xl my-16">
  <div className="card-body">
  <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-items-center gap-10 md:text-xl'>
          <p className='font-bold text-blue-600 text-2xl'>TotalBooking : {report?.data?.bookingCount}</p>
          <p className='font-bold text-blue-600 text-2xl'>AvailableCars : {report?.data?.availableCars}</p>
          <p className='font-bold text-blue-600 text-2xl'>TotalRevenue : $ {report?.data?.totalRevenue}</p>
        </div>
  </div>
</div>

        


        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg shadow-md bg-white">
            <ReportChart data={report?.data?.bookingCount} label="Bookings" color="rgba(255, 99, 132, 0.5)" />
          </div>
          <div className="p-4 border rounded-lg shadow-md bg-white">
            <ReportChart data={report?.data?.availableCars
} label="Available Cars" color="rgba(54, 162, 235, 0.5)" />
          </div>
          <div className="p-4 border rounded-lg shadow-md bg-white">
            <ReportChart data={report?.data?.totalRevenue
} label="Total Revenue" color="rgba(75, 192, 192, 0.5)" />
          </div>
        </div>
        
        
        </>
      );
    
};

export default ReportGenerateAdmin;