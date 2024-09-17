
import { useGetBookingsQuery } from "../../redux/features/bookings/bookingApi";

import { Link } from "react-router-dom";
import noData from "../../../no-Data.json"
import Lottie from "react-lottie-player";
import LoadingPage from "../../pages/shared/LoadingPage";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { useState } from "react";
import UserReview from "../users/UserReview";
import paid from "../../image/pngtree-paid-stamp-vector-illustration-png-image_6585127-removebg-preview.png"

const PaymentInfo = () => {
    
    const {data:bookings=[],isLoading,error} = useGetBookingsQuery()
    const [review,setReview] = useState(false)
    const [reviewBooking,setReviewBooking] = useState("")
    // const generatePDF = (booking) => {
    //     const doc = new jsPDF('p', 'pt', 'a4'); 
    //     const margin = 40;
    //     const pageWidth = doc.internal.pageSize.getWidth();
    
     
    //     doc.setFontSize(18);
    //     doc.setTextColor(255, 255, 255);
    //     doc.setFillColor(58, 70, 93); 
    //     doc.rect(0, 0, pageWidth, 60, 'F');
    //     doc.text('Company Name', margin, 40);
    //     doc.text('INVOICE', pageWidth - margin - 80, 40);
    
      
    //     doc.setFontSize(12);
    //     doc.setTextColor(0, 0, 0);
    //     doc.text(`Invoice #: ${booking._id}`, pageWidth - margin - 80, 80);
    //     doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin - 80, 100);
    
        
    //     const userName = booking.user && booking.user.name ? booking.user.name : 'Unknown User';
    //     const userNameText = `UserName: ${userName}`;
    //     const splitUserNameText = doc.splitTextToSize(userNameText, pageWidth - 2 * margin);
    //     doc.text('Invoice to:', margin, 80);
    //     doc.text(splitUserNameText, margin, 100);  // User's name with label displayed here
    //     doc.text(`Phone: ${booking.user.phone}`, margin, 160);
    
        
    //     doc.line(margin, 170, pageWidth - margin, 170);
    
       
    //     doc.autoTable({
    //         startY: 180,
    //         margin: { left: margin, right: margin },
    //         headStyles: { fillColor: [72, 168, 67] }, 
    //         bodyStyles: { fillColor: [245, 245, 245] },
    //         columnStyles: {
    //             0: { cellWidth: 'auto' },
    //             1: { cellWidth: 'auto' },
    //             2: { cellWidth: 'auto' },
    //             3: { cellWidth: 'auto' },
    //             4: { cellWidth: 'auto' },
    //         },
    //         head: [['SL', 'Item Description', 'Duration', 'Price', 'TotalPrice']],
    //         body: [
    //             [1, 'Car Rental: ' + booking.car.name, booking.duration, `$${booking.car.pricePerHour}`, `$${booking.totalCost}`],
    //         ],
    //     });
    
    //     // Subtotal, Tax, Discount, and Total
    //     const tableYPosition = doc.previousAutoTable.finalY + 20;
    
    //     doc.text('Sub Total:', pageWidth - margin - 100, tableYPosition);
    //     doc.text(`$${booking.totalCost}`, pageWidth - margin, tableYPosition);
    
    //     doc.text('Tax:', pageWidth - margin - 100, tableYPosition + 20);
    //     doc.text('0.00%', pageWidth - margin, tableYPosition + 20);
    
    //     doc.text('Discount:', pageWidth - margin - 100, tableYPosition + 40);
    //     doc.text('0%', pageWidth - margin, tableYPosition + 40);
    
    //     doc.setFontSize(11);
    //     doc.setFont('bold');
    //     doc.setTextColor(58, 70, 93);
    //     doc.text('Total:', pageWidth - margin - 100, tableYPosition + 60);
    //     doc.text(`$${booking.totalCost}`, pageWidth - margin, tableYPosition + 60);
    
    //     // Terms & Conditions
    //     doc.setFontSize(10);
    //     doc.setFont('normal');
    //     doc.setTextColor(0, 0, 0);
    //     doc.text('Terms & Conditions', margin, tableYPosition + 100);
    //     doc.setFontSize(8);
    //     const termsText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.';
    //     const splitTermsText = doc.splitTextToSize(termsText, pageWidth - 2 * margin);
    //     doc.text(splitTermsText, margin, tableYPosition + 115);
    
    //     // Footer
    //     const footerYPosition = doc.internal.pageSize.getHeight() - 40;
    //     doc.setFontSize(10);
    //     doc.setTextColor(255, 255, 255);
    //     doc.setFillColor(58, 70, 93); 
    //     doc.rect(0, footerYPosition - 20, pageWidth, 60, 'F');
    //     doc.text('Phone number', margin, footerYPosition);
    //     doc.text('Address', pageWidth / 2, footerYPosition, 'center');
    //     doc.text('NameCompany@gmail.com', pageWidth - margin, footerYPosition, 'right');
    
    //     // Save the PDF
    //     doc.save(`Invoice_${booking._id}.pdf`);
    // };
console.log(bookings);
const generatePDF = (booking) => {
    console.log({booking});
    const doc = new jsPDF();

    const drawHeader = () => {
        doc.setFontSize(20);
        doc.setTextColor(0, 0, 0); // Ensures text color is black
        doc.setFont('helvetica', 'bold');
        // Make sure the text is centered in the blue rectangle
        doc.text("Car Rental House", 105, 27, { align: "center" });
        // doc.setFillColor(153, 204, 255); // Light blue background
        // doc.roundedRect(10, 15, 190, 12, 3, 3, 'F'); // Correct positioning of the rectangle
    };

    const drawFooter = () => {
        doc.setTextColor(100);
        doc.setFontSize(10);
        doc.text("Phone number: 123-456-7890", 14, 280);
        doc.text("Address: Dhaka , Dhaka, Bangladesh", 14, 285);
        doc.text("carRentals@gmail.com", 14, 290);
    };

    const drawBody = () => {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text("Invoice to:", 14, 40);
        doc.text(`UserName: ${booking.user.name}`, 14, 48);
        doc.text(`Phone: ${booking.user.phone}`, 14, 56);
        doc.text(`Car Model: ${booking.car.model}`, 14, 64);
        doc.text(`Price Per Hour: $ ${booking.car.pricePerHour}`, 14, 72);
        doc.text(`Total Cost: $ ${booking.totalCost}`, 14, 80);

        doc.autoTable({
            startY: 90,
            head: [[{ content: 'SL', styles: { halign: 'center', fillColor: [0, 128, 0] } },
                    { content: 'Item Description', styles: { halign: 'center', fillColor: [0, 128, 0] } },
                    { content: 'Duration', styles: { halign: 'center', fillColor: [0, 128, 0] } },
                    { content: 'Price', styles: { halign: 'center', fillColor: [0, 128, 0] } },
                    { content: 'Total Price', styles: { halign: 'center', fillColor: [0, 128, 0] } }]],
            body: [
                ['1', `Car Rental: ${booking.car.name} ${booking.car.model}`, `${booking.duration}`, `$ ${booking.car.pricePerHour}`, `$ ${booking.totalCost}`]
            ],
            theme: 'grid',
            tableWidth: 'auto',
            textAlign: 'center',
        });
        const centerX = (doc.internal.pageSize.getWidth() - 50) / 2; 
        const bottomY = doc.internal.pageSize.getHeight() - 60;  
        doc.addImage(`${paid}`, 'PNG', centerX, bottomY, 50, 50);
    };

    drawHeader();
    drawBody();
    drawFooter();

    
    doc.save(`Invoice_${booking._id}.pdf`);
};
    
    const handleReview = (booking)=>{
        setReview(true)
        setReviewBooking(booking)
    }
     
      
    

    if(isLoading){
      return <LoadingPage/>
    }
    return (
      <>
      <div>
      <div className="card bg-base-100 w-auto shadow-xl">
          <div className="card-body">
              <div className="overflow-x-auto">
                  {bookings?.data?.length > 0 ? (
                      <table className="table text-center">
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
                                  booking?.endTime !==null ? (
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
                                         <td>{booking.endTime}</td>
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
                                          <th>{booking.paid === 'paid'&& <button className="btn btn-outline btn-sm" onClick={()=>generatePDF(booking)}>Recipt</button>}</th>
                                          <th>{booking.paid === 'paid'&& <label onClick={()=>handleReview(booking)} htmlFor="my_modal_6" className="btn btn-outline btn-info btn-sm">Review</label>}</th>
                                      </tr>
                                  ) :   null
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

  {review && <UserReview booking={reviewBooking}/>}
      </>
    );
};

export default PaymentInfo;