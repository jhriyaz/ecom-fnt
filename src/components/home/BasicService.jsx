import { basicServices } from "@/staticData/home/home";
import Image from "next/image";

const BasicService = () => {
  return (
    <div className="basic-services main_container">
      {basicServices?.map((service) => (
        <div key={service?.id} className="info_item">
          <div className="icon">
            <Image src={service?.Icon} height={35} width={35} alt="car svg" />
          </div>
          <div className="text">
            <p>{service?.title}</p>
            <h3>{service?.status}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BasicService;
