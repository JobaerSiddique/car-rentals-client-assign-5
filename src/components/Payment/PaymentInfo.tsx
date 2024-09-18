
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
import { toast } from "sonner";

const PaymentInfo = () => {
    
    const {data:bookings=[],isLoading,error} = useGetBookingsQuery()
    const [review,setReview] = useState(false)
    const [reviewBooking,setReviewBooking] = useState("")

const generatePDF = (booking:any) => {
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

    if(error){
        toast(error?.data?.message)
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