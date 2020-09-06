import React from 'react';
import './resume.scss';

import { IgabinetEntryDescription } from './IgabinetEntryDescription';
import { GdprConsent } from './GdprConsent';

export const Resume = () => {
  return (
    <div className="resume">
      <div className="resume__canvas">
        <div className="resume__container">
          <div className="resume__header">
            <div>
              <h1 className="resume__name">Filip Rec</h1>
              <h2 className="resume__specialty">Software engineer</h2>
            </div>
            <div className="resume__contact">
              <div className="resume__contact-entry">
                +48 514 938 339
                <i className="fa fa-fw fa-phone"></i>
              </div>
              <div className="resume__contact-entry">
                filiprec@outlook.com
                <i className="fa fa-fw fa-envelope"></i>
              </div>
              <div className="resume__contact-entry">
                Szczecin, Poland
                <i className="fa fa-fw fa-map-marker-alt"></i>
              </div>
              <div className="resume__contact-entry">
                https://frec.pl
                <i className="fa fa-fw fa-globe"></i>
              </div>
            </div>
          </div>

          <div className="resume__sidebar">
            <div className="resume__about resume__block">
              A curious developer with hands-on experience with the full stack and life cycle of projects in the
              health care and online booking industry.
            </div>

            <div className="resume__skills resume__block">
              <h2 className="heading--accent">Technologies</h2>
              <div className="resume__primary-skills resume__entry">
                <div className="resume__skills-description">Experienced with:</div>
                <div className="resume__skills-container">
                  <div className="resume__skill">JavaScript</div>
                  <div className="resume__skill">PHP</div>
                  <div className="resume__skill">React</div>
                  <div className="resume__skill">CSS</div>
                  <div className="resume__skill">SQL</div>
                  <div className="resume__skill">Webpack</div>
                </div>
              </div>

              <div className="resume__secondary-skills resume__entry">
                <div className="resume__skills-description">Familiar with:</div>
                <div className="resume__skills-container">
                  <div className="resume__skill">Node.js</div>
                  <div className="resume__skill">Java</div>
                  <div className="resume__skill">Nginx</div>
                  <div className="resume__skill">Redis</div>
                  <div className="resume__skill">Docker</div>
                  <div className="resume__skill">Ansible</div>
                </div>
              </div>

              <div className="resume__tertiary-skills resume__entry">
                <div className="resume__skills-description">Played with:</div>
                <div className="resume__skills-container">
                  <div className="resume__skill">TypeScript</div>
                  <div className="resume__skill">C++</div>
                  <div className="resume__skill">AWS</div>
                  <div className="resume__skill">RabbitMQ</div>
                  <div className="resume__skill">MongoDB</div>
                </div>
              </div>
            </div>

            <div className="resume__hobby resume__block">
              <h2 className="heading--accent">Interests</h2>
              <div>
                Programming, tinkering, microcontrollers and electronics, music making, space and science fiction
              </div>
            </div>

            <div className="resume__languages resume__block">
              <h2 className="heading--accent">Languages</h2>
              <div className="resume__language">
                <div className="resume__entry-name">English</div>
                <div className="resume__entry-description">Full professional proficiency</div>
              </div>
              <div className="resume__language">
                <div className="resume__entry-name">Polish</div>
                <div className="resume__entry-description">Native</div>
              </div>
              {/*<div className="resume__language">*/}
              {/*  <div className="resume__entry-name">German</div>*/}
              {/*  <div className="resume__entry-description">Elementary proficiency</div>*/}
              {/*</div>*/}
            </div>
          </div>

          <div className="resume__content">
            <div className="resume__experience resume__block">
              <h2 className="heading--accent">Experience</h2>
              <div className="resume__entry">
                <div className="resume__entry-what-when">
                  <div>
                    <div className="resume__entry-name">Software engineer</div>
                    <div className="resume__entry-description">Platforma iGabinet</div>
                  </div>
                  <div className="resume__entry-date resume__entry-description">March 2016 - Present</div>
                </div>
                <div className="resume__entry-summary">
                  {/* PC decided it's too much text to allow swift typing in this file */}
                  <IgabinetEntryDescription />
                </div>
              </div>

              {/*<div className="resume__entry">*/}
              {/*  <div className="resume__entry-what-when">*/}
              {/*    <div>*/}
              {/*      <div className="resume__entry-name">Internship</div>*/}
              {/*      <div className="resume__entry-description">CLOVER POLAND</div>*/}
              {/*    </div>*/}
              {/*    <div className="resume__entry-date resume__entry-description">July 2015 - August 2015</div>*/}
              {/*  </div>*/}
              {/*  <div className="resume__entry-summary">*/}
              {/*    Developed a CRM system in Python and Django.*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
            <div className="resume__education resume__block">
              <h2 className="heading--accent">Education</h2>
              <div className="resume__entry">
                <div className="resume__entry-what-when">
                  <div>
                    <div className="resume__entry-name">West Pomeranian University of Technology</div>
                    <div className="resume__entry-description">Faculty of Computer Science and Information Technology,
                      Production Engineering and Management
                    </div>
                  </div>
                  <div className="resume__entry-date resume__entry-description">2012 - 2016</div>
                </div>
                <div className="resume__entry-summary">
                  Thesis: <i>Hardware and software synthesis of a stringed instruments tuning system</i>, GPA 4.5
                  <div>
                    Used Python, Raspberry Pi, a sound card and a servo motor to build an automated guitar tuner.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <GdprConsent />
      </div>
    </div>
  );
};
