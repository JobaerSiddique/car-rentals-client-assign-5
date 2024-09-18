import TeamMemberCard from "../components/TeamMember/teamMemberCard";
import { useGetTeamQuery } from "../redux/features/TeamMember/TeamApi";



const AboutUs = () => {
    const { data, error, isLoading } = useGetTeamQuery(undefined);

    if (isLoading) return <div>Loading...</div>;

    if (error) {
        // Handle different possible error formats
        let errorMessage = 'An unknown error occurred.';
        
        if ('status' in error) {
            errorMessage = `Error ${error.status}: ${error.data}`;
        } else if ('message' in error) {
            errorMessage = `Error: ${error.message}`;
        }
        
        return <div>{errorMessage}</div>;
    }

    // If there's no data or it's empty
    if (!data || !data.data.length) {
        return <div>No team members found.</div>;
    }

    return (
        <div className="mx-auto p-6">
            {/* Your component JSX */}
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-warning">
                    <span className="underline-hover">About Us</span>
                </h1>
                <p className="text-lg md:text-xl my-5">
                    Welcome to <span>Car Rental House</span>, your premier car rental solution...
                </p>
            </header>
            <section className="mb-12 mt-24">
                <h2 className="lg:text-4xl text-xl font-bold mb-4 text-center text-warning">
                    <span className="underline-hover">Our History</span>
                </h2>
                <p className="text-lg font-semibold text-justify mt-10">
                    Founded in <span className="font-bold text-amber-600">[08 Years]</span>, our company was built on...
                </p>
            </section>
            {/* Team member section */}
            <section>
                <h2 className="lg:text-4xl font-bold mb-8 text-center mt-20 text-warning">
                    <span className="underline-hover">Meet Our Team</span>
                </h2>
                <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 justify-items-center items-center gap-11">
                    {data?.data.map(team => <TeamMemberCard key={team._id} team={team} />)}
                </div>
            </section>
            {/* Other sections */}
        </div>
    );
};

export default AboutUs;
