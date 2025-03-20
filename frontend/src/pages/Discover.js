import React, { useState } from "react";
import "../styles/discover.css";

const Discover = () => {
  const [activeTab, setActiveTab] = useState("psychology");
  const [selectedContent, setSelectedContent] = useState(null);

  const psychologyBlogs = [
    { 
        id: 1, 
        title: "The Science of Journaling", 
        preview: "How writing improves mental clarity...", 
        content: `Journaling is more than just putting pen to paper—it is a scientifically proven tool that enhances mental clarity and cognitive function. Studies show that when we write about our thoughts and experiences, we engage the brain's prefrontal cortex, which is responsible for reasoning and decision-making. This process allows us to make sense of our emotions, organize our thoughts, and gain a better understanding of complex situations. Moreover, journaling has been linked to improved memory retention and problem-solving skills, as it encourages deeper reflection and self-analysis.

        In addition to cognitive benefits, journaling plays a vital role in stress reduction and emotional regulation. Writing about our worries helps externalize our thoughts, making them feel less overwhelming. Research has found that expressive writing can lower cortisol levels—the stress hormone—leading to a calmer mind. By keeping a journal, we create a safe space to express our emotions, track patterns in our behavior, and develop healthier coping mechanisms, ultimately contributing to a more balanced and focused mindset.`,
        image: "/blog1.jpg"
    },
    { 
        id: 2, 
        title: "Journaling to Reduce Anxiety", 
        preview: "Why writing helps process emotions...", 
        content: `Anxiety often stems from unprocessed emotions, overthinking, or an inability to break free from negative thought patterns. Journaling provides a structured outlet to acknowledge and process these emotions in a healthy way. By writing down our worries, we externalize them, making them feel more tangible and less overwhelming. This process, known as cognitive restructuring, allows us to examine our fears objectively, identify irrational thoughts, and reframe our mindset to foster resilience and emotional stability.

        Moreover, journaling serves as a form of emotional release, reducing the intensity of anxious feelings. Studies have shown that people who write about their emotions experience lower levels of anxiety and improved mood regulation. Writing also allows individuals to track their triggers and recognize patterns in their anxiety episodes, helping them develop coping strategies over time. Whether it’s through gratitude journaling, free writing, or structured prompts, the simple act of journaling can significantly alleviate anxiety and improve overall mental well-being.`,
        image: "/blog2.jpg"
    },
    { 
        id: 3, 
        title: "Journaling & Emotional Intelligence", 
        preview: "How writing improves self-awareness...", 
        content: `Emotional intelligence (EQ) is the ability to recognize, understand, and manage our emotions while also being attuned to the emotions of others. Journaling enhances this skill by fostering self-awareness and emotional processing. When we write about our thoughts and feelings, we gain insights into our emotional triggers, behavioral patterns, and underlying motivations. This practice allows us to develop a deeper understanding of ourselves, leading to improved decision-making and interpersonal relationships.

        Additionally, journaling helps cultivate empathy and perspective-taking, key components of emotional intelligence. By reflecting on past interactions and our emotional responses, we can identify areas for growth and learn how to respond to situations more effectively. Over time, this practice builds emotional resilience, better communication skills, and a stronger ability to manage stress and conflict. Through consistent journaling, individuals can enhance their EQ, fostering both personal and professional growth.`,
        image: "/blog3.jpg"
    }
];


  const challenges = {
    journaling: {
        title: "Journaling Challenge 1",
        image: "/journaling.jpg",
        details: [
            "Day 1: Write your thoughts.",
            "Day 2: List 3 things you're grateful for.",
            "Day 3: Describe an ideal day.",
            "Day 4: Reflect on a past achievement.",
            "Day 5: Write about a lesson learned.",
            "Day 6: Set goals for the week.",
            "Day 7: Write a letter to your future self.",
            "Day 8: Describe a moment that changed your life.",
            "Day 9: Write about your happiest memory.",
            "Day 10: Identify something you need to let go of."
        ]
    },
    selfDiscovery: {
        title: "Self-Discovery Challenge 1",
        image: "/self-discovery.jpg",
        details: [
            "Day 1: Describe yourself in five words.",
            "Day 2: Write about a time you felt truly happy.",
            "Day 3: What are your core values?",
            "Day 4: If you could talk to your past self, what would you say?",
            "Day 5: What motivates you to keep going?",
            "Day 6: What is something you want to improve about yourself?",
            "Day 7: Write about a dream or aspiration you have.",
            "Day 8: What does success mean to you?",
            "Day 9: What do you love most about yourself?",
            "Day 10: Describe a perfect version of your future self."
        ]
    },
    mindfulness: {
        title: "Mindfulness Challenge 1",
        image: "/mindfulness.jpg",
        details: [
            "Day 1: Write about a moment today when you felt present.",
            "Day 2: What are 3 things you can see, hear, and feel right now?",
            "Day 3: Describe a place where you feel at peace.",
            "Day 4: What is something simple that brought you joy today?",
            "Day 5: Focus on your breath for 5 minutes and describe how you feel.",
            "Day 6: What is something in your life you take for granted?",
            "Day 7: How does nature make you feel?",
            "Day 8: Reflect on a time when you felt completely at ease.",
            "Day 9: What does self-care look like for you?",
            "Day 10: Describe the perfect relaxing day."
        ]
    },
    emotionalGrowth: {
        title: "Emotional Growth Challenge 1",
        image: "/emotional-growth.jpg",
        details: [
            "Day 1: Write about an emotion you struggled with recently.",
            "Day 2: How do you handle stress, and how could you improve?",
            "Day 3: Think of a time you forgave someone. How did it feel?",
            "Day 4: What is your biggest emotional strength?",
            "Day 5: What do you fear the most, and why?",
            "Day 6: Write about a situation that made you feel deeply understood.",
            "Day 7: What is something you wish more people knew about you?",
            "Day 8: What are some healthy ways you can express anger?",
            "Day 9: Write about a time when you had to be vulnerable.",
            "Day 10: What steps can you take to strengthen your emotional resilience?"
        ]
    },
    gratitude: {
        title: "Gratitude Challenge 1",
        image: "/gratitude.jpg",
        details: [
            "Day 1: List 5 things you're grateful for today.",
            "Day 2: Write about someone who has positively impacted your life.",
            "Day 3: Describe a challenge that made you stronger.",
            "Day 4: What is a simple pleasure you appreciate?",
            "Day 5: Reflect on a past hardship and the lessons you gained.",
            "Day 6: Write about something in your daily life you often overlook.",
            "Day 7: What is a kind act someone did for you recently?",
            "Day 8: How has gratitude helped you in difficult times?",
            "Day 9: Write a thank-you letter to someone (even if you don’t send it).",
            "Day 10: What does gratitude mean to you?"
        ]
    },
    selfLove: {
        title: "Self-Love Challenge 1",
        image: "/self-love.jpg",
        details: [
            "Day 1: List 3 things you love about yourself.",
            "Day 2: What is your favorite quality about yourself?",
            "Day 3: Write about a time you felt confident.",
            "Day 4: What are some self-care habits you want to maintain?",
            "Day 5: Describe how you would treat yourself as your own best friend.",
            "Day 6: What boundaries do you need to set for your well-being?",
            "Day 7: Write a love letter to yourself.",
            "Day 8: What makes you unique and special?",
            "Day 9: Reflect on how you’ve grown over the last year.",
            "Day 10: What is one step you can take to love yourself more today?"
        ]
    },
    goalSetting: {
        title: "Goal-Setting Challenge 1",
        image: "/goal-setting.jpg",
        details: [
            "Day 1: What are 3 goals you want to achieve this year?",
            "Day 2: Write about a past goal you successfully accomplished.",
            "Day 3: What motivates you to chase your dreams?",
            "Day 4: What daily habits can help you reach your goals?",
            "Day 5: Describe a challenge you anticipate and how you’ll overcome it.",
            "Day 6: What is a small step you can take toward your biggest goal?",
            "Day 7: Write about how achieving your goal will make you feel.",
            "Day 8: What distractions do you need to remove to stay focused?",
            "Day 9: How do you handle setbacks, and how can you improve?",
            "Day 10: Visualize your ideal future—what does it look like?"
        ]
    }
};


  const caseStudies = [
    { 
        id: 1, 
        name: "Leonardo da Vinci", 
        preview: "Inventor & artist who filled notebooks with ideas...", 
        content: `Leonardo da Vinci was not only one of the greatest artists of the Renaissance but also an extraordinary thinker, engineer, and scientist. His notebooks, which spanned thousands of pages, contained sketches, scientific studies, and philosophical musings, showcasing his insatiable curiosity about the world. He used these journals to explore everything from anatomy to engineering, drawing inventions that were centuries ahead of his time, including early designs for helicopters and tanks.

        What made Da Vinci's journaling unique was his ability to blend art and science seamlessly. He used mirror writing, a technique in which he wrote from right to left, possibly to keep his ideas secret or because he was left-handed. His observations on human anatomy were so precise that they influenced medical studies long after his time. His notes also contained deep reflections on nature, movement, and the mechanics of flight.

        Today, Leonardo's journals remain a testament to the power of curiosity and documentation. They show how journaling can be a tool for both creativity and innovation, helping to refine thoughts and ideas that can change the world. His work serves as an inspiration for modern-day inventors, scientists, and artists who seek to merge disciplines in groundbreaking ways.`,
        image: "/daVinci.jpg" 
    },
    { 
        id: 2, 
        name: "Marcus Aurelius", 
        preview: "Roman Emperor known for his journaling & philosophy...", 
        content: `Marcus Aurelius, the Roman Emperor from 161 to 180 AD, is best known for his philosophical reflections compiled in his personal journal, later published as *Meditations*. Unlike a book intended for public consumption, *Meditations* was a private collection of thoughts and Stoic wisdom that he wrote to guide himself in ruling an empire and maintaining personal discipline.

        His writings reveal a man deeply concerned with morality, self-improvement, and the fleeting nature of life. Through journaling, he reminded himself to stay humble, maintain control over emotions, and embrace challenges with resilience. Many of his thoughts, such as "You have power over your mind—not outside events. Realize this, and you will find strength," continue to be quoted as timeless wisdom.

        Marcus Aurelius’ journaling practice serves as an example of how writing can be a tool for self-reflection and emotional regulation. His ability to lead with wisdom and rationality, despite facing wars and personal tragedies, demonstrates the value of introspection. His writings remain a fundamental part of modern philosophy, inspiring leaders, thinkers, and individuals seeking personal growth.`,
        image: "/marcusAurelius.jpg" 
    },
    { 
        id: 3, 
        name: "Albert Einstein", 
        preview: "Physicist who kept detailed thought experiments and notes...", 
        content: `Albert Einstein relied heavily on journaling to develop his revolutionary theories. His notebooks were filled with equations, thought experiments, and philosophical musings that laid the groundwork for modern physics. The famous *Zurich Notebook*, where he first formulated ideas about general relativity, remains one of the most important scientific journals ever created.

        Einstein often wrote down complex problems, allowing his subconscious mind to work on them while he engaged in other activities, such as playing the violin or taking long walks. His habit of journaling and sketching ideas helped him develop groundbreaking insights that changed our understanding of space and time.

        His journals not only contained scientific breakthroughs but also personal reflections on war, peace, and human nature. Einstein’s method of continuously documenting his ideas illustrates the power of journaling in problem-solving and innovation. His legacy reminds us that writing down our thoughts can lead to some of the most profound discoveries in history.`,
        image: "/einstein.jpg" 
    },
    { 
        id: 4, 
        name: "Oprah Winfrey", 
        preview: "Talk show host and media mogul who journals for gratitude...", 
        content: `Oprah Winfrey has credited journaling as a key part of her personal growth and success. From a young age, she used writing as a way to process her emotions, set intentions, and practice gratitude. She has often spoken about how keeping a gratitude journal changed her perspective on life and helped her cultivate a positive mindset.

        Throughout her career, Oprah has encouraged others to use journaling as a tool for self-improvement and reflection. She believes that writing down her dreams, fears, and lessons has allowed her to manifest her goals and stay focused on her mission to uplift and empower people. Her journals document her journey from a struggling childhood to becoming one of the most influential women in the world.

        Oprah’s dedication to journaling proves that self-reflection is a powerful habit that can lead to clarity and resilience. She continues to advocate for journaling as a way to cultivate mindfulness, gratitude, and personal growth, inspiring millions to document their own journeys.`,
        image: "/oprah.jpg" 
    },
    { 
        id: 5, 
        name: "Thomas Edison", 
        preview: "Inventor who documented thousands of experiments...", 
        content: `Thomas Edison was one of the most prolific inventors in history, holding over 1,000 patents, and his success was largely due to his meticulous journaling. He kept detailed notebooks where he recorded every experiment, idea, and failure. His methodical documentation allowed him to refine his inventions, including the phonograph, the light bulb, and the motion picture camera.

        Edison’s journals not only helped him keep track of his ideas but also provided insight into his relentless work ethic. He believed in experimenting repeatedly until he found the right solution, famously stating, "I have not failed. I've just found 10,000 ways that won't work." His written records show his ability to learn from failure and continuously improve.

        Today, Edison's notebooks serve as historical artifacts that reveal the creative process behind innovation. His habit of rigorous documentation underscores the importance of journaling in scientific discovery and problem-solving.`,
        image: "/edison.jpg" 
    },
    { 
        id: 6, 
        name: "Benjamin Franklin", 
        preview: "Polymath who used journaling for self-improvement...", 
        content: `Benjamin Franklin was a strong advocate for self-improvement, and his personal journals reflected his dedication to lifelong learning. He created a system for tracking his virtues, where he would evaluate his daily behavior to strive for moral perfection. This structured journaling approach helped him stay disciplined and continuously improve.

        Franklin's journals contained reflections on politics, inventions, and personal philosophies. His famous *Poor Richard’s Almanack* was a collection of wisdom drawn from his observations and experiences, which influenced generations. He also used his writing to plan goals, record ideas, and analyze his successes and failures.

        Franklin's legacy as a writer, inventor, and statesman was deeply tied to his habit of journaling. His belief in the power of self-reflection continues to inspire individuals who seek to better themselves through daily writing and thoughtful analysis.`,
        image: "/franklin.jpg" 
    },
    { 
        id: 7, 
        name: "Steve Jobs", 
        preview: "Apple founder who journaled for creativity and vision...", 
        content: `Steve Jobs believed that journaling was essential for clarity and creative vision. He often wrote down his thoughts, reflections, and ideas about design, technology, and innovation. His ability to put his ideas on paper helped him shape Apple into one of the most influential companies in history.

        Jobs used journaling as a way to refine his thinking, often sketching out ideas and reflecting on his leadership decisions. His journals played a crucial role in product development, including the iPhone and Mac.

        His practice of self-reflection and writing continues to inspire entrepreneurs and innovators today. Jobs demonstrated how journaling can help refine ideas, challenge conventional thinking, and create groundbreaking innovations.`,
        image: "/steveJobs.jpg" 
    },
    {
      id: 8,
      name: "Brian Etemad",
      preview: "Real estate expert who journals for vision and leadership...",
      content: `Brian Etemad, a highly respected entrepreneur and real estate expert, has built a successful career through strategic planning and visionary leadership. Known for his work in international real estate, Etemad understands the importance of documenting insights, tracking market trends, and refining investment strategies. His habit of journaling plays a crucial role in his decision-making process, allowing him to stay ahead in a competitive industry.
  
      Etemad uses his journals not only to organize business strategies but also to reflect on personal growth and leadership principles. By writing down his thoughts, he gains clarity on complex deals and negotiations, ensuring that he makes well-informed choices. His documentation process allows him to track past successes and challenges, helping him continuously refine his approach.
  
      His commitment to journaling highlights the power of writing as a tool for both business and self-improvement. By keeping meticulous records of his experiences, Brian Etemad has been able to build a career based on resilience, calculated risk-taking, and innovative thinking. His success serves as an inspiration for aspiring entrepreneurs looking to enhance their strategic mindset through journaling.`,
      image: "/brianEtemad.jpg"

    },
    {
      id: 9,
      name: "Anne Frank",
      preview: "Her diary became one of history’s most important journals...",
      content: `Anne Frank’s *The Diary of a Young Girl* remains one of the most powerful and widely read personal journals in history. While hiding from the Nazis during World War II, Anne documented her thoughts, fears, and emotions, creating an intimate portrait of a young girl struggling to find hope in the darkest of times. Her diary, which she affectionately named “Kitty,” became her trusted companion, helping her process the hardships of life in hiding.
  
      Despite the horrors surrounding her, Anne used journaling as an outlet for self-reflection and emotional expression. She wrote about her aspirations, her belief in humanity, and her desire to become a writer. Her diary showcased remarkable maturity and wisdom for someone so young, offering profound insights into resilience, hope, and personal growth.
  
      Today, Anne Frank’s diary stands as a testament to the power of journaling as a historical and emotional record. Her words continue to inspire millions, serving as a reminder of the importance of documenting one’s experiences, no matter the circumstances. Her legacy is proof that even in the face of unimaginable adversity, writing can offer solace and preserve the human spirit.`,
      image: "/anneFrank.jpg"

    },
    {
      id: 10,
      name: "Richard Branson",
      preview: "Entrepreneur who journals to capture business ideas...",
      content: `Richard Branson, the billionaire entrepreneur behind Virgin Group, has always credited journaling as one of his biggest success habits. He carries a notebook with him everywhere, using it to write down ideas, lessons from meetings, and personal reflections. His journals have played a key role in shaping his businesses, allowing him to capture innovative ideas and execute them effectively.
  
      Branson believes that writing down thoughts is essential for clarity and execution. Many of his business ventures, including Virgin Airlines and Virgin Galactic, started as simple notes in his journal. He also uses journaling as a tool for personal development, reflecting on leadership, decision-making, and ways to improve both himself and his companies.
  
      His habit of documenting ideas and experiences has helped him remain one of the most innovative and adventurous entrepreneurs of our time. Branson encourages others to adopt journaling as a way to improve productivity, creativity, and decision-making. His success serves as a reminder that some of the best ideas start with a simple note on paper.`,
      image: "/richardBranson.jpg"

    }
];


  const walkthrough = [
    { section: "Introduction", details: "Start with a brief introduction about yourself and your journaling journey. Explain why you decided to start journaling and what you hope to achieve." },
    { section: "Daily Prompts", details: "Include a section for daily prompts or questions to guide your writing. These prompts can be related to gratitude, self-reflection, goal-setting, or any other theme you want to explore." },
    { section: "Quotes & Inspiration", details: "Incorporate motivational quotes, affirmations, or inspiring stories to keep you motivated and engaged with your journal. These can serve as prompts for deeper reflection." },
    { section: "Goal Tracking", details: "Set aside space to track your short-term and long-term goals. Write down your progress, setbacks, and action plans to help you stay focused and accountable." },
    { section: "Reflection & Evaluation", details: "At the end of each week or month, take time to reflect on your experiences, emotions, and lessons learned. Evaluate your growth and identify areas for improvement." },
    { section: "Creative Expression", details: "Include pages for creative expression, such as doodling, sketching, or collaging. Use this space to unleash your creativity and explore different forms of self-expression." },
    { section: "Gratitude Journaling", details: "Dedicate a section to gratitude journaling, where you write down things you're thankful for each day. Practicing gratitude can boost your mood and overall well-being." },
    { section: "Self-Care & Wellness", details: "Integrate self-care practices into your journal, such as mindfulness exercises, affirmations, or reflections on your mental and physical health. Prioritize your well-being." },
    { section: "Weekly Challenges", details: "Include weekly challenges or prompts to push yourself out of your comfort zone and try new things. These challenges can help you grow and develop new skills." },
    { section: "Conclusion & Reflection", details: "End your journal with a conclusion that summarizes your key takeaways, insights, and goals for the future. Reflect on your journaling journey and celebrate your progress." }
];


  return (
    <div className="discover-container">
      <div className="tabs">
        <button onClick={() => setActiveTab("psychology")} className={activeTab === "psychology" ? "active" : ""}>Psychology</button>
        <button onClick={() => setActiveTab("challenges")} className={activeTab === "challenges" ? "active" : ""}>7-Day Challenges</button>
        <button onClick={() => setActiveTab("templates")} className={activeTab === "templates" ? "active" : ""}>Guided Journal Templates</button>
        <button onClick={() => setActiveTab("caseStudies")} className={activeTab === "caseStudies" ? "active" : ""}>Case Studies</button>
        <button onClick={() => setActiveTab("walkthrough")} className={activeTab === "walkthrough" ? "active" : ""}>Walkthrough</button>
        <button onClick={() => setActiveTab("video")} className={activeTab === "video" ? "active" : ""}>Inspiring Video</button>
      </div>

     
      {activeTab === "psychology" && (
        <div className="grid">
          {psychologyBlogs.map((blog) => (
            <div key={blog.id} className="blog-card" onClick={() => setSelectedContent(blog)}>
              <img src={blog.image} alt={blog.title} />
              <h3>{blog.title}</h3>
              <p>{blog.preview}</p>
            </div>
          ))}
        </div>
      )}

 
  {activeTab === "challenges" && (
  <div className="challenge-section">
    {Object.keys(challenges).map((key) => (
      <div key={key} className="challenge-card" onClick={() => setSelectedContent(challenges[key])}>
        <img src={challenges[key].image} alt={challenges[key].title} />
        <h3>{challenges[key].title}</h3>
      </div>
    ))}
  </div>
)}


  
{activeTab === "caseStudies" && (
  <div className="grid">
    {caseStudies.map((person) => (
      <div key={person.id} className="blog-card" onClick={() => setSelectedContent(person)}>
        <img src={person.image} alt={person.name} />
        <h3>{person.name}</h3>
        <p>{person.preview}</p>
      </div>
    ))}
  </div>
)}


{selectedContent && (
  <div className="popup" onClick={() => setSelectedContent(null)}> 
    <div className={`popup-content ${activeTab === "challenges" ? "challenge-details" : ""}`} onClick={(e) => e.stopPropagation()}> 
      {selectedContent.image && <img src={selectedContent.image} alt={selectedContent.title || selectedContent.name} />}
      <h2>{selectedContent.title || selectedContent.name}</h2>
      {activeTab === "challenges" && selectedContent.details ? (
        <ul>
          {selectedContent.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      ) : (
        <p>{selectedContent.content}</p>
      )}
      <button className="close-btn" onClick={() => setSelectedContent(null)}>Close</button>
    </div>
  </div>
)}


    
      {activeTab === "walkthrough" && (
        <div className="walkthrough-section">
          <h2>📝 How to Write Your Journal</h2>
          <ul>
            {walkthrough.map((item, index) => (
              <li key={index}>
                <strong>{item.section}:</strong> {item.details}
              </li>
            ))}
          </ul>
        </div>
      )}

     
      {activeTab === "video" && (
        <div className="video-section">
          <h2>🎥 How Journaling Changes Lives</h2>
          <iframe 
            width="100%" 
            height="400" 
            src="https://www.youtube.com/embed/dArgOrm98Bk" 
            title="Journaling Video"
            frameBorder="0"
            allowFullScreen>
          </iframe>
        </div>
      )}

     
    </div>
  );
};

export default Discover;