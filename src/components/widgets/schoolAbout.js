import React, { useEffect, useState } from "react";

function SchoolAbout(props) {
  const size = 60;
  return (
    <>
      {/* This is for University of Abertay */}
      {props.id == "0171d165-959b-4647-8267-f426b6de165a" ? (
        <p>
          Abertay is right at the heart of Dundee, combining all the advantages
          of a close-knit campus with the buzz of city centre life. All of our
          buildings are within a quarter of a mile of each other, as are shops,
          bars, clubs, cinemas and theatres, and we’re just a few minutes' walk
          from the bus and train stations.
          <br />
          <br />
          The campus itself is an eclectic mixture of everything from the
          Edwardian Old College to our outstanding and award-winning Bernard
          King Library. The heart of the University lies in Bell Street, with
          most teaching and learning facilities, offices, research centres and
          the Library all within just a few yards of each other. Best of all,
          our 21st-century Student Centre is also here, and whether you’re going
          to lectures, meeting with staff, studying in the library, attending
          tutorials and seminars, or just having a coffee with friends, you’ll
          always feel like a part of our bustling community.
          <br />
          <br />
          Abertay isn’t just a great place to be a student – the University is
          also home to world-leading research teams, whose discoveries are
          hailed internationally. We are Scotland's leading university for
          environmental science research, with leading-edge initiatives such as
          the SIMBIOS unit exploring soil bioinformatics, the Abertay Centre for
          the Environment promoting ‘green’ business practices, and the Urban
          Water Technology Centre developing innovative new drainage and
          pollution-control technology.
          <br />
          <br />
          Abertay researchers are also studying issues as varied as innovative
          visualisation of complex datasets, policing and security research
          including witness analysis, face identity and money laundering, the
          study of regional and national economic analysis and accountancy as
          related to the oil and gas industry, food and nutrition science,
          sports and health science, psychology, computer arts and digital
          media, and many other topics.
          <br />
          <br />
          Apart from getting on with the business of teaching, many of the staff
          are either actively involved in research or work with industry. All of
          our researchers are involved in teaching and developing courses –
          giving our students the chance to learn from world leaders every day.
          <br />
          <br />
          Coming to University marks a major step in your life, and we’re on
          hand to make sure that the transition is as smooth as possible. The
          University can offer advice and support on everything from
          accommodation and managing your finances, to staying healthy and
          planning your workload. We have a counselling service that can help
          you work through any problems, and we employ a team of students each
          year to act as mentors for all newcomers. The Students’ Association
          also provides help and advice via the elected student executive. No
          matter what your question, we have someone who can help you answer it.
          <br />
        </p>
      ) : (
        ""
      )}
      {/* This is for ST. Andrew */}
      {props.id == "14022ef1-56d0-4742-a3d3-35e9cf7b6b04" ? (
        <p>
          Founded in the 15th century, St Andrews is Scotland's first university
          and the third oldest in the English speaking world. Teaching began in
          the community of St Andrews in 1410, and the University was formally
          constituted by the issue of a papal bull in 1413.
          <br />
          <br />
          The early years of the young university were not without turbulence.
          In 1426, King James tried to move the university to Perth. In 1470,
          several masters and students were expelled for attacking the Dean with
          bows and arrows. In 1544 the University banned beards, the carrying of
          weapons, gambling and football.
          <br />
          <br />
          By the middle of the 16th century, St Andrews had grown to encompass
          three colleges — St Salvator’s (1450), St Leonard’s (1511) and St
          Mary’s (1538). The buildings of St Mary’s College and St Salvator’s
          Chapel date from this period. From the 1500s to the 1700s, the
          University enjoyed a period of mixed fortunes. During this time St
          Salvator’s and St Leonard’s Colleges joined to form the United College
          which still survives today in a greatly enlarged form.
          <br />
          <br />
          In the 19th century, the University made considerable progress in
          developing teaching and research in the arts, divinity and the
          biological and physical sciences. In 1897, the University was joined
          by a new academic centre in nearby Dundee and with it gained notable
          achievements in medical and applied science. This association ended in
          1967 with the foundation of a separate University of Dundee.
          <br />
          <br />
          In the 1980s, St Andrews embarked on a broad programme of investment
          to boost its research capabilities, a strategy which has helped
          establish its reputation today as an international centre of research
          excellence. In 2009, St Andrews became the first Scottish ancient to
          appoint a woman as Principal, recruiting Professor Louise Richardson
          from the Radcliffe Institute, Harvard, to lead it into its seventh
          century. She was succeeded in 2016 by Professor Sally Mapstone.
          <br />
          <br />
          St Andrews recently celebrated 600 years of continuous existence
          during which time it has made an enduring contribution to the
          intellectual and cultural life of both Scotland and the wider world.
          <br />
        </p>
      ) : (
        ""
      )}

      {/* This is for Queen Margaret */}
      {props.id == "1d03e8c8-54ad-4494-b74b-2372008d334a" ? (
        <p>
          Queen Margaret University was established as the Edinburgh School of
          Cookery in 1875. The main founders of the school were Christian
          Guthrie Wright and Louisa Stevenson (Louisa was sister of Flora
          Stevenson, the first female Chair of the Edinburgh School Board).
          These women were also largely responsible for leading the campaign to
          secure the admission of females to the University of Edinburgh. In
          setting up the School of Cookery, they were backed by various interest
          groups, but particularly enlightened local medical practitioners and
          Church leaders.
          <br />
          <br />
          In 1879 Guthrie Wright collaborated with the scientist Sir Thomas Dyke
          Acland and two "distinguished medical doctors" (probably Dr Henry
          Littlejohn - Edinburgh's first Medical Officer of Health - and Dr
          Alexander Wood) to produce her School Cookery Book. Published as part
          of a series of science primers under the general editorship of the
          naturalist, Professor T.H. Huxley, and including texts by such
          individuals as Sir H. E. Roscoe (chemistry), Sir Archibald Geikie
          (geography and geology) and W. Stanley Jevons (logic and political
          economy), Guthrie Wright's book effectively represented the state of
          knowledge at the time in respect of food. It subsequently ran into
          many editions.
          <br />
          <br />
          This institution emerged in a period that was notable for real
          economic progress, but also characterised by many social and economic
          divisions and inequalities, and widespread poverty. The School was
          established as a voluntary effort to address two key problems facing
          society at the time:
          <br />
          <br />
          (A) To provide educational opportunities for women. The institution’s
          founders were part of the U.K.-wide mid Victorian "Women's Movement",
          which was a campaign for better education and improved career
          opportunities for females. A main element of this campaign was
          directed at securing equality of opportunity for school girls.
          <br />
          (B) The need to bring about an improvement in diets, particularly the
          diets of working class families.
          <br />
          <br />
          As a consequence of rapid progress and growth in September 1992 the
          Privy Council granted Queen Margaret powers to award its own taught
          degrees which was a recognition of the high standard of academic
          rigour that was now being applied by staff to both course development
          and day to day conduct. In 1998 this was further emphasised when the
          was granted full degree powers which enabled it to award its own
          research and higher degrees and in 1999 it was empowered to change its
          name to Queen Margaret University College.
          <br />
          <br />
          Today, QMU’s vision is to be a university of ideas and influence.Our
          focus on relevance - through our teaching, learning, and research and
          knowledge exchange work - ensures that we are responsive to the
          changing needs of society. We have flagship areas of expertise in
          health & rehabilitation; sustainable business and creativity &
          culture.
          <br />
          <br />
          We are dedicated to improving the quality of life and building the
          evidence based for policy and practice through our research and
          knowledge exchange (KE). We are recognised internationally for our
          high quality and relevant research, which informs practice and policy,
          and we measure its value by its impact and social usefulness. Our
          graduates and staff can found in influential roles across the world,
          influencing policy and enhancing society, culture and the economy.
        </p>
      ) : (
        ""
      )}

      {/* This is for Sterling */}
      {props.id == "445d5b0b-6b9d-4e1d-af32-a8ad4d91cc65" ? (
        <p>
          Our history begins with a visionary who recognised that society was
          being transformed and it needed people skilled in navigating change.
          <br />
          <br />
          Lord Robbins, our first Chancellor, was an economist who changed the
          face of British higher education. He understood the importance of a
          skilled workforce to the future wealth and wellbeing of society. For
          Robbins, it was all about ‘education with a purpose’ and his Robbins
          principle declared that university places 'should be available to all
          who were qualified for them by ability and attainment'. The Robbins
          Report widened access to higher education, and since then the
          University of Stirling has been delivering the progressive vision and
          transformative thinking he first articulated in the 1960s.
          <br />
          <br />
          On 18 September 1967, 164 undergraduate students and 31 postgraduates
          began their courses at the new Pathfoot Building. Since then we’ve
          grown to over 14,000 students from over 120 nationalities and we have
          over 90,000 alumni in 170 countries.
          <br />
          <br />
          Our campus is located on the edge of the bustling city of Stirling,
          close to Glasgow and Edinburgh. We are situated on the site of the
          historic Airthrey estate which includes the Robert Adam-designed 18th
          century Airthrey Castle. In 2016 our campus was rated first in the UK
          by International Student Barometer.
          <br />
        </p>
      ) : (
        ""
      )}

      {/* This is for Uni of Highlands and Islands */}
      {props.id == "4b645b5f-aed7-4752-8f96-cf14914ce517" ? (
        <p>
          The University of the Highlands and Islands is an integrated
          university encompassing both further and higher education.
          <br />
          <br />
          We are not a traditional university. We are different. We are part of
          a new breed of tertiary institutions, the only one in Scotland and one
          of only a few in Europe. Based in the Highlands and Islands of
          Scotland, our distinctive partnership of 13 independent colleges and
          research institutions is locally based and rooted in communities, but
          with national and international reach, as part of a regional
          university structure.
          <br />
          <br />
          Our reputation is built on our innovative approach to learning and our
          distinctive research and curriculum – all enriched by the people,
          natural environment, economy, culture and heritage of the Highlands
          and Islands and its communities.
          <br />
          <br />
          We have 40,000 students at the heart of our university partnership and
          we are measured by their success. Our curriculum portfolio across both
          further and higher education is designed to meet current and future
          local and regional needs and to attract other students to the
          Highlands and Islands to study.
          <br />
        </p>
      ) : (
        ""
      )}
      {/* This is for Uni of Aberdeen */}
      {props.id == "557fc39b-5901-4463-972f-3e6e3c111f36" ? (
        <p>
          Founded in 1495 by William Elphinstone, Bishop of Aberdeen and
          Chancellor of Scotland. The University of Aberdeen is Scotland's third
          oldest and the UK's fifth oldest university.
          <br />
          <br />
          William Elphinstone established King's College to train doctors,
          teachers and clergy for the communities of northern Scotland, and
          lawyers and administrators to serve the Scottish Crown. Much of the
          King's College still remains today, as do the traditions which the
          Bishop began.
          <br />
          <br />
          King’s College opened with 36 staff and students, and embraced all the
          known branches of learning: arts, theology, canon and civil law. In
          1497 it was first in the English-speaking world to create a chair of
          medicine. Elphinstone’s college looked outward to Europe and beyond,
          taking the great European universities of Paris and Bologna as its
          model.
          <br />
          <br />
          In 1593, a second, Post-Reformation University, was founded in the
          heart of the New Town of Aberdeen by George Keith, fourth Earl
          Marischal. King's College and Marischal College were united to form
          the modern University of Aberdeen in 1860. At first, arts and divinity
          were taught at King's and law and medicine at Marischal. A separate
          science faculty - also at Marischal - was established in 1892. All
          faculties were opened to women in 1892, and in 1894 the first 20
          matriculated female students began their studies. Four women graduated
          in arts in 1898, and by the following year, women made up a quarter of
          the faculty.
          <br />
          <br />
          Throughout the 20th century Aberdeen has consistently increased
          student recruitment, which now stands at 14,000. In recent years
          picturesque and historic Old Aberdeen, home of Bishop Elphinstone's
          original foundation, has again become the main campus site.
          <br />
          <br />
          The University has also invested heavily in medical research, where
          time and again University staff have demonstrated their skills as
          world leaders in their field. The Institute of Medical Sciences,
          completed in 2002, was designed to provide state-of-the-art facilities
          for medical researchers and their students. This was followed in 2007
          by the Health Sciences Building. The Foresterhill campus is now one of
          Europe's major biomedical research centres. The Suttie Centre for
          Teaching and Learning in Healthcare, a £20m healthcare training
          facility, opened in 2009.
          <br />
        </p>
      ) : (
        ""
      )}
      {/* This is for Edinburgh College */}
      {props.id == "5a2355d3-c4a3-4ec2-aece-b5a0725964a9" ? (
        <p>
          Edinburgh College is a further and higher education institution with
          campuses in Edinburgh and Midlothian, Scotland. It serves the Fife,
          Lothians, and Scottish Borders regions, and is the largest college in
          Scotland.
          <br />
          <br />
          It was formed on 1 October 2012 as part of the merger of Edinburgh's
          Jewel and Esk, Telford, and Stevenson colleges. The college has four
          campuses, all of which were previously the campuses of the
          constituents of the merger: Jewel and Esk's College Milton Road
          (Jewel) Campus and Eskbank Campus (Now referred as "Edinburgh College,
          Milton Road Campus" and "Edinburgh College, Midlothian Campus");
          Edinburgh Telford College (Now referred as Edinburgh College, Granton
          Campus); and Stevenson College Edinburgh (Now referred as Edinburgh
          College, Sighthill Campus)
          <br />
        </p>
      ) : (
        ""
      )}
      {/* This is for Edinburgh Napier */}
      {props.id == "5dcbbb7c-c1a4-4404-9887-6c18acb87ff5" ? (
        <p>
          Edinburgh Napier University is a public university located in the
          capital city of Scotland, Edinburgh. The institution was initially
          known as Napier Technical College and founded in 1964. The name
          ‘Napier’ was taken from 16th-century Scottish mathematician and
          philosopher John Napier who was the founder. John Napier was the
          inventor of logarithms and the decimal point, who was born in 1550 in
          the medieval tower house of Merchiston Castle (the site of the
          University's Merchiston campus). His statue stands in the tower of
          Merchiston Castle today. An opening ceremony was held on 23 February
          1965.[7] In 1966, it was renamed Napier College of Science and
          Technology. In 1974, it merged with the Sighthill-based Edinburgh
          College of Commerce to form Napier College of Commerce and Technology,
          which became a Central Institution in 1985.
          <br />
          <br />
          The college was renamed Napier Polytechnic in 1986 and in the same
          year acquired the former Hydropathic hospital buildings at
          Craiglockhart. In June 1992 the institution officially became Napier
          University. At a ceremony witnessed by over 700 staff and students,
          Lord James Douglas Hamilton and the then Principal, William Turmeau,
          unveiled the new University sign at Merchiston. In 1994, Napier
          University acquired its Craighouse Campus. In 1996, the university
          gained a new Faculty of Health Studies through a merger between the
          Scottish Borders College of Nursing and Lothian College of Health
          Studies. In February 2009 it became Edinburgh Napier University
          <br />
          <br />
          Edinburgh Napier has been awarded the Queen's Anniversary Prize twice.
          Its most recent win came in 2015, when it was recognised for its work
          in timber engineering, sustainable construction and wood science.[8]
          Edinburgh Napier was previously awarded the Queen's Anniversary Prize
          in 2009 when the award was made for 'Innovative housing construction
          for environmental benefit and quality of life'. This recognised the
          contribution made by the University's Building Performance Centre
          towards improving sound insulation between attached dwellings.
          <br />
        </p>
      ) : (
        ""
      )}
      {/* This is for Uni of Edinburgh */}
      {props.id == "8f69de01-c30c-4160-a804-51e92ea7936e" ? (
        <p>
          Founded in 1582, the University Of Edinburgh opened its doors to the
          world in 1583. Steeped in prestige and entangled with history, this
          esteemed institution is one of Scotland’s ancient universities and the
          sixth oldest university in the English-speaking world. Edinburgh
          University first begun as a college of law before expanding into a
          formally established college, under the Royal Charter of King James VI
          of Scotland on 14th April 1582. The institution has buildings sprawled
          out across the city, especially in the Old Town, with the first
          custom-built building being the Old College (now the School Of Law).
          Teviot Row happens to be the oldest purpose-built student union in the
          world, just as the English Literature department is the oldest in
          Britain. Interestingly, after Cambridge and Oxford, the university
          receives the third largest endowment in the United Kingdom.
          <br />
          <br />
          One of the countless reasons why Edinburgh was granted the world’s
          first UNESCO City Of Literature — and why it has the notable nickname
          ‘Athens of the North’ — is the group of fearless revolutionaries (like
          philosopher David Hume) who were key components in the university’s
          pioneering involvement during the Age Of Enlightenment. From
          naturalist Charles Darwin and mathematician Thomas Bayes to
          philosopher David Hume, inventor Alexander Graham Bell, surgeon Joseph
          Lister, physicist James Clerk Maxwell, three signatories of the
          American Declaration of Independence including James Wilson, and a
          myriad of famous writers such as Robert Louis Stevenson, Sir Walter
          Scott, and Sherlock Holmes creator Sir Arthur Conan Doyle, the
          University Of Edinburgh has served as an academic platform for some of
          the most prolific contributors in modern history.
          <br />
          <br />
          Along with being an intellectual hub for the Scottish Enlightenment,
          The College Of Medicine And Veterinary Medicine is regarded as one of
          the best medical institutions in the world. From inventing the
          hypodermic syringe and finding a cure for scurvy to inventing the
          decompression chamber, discovering SARS, developing IV therapy, the
          Hepatitis B vaccine, and more, graduates have played a starring role
          in the field of medicine.
          <br />
          <br />
          The University of Edinburgh has been influencing the world since 1583.
          Our global reputation is built on pioneering research and innovation,
          and world-class teaching. Set in the heart of a beautiful city and a
          country which is passionate about international relationships, we have
          always had a commitment to diversity and a community in which students
          and staff feel valued and welcome. This is something that we will
          continue to celebrate and embrace.
          <br />
          <br />
          With an international outlook we continue to see the benefits of
          student and staff mobility and collaboration across borders. Our
          international students now represent 42% of our total community,
          coming from 156 nations, with 33% of our staff coming from 105
          nations. Our strong links with universities in Europe and beyond
          include participation in the Erasmus exchange programme, and we are an
          active member of a number of international organisations including
          Universitas 21, the League of European Research Universities and the
          Coimbra Group. This approach makes the University what it is today.
          <br />
        </p>
      ) : (
        ""
      )}
      {/* This is for Uni of WestScotland */}
      {props.id == "a32b7926-8775-440d-973a-b79d6f7cf0d5" ? (
        <p>
          Although classified as a new university, the University of the West of
          Scotland has a rich, diverse history inherited from the various
          institutions that preceded it, including the Paisley School of Art
          (1836–1897), University of Paisley, Bell College of Technology,
          Craigie College of Education and Dumfries and Galloway College of
          Nursing.
          <br />
          <br />
          At the time of the Industrial Revolution, Paisley was renowned for
          thread weaving. The Coats mill was run by two brothers, Peter and
          Thomas Coats. These men, children of the Scottish Enlightenment had
          liberal ideals and became noted philanthropists. As members of the
          Philosophical Institution, founded in 1808 the Coats donated a museum
          and library to the town, funded the building of the Coats observatory
          and promoted education throughout Paisley.
          <br />
          <br />
          The Philosophical Institution, helped establish the School of Arts in
          1836, which become a Government School of Design in 1846, one of
          twenty similar institutions established in UK manufacturing centres
          from 1837-1851. They were set up to improve the quality of the
          country's product design through training in design for industry.
          Peter Coats was director of both Paisley Philosophical Institution and
          the Government School of Design. Later, the Design schools were
          renamed Schools of Art, and once again as Schools of Art and Science.
          <br />
          <br />
          In 1897 Princess Louise laid the foundation stone of a grand new
          building for the College. The design was the winner of an
          architectural competition and partially funded by local industrialists
          (Peter Brough, and Thomas Coats both contributed).
          <br />
          <br />
          By the start of the twentieth century, Paisley Technical College and
          School of Art, (as it was known from 1904) was a centre for teaching
          the University of London External Programme. Perhaps the most famous
          principal of the College was Lewis Fry Richardson, FRSprincipal from
          1922 to 1940. A mathematician, physicist, meteorologist, psychologist
          and pacifist who pioneered modern mathematical techniques of weather
          forecasting, as well as the application of similar techniques to
          studying war. He also carried out ground breaking work on fractals.
          <br />
          <br />
          Throughout the first half of the century the institution had a
          financial struggle. After the second world war Central Institution
          status provided a regular Government income but unfortunately also
          meant closing the school of Art, and ceding students to Glasgow School
          of Art. The new entity thus became Paisley College of Technology; a
          Government funded Central Institution in 1950. In the 1960s a large
          physical expansion took place alongside the Neo-Classical original
          building on the main 20 acre (81,000 m²) Paisley town centre site.
          <br />
          <br />
          At the time Paisley, in common with other Central Institutions and the
          former Polytechnics, already offered a range of degrees under the
          Council for National Academic Awards. With the Further and Higher
          Education Act 1992, the Paisley College of Technology was granted the
          title University of Paisley and was established as a University with a
          Royal Charter and degree awarding powers. Today, this institution
          forms Paisley Campus of the University.
          <br />
        </p>
      ) : (
        ""
      )}
      {/* This is for Uni of Strathclyde */}
      {props.id == "c7f67d8b-b2f8-4f11-9fd9-fa870104c261" ? (
        <p>
          The university was founded in 1796 through the will of John Anderson,
          professor of Natural Philosophy at the University of Glasgow, who left
          instructions and the majority of his estate to create a second
          university in Glasgow to focus on "Useful Learning" – specialising in
          practical subjects – "for the good of mankind and the improvement of
          science, a place of useful learning". The University later named its
          city centre campus after him.
          <br />
          <br />
          In 1828, the institution was renamed Anderson's University, partially
          fulfilling Anderson's vision of two universities in the city of
          Glasgow. The name was changed in 1887, to reflect the fact that there
          was no legal authority for the use of the title of 'university'. As a
          result, the Glasgow and West of Scotland Technical College was formed,
          becoming the Royal Technical College in 1912, and the Royal College of
          Science and Technology in 1956 concentrating on science and
          engineering teaching and research. Undergraduate students could
          qualify for degrees of the University of Glasgow or the equivalent
          Associate of the Royal College of Science and Technology (ARCST).
          <br />
          <br />
          Under Principal Samuel Curran, internationally respected nuclear
          physicist (and inventor of the scintillation counter), the Royal
          College gained University Status, receiving its Royal Charter to
          become The University of Strathclyde in 1964, merging with the
          Scottish College of Commerce at the same time. Contrary to popular
          belief, The University of Strathclyde was not created as a result of
          the Robbins Report – the decision to grant the Royal College
          university status had been made earlier in the 1960s but delayed as a
          result of Robbins Report. The University of Strathclyde was the UK's
          first technological university reflecting its history, teaching and
          research in technological education. In 1993, the University
          incorporated Jordanhill College of Education.
          <br />
          <br />
          The university has grown from approximately 4,000 full-time students
          in 1964 to over 20,000 students in 2003, when it celebrated the 100th
          anniversary of the laying of the foundation stone of the original
          Royal College building. In July 2015, Her Majesty The Queen opened the
          University of Strathclyde Technology and Innovation Centre.
          <br />
        </p>
      ) : (
        ""
      )}
      {/* This is for Uni of Dundee */}
      {props.id == "cd0b47a2-7c1a-40e9-88ed-ec7c72934035" ? (
        <p>
          On 1 August 1967, the University of Dundee came into formal existence
          by virtue of a Royal Charter. Those invested in the future of both UCD
          and the University of St Andrews had divergent views as to the best
          way to proceed, ranging from full incorporation to complete
          separation. The Royal Commission Report of 1952, chaired by Lord
          Tedder, aimed to resolve the differences. The commissioners believed
          there should be a single university with two colleges and that the
          Dundee college should incorporate the medical school.
          <br />
          <br />
          The emphasis in Dundee would be on Social Sciences within the Faculty
          of Arts, and new chairs were to be created in Economics, Philosophy
          and History. It was proposed that a Faculty of Law be established, and
          that the teaching of education should take place in Dundee.
          Pre-clinical teaching in medicine and dentistry would be concentrated
          in Dundee.
          <br />
          <br />
          In 1953, the University of St Andrews bill received royal assent.
          Queen’s College was born, and the Tedder plans put into action. The
          1950s saw an expansion in terms of subjects, buildings, and student
          numbers. A new School of Social Studies, a new chair of Education, a
          part-time chair of Conveyancing to strengthen the Law Faculty, and a
          separate Faculty of Applied Science were all established at this time.
          Progress was being made and Queen’s College was evolving, but not
          heading inexorably on the road to independence. What changed the
          situation was the Robbins Report of 1963, which concluded that ‘all
          who are qualified to pursue full time education should have the
          opportunity to do so’. The impact on Queen’s College was significant;
          demand for the social science courses increased and by 1966 student
          numbers were up to 2089.
          <br />
          <br />
          The policy of non-duplication of courses with St Andrews was
          abandoned, with Principal Sir Malcolm Knox forecasting that this would
          increase numbers to a staggering 6,000. In 1964 he proposed that
          Queen’s College should become an independent university. On 1 August
          1967, the royal charter was granted and the University of Dundee was
          formally established. The Queen Mother became the University’s first
          Chancellor, both raising its profile and acting as a vote of
          confidence in the fledgling institution.
          <br />
          <br />
          It had been a long – and often bumpy – road to independence, but the
          University was now free to develop in its own way, and take steps
          towards becoming the outstanding institution it is today.
          <br />
        </p>
      ) : (
        ""
      )}
      {/* This is for University of Glasgow */}
      {props.id == "ce2c8633-147e-408d-9a72-dc7090f021a9" ? (
        <p>
          The University of Glasgow was founded in 1451 by a charter or papal
          bull from Pope Nicholas V, at the suggestion of King James II, giving
          Bishop William Turnbull, a graduate of the University of St Andrews,
          permission to add a university to the city's Cathedral. University of
          Glasgow is the second-oldest university in Scotland after St Andrews
          and the fourth-oldest in the English-speaking world. The universities
          of St Andrews, Glasgow and Aberdeen were ecclesiastical foundations,
          while Edinburgh was a civic foundation. As one of the ancient
          universities of the United Kingdom, Glasgow is one of only eight
          institutions to award undergraduate master's degrees in certain
          disciplines.
          <br />
          <br />
          Teaching at the university began in the chapterhouse of Glasgow
          Cathedral, subsequently moving to nearby Rottenrow, in a building
          known as the "Auld Pedagogy". The university was given 13 acres (5.3
          ha) of land belonging to the Black Friars (Dominicans) on High Street
          by Mary, Queen of Scots, in 1563. By the late 17th century its
          building centred on two courtyards surrounded by walled gardens, with
          a clock tower, which was one of the notable features of Glasgow's
          skyline – reaching 140 feet (43 m) in height and a chapel adapted from
          the church of the former Dominican (Blackfriars) friary. Remnants of
          this Scottish Renaissance building, mainly parts of the main facade,
          were transferred to the Gilmorehill campus and renamed as the "Pearce
          Lodge", after Sir William Pearce, the shipbuilding magnate who funded
          its preservation. The Lion and Unicorn Staircase was also transferred
          from the old college site and is now attached to the Main Building.
          <br />
          <br />
          John Anderson, while professor of natural philosophy at the
          university, and with some opposition from his colleagues, pioneered
          vocational education for working men and women during the Industrial
          Revolution. In 1973, Delphine Parrott became its first female
          professor, as Gardiner Professor of Immunology.
          <br />
          <br />
          In October 2014, the university court voted for the university to
          become the first academic institution in Europe to divest from the
          fossil fuel industry.
          <br />
        </p>
      ) : (
        ""
      )}
      {/* This is for Glasgow Caledonian Uni */}
      {props.id == "e0efde4d-9619-44ac-be64-889a24d3ac0e" ? (
        <p>
          The University traces its origin from The Queen's College, Glasgow
          (founded 1875) and the Glasgow College of Technology (founded 1971).
          The Queen's College, which specialised in providing training in
          domestic science, received the Royal accolade of being named after
          Queen Elizabeth in its centenary celebrations in 1975. Queen Elizabeth
          was, herself, Patron of the College since 1944. Glasgow Polytechnic,
          which was one of the largest central institutions in Scotland, offered
          externally validated degrees and diplomas in engineering, science, and
          the humanities: the first of which was a BA in Optics, followed by
          degrees in Social Sciences (1973) and Nursing (1977).
          <br />
          <br />
          On 1 April 1993, the two institutions amalgamated to form Glasgow
          Caledonian University. The new university took its name from
          Caledonia, the poetic Latin name for present-day Scotland. The main
          campus of the university is built on the site of the former Buchanan
          Street Station, built by the Caledonian Railway.
          <br />
          <br />
          Independent research carried out in 2015 revealed that the University
          contributes over £480m to Scotland's economy each year with the
          quantifiable lifetime premium of a one-year class of graduates
          estimated at around £400m, bringing the University's total annual
          economic impact to around £880m in Scotland alone.
          <br />
        </p>
      ) : (
        ""
      )}
      {/* This is Heriot-Watt Uni */}
      {props.id == "f50c7df5-48ee-4e4e-81aa-8d3ecd6b09a0" ? (
        <p>
          We are proud that since our foundation in 1821, we have been outward
          looking pioneers of education, in pursuit of knowledge to the benefit
          of society and the world. Read the story of Heriot-Watt University:
          <br />
          <br />
          <span>James Watt</span>
          James Watt (1736–1819) was the father of the industrial revolution.
          His crucial role was to transform the world from one based on
          agriculture to one based on engineering and technology, recognised in
          the unit of power: the Watt. Born in Greenock, Scotland, he went on to
          become an inventor, engineer and scientist. In 1769 he patented an
          improvement to the efficiency of the existing Newcomen steam engine by
          adding a separate condenser and valves. This helped accelerate the
          speed at which Britain industrialised.
          <br />
          <br />
          <span>George Heriot</span>
          George Heriot (1563–1624) was an Edinburgh goldsmith who became
          jeweller to King James VI (James 1 of England) and his wife, Queen
          Anne. So lucrative was his business that he acquired the name
          'Jingling Geordie' and even loaned money to his Royal patrons who
          pledged their jewels as security.
          <br />
          <br />
          Whilst his fame and fortune were made in London, he paid tribute to
          his native city through the creation of a hospital for the education
          of orphan sons of the freemen of Edinburgh. Over the centuries the
          George Heriot’s Trust’s investments grew until by 1885 the Governors
          could afford to use surplus funds to support the Watt Institution and
          School of Arts and so created Heriot-Watt College, the forerunner to
          Heriot-Watt University.
          <br />
          <br />
          From a pioneering institute born out of the Scottish Enlightenment,
          today we are shaping the world, a global university, a leader in
          transnational education. Echoing our founding principles of tailoring
          our curriculum to the needs of modern society, we are a powerful
          driver of the economy wherever we are in the world. In all of our
          communities we create a distinct university experience, a springboard
          for an international career.
          <br />
        </p>
      ) : (
        ""
      )}

      {/* This is For Robert Gordon Uni */}
      {props.id == "f932b8c6-8daa-4770-887f-4368bfdbdc54" ? (
        <p>
          The university derives from Robert Gordon's Hospital, an institution
          set up in the mid-18th century to provide the poor with a basic
          education and reasonable start in life, and the various educational
          institutions which developed in Aberdeen to provide adults with
          technical, vocational and artistic training, mostly in the evenings
          and part-time. Following numerous mergers between these
          establishments, it became Robert Gordon's Technical College in 1910,
          then following further developments became Robert Gordon's Institute
          of Technology in 1965 and began to conduct increasing amounts of
          research and provide degree-level education (by now mostly offering
          day classes to full-time students). Finally, it became a university in
          1992. Unlike some modern universities in the UK which were created
          following the government reforms of 1992, it has never been a
          polytechnic (these were never part of the Scottish education system).
          <br />
          <br />
          Robert Gordon was a Scottish merchant, who had grown up in Aberdeen
          and graduated from Marischal College. Following a successful career,
          mostly in Danzig where he amassed a fortune, he retired to Aberdeen
          around 1720. In the last decade of his life, he prepared plans for a
          Hospital similar to that founded in Edinburgh by George Heriot. The
          purpose of Robert Gordon's Hospital was "the Maintenance, Aliment,
          Entertainment and Education of young boys whose parents are poor and
          indigent... and to put them to Trades and Employment". Gordon died in
          1731, and left his entire fortune to the project. However, it took
          nearly two decades for buildings to be completed, with the first boys
          admitted in 1750. The aim was not a sophisticated education, but to
          provide the poor with a reasonable start in life. Boys were taken in
          between 8 and 11 years old and received food, accommodation and a
          basic education including English, Latin, writing and arithmetic. They
          left the Hospital between 14 and 16 years old as an apprentice in a
          trade or to a merchant. The Hospital expanded through the 18th and
          19th centuries.
          <br />
          <br />
          Meanwhile, in the early 19th century, the Industrial Revolution led to
          a greater need for scientific and technical education for
          working-class adults, with "Mechanic's Institutes" spreading through
          Scotland, patterned on that founded by George Birkbeck at Glasgow (he
          would later found Birkbeck College, the University of London's night
          school). The Aberdeen Mechanic's Institution opened in 1824 providing
          evening classes in subjects such as physics, chemistry, mathematics,
          book-keeping, maritime navigation and art. By 1855 it was receiving
          government funding as the School of Science and Art, with a Technical
          School founded two years later.
          <br />
          <br />
          Whilst his fame and fortune were made in London, he paid tribute to
          his native city through the creation of a hospital for the education
          of orphan sons of the freemen of Edinburgh. Over the centuries the
          George Heriot’s Trust’s investments grew until by 1885 the Governors
          could afford to use surplus funds to support the Watt Institution and
          School of Arts and so created Heriot-Watt College, the forerunner to
          Heriot-Watt University.
          <br />
          <br />
          From a pioneering institute born out of the Scottish Enlightenment,
          today we are shaping the world, a global university, a leader in
          transnational education. Echoing our founding principles of tailoring
          our curriculum to the needs of modern society, we are a powerful
          driver of the economy wherever we are in the world. In all of our
          communities we create a distinct university experience, a springboard
          for an international career.
          <br />
        </p>
      ) : (
        ""
      )}
    </>
  );
}

export default SchoolAbout;
