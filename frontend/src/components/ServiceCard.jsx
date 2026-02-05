const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={service.image}
        alt={service.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
        <p className="text-gray-600 text-sm mb-4">
          {service.description}
        </p>

        <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-orange-100 text-orange-600">
          {service.category}
        </span>
      </div>
    </div>
  );
};

export default ServiceCard;
