import Image from 'next/image';
import React from 'react';

const RecrutingSection = () => {
  return (
    <div
      className="relative w-full h-auto min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/recrute.jpg')" }}
    >
      {/* Overlay qavat */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative flex flex-col gap-3 sm:gap-4 lg:gap-5 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 items-center justify-center">
        <h2 className="text-white text-[20px] sm:text-[22px] lg:text-[24px] font-semibold text-center">
          Recruiting
        </h2>
        <p className="text-[14px] sm:text-[16px] lg:text-[20px] text-white text-center max-w-2xl">
          Finding a job or hiring the right people is now faster and easier — with us.
        </p>

        {/* Cards Container */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 xl:gap-30 justify-center items-center w-full max-w-7xl">
          {/* Job Providers Card */}
          <div className="w-full max-w-[350px] sm:max-w-[380px] lg:w-[450px] h-auto bg-[#081A28] rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] shadow-[0px_4px_4px_0px_#00000040] flex flex-col items-center justify-center gap-3 sm:gap-4 py-6 sm:py-8 px-4 sm:px-6">
            <p className="text-[24px] sm:text-[28px] lg:text-[36px] font-bold text-white text-center leading-tight">
              Job Providers
            </p>
            <div className="w-full flex justify-center">
              <Image
                src={'/images/recrutelogo.png'}
                alt="Job Providers logo"
                width={250}
                height={180}
                className="w-[200px] h-[140px] sm:w-[250px] sm:h-[170px] lg:w-[321px] lg:h-[227px] object-contain"
              />
            </div>
            <p className="text-center text-[11px] sm:text-[12px] text-gray-300 px-2 leading-relaxed">
              Looking for that one game-changing hire? <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>They might already be here — searching for you.
            </p>
            <button className="w-[180px] sm:w-[200px] lg:w-[240px] h-[45px] sm:h-[50px] lg:h-[60px] rounded-[35px] sm:rounded-[40px] lg:rounded-[45px] border-2 bg-gradient-to-l from-[#3EFEA1] to-[#259860] border-green-400 flex items-center justify-center text-[14px] sm:text-[16px] font-semibold text-black hover:from-[#2FE091] hover:to-[#1F8050] transition-all duration-300 hover:scale-105">
              Job Providers
            </button>
          </div>

          {/* Job Seekers Card */}
          <div className="w-full max-w-[350px] sm:max-w-[380px] lg:w-[450px] h-auto bg-[#081A28] rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] shadow-[0px_4px_4px_0px_#00000040] flex flex-col items-center justify-center gap-3 sm:gap-4 py-6 sm:py-8 px-4 sm:px-6">
            <p className="text-[24px] sm:text-[28px] lg:text-[36px] font-bold text-white text-center leading-tight">
              Job Seekers
            </p>
            <div className="w-full flex justify-center">
              <Image
                src={'/images/relogo.png'}
                alt="Job Seekers logo"
                width={250}
                height={180}
                className="w-[200px] h-[140px] sm:w-[250px] sm:h-[170px] lg:w-[321px] lg:h-[227px] object-contain"
              />
            </div>
            <p className="text-center text-[11px] sm:text-[12px] text-gray-300 px-2 leading-relaxed">
              Ready to take the next step in your career? <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Your dream job might be just one click away.
            </p>
            <button className="w-[180px] sm:w-[200px] lg:w-[240px] h-[45px] sm:h-[50px] lg:h-[60px] rounded-[35px] sm:rounded-[40px] lg:rounded-[45px] border-2 bg-gradient-to-l from-[#3EFEA1] to-[#259860] border-green-400 flex items-center justify-center text-[14px] sm:text-[16px] font-semibold text-black hover:from-[#2FE091] hover:to-[#1F8050] transition-all duration-300 hover:scale-105">
              Job Seekers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecrutingSection;