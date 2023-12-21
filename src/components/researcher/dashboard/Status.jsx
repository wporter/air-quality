const Status = ({ bg, value, text, Icon, color }) => {
  return (
    <div className={`h-1/3 ${bg}`}>
      <Icon className={`${color}`} />
      <p>{value}</p>
      <p>{text}</p>
    </div>
  );
};

export default Status;
