import React from 'react';
import homebg from "./../assets/Home-1.png";
import spoh from "./../assets/spoh.jpeg";
import loch from "./../assets/loch.jpeg";
import dash from "./../assets/dash.jpeg";
import amil from "./../assets/Amil.jpg";
import om from "./../assets/Om.jpg";
import kataria from "./../assets/Kataria.png";
import varma from "./../assets/Varma.png";

function Home() {
  return (
    <div>
      {/* Section 1 */}
      <div
        className='relative text-white h-screen'
        style={{ backgroundImage: `url(${homebg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div
          className='absolute inset-0'
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1))',
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10">
          <h1
            className='font-extrabold pt-9 italic text-[280px] text-center bg-clip-text text-transparent'
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255, 0, 0, 0.3), rgba(255, 0, 0, 0.3))',
              WebkitTextStroke: '8px white',
            }}
          >
            Gym-Ping
          </h1>
          <h2
            className='font-extrabold italic text-[180px] text-center bg-clip-text text-transparent'
            style={{
              backgroundImage: 'linear-gradient(to right, #ffffff, rgba(0, 0, 0, 0.3))',
              WebkitTextStroke: '6px white',
            }}
          >
            Find! Fit! Thrive!
          </h2>
        </div>
      </div>

      {/* Section 2 */}
      <div className='bg-black h-[720px]'>
        <h1 className='text-white text-[68px] px-7 pt-[50px] font-extrabold'>
          Explore Our Exclusive Facilities to Elevate Your Fitness Journey
        </h1>
        <div className='flex justify-end gap-32 mr-10 px-7 pt-10'>
          {[
            { image: spoh, title: "Spotter", desc: "Your personal AI exercise guide.", link: "/spotter" },
            { image: loch, title: "Locator", desc: "Find the best gyms near you.", link: "/locator" },
            { image: dash, title: "Dashboard", desc: "Track your fitness journey.", link: "/dashboard" },
          ].map((facility, index) => (
            <div
              key={index}
              className='group relative h-[320px] w-[320px] rounded-xl text-white text-4xl flex rounded-xl bg-white overflow-hidden transform transition-all duration-300 hover:scale-105'
              style={{
                backgroundImage: `url(${facility.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className='absolute inset-0 bg-gradient-to-br from-black/70 to-transparent flex items-end p-4'>
                <h2 className='text-white text-2xl font-bold'>{facility.title}</h2>
              </div>

              <div
                className='absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300'
              ></div>

              <div className='absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 text-white transition-opacity duration-300'>
                <h2 className='text-3xl font-bold'>{facility.title}</h2>
                <p className='mt-2 text-lg'>{facility.desc}</p>
                <a
                  href={facility.link}
                  className='mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition'
                >
                  Explore
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3 */}
      <div className='bg-black h-[520px] pt-10 flex pl-8 gap-7 relative'>
        <div
          className='relative h-[320px] w-[320px] rounded-xl text-white text-4xl flex items-end bg-white'
          style={{
            backgroundImage: `url(${amil})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute bottom-2 left-2 text-xl font-bold">Amil Lal</div>
        </div>
        <div
          className='relative h-[320px] w-[320px] rounded-xl text-white text-4xl flex items-end bg-white'
          style={{
            backgroundImage: `url(${om})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute bottom-2 left-2 text-xl font-bold">Om M. Dashasahastra</div>
        </div>
        <div
          className='relative h-[320px] w-[320px] rounded-xl text-white text-4xl flex items-end bg-white'
          style={{
            backgroundImage: `url(${kataria})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute bottom-2 left-2 text-xl font-bold">Vansh Kataria</div>
        </div>
        <div
          className='relative h-[320px] w-[320px] rounded-xl text-white text-4xl flex items-end bg-white'
          style={{
            backgroundImage: `url(${varma})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute bottom-2 left-2 text-xl font-bold">Aditya P. Varma</div>
        </div>
        <h1 className='flex text-white text-[68px] px-7 pt-[50px] justify-end font-extrabold'>
          Meet The Team
        </h1>
      </div>


    </div>
  );
}

export default Home;
