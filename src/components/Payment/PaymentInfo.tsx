
import { useGetBookingsQuery } from "../../redux/features/bookings/bookingApi";

import { Link } from "react-router-dom";
import noData from "../../../no-Data.json"
import Lottie from "react-lottie-player";
import LoadingPage from "../../pages/shared/LoadingPage";
import jsPDF from "jspdf";
import 'jspdf-autotable';

const PaymentInfo = () => {
    
    const {data:bookings=[],isLoading,error} = useGetBookingsQuery()
    const generatePDF = (booking) => {
        const doc = new jsPDF('p', 'pt', 'a4'); 
        const margin = 40;
        const pageWidth = doc.internal.pageSize.getWidth();
    
        // Header - Company Name and Invoice Title
        doc.setFontSize(18);
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(58, 70, 93); 
        doc.rect(0, 0, pageWidth, 60, 'F');
        doc.text('Company Name', margin, 40);
        doc.text('INVOICE', pageWidth - margin - 80, 40);
    
        // Invoice Details (Invoice #, Date, and Client Info)
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Invoice #: ${booking._id}`, pageWidth - margin - 80, 80);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin - 80, 100);
    
        // Displaying User's Name with Label
        const userName = booking.user && booking.user.name ? booking.user.name : 'Unknown User';
        const userNameText = `UserName: ${userName}`;
        const splitUserNameText = doc.splitTextToSize(userNameText, pageWidth - 2 * margin);
        doc.text('Invoice to:', margin, 80);
        doc.text(splitUserNameText, margin, 100);  // User's name with label displayed here
        doc.text(`Phone: ${booking.user.phone}`, margin, 160);
    
        // Draw a line under the invoice details
        doc.line(margin, 170, pageWidth - margin, 170);
    
        // Table - Items
        doc.autoTable({
            startY: 180,
            margin: { left: margin, right: margin },
            headStyles: { fillColor: [72, 168, 67] }, 
            bodyStyles: { fillColor: [245, 245, 245] },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 'auto' },
                2: { cellWidth: 'auto' },
                3: { cellWidth: 'auto' },
                4: { cellWidth: 'auto' },
            },
            head: [['SL', 'Item Description', 'Duration', 'Price', 'TotalPrice']],
            body: [
                [1, 'Car Rental: ' + booking.car.name, booking.duration, `$${booking.car.pricePerHour}`, `$${booking.totalCost}`],
            ],
        });
    
        // Subtotal, Tax, Discount, and Total
        const tableYPosition = doc.previousAutoTable.finalY + 20;
    
        doc.text('Sub Total:', pageWidth - margin - 100, tableYPosition);
        doc.text(`$${booking.totalCost}`, pageWidth - margin, tableYPosition);
    
        doc.text('Tax:', pageWidth - margin - 100, tableYPosition + 20);
        doc.text('0.00%', pageWidth - margin, tableYPosition + 20);
    
        doc.text('Discount:', pageWidth - margin - 100, tableYPosition + 40);
        doc.text('0%', pageWidth - margin, tableYPosition + 40);
    
        doc.setFontSize(11);
        doc.setFont('bold');
        doc.setTextColor(58, 70, 93);
        doc.text('Total:', pageWidth - margin - 100, tableYPosition + 60);
        doc.text(`$${booking.totalCost}`, pageWidth - margin, tableYPosition + 60);
    
        // Terms & Conditions
        doc.setFontSize(10);
        doc.setFont('normal');
        doc.setTextColor(0, 0, 0);
        doc.text('Terms & Conditions', margin, tableYPosition + 100);
        doc.setFontSize(8);
        const termsText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.';
        const splitTermsText = doc.splitTextToSize(termsText, pageWidth - 2 * margin);
        doc.text(splitTermsText, margin, tableYPosition + 115);
    
        // Footer
        const footerYPosition = doc.internal.pageSize.getHeight() - 40;
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(58, 70, 93); 
        doc.rect(0, footerYPosition - 20, pageWidth, 60, 'F');
        doc.text('Phone number', margin, footerYPosition);
        doc.text('Address', pageWidth / 2, footerYPosition, 'center');
        doc.text('NameCompany@gmail.com', pageWidth - margin, footerYPosition, 'right');
    
        // Save the PDF
        doc.save(`Invoice_${booking._id}.pdf`);
    };
    

    if(isLoading){
      return <LoadingPage/>
    }
    return (
      <div>
      <div className="card bg-base-100 w-auto shadow-xl">
          <div className="card-body">
              <div className="overflow-x-auto">
                  {bookings?.data?.length > 0 ? (
                      <table className="table">
                          {/* head */}
                          <thead>
                              <tr>
                                  <th>Car Info</th>
                                  <th>User Info</th>
                                  <th>Booking ID</th>
                                  <th>Date</th>
                                  <th>Start Time</th>
                                  <th>End Time</th>
                                  <th>Price Per Hour</th>
                                  <th>Duration</th>
                                  <th>Total Price</th>
                                  <th>Pay</th>
                                  <th></th>
                              </tr>
                          </thead>
                          <tbody>
                              {/* rows */}
                              {bookings?.data?.map((booking) =>
                                  booking?.endTime ? (
                                      <tr key={booking._id} className="hover">
                                          <td>
                                              <div className="flex items-center gap-3">
                                                  <div className="avatar">
                                                      <div className="mask mask-squircle h-12 w-12">
                                                          <img
                                                              src={booking.car.image}
                                                              alt={booking.car.name}
                                                          />
                                                      </div>
                                                  </div>
                                                  <div>
                                                      <div className="font-bold text-black">
                                                          {booking.car.name}
                                                      </div>
                                                      <div className="text-sm opacity-50">
                                                          {booking.car.color}
                                                      </div>
                                                  </div>
                                              </div>
                                          </td>
                                          <td>
                                              UserName: {booking.user.name}
                                              <br />
                                              <span className="badge badge-ghost badge-sm">
                                                  Phone: {booking.user.phone}
                                              </span>
                                          </td>
                                          <td>{booking._id}</td>
                                          <td>{booking.date}</td>
                                          <td>{booking.startTime}</td>
                                          <td>
                                              {booking.endTime ? (
                                                  <p className="text-green-600 font-bold">
                                                      {booking.endTime}
                                                  </p>
                                              ) : booking.approve ? (
                                                  <p className="text-red-600 font-bold">Running</p>
                                              ) : (
                                                  <p className="text-yellow-600 font-bold">
                                                      Pending Approval
                                                  </p>
                                              )}
                                          </td>
                                          <td>$ {booking.car.pricePerHour}</td>
                                          <td className="text-red-600 font-bold"> {booking.duration} In Hour</td>
                                          <td>
                                              {booking.endTime ? (
                                                  <p className="text-green-600 font-bold">
                                                      $ {booking.totalCost}
                                                  </p>
                                              ) : (
                                                  <p className="text-red-600 font-bold">Pending</p>
                                              )}
                                          </td>
                                          <th>
                                              {booking.endTime ? (
                                                  booking.paid === "paid" ? (
                                                      <p className="text-green-600 font-bold">Paid</p>
                                                  ) : (
                                                      <Link
                                                          to={`/dashboard/pay/${booking._id}`}
                                                          className="btn btn-secondary btn-sm"
                                                      >
                                                          Pay Now
                                                      </Link>
                                                  )
                                              ) : (
                                                  <button
                                                      disabled
                                                      className="btn btn-ghost btn-sm"
                                                  >
                                                      Pay Now
                                                  </button>
                                              )}
                                          </th>
                                          <th>{booking.paid === 'paid'&& <button onClick={() => generatePDF(booking)}className="btn btn-outline btn-sm">Recipt</button>}</th>
                                      </tr>
                                  ) : null
                              )}
                          </tbody>
                      </table>
                  ) : (
                    <div className="flex justify-center items-center h-screen">
                    <Lottie
             loop
             animationData={noData}
             play
             style={{ width: 300, height: 500 }}
           />
               </div>
                  )}
              </div>
          </div>
      </div>
  </div>
    );
};

export default PaymentInfo;