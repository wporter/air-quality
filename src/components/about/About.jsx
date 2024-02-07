import { members } from "@/data/Members";
import Waves from "../../../public/svg/AboutWaves.svg";
import Image from "next/image";
import Profile from "./Profile";

const About = () => {
  return (
    <div className="relative flex flex-col items-center justify-between">
      <Image
        src={Waves}
        className="absolute top-0 left-0 -z-10 w-screen h-screen object-cover"
        alt="About Page Waves"
      />

      <div className="w-11/12 my-8">
        <div className="flex justify-between p-4">
          <div className="w-3/4">
            <p className="text-2xl font-semibold my-2 text-air-blue-200">
              WHAT IS OMEGA INTITIATIVE?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Metus
              aliquam eleifend mi in nulla posuere sollicitudin. Laoreet id
              donec ultrices tincidunt arcu non sodales neque. Enim diam
              vulputate ut pharetra sit. Vitae ultricies leo integer malesuada
              nunc vel risus commodo viverra. Dui accumsan sit amet nulla
              facilisi morbi. Consectetur purus ut faucibus pulvinar elementum.
              Viverra ipsum nunc aliquet bibendum enim. Quam vulputate dignissim
              suspendisse in est ante in nibh mauris. Eu volutpat odio facilisis
              mauris sit. Eget nunc scelerisque viverra mauris in aliquam. Neque
              volutpat ac tincidunt vitae semper quis lectus. Tempus quam
              pellentesque nec nam aliquam sem et tortor consequat. Sit amet
              cursus sit amet dictum. Sit amet cursus sit amet dictum sit amet
              justo. Viverra suspendisse potenti nullam ac tortor. Aenean
              euismod elementum nisi quis.
              <br /> <br />
              Egestas pretium aenean pharetra magna ac placerat vestibulum. Id
              volutpat lacus laoreet non curabitur gravida arcu ac. Sem
              fringilla ut morbi tincidunt augue interdum velit euismod in.
              Turpis in eu mi bibendum neque egestas congue quisque egestas.
              Massa eget egestas purus viverra accumsan in. Lacus luctus
              accumsan tortor posuere ac ut consequat semper. Tempor nec feugiat
              nisl pretium fusce id velit ut tortor. Bibendum ut tristique et
              egestas quis ipsum suspendisse. Quis enim lobortis scelerisque
              fermentum dui. Gravida arcu ac tortor dignissim convallis aenean
              et. Eget felis eget nunc lobortis mattis aliquam faucibus purus.
              Et sollicitudin ac orci phasellus egestas tellus rutrum tellus. Et
              molestie ac feugiat sed lectus vestibulum mattis ullamcorper.
            </p>
          </div>
          <div className="w-1/2 flex justify-center">
            <div className="bg-gray-300 w-3/4 h-full rounded-lg" />
          </div>
        </div>
        <p className="text-2xl font-semibold my-2 text-air-blue-200">
          OUR TEAM
        </p>

        <div className="grid grid-cols-4 gap-4">
          {members.map(({ name, position, image }, index) => (
            <Profile
              key={index}
              name={name}
              position={position}
              image={image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
