

const pageBanner = ({image,text}) => {
    return (
        <div>
            <div
  className="hero h-64 rounded-2xl"
  style={{
    backgroundImage: `url(${image})`,
  }}>
  <div className="hero-overlay bg-opacity-80"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">{text}</h1>
      
    </div>
  </div>
</div>
        </div>
    );
};

export default pageBanner;