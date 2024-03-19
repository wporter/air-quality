import { members } from "@/data/Members";
import Waves from "@/public/svg/AboutWaves.svg";
import Image from "next/image";
import Profile from "./Profile";
import Footer from "../Footer";
import Navigation from "../Navigation";

const About = () => {
  return (
    <div className="relative flex flex-col items-center justify-between">
      <Navigation />
      <Image
        src={Waves}
        className="absolute top-0 left-0 -z-10 object-cover w-screen"
        alt="About Page Waves"
      />

      <div className="w-10/12 my-12">
        <div className="flex justify-between p-4">
          <div className="w-3/4">
            <p className="text-3xl md:text-4xl lg:text-5xl font-semibold my-2 text-air-blue-200">
              WHAT IS OMEGA INITIATIVE?
            </p>
            <p className=" text-xl mb-5 my-5">
              Revolutionizing Air Quality in Inland Southern California In a
              groundbreaking move, the Center for Environmental Research and
              Technology (CE-CERT) at the Marlan and Rosemary Bourns College of
              Engineering is tackling the pressing issue of air pollution in
              Inland Southern California, thanks to a $2 million boost from the
              California Attorney General&apos;s Office. This initiative springs
              from the fallout of the Volkswagen emissions scandal, aiming to
              right the environmental wrongs that have disproportionately harmed
              low-income Latino and Black communities living in the shadow of
              the region&apos;s booming logistics industry.
              <br /> <br />
              This initiative springs from the fallout of the Volkswagen
              emissions scandal, aiming to right the environmental wrongs that
              have disproportionately harmed low-income Latino and Black
              communities living in the shadow of the region&apos;s booming
              logistics industry. Our project, a cornerstone of the OMEGA
              Initiative, is on a mission to scrutinize the environmental toll
              of goods movement, in collaboration with UC Berkeley and the
              Coalition for Clean Air, and to pioneer solutions that clean the
              air we all breathe.
              <br /> <br />
              With an innovative blend of on-board emissions tracking, smart
              freight management, and grassroots air quality monitoring,
              we&apos;re not just studying the problem—we&apos;re fixing it. Led
              by CE-CERT director Matthew Barth, our team is dedicated to making
              a tangible difference. This isn&apos;t just research; it&apos;s a
              quest for cleaner air, healthier communities, and a sustainable
              future for Southern California&apos;s heartland. Join us as we
              forge a path to environmental justice and innovation, one breath
              of fresh air at a time.
            </p>
          </div>

          {/* place holder for team photo */}
          <div className="md:w-1/3 flex justify-center md:justify-end">
            <div className="bg-gray-300 w-full md:w-full lg:w-4/5 xl:w-4/5 h-64 md:h-auto my-12 rounded-lg shadow"></div>
          </div>
        </div>

        <p className="text-4xl font-semibold mx-4 mb-5 mt-12 text-air-blue-200">
          OUR TEAM
        </p>

        <div className="grid grid-cols-5 gap-4 my-2">
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

      <Footer />
    </div>
  );
};

export default About;
