"use client";

import { useState } from "react";
import Image from "next/image";
import { X, GraduationCap, Briefcase, Award, ChevronRight } from "lucide-react";

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const coreTeam = [
    {
      name: "Oluyemi Adeosun, PhD, DTM",
      role: "Pioneer & Visionary Leader",
      image: "/team/oluyemi.jpg",
      shortBio: "Founder and Visionary Leader of HR Mentorship, top-performing HR Executive, and Economist with over 24 years of experience.",
      bioParagraphs: [
        "Dr Oluyemi Adeosun is a top-performing and accomplished Human Resource Executive, Economist, and Researcher with over 24 years of multi-industry experience spanning Power, Oil & Gas, Telecommunications, Fintech, Broadcasting, ICT, Real Estate, Advertising, Academia, Consulting, and Volunteer Leadership.",
        "He is the Founder and Visionary Leader of HR Mentorship, a thriving community of over 7,000 HR professionals across Nigeria and beyond—dedicated to advancing human resource practice through mentorship, collaboration, and knowledge sharing.",
        <span key="yt-link">Dr Adeosun also runs a fast-growing YouTube channel (<a href="https://www.youtube.com/@OluyemiAdeosun" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">Oluyemi Adeosun</a>) with more than 7,450 followers, focusing on practical HR domain knowledge and thought leadership. He is a Senior Research Fellow (2024 – 2026) at the Fate Institute, and a Certified Career Coach recognised for inspiring HR excellence across Africa and globally.</span>
      ],
      sections: [
        {
          title: "Current Engagement",
          items: [
            "Chief Economist, BusinessDay Media",
            "Faculty Member, Reputable Business Schools and Training Institute",
            "Independent HR Consultant and Trainer"
          ]
        },
        {
          title: "Previous Leadership Roles",
          items: [
            "Research Fellow, Lagos Business School",
            "Head, Human Resources, Eterna PLC",
            "Group Head, Global Accelerex Holdings",
            "Head, Employee Relations, Ikeja Electric",
            "Head, HR & Administration, CourierPlus Limited",
            "People Manager, RusselSmith Integrated Oil Services",
            "Head, HR, Technology Distributions Limited",
            "Head, Shared Services, Fieldco Limited",
            "Head, HR, Emotion Advertising",
            "EA to ED-HR, Globacom Ltd.",
            "HR Consultant, Generis Solutions Ltd"
          ]
        },
        {
          title: "Research & Professional Contributions",
          items: [
            "Author of 54+ peer-reviewed publications in reputable international journals – ResearchGate Profile",
            "Member, Scientific Board, African Network on the Economics of Learning, Innovation & Competence Building Systems (AfricaLics)",
            "Member, GLOBELICS (Global Network for Economics of Learning and Competence Building Systems)",
            "Full Member, Nigerian Economic Society (FMNES)",
            "Member, Africa Evidence Network",
            "Member, International Union for the Scientific Study of Population & UAPS"
          ]
        },
        {
          title: "Academic Background",
          items: [
            "PhD (Economics) – University of Lagos",
            "MBA – Obafemi Awolowo University, Ile-Ife",
            "MSc (Economics) – University of Lagos",
            "BSc (Economics) – University of Ilorin, Nigeria",
            "Alumnus, Lagos Business School (HR Academy 1)"
          ]
        },
        {
          title: "Professional Qualifications & Memberships",
          items: [
            "MCIPM – Member, Chartered Institute of Personnel Management of Nigeria; Elected Governing Council Member",
            "SPHRi – Senior Professional in Human Resources International",
            "GPHR – Global Professional in Human Resources",
            "Distinguished Toastmaster (DTM) – Toastmasters International"
          ]
        }
      ]
    },
    {
      name: "Irene Ewheme Obagwu",
      role: "Director of Brand & Creativity",
      image: "/team/irene.jpg",
      shortBio: "Dynamic HR professional, people strategist, and creative brand mind bridging organizational psychology and talent development.",
      bioParagraphs: [
        "Irene Ewheme Obagwu is a dynamic Human Resources professional, people strategist, and creative brand mind whose career bridges the worlds of organisational psychology, talent development, and creative communication. With a strong foundation in personnel psychology and broad experience across Telecommunications, Oil & Gas, Technology, Consulting, and Asset Management, she combines analytical precision with human-centred innovation.",
        "From corporate operations to learning design, Irene brings a rare blend of insight and imagination to every role she undertakes. She is passionate about helping people and workplaces thrive, earning a reputation as a trusted HR partner who transforms policies into culture and teams into thriving ecosystems. Her expertise spans recruitment, employee engagement, leadership development, and organisational transformation—all guided by her belief that business growth begins with people growth.",
        "As Director of Brand & Creativity at HR Mentorship, Irene leads the community’s storytelling, branding, and visual identity, crafting narratives and designs that inspire thousands of HR professionals. Her ability to translate strategy into creative expression makes her a vital bridge between the community’s vision and its voice.",
        "Beyond her corporate and community roles, Irene is an active volunteer and mentor, facilitating learning sessions and driving initiatives that strengthen the HR profession’s collective voice. Whether designing a virtual onboarding journey, mentoring emerging professionals, or sparking conversations about workplace wellbeing, she leads with empathy, authenticity, and purpose.",
        "Her personal philosophy is simple yet powerful: Lead with heart, build with intention, and leave every space better than you met it."
      ],
      sections: [
        {
          title: "Portfolio with HR Mentorship",
          items: [
            "Brand & Creative Strategy: Leading the conceptualisation and design of HR Mentorship’s brand identity.",
            "Event Branding & Campaigns: Designing and managing the visual identity for HR Mentorship’s key events.",
            "Creative Collaboration: Partnering with other directors to translate strategic ideas into digital experiences.",
            "Governance & Ethics Design: Designed the official HR Mentorship Code of Conduct.",
            "Mentorship & Volunteerism: Supporting learning initiatives and mentoring creatives and HR professionals."
          ]
        },
        {
          title: "Academic Background",
          items: [
            "Master of Science (M.Sc.) – Personnel Psychology - University of Ibadan",
            "Bachelor of Education (B.Ed.) – Guidance and Counselling - University of Ibadan"
          ]
        },
        {
          title: "Professional Qualifications & Memberships",
          items: [
            "ACIPM – Associate Member, Chartered Institute of Personnel Management of Nigeria",
            "Certificate in Diversity, Equity and Inclusion in the Workplace – USF Corporate Training",
            "Associate Member – Institute of Strategic Management, Nigeria"
          ]
        }
      ]
    },
    {
      name: "Deborah Dumbiri",
      role: "Director of Finance and Welfare",
      image: "/team/deborah.jpg",
      shortBio: "Seasoned HR professional with over a decade of experience driving people strategies and cultural transformation.",
      bioParagraphs: [
        "Deborah Dumbiri is a seasoned Human Resources professional with over a decade of progressive experience driving people strategies, cultural transformation, and organisational growth across diverse sectors. She currently serves as the Head of People and Culture at Gatimo Limited, where she leads the full spectrum of HR functions.",
        "Deborah’s academic grounding, combined with extensive field experience, enables her to design and implement people-centred policies that enhance both employee experience and business performance.",
        "As Director of Welfare at HR Mentorship, Deborah oversees member engagement, well-being initiatives, and support systems that foster inclusion, collaboration, and professional growth among HR practitioners and mentees. Her empathetic leadership and people-first approach have made her a trusted pillar of support within the community.",
        "Beyond her professional and community roles, Deborah actively contributes to HR thought leadership and social impact initiatives, embodying her belief that workplaces thrive when people are valued, supported, and inspired. She believes that true HR leadership begins with empathy and ends with empowerment."
      ],
      sections: [
        {
          title: "Portfolio with HR Mentorship",
          items: [
            "Welfare and Well-being: Overseeing the welfare framework of HR Mentorship.",
            "Member Support Systems: Designing and implementing welfare structures.",
            "Community Engagement: Driving initiatives that foster collaboration and emotional well-being.",
            "Events and Outreach: Coordinating welfare and hospitality arrangements during HR Mentorship events.",
            "Mentorship and Guidance: Offering support and guidance to HR professionals and mentees.",
            "Cross-functional Collaboration: Working closely with other directors to align welfare initiatives."
          ]
        },
        {
          title: "Academic Background",
          items: [
            "Master’s Degree – Business Management, University of Fort Hare",
            "Bachelor’s Degree – Economics and Business Management, University of Fort Hare"
          ]
        },
        {
          title: "Professional Qualifications & Memberships",
          items: [
            "ACIPM – Associate Member, Chartered Institute of Personnel Management of Nigeria",
            "ANITD – Associate Member, Nigeria Institute of Training and Development"
          ]
        }
      ]
    },
    {
      name: "Adenrele Amosu",
      role: "Director of People Engagement & Collaboration",
      image: "/team/adenrele.jpg",
      shortBio: "Dynamic HR leader with over 15 years of cross-sector experience spanning Telecommunications, Oil & Gas, and Fintech.",
      bioParagraphs: [
        "Adenrele Amosu is a dynamic Human Resources leader with over 15 years of cross-sector experience spanning Telecommunications, Oil & Gas, Financial Services, Fintech, Logistics, and Tech Mobility. As a founding member of HR Mentorship, Adenrele has played a key role in shaping the community’s collaborative culture from inception.",
        "In his current role as Director of People Engagement & Collaboration, he drives initiatives that strengthen connection, inclusivity, and active participation across the network’s multiple groups and regional chapters. Adenrele fosters meaningful engagement through intentional communication, partnerships, and interactive sessions.",
        "He currently heads the People & Culture function at a fast-scaling Debt Asset Purchasing firm preparing for Series A fundraising. A regular voice at HR conferences and leadership summits, Adenrele continues to influence the future of work through his strategic thinking, mentorship, and authentic energy."
      ],
      sections: [
        {
          title: "Portfolio with HR Mentorship",
          items: [
            "Learning Series Leadership: Overseeing HR Mentorship’s flagship Learning Series.",
            "Knowledge Development: Designing and implementing learning frameworks.",
            "Facilitation & Moderation: Serving as lead facilitator for webinars and panel discussions.",
            "Curriculum Design: Developing structured learning content and knowledge toolkits.",
            "Mentorship Engagement: Providing career guidance to emerging HR professionals.",
            "Strategic Collaboration: Working with other directors to align learning and digital initiatives."
          ]
        },
        {
          title: "Academic Background",
          items: [
            "MBA (In View) – Human Resource Management, Miva Open University, Nigeria",
            "Bachelor of Arts (BA) – English, University of Lagos",
            "Diploma – Human Resource Management",
            "Diploma in Law - University of Lagos"
          ]
        },
        {
          title: "Professional Qualifications & Memberships",
          items: [
            "ACIPM – Associate Member, Chartered Institute of Personnel Management of Nigeria",
            "Ex-Officio 2; Oshodi/Isolo- Amuwo Odofin Chapter of CIPM, Lagos Branch"
          ]
        }
      ]
    },
    {
      name: "Omobolajoko Sowemimo",
      role: "Projects & Operations Director",
      image: "/team/omobolajoko.jpg",
      shortBio: "HR and Culture Leader experienced in building people systems and driving organizational performance.",
      bioParagraphs: [
        "Omobolajoko Sowemimo is a Human Resources and Culture Leader with extensive experience in building people systems, driving organisational performance, and shaping workplace cultures that enable business growth. She currently serves as the Human Resources Manager at Trino Studios and Trino Motion Pictures.",
        "Omobolajoko is also the Founder of Olive Waters Consulting and the Creator and Lead Curator of The Culture Room. Anchored on her belief that 'Culture runs deep — it’s in every decision, every leader, and every outcome,' she is committed to building workplaces that thrive on Culture, Clarity, and Capacity.",
        "Her work reflects a global perspective grounded in the African context — demonstrating that when people grow, organisations evolve, and when organisations evolve, societies transform."
      ],
      sections: [
        {
          title: "Portfolio with HR Mentorship",
          items: [
            "Projects & Events Oversight: Leads and oversees all major HR Mentorship projects and events.",
            "Operational Leadership: Supervises planning committees and monitors project logistics.",
            "Community Coordination: Facilitates webinars and supports mentorship activities.",
            "Administrative Management: Manages the official HR Mentorship Gmail account and database.",
            "Communications Support: Coordinates the birthday-flyer process.",
            "Reporting & Guidance: Provides operational updates to the Convener."
          ]
        },
        {
          title: "Academic Background",
          items: [
            "MBA (In View) – Human Resource Management, Miva Open University, Nigeria",
            "Master’s Degree – Diplomacy and Strategic Studies, University of Lagos",
            "M.Sc. – International Human Resource Management, Rome Business School",
            "B.Sc. – Industrial Relations and Personnel Management, Lagos State University"
          ]
        },
        {
          title: "Professional Qualifications & Memberships",
          items: [
            "ACIPM – Associate Member, Chartered Institute of Personnel Management of Nigeria"
          ]
        }
      ]
    },
    {
      name: "Abimbola Victoria Akindiilete",
      role: "Director of Web and ICT",
      image: "/team/abimbola.jpg",
      shortBio: "Strategic HR leader with over 13 years experience, overseeing digital strategy and technology-driven communication systems.",
      bioParagraphs: [
        "Abimbola Victoria Akindiilete is a strategic Human Resources leader with over 13 years of progressive experience spanning Legal Practice, Oil & Gas, Energy & Renewables, Marine Operations, and Consulting. She currently serves as the Head of HR & Admin Management at Wole Olanipekun & Co.",
        "As Director of Web and ICT at HR Mentorship, Abimbola oversees the community’s digital strategy, website development, and technology-driven communication systems that connect and empower thousands of HR professionals. Previously, she served as the Director of Counselling and Mentoring.",
        "Her leadership style blends empathy, structure, and innovation. Abimbola’s thought leadership and professional journey have earned public recognition, including a feature in The Guardian Newspaper."
      ],
      sections: [
        {
          title: "Portfolio with HR Mentorship",
          items: [
            "Digital Infrastructure: Leading the design and content coordination of HR Mentorship’s website.",
            "Technology and Innovation: Overseeing digital systems and ICT tools.",
            "Community Engagement: Supporting the coordination of community activities through digital platforms.",
            "Facilitation & Training: Regularly facilitating webinars and virtual learning sessions.",
            "Mentorship Support: Guiding up-and-coming HR professionals.",
            "HR Mentorship Socials: Providing strategic oversight for online events.",
            "Quality & Consistency Oversight: Ensuring brand integrity across digital touchpoints."
          ]
        },
        {
          title: "Academic Background",
          items: [
            "Master of Arts (MA) – English Language, University of Ibadan",
            "Bachelor of Arts (Education) – English Language, Adekunle Ajasin University"
          ]
        },
        {
          title: "Professional Qualifications & Memberships",
          items: [
            "SPHRi – Senior Professional in Human Resources – International (HRCI)",
            "ACIPM – Associate Member, Chartered Institute of Personnel Management of Nigeria",
            "FIMC/CMC – Fellow & Certified Management Consultant, ICMCI",
            "HRPL – Licensed HR Practitioner",
            "Member, Institute of Management Consultants – Nigeria",
            "Member, Association of Law Firm Administrators, Nigeria (ALAN)"
          ]
        }
      ]
    },
    {
      name: "Ajoke Oyedele-Omotayo",
      role: "Director of Counselling and Support",
      image: "/team/ajoke.jpg",
      shortBio: "Executive People & Business Strategist with over 25 years of progressive corporate leadership experience.",
      bioParagraphs: [
        "Ajoke Oyedele-Omotayo is an accomplished Executive People & Business Strategist with over 25 years of progressive corporate leadership experience driving profitability, performance, and transformation across multiple industries. Her professional foundation began with a decade in Commercial and Maritime Logistics.",
        "Ajoke is highly skilled in designing and executing high-impact people strategies that drive business alignment, workforce agility, and long-term growth. Her expertise spans organisational development, performance management, leadership transformation, and culture redesign.",
        "Beyond the boardroom, Ajoke is a dedicated mentor and facilitator, actively supporting professionals in career development, leadership growth, and financial literacy through practical education on leveraging insurance and investment products for generational wealth building."
      ],
      sections: [
        {
          title: "Portfolio with HR Mentorship",
          items: [
            "Strategic Advisory: Providing strategic guidance on business alignment.",
            "Governance & Policy Development: Supporting the development of policies and frameworks.",
            "Mentorship & Leadership Development: Facilitating sessions and mentoring members.",
            "Community Engagement: Promoting professional excellence and collaboration.",
            "Capacity Building: Driving initiatives that enhance professional competence."
          ]
        },
        {
          title: "Academic Background",
          items: [
            "Women Leaders Development Programme – Lagos Business School",
            "M.Sc. – International Human Resource Management, Rome Business School",
            "Advanced Diploma – Human Resources Management, University of Lagos",
            "HND – Mass Communication, Lagos State University of Science and Technology"
          ]
        },
        {
          title: "Professional Qualifications & Memberships",
          items: [
            "SPHRi – Senior Professional in Human Resources – International (HRCI)",
            "SAP Certified Associate – Implementation Consultant, SAP SuccessFactors"
          ]
        }
      ]
    },
    {
      name: "Titilope Kolade-Iyiola",
      role: "Director of Publicity",
      image: "/team/titilope.jpg",
      shortBio: "Dynamic HR professional with over a decade of experience in HR operations, talent acquisition, and employee relations.",
      bioParagraphs: [
        "Titilope Kolade-Iyiola is a dynamic and evolving Human Resource professional with over a decade of hands-on experience in HR operations, talent acquisition, and employee relations. She currently serves as the Manager of HR & Administration at Greenstad Projects Limited.",
        "As Director of Publicity at HR Mentorship, Titilope manages event publicity and information flow, ensuring that all official communications and program updates reach members across various sub-groups and regions. She plays a crucial role in maintaining seamless coordination between administrators and members.",
        "Beyond her corporate and community roles, she runs a registered HR consulting startup providing end-to-end advisory services that empower SMEs and emerging businesses."
      ],
      sections: [
        {
          title: "Portfolio with HR Mentorship",
          items: [
            "Event Publicity: Managing publicity for HR Mentorship events and programs.",
            "Information Dissemination: Coordinating and sending all official communications.",
            "Community Coordination: Supporting smooth communication between administrators and members.",
            "Program Broadcasting: Ensuring accurate relay of learning sessions and activities.",
            "Member Connection: Keeping members informed and engaged."
          ]
        },
        {
          title: "Academic Background",
          items: [
            "M.Sc. Management (Human Resources) – University of Lincoln (in progress)",
            "HND Printing Technology – Yaba College of Technology, Lagos"
          ]
        },
        {
          title: "Professional Qualifications & Memberships",
          items: [
            "ACIPM – Associate Member, Chartered Institute of Personnel Management of Nigeria",
            "PRO, CIPM University of Ibadan Chapter",
            "Member, Association of Corporate Governance Professionals, Nigeria",
            "Member, Chartered Institute of Development Studies and Administration, Nigeria"
          ]
        }
      ]
    },
    {
      name: "Yetunde Akintoye",
      role: "Director of Membership",
      image: "/team/yetunde.jpg",
      shortBio: "Seasoned HR professional championing initiatives that strengthen connection, inclusion, and professional development.",
      bioParagraphs: [
        "Yetunde Akintoye is a seasoned Human Resources professional with over a decade of diverse experience spanning the capital market, education, event management, transportation, oil & gas, and consulting sectors. She currently serves as the Group Head of Human Resources at Veritasi Homes.",
        "Known for her empathy-driven leadership and structured execution, Yetunde blends strategic foresight with deep human understanding. Beyond her organisational contributions, Yetunde plays an active leadership role within HR Mentorship, championing initiatives that strengthen connection, inclusion, and professional development among HR practitioners."
      ],
      sections: [
        {
          title: "Portfolio with HR Mentorship",
          items: [
            "Membership Coordination: Overseeing the onboarding and integration of new members.",
            "Community Engagement: Developing engagement structures across all member chapters.",
            "Professional Development: Supporting capacity-building initiatives.",
            "Inclusion & Representation: Ensuring regional diversity and inclusion.",
            "Cross-functional Collaboration: Partnering with other directors to align membership operations."
          ]
        },
        {
          title: "Academic Background",
          items: [
            "Executive Education – Lagos Business School (Unlock Leadership Potential)",
            "HND – Office Technology & Management, Yaba College of Technology",
            "ND – Office Management & Technology, Yaba College of Technology"
          ]
        },
        {
          title: "Professional Qualifications & Memberships",
          items: [
            "SPHRi – Senior Professional in Human Resources – International (HRCI)",
            "ACIPM – Associate Member, Chartered Institute of Personnel Management of Nigeria"
          ]
        }
      ]
    },
    {
      name: "Olukunle Hunge",
      role: "Director of Socials",
      image: "/team/olukunle.jpg",
      shortBio: "Seasoned HR professional known for building people-centred workplaces that balance structure, culture, and purpose.",
      bioParagraphs: [
        "Olukunle Hunge is a seasoned Human Resources professional known for building people-centred workplaces that balance structure, culture, and purpose. With over seven years of progressive HR experience, he has consistently demonstrated excellence in policy formulation, employee relations, and organisational development.",
        "As Director of Socials at HR Mentorship, Olukunle plays a pivotal role in fostering connection and belonging across the community. He coordinates social programs, wellness initiatives, and bonding events that bring members together beyond work discussions — including his leadership of the HR Mentorship Football Group."
      ],
      sections: [
        {
          title: "Portfolio with HR Mentorship",
          items: [
            "Socials Leadership: Directing and coordinating social activities and wellness programs.",
            "Football Group Coordination: Leading the HR Mentorship Football Group.",
            "Community Engagement: Building structures that encourage interaction and shared experiences.",
            "Networking Facilitation: Supporting mentorship and peer networking initiatives.",
            "Program Support: Collaborating to plan events and community hangouts.",
            "Culture Promotion: Creating fun, inclusive, and value-driven engagement."
          ]
        },
        {
          title: "Academic Background",
          items: [
            "B.Sc. Political Science – Federal University of Lafia, Nasarawa State"
          ]
        },
        {
          title: "Professional Qualifications & Memberships",
          items: [
            "ACIPM – Associate Member, Chartered Institute of Personnel Management of Nigeria",
            "Certified Facilitator – MBTI and DISC Personality Tools Training"
          ]
        }
      ]
    },
    {
      name: "Tochukwu Emeka Umeh",
      role: "Coordinator – Northern Nigeria",
      image: "/team/tochukwu.jpg",
      shortBio: "Accomplished HR professional advocating for people development and strategic learning across Northern Nigeria.",
      bioParagraphs: [
        "Tochukwu Emeka Umeh is an accomplished Human Resources professional with over eight years of progressive experience across humanitarian, development, and corporate environments. He currently serves as the Delegation Learning and Development Responsible at the International Committee of the Red Cross (ICRC).",
        "His work bridges strategic HR planning, organisational development, and talent enablement. As a Licensed HR Practitioner (HRPL), he is deeply committed to mentorship and knowledge-sharing that elevate professional practice.",
        "Known for his strategic mindset and inclusive leadership, Tochukwu helps professionals translate knowledge into competence and competence into impact."
      ],
      sections: [
        {
          title: "Portfolio",
          items: [
            "Regional Coordination: Oversees HR Mentorship’s activities across Northern Nigeria.",
            "Learning & Development Leadership: Facilitates webinars and regional learning sessions.",
            "Partnership & Collaboration: Liaises with local HR bodies and institutions.",
            "Mentorship & Capacity Building: Supports mentoring of early-career HR professionals.",
            "Event & Project Support: Coordinates regional events and outreach programs."
          ]
        },
        {
          title: "Academic Background",
          items: [
            "MBA – American University of Nigeria",
            "B.Sc. – Business Administration (Management), University of Maiduguri"
          ]
        },
        {
          title: "Professional Qualifications & Memberships",
          items: [
            "HRPL – Licensed HR Practitioner",
            "ACIPM – Associate Member, Chartered Institute of Personnel Management of Nigeria",
            "Associate Member, Nigerian Institute of Training and Development (NITAD)",
            "Associate Member, Nigerian Institute of Management (Chartered)"
          ]
        }
      ]
    },
    {
      name: "Victor Agu",
      role: "Creative & Data Integration Associate",
      image: "/team/victor.jpg",
      shortBio: "HR leader known for merging analytics with people strategy to drive organizational success.",
      bioParagraphs: [
        "Victor Agu is a former Accountant turned Human Resources professional and leader, known for his unique ability to merge analytics with people strategy. With over a decade of cross-industry experience, Victor focuses on driving organisational success through HR excellence and data-driven decision-making.",
        "Victor integrates HR with Data Science and Project Management using advanced tools such as Excel, Power BI, SQL, and Python to generate insights that inform people's decisions and strengthen business outcomes. Beyond HR, Victor is an author, speaker, and skilled pianist."
      ],
      sections: [
        {
          title: "Portfolio with HR Mentorship",
          items: [
            "Creative & Data Integration Support: Embedding data analytics into communication strategy.",
            "Performance Tracking: Designing HR data dashboards to support decision-making.",
            "Collaboration: Working closely with the Director of Brand & Creativity.",
            "Training Support: Facilitating knowledge-sharing sessions on HR analytics."
          ]
        },
        {
          title: "Academic Background",
          items: [
            "MBA – Lagos State University (In View)",
            "M.Sc. – Industrial Relations and Personnel Management, University of Lagos",
            "B.Sc. – Economics, Obafemi Awolowo University, Ile-Ife"
          ]
        },
        {
          title: "Professional Qualifications & Memberships",
          items: [
            "ACIPM – Associate Member, Chartered Institute of Personnel Management of Nigeria"
          ]
        }
      ]
    },
    {
      name: "Ugochi Obi",
      role: "Director, Job Alert & Employability",
      image: "/team/ugochi.jpg",
      shortBio: "Professional Skills Coach and career development strategist leading Nigeria’s largest online employability community.",
      bioParagraphs: [
        "Ugochi Obi is a Professional Skills Coach and career development strategist with 5+ years of experience turning job-search frustration into job offers. As Director of Job Alert & Employability at HR Mentorship, Ugochi leads a thriving Telegram platform of over 62,000 members.",
        "Under her guidance, hundreds of members have secured roles in top organisations. Beyond HR Mentorship, Ugochi serves as a Professional Skills Coach at INCO Academy, training diverse cohorts including participants of the Green Digital Skills for Africa program.",
        "Her holistic coaching approach covers every stage of the job-search process — from crafting standout applications to negotiating offers that reflect true market value."
      ],
      sections: [
        {
          title: "Portfolio with HR Mentorship",
          items: [
            "Job Alert Platform Leadership: Manages the Telegram community of 62,000+ members.",
            "Employability Programs: Designs and runs CV clinics and interview prep sessions.",
            "Career Guidance & Content: Shares actionable application strategies and weekly playbooks.",
            "Success Tracking & Reporting: Collects and showcases member success stories.",
            "Partnerships & Opportunities: Coordinates with employers to surface credible roles.",
            "Community Standards: Moderates posts and fosters a supportive tone."
          ]
        },
        {
          title: "Academic Background",
          items: [
            "MBA – University of Lagos",
            "B.Sc. Microbiology – University of Benin"
          ]
        },
        {
          title: "Professional Qualifications & Memberships",
          items: [
            "Member, Professional Association of Résumé Writers & Career Coaches (PARWCC)"
          ]
        }
      ]
    },
    {
      name: "Ezinne Obiora (Zee)",
      role: "Director, Book Club",
      image: "/team/ezinne.jpg",
      shortBio: "Global HR Executive with over 17 years experience, curating conversations that stretch minds through literature.",
      bioParagraphs: [
        "Ezinne Obiora is a Global HR Executive with over 17 years of experience helping people and organisations work better together across industries. She believes strategy must always have a human heartbeat.",
        "As Director of the HR Mentorship Book Club, Ezinne channels her lifelong love for learning into curating conversations that stretch minds and connect perspectives. She leads the club’s reading sessions, coordinates monthly themes, and encourages members to explore literature that sharpens leadership, empathy, and professional insight.",
        "Beyond her professional expertise, Ezinne is an avid reader and a self-confessed knowledge sponge, constantly drawing wisdom from books, articles, and everyday conversations."
      ],
      sections: [
        {
          title: "Portfolio with HR Mentorship",
          items: [
            "Book Club Leadership: Oversees planning and facilitation of reading sessions.",
            "Learning Integration: Aligns Book Club themes with broader learning objectives.",
            "Community Engagement: Encourages participation and bridges reading with workplace applications.",
            "Knowledge Sharing: Hosts reflective sessions on leadership and empathy.",
            "Mentorship Support: Inspires members to use reading as a tool for self-development."
          ]
        },
        {
          title: "Academic Background",
          items: [
            "B.Sc. Urban & Regional Planning – University of Lagos"
          ]
        },
        {
          title: "Professional Qualifications & Memberships",
          items: [
            "GPHR – Global Professional in Human Resources (HRCI)"
          ]
        }
      ]
    },
    {
      name: "Monisola Ibhade Oyelaja",
      role: "Director, Chaplaincy and Pastoral Care",
      image: "/team/monisola.jpg",
      shortBio: "Dynamic People and Culture professional providing emotional and spiritual guidance to members.",
      bioParagraphs: [
        "Monisola Ibhade Oyelaja is a dynamic and forward-thinking People and Culture professional with over a decade of experience spanning multiple sectors. She currently serves as Head of People & Culture at Pinnah Foods Ltd.",
        "As Director of Chaplaincy and Pastoral Care within HR Mentorship, she provides emotional and spiritual guidance to members, offering a listening ear, confidential support, and faith-based encouragement. Her role involves coordinating prayer sessions and fostering a culture of empathy.",
        "Passionate about developing people and building cultures of continuous learning, Monisola inspires others to see every challenge as an opportunity for innovation and positive change."
      ],
      sections: [
        {
          title: "Portfolio with HR Mentorship",
          items: [
            "Pastoral Support & Care: Provides emotional, moral, and spiritual guidance.",
            "Community Chaplaincy: Coordinates prayer circles and thanksgiving sessions.",
            "Welfare & Outreach: Oversees pastoral care outreach efforts.",
            "Mentorship & Support: Offers one-on-one encouragement and coaching.",
            "Culture of Compassion: Promotes kindness and psychological safety."
          ]
        },
        {
          title: "Academic Background",
          items: [
            "M.Sc., Employment and Labour Studies – University of Lagos",
            "B.A., Theatre Arts and Mass Communication – University of Benin"
          ]
        },
        {
          title: "Professional Qualifications & Memberships",
          items: [
            "GPHR – Global Professional in Human Resources (HRCI)",
            "Associate Member, Chartered Institute of Personnel Management of Nigeria (CIPM)",
            "Associate Member, Nigerian Institute of Training and Development (NITAD)"
          ]
        }
      ]
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
       
       {/* NEW HERO SECTION */}
       <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000" 
            alt="Our Team" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-purple-900/80 mix-blend-multiply" />
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
             <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Our Leadership</h1>
             <p className="text-xl text-white/90">The visionaries and strategists driving HR excellence across Africa.</p>
          </div>
       </section>

       <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
             {coreTeam.map((member, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedMember(member)}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition group text-center cursor-pointer hover:-translate-y-1 duration-300"
                >
                   <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-slate-100 dark:border-slate-800 relative">
                      <Image 
                        src={member.image} 
                        alt={member.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition duration-500"
                        // Priority loading for the first few items to ensure speed
                        priority={idx < 4}
                      />
                   </div>
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                   <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4 h-8 flex items-center justify-center">{member.role}</p>
                   <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4">{member.shortBio}</p>
                   <button className="text-primary text-xs font-bold flex items-center justify-center gap-1 mx-auto group-hover:gap-2 transition-all">
                      View Profile <ChevronRight size={12}/>
                   </button>
                </div>
             ))}
          </div>

          {selectedMember && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
               <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200 scrollbar-hide">
                  <button 
                    onClick={() => setSelectedMember(null)}
                    className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-red-50 hover:text-red-500 transition z-10"
                  >
                    <X size={20}/>
                  </button>

                  <div className="p-8 md:p-12">
                     <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                        <div className="w-32 h-32 shrink-0 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-800 relative mx-auto md:mx-0">
                           <Image src={selectedMember.image} alt={selectedMember.name} fill className="object-cover"/>
                        </div>
                        <div className="text-center md:text-left">
                           <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 dark:text-white mb-2">{selectedMember.name}</h2>
                           <p className="text-primary font-bold uppercase tracking-wider mb-4">{selectedMember.role}</p>
                        </div>
                     </div>

                     <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-base border-b border-slate-100 dark:border-slate-800 pb-8">
                        {selectedMember.bioParagraphs.map((para: any, i: number) => (
                           <p key={i}>{para}</p>
                        ))}
                     </div>

                     <div className="mt-8 grid md:grid-cols-2 gap-x-12 gap-y-8">
                        {selectedMember.sections.map((section: any, idx: number) => (
                           <div key={idx} className="break-inside-avoid">
                              <h3 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-4 text-lg">
                                <span className="w-2 h-6 bg-primary rounded-full"></span> {section.title}
                              </h3>
                              <ul className="space-y-3">
                                 {section.items.map((item: string, i: number) => (
                                   <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex gap-2 leading-relaxed">
                                     <span className="text-primary mt-1.5">•</span> <span>{item}</span>
                                   </li>
                                 ))}
                              </ul>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          )}
       </div>
    </div>
  );
}
