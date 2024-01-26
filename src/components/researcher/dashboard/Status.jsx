const Status = ({ bg, value, text, Icon, color }) => {
  return (
    <div className={`${bg} h-1/3 p-6 rounded-lg flex flex-col`}>
      <Icon className={`${color} w-7 h-7 mb-4`} />
      <p className="font-semibold text-xl">{value}</p>
      <p className="font-normal text-air-grey text-lg">{text}</p>
    </div>
  );
};

export default Status;
