import heroImg from "../../img/heroImg.jpg";
function Home() {
  
   return (
    <section style={{backgroundImage:`url(${heroImg})`}}
     className=" h-[75vh] md:h-screen flex items-center bg-cover bg-center bg-no-repeat px-4 md:px-12 " >
     <div className="max-w-lg text-white px-12">
        <h1 className=" text-3xl md:text-5xl lg:text-6xl font-bold mb-4" >
       
          Exclusive Deals Of Furniture Collection</h1>

          <p className=" text-sm md:text:text-lg text-gray-600 mb-6">
            Discover modern furniture that fits your style and budget
          </p>
          <button className="px-6 py-3 bg-teal-700 text-white rounded">Shop Now</button>
      </div>

      {/* <img src={heroImg} alt="Furniture"  /> */}

    </section>
   );
  };

 

export default Home;
