import React from "react";
import ServiceDetails from "../public/ServiceDetails";

const UserServiceDetails = () => {
  return (
    <ServiceDetails servicesPathBase="/user/services" showBooking />
  );
};

export default UserServiceDetails;
