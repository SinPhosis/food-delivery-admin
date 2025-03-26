const ClientHeader = () => {
  return (
    <div className="w-full h-[68px] px-3 px-20 relative bg-black inline-flex justify-between items-center">
      <div className="inline-flex justify-start items-center gap-3 ">
        <img className="w-[46px] h-[37px]" src="Logo.svg" />
        <div className="self-stretch inline-flex flex-col justify-start items-start">
          <div className="justify-start">
            <span className="text-white text-xl font-semibold font-['Inter'] leading-7">
              Nom
            </span>
            <span className="text-[#ef4444] text-xl font-semibold font-['Inter'] leading-7">
              Nom
            </span>
          </div>
          <div className="text-center justify-start text-[#f4f4f5] text-xs font-normal font-['Inter'] leading-none">
            Swift delivery
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center gap-3">
        <div className="px-3 py-2 bg-background-bg-background rounded-full flex justify-start items-center gap-1 text-white">
          <div className="w-9 h-9 bg-white rounded-full inline-flex justify-center items-center gap-2">
            <div className="w-9 h-9 relative overflow-hidden">
              <img
                className="w-5 h-6 left-[7px] top-[5px] rounded-full absolute cursor-pointer"
                src="shopping-cart.svg"
              />
            </div>
          </div>
          <div className="px-3 py-2 bg-background-bg-background rounded-full flex justify-start items-center gap-1 text-white">
            <div className="w-9 h-9 bg-red-500 rounded-full inline-flex justify-center items-center gap-2">
              <div className="w-9 h-9 relative overflow-hidden">
                <img
                  className="w-5 h-6 left-[8px] top-[5px] rounded-full absolute cursor-pointer"
                  src="user.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientHeader;
