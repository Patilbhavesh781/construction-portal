import React, { useEffect, useState } from "react";
import ServiceCard from "../../components/cards/ServiceCard";
import Loader from "../../components/common/Loader";
import ServiceService from "../../services/service.service";

const UserServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const data = await ServiceService.getAllServices();
        setServices(data || []);
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
            detailsPathBase="/user/services"
            showAction
          />
        ))}
      </div>
    </div>
  );
};

export default UserServices;
