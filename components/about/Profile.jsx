const Profile = ({ name, position, image }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        gap: "10px",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <img
          className="rounded-full"
          src="https://m.media-amazon.com/images/I/810XSuEz1vL.jpg"
          alt="User Profile Pictures"
          style={{ width: "250px", height: "250px" }}
        />
        <p className="font-semibold text-xl">{name}</p>
        <p>{position}</p>
      </div>
    </div>
  );
};

export default Profile;
