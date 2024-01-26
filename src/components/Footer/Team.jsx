import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faInstagram,
  faTwitterSquare,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import UserBita from "/src/images/Bita.jpg";
import UserOli from "/src/images/Oli.jpg";
import UserNorbert from "/src/images/Norbert.jpg";
// import teamMembers2 from "./../../data/team.json";

const teamMembers = [
  {
    name: "Oliver",
    position: "Backend Developer",
    image: UserOli,
    socialLinks: {
      twitter: "http://www.twitter.com/oliver",
      facebook: "http://www.facebook.com/oliver",
      instagram: "http://www.instagram.com/oliver",
      gmail: "mailto:oliver@example.com",
    },
  },
  {
    name: "Bita Sadeghi",
    position: "Frontend Developer",
    image: UserBita,
    socialLinks: {
      twitter: "http://www.twitter.com/bitasadeghi",
      facebook: "http://www.facebook.com/bitasadeghi",
      instagram: "http://www.instagram.com/bitasadeghi",
      gmail: "mailto:bita@example.com",
    },
  },

  {
    name: "Norbert Fridrich",
    position: "Backend Developer",
    image: UserNorbert,
    socialLinks: {
      twitter: "http://www.twitter.com/norbert",
      facebook: "http://www.facebook.com/norbert",
      instagram: "http://www.instagram.com/norbert",
      gmail: "mailto:norbert@example.com",
    },
  },
];

function Team() {
  return (
    <div className="team-container">
      <div className="team-inner-container">
        <h2>Meet Our Expert Team</h2>
        <p className="text-blk section-subhead-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card-container">
              <div className="team-card">
                <div className="img-wrapper">
                  <img
                    className="team-img"
                    src={member.image}
                    alt={member.name}
                  />
                </div>
                <div className="team-card-overlay">
                  <p className="text-blk name">{member.name}</p>
                  <p className="text-blk position">{member.position}</p>
                </div>
                <div className="social-media-links">
                  {Object.entries(member.socialLinks).map(([key, value]) => (
                    <a
                      key={key}
                      href={value}
                      target="_blank"
                      style={{ marginRight: "10px" }}
                    >
                      {key === "twitter" && (
                        <FontAwesomeIcon icon={faTwitterSquare} />
                      )}
                      {key === "facebook" && (
                        <FontAwesomeIcon icon={faFacebook} />
                      )}
                      {key === "instagram" && (
                        <FontAwesomeIcon icon={faInstagram} />
                      )}
                      {key === "gmail" && <FontAwesomeIcon icon={faEnvelope} />}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;
