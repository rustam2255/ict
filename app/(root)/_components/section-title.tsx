interface SectionProps {
  title: string;
}

const SectionTitle = ({ title }: SectionProps) => {
  return (
    <div className="flex items-center justify-center  mt-6 sm:mt-8 md:mt-10 px-2 sm:px-4 md:px-6 w-full max-w-7xl mx-auto">
      {/* Left line */}
      <div className="flex-1 h-[1px] bg-[rgba(62,189,128,1)]"></div>

      {/* Title */}
      <div className="">
        <p className="inline-block border border-[rgba(62,189,128,1)]  text-sm sm:text-base md:text-lg lg:text-[20px] font-semibold whitespace-nowrap text-center lg:px-20  py-3 rounded-[45px]">
          {title}
        </p>
      </div>

      {/* Right line */}
      <div className="flex-1 h-[1px] bg-[rgba(62,189,128,1)]"></div>
    </div>
  );
};

export default SectionTitle;
