import { members } from "@/data/Members";
import Profile from "./Profile";

const About = () => {
  return (
    <div className="w-11/12 my-8">
      <div className="flex justify-between p-4">
        <div className="w-3/4">
          <p className="text-2xl font-semibold my-2 text-air-blue-200">
            WHAT IS OMEGA INTITIATIVE?
          </p>
          <p>
            Revolutionizing Air Quality in Inland Southern California In a
            groundbreaking move, the Center for Environmental Research and
            Technology (CE-CERT) at the Marlan and Rosemary Bourns College of
            Engineering is tackling the pressing issue of air pollution in
            Inland Southern California, thanks to a $2 million boost from the
            California Attorney General’s Office. This initiative springs from
            the fallout of the Volkswagen emissions scandal, aiming to right the
            environmental wrongs that have disproportionately harmed low-income
            Latino and Black communities living in the shadow of the region’s
            booming logistics industry. Our project, a cornerstone of the OMEGA
            Initiative, is on a mission to scrutinize the environmental toll of
            goods movement, in collaboration with UC Berkeley and the Coalition
            for Clean Air, and to pioneer solutions that clean the air we all
            breathe.
            <br /> <br />
            With an innovative blend of on-board emissions tracking, smart
            freight management, and grassroots air quality monitoring, we're not
            just studying the problem—we're fixing it. Led by CE-CERT director
            Matthew Barth, our team is dedicated to making a tangible
            difference. This isn't just research; it's a quest for cleaner air,
            healthier communities, and a sustainable future for Southern
            California’s heartland. Join us as we forge a path to environmental
            justice and innovation, one breath of fresh air at a time.
          </p>
        </div>
        <div className="w-1/2 flex justify-center">
          <div className="bg-gray-300 w-3/4 h-full rounded-lg" />
        </div>
      </div>
      <p className="text-2xl font-semibold my-2 text-air-blue-200">OUR TEAM</p>

      <div className="grid grid-cols-4 gap-4">
        {members.map(({ name, position, image }, index) => (
          <Profile key={index} name={name} position={position} image={image} />
        ))}
      </div>
    </div>
  );
};

export default About;
