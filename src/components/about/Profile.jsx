const Profile = ({ name, position, image }) => {
  return (
    <div className="justify-start items-start inline-flex">
      <div className="inline-flex flex-col justify-start gap-3 flex-start items-center ">
        <img
          className="rounded-full w-[250px] h-[250px]"
          src="https://m.media-amazon.com/images/I/810XSuEz1vL.jpg"
          alt="User Profile Pictures"
        />
        <p className="font-semibold text-xl">{name}</p>
        <p>{position}</p>
      </div>
    </div>
  );
};

export default Profile;
