import TeamMemberCard from "../components/TeamMember/teamMemberCard";
import { useGetTeamQuery } from "../redux/features/TeamMember/TeamApi";



const AboutUs = () => {
  const data = useGetTeamQuery()
   
   console.log(data)
    return (
        <div className="mx-auto p-6">
              <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
                <p className="text-lg md:text-xl  light:text-gray-700">Learn more about our journey, our team, and our commitment to you.</p>
            </header>
            <section className=" mb-12">
                <h2 className="lg:text-3xl text-xl font-bold mb-4">Our History</h2>
                <p className="text-lg font-semibold text-justify">
                    Founded in <span className="font-bold text-amber-600">[10 Years]</span>, our company was built on the passion for delivering exceptional car rental services.
                    Our mission has always been to provide a seamless and enjoyable car rental experience, whether for business or leisure.
                    Over the years, we've grown to include a diverse fleet of vehicles and expanded our services across multiple locations.
                </p>
            </section>
            {/* our Team member Section */}
            <section>
            <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
            <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2  justify-items-center items-center  gap-11 ">
            {
                data?.data?.data?.map(team=> <TeamMemberCard key={team._id} team={team}/>)
            }
            </div>
            </section>

            <section className=" my-16">
                <h2 className="text-3xl font-bold mb-4">Our Fleet</h2>
                <p className="text-lg  light:text-gray-700 text-justify">
                    We offer a wide range of vehicles to suit every need and budget. Whether you're looking for an economical option,
                    a luxury ride, or an SUV for a family trip, we have the perfect car for you.
                </p>
                <ul className="list-disc list-inside text-justify mt-4">
                    <li>Economy Cars: Affordable and fuel-efficient options for budget-conscious travelers.</li>
                    <li>Luxury Cars: High-end vehicles for those who want to travel in style and comfort.</li>
                    <li>SUVs: Spacious and versatile vehicles for family trips and off-road adventures.</li>
                    <li>Vans: Larger vehicles for group travel or transporting extra luggage.</li>
                </ul>
            </section>

              {/* Values & Commitment */}
              <section className="p-2 mb-12">
                <h2 className="text-xl lg:text-3xl font-bold mb-4">Our Values & Commitment</h2>
                <p className="text-lg text-justify light:text-gray-700">
                    We are dedicated to providing excellent customer service and maintaining the highest standards of quality and safety.
                    Our commitment to sustainability drives us to continually seek ways to reduce our environmental impact, from maintaining
                    a fleet of fuel-efficient vehicles to implementing eco-friendly practices in our operations.
                </p>
            </section>

            {/* Contact Information */}
            <section className="p-2">
                <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                <p className="text-lg light:text-gray-700">We'd love to hear from you! Reach out to us at:</p>
                <ul className="mt-4">
                    <li><strong>Phone:</strong> (123) 456-7890</li>
                    <li><strong>Email:</strong> contact@carrentalcompany.com</li>
                    <li><strong>Address:</strong> 1234 Car Rental St, City, State, ZIP</li>
                </ul>
            </section>
        
        </div>
    );
};

export default AboutUs;