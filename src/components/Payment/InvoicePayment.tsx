import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InvoicePayment = () => {
  const invoiceRef = useRef();
  const { state } = useLocation();
  const { booking } = state; // Access the passed booking info
  const navigate = useNavigate();

  const generatePDF = () => {
    const element = invoiceRef.current;
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF('p', 'pt', 'a4');

      // Calculate the number of pages needed
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`Invoice_${booking._id}.pdf`);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div ref={invoiceRef} className="bg-white shadow-md rounded-lg p-6">
        {/* Invoice Header */}
        <div className="bg-cyan-500 p-4 rounded-t-lg text-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">Car Rental House</h1>
          <h3 className="text-lg">INVOICE</h3>
        </div>

        {/* Invoice Body */}
        <div className="p-6">
          <p className="text-lg font-semibold mb-4">Invoice to:</p>
          <p><strong>UserName:</strong> {booking.user.name}</p>
          <p><strong>Phone:</strong> {booking.user.phone}</p>
          <p><strong>Car Model:</strong> {booking.car.name}</p>
          <p><strong>Price Per Hour:</strong> $ {booking.car.pricePerHour}</p>
          <p><strong>Total Cost:</strong> $ {booking.totalCost}</p>

          {/* Table */}
          <table className="table w-full mt-6">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="p-2">SL</th>
                <th className="p-2">Item Description</th>
                <th className="p-2">Duration</th>
                <th className="p-2">Price</th>
                <th className="p-2">Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">1</td>
                <td className="p-2">Car Rental: {booking.car.name}</td>
                <td className="p-2">{booking.duration} hours</td>
                <td className="p-2">${booking.car.pricePerHour}</td>
                <td className="p-2">${booking.totalCost}</td>
              </tr>
            </tbody>
          </table>
        </div>
       
        {/* Footer */}
        <div className="bg-black text-white p-4 rounded-b-lg flex justify-between items-center">
          <p>Phone number: 123-456-7890</p>
          <p className="text-center">Address: 123 Main St, City, Country</p>
          <p>NameCompany@gmail.com</p>
        </div>
      </div>
      <button onClick={generatePDF} className="btn btn-info mt-4 w-full">
        Download Invoice
      </button>
    </div>
  );
};

export default InvoicePayment;
