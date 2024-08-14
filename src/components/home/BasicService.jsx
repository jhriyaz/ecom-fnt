import { basicServices } from "@/staticData/home/home";

const BasicService = () => {
  return (
    <div className="site_info_policy">
      {basicServices?.map((service) => (
        <div key={service?.id} className="info_item">
          <div className="icon">{service?.Icon}</div>
          <div className="text">
            <span>{service?.title}</span>
            <span>{service?.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BasicService;
