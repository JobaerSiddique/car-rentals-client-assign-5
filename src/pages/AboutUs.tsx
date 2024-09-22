import TeamMemberCard from "../components/TeamMember/teamMemberCard";
import { useGetTeamQuery } from "../redux/features/TeamMember/TeamApi";

const AboutUs = () => {
    const { data, error, isLoading } = useGetTeamQuery(undefined);

    if (isLoading) return <div>Loading...</div>;

    if (error) {
        let errorMessage = 'An unknown error occurred.';
        if ('status' in error) {
            errorMessage = `Error ${error.status}: ${error.data}`;
        } else if ('message' in error) {
            errorMessage = `Error: ${error.message}`;
        }
        return <div>{errorMessage}</div>;
    }

    if (!data || !data.data.length) {
        return <div>No team members found.</div>;
    }

    return (
        <div className="mx-auto p-6">
            {/* Header */}
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-warning">
                    <span className="underline-hover">About Us</span>
                </h1>
                <p className="text-lg md:text-xl my-5">
                    Welcome to <span>Car Rental House</span>, where we take pride in providing high-quality car rental services for all your travel needs. Whether you're looking for a reliable economy car or a luxurious ride, we have a wide selection to choose from. Our mission is to offer seamless, stress-free car rental experiences, combining comfort, safety, and affordability.
                </p>
            </header>

            {/* Company History */}
            <section className="mb-12 mt-24">
                <h2 className="lg:text-4xl text-xl font-bold mb-4 text-center text-warning">
                    <span className="underline-hover">Our History</span>
                </h2>
                <p className="text-lg font-semibold text-justify mt-10">
                    Founded <span className="font-bold text-amber-600">eight years ago</span>, Car Rental House started with the vision of transforming the car rental industry by offering affordable, flexible options to travelers. From our humble beginnings with just a handful of vehicles, we have grown into a trusted name, serving thousands of satisfied customers each year. Our journey is rooted in a commitment to excellent customer service, making us a top choice for both short-term rentals and long-term leasing. We’ve continuously adapted to the latest technologies and eco-friendly practices, striving to remain at the forefront of the industry.
                </p>
            </section>

            {/* Meet Our Team */}
            <section className="mt-20">
                <h2 className="lg:text-4xl font-bold mb-8 text-center text-warning">
                    <span className="underline-hover">Meet Our Team</span>
                </h2>
                <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 justify-items-center items-center gap-11">
                    {data?.data.map(team => <TeamMemberCard key={team._id} team={team} />)}
                </div>
            </section>

            {/* Our Fleet */}
            <section className="mt-20 mb-12">
                <h2 className="lg:text-4xl font-bold mb-4 text-center text-warning">
                    <span className="underline-hover">Our Fleet</span>
                </h2>
                <p className="text-lg text-justify mt-10">
                    We offer a wide range of vehicles to suit your needs, from economy cars for everyday travel to luxury vehicles and SUVs for more comfortable, high-end experiences.
                </p>
                <ul className="list-disc mt-4 ml-6">
                    <li>Economy</li>
                    <li>Luxury</li>
                    <li>SUVs</li>
                    <li>Electric cars</li>
                    <li>Family-friendly vans</li>
                </ul>
            </section>

            {/* Values & Commitment */}
            <section className="mt-20 mb-12">
                <h2 className="lg:text-4xl font-bold mb-4 text-center text-warning">
                    <span className="underline-hover">Our Values & Commitment</span>
                </h2>
                <p className="text-lg text-justify mt-10">
                    At Car Rental House, our commitment to customer satisfaction drives everything we do. We aim to provide sustainable and eco-friendly solutions while delivering unmatched service.
                </p>
            </section>

            {/* Contact Information */}
            <section className="mt-20 mb-12">
                <h2 className="lg:text-4xl font-bold mb-4 text-center text-warning">
                    <span className="underline-hover">Contact Information</span>
                </h2>
                <div className="text-lg text-center">
                    <p><strong>Phone:</strong> +123 456 7890</p>
                    <p><strong>Email:</strong> info@carrentalhouse.com</p>
                    <p><strong>Address:</strong> 123 Main Street, City, Country</p>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
