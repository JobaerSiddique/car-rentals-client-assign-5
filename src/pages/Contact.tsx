import Lottie from "react-lottie-player";
import contact from "../../contact.json"

const Contact = () => {
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row">
  <Lottie
             loop
             animationData={ contact}
             play
             style={{ width: 500, height: 500 }}
           />
    <div className="ml-10 ">
      <h1 className="lg:text-3xl text-xl font-bold">Contact Please If You Need</h1>
      <div className="card bg-base-100  w-full shadow-2xl mt-10">
  <div className="card-body">
    <form >
    <label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Name <span className="text-red-500 font-bold">*</span></span>
  </div>
  <input 
  type="text" 
  placeholder="Enter Your Name" 
  className="input input-bordered w-full " />
  
</label>
    <label className="form-control w-full  my-4">
  <div className="label">
    <span className="label-text">Email <span className="text-red-500 font-bold">*</span></span>
  </div>
  <input 
  type="text" 
  placeholder="Enter Your Email" 
  className="input input-bordered w-full " />
  
</label>
    <label className="form-control w-full my-4 ">
  <div className="label">
    <span className="label-text">Message<span className="text-red-500 font-bold">*</span></span>
  </div>
  <textarea 
   
  placeholder="Enter Your Message" 
  className="input input-bordered w-full h-32 " />
  
</label>
<input type="submit" value="Submit" className="btn btn-outline btn-info my-3 w-full" />
    </form>
  </div>
</div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Contact;