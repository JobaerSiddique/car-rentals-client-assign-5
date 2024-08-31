

const TeamMemberCard = ({team}) => {
    const {name,image,position} = team
    return (
        <div>
          <div className="card glass w-auto ">
  <figure>
    <img
      src={image}
      alt="car!" />
  </figure>
  <div className="card-body">
    <h2 className=" text-center text-xl font-extrabold">{name}</h2>
    <p className=" text-center text-sky-600 text-xl font-extrabold">{position}</p>
    
  </div>
</div>
        </div>
    );
};

export default TeamMemberCard;