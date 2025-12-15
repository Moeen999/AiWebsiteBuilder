import { Check } from "lucide-react";
import { appPlans } from "../assets/assets";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <>
      <div className="flex flex-col px-4 md:px-16 lg:px-24 xl:px-32 ">
        <div className="py-10 min-h-[80vh]">
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-2xl font-medium text-white">
              Choose Your Plan
            </h1>
            <span className="text-sm text-[#99A1AF]">
              Start for free and scale up as you grow. Find the perfect plan for
              your content creation needs.
            </span>
          </div>

          {/* price cards */}
          <div className=" flex flex-wrap items-center justify-center gap-4">
            {appPlans.map((plan) => (
              <div className="max-w-[384px] w-80 h-91 border border-indigo-300 rounded-lg p-6 flex flex-col gap-2 bg-black">
                <h1 className="text-white font-bold">{plan.name}</h1>
                <h1 className="text-white font-bold text-4xl">
                  {plan.price}/
                  <span className="text-sm font-light">
                    {plan.credits} credits
                  </span>
                </h1>
                <span className="text-[16px] text-[#D1D5DC]">
                  Start Now, scale up as you grow.
                </span>
                {/* features */}
                <div className="flex flex-col gap-1 mt-3">
                  {plan?.features?.map((feature) => (
                    <div key={feature} className="flex gap-3">
                      <Check color="#A3B3FF" />
                      <p className="text-[#99A1AF]">{feature}</p>
                    </div>
                  ))}
                </div>
                <Link to="/">
                  <button className="w-68 text-white text-sm py-2 px-4 bg-[#615FFF] rounded-md mt-3">
                    Buy Now
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <p className="flex justify-center items-center text-sm text-[#FFFFFF99] ">
          Project <span className="text-white"> Creation / Revision </span> consume <span className="text-white"> 5 credits </span> . You can purchase more
          credits to create more projects.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
