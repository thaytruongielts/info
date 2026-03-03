/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, RefreshCcw, BookOpen, Trophy, ChevronRight, ChevronLeft } from 'lucide-react';

interface Question {
  id: number;
  topic: string;
  passage: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    id: 1,
    topic: "Sinh học (Biology)",
    passage: "While human beings spend roughly a third of their lives sleeping, the sleep patterns of other animals vary wildly. For instance, giraffes only require about two hours of sleep per day, often taken in quick five-minute naps. Conversely, the brown bat sleeps for an astonishing 19.9 hours a day. These variations are largely determined by an animal's diet, its vulnerability to predators, and its metabolic rate.",
    question: "According to the paragraph, what primarily influences the varying sleep patterns of animals?",
    options: [
      "A) The specific region where the animal lives.",
      "B) The animal's physical size and weight.",
      "C) Factors like food source, danger from predators, and metabolism.",
      "D) The number of hours of daylight in their habitat."
    ],
    correctAnswer: "C"
  },
  {
    id: 2,
    topic: "Lịch sử (History)",
    passage: "The Roman aqueducts are marvels of ancient engineering. Rather than relying on pumps, Roman engineers utilized gravity to transport water across vast distances. By maintaining a incredibly precise, shallow downward gradient, water from freshwater springs in the mountains could flow continuously into cities to supply public baths, fountains, and private households.",
    question: "How did the Romans manage to transport water over long distances?",
    options: [
      "A) By utilizing complex pumping mechanisms.",
      "B) By creating a slight, continuous downward slope.",
      "C) By transporting water manually from mountains.",
      "D) By building tall towers to store rainwater."
    ],
    correctAnswer: "B"
  },
  {
    id: 3,
    topic: "Công nghệ (Technology)",
    passage: "Artificial Intelligence (AI) is increasingly being adopted in the medical field to assist with diagnostics. By training algorithms on vast datasets of medical images, AI can now detect anomalies such as early-stage tumors with an accuracy rate that sometimes surpasses human radiologists. However, experts stress that AI should be used as a supplementary tool rather than a replacement for human judgment.",
    question: "What is the main point of the paragraph regarding AI in medicine?",
    options: [
      "A) AI will completely replace human radiologists in the near future.",
      "B) AI is currently only used for theoretical research, not real patients.",
      "C) AI is less accurate than human doctors when examining medical images.",
      "D) AI is a highly accurate tool that should assist, but not replace, doctors."
    ],
    correctAnswer: "D"
  },
  {
    id: 4,
    topic: "Môi trường (Environment)",
    passage: "Coral bleaching occurs when corals are stressed by changes in conditions such as temperature, light, or nutrients. In response to this stress, they expel the symbiotic algae living in their tissues, causing them to turn completely white. While a bleached coral is not strictly dead, it is under immense stress and is subject to increased mortality if normal conditions do not return swiftly.",
    question: "What is the immediate cause of coral turning white?",
    options: [
      "A) A sudden drop in ocean temperatures.",
      "B) The death of the coral organism itself.",
      "C) The expulsion of algae from the coral's tissues.",
      "D) An overabundance of nutrients in the water."
    ],
    correctAnswer: "C"
  },
  {
    id: 5,
    topic: "Tâm lý học (Psychology)",
    passage: "The placebo effect is a fascinating psychological phenomenon wherein a patient experiences a real improvement in their condition after receiving a treatment with no active therapeutic properties, such as a sugar pill. This improvement is driven by the patient's belief and expectation that the treatment will work, highlighting the powerful connection between the mind and the body's healing processes.",
    question: "The placebo effect demonstrates that:",
    options: [
      "A) Sugar pills contain hidden medical benefits.",
      "B) A patient's expectations can physically affect their health.",
      "C) Medical treatments are usually unnecessary.",
      "D) Doctors often deceive their patients for no reason."
    ],
    correctAnswer: "B"
  },
  {
    id: 6,
    topic: "Không gian (Space)",
    passage: "An exoplanet is a planet located outside of our solar system, orbiting a star other than the Sun. The discovery of exoplanets has surged in recent decades thanks to advanced telescopes like Kepler. Astronomers are particularly interested in finding \"Goldilocks planets\"—exoplanets situated in the habitable zone of their star, where conditions are just right for liquid water to exist.",
    question: "Why are astronomers highly interested in \"Goldilocks planets\"?",
    options: [
      "A) They are made entirely of gold and precious metals.",
      "B) They are the closest planets to our own solar system.",
      "C) Their location might allow for the presence of liquid water.",
      "D) They orbit stars that are identical to our Sun."
    ],
    correctAnswer: "C"
  },
  {
    id: 7,
    topic: "Nghệ thuật (Arts)",
    passage: "Impressionism emerged in 19th-century France as a rebellion against traditional, realistic painting rules. Rather than focusing on exact details, Impressionist artists like Claude Monet aimed to capture the fleeting sensory effect of a scene—the \"impression\" that objects made on the eye in a fleeting instant, utilizing short, visible brushstrokes and an emphasis on the accurate depiction of light.",
    question: "Which of the following is a key characteristic of Impressionist painting?",
    options: [
      "A) Strict adherence to traditional painting rules.",
      "B) A focus on capturing the temporary effects of light.",
      "C) Painting with completely invisible brushstrokes.",
      "D) Depicting objects with photographic realism."
    ],
    correctAnswer: "B"
  },
  {
    id: 8,
    topic: "Kinh tế (Economics)",
    passage: "Inflation is an economic term that refers to the general increase in prices and fall in the purchasing value of money. When inflation occurs, a single unit of currency buys fewer goods and services than it did previously. Central banks typically try to limit inflation to a manageable rate, usually around 2%, to keep the economy growing without diminishing consumers' purchasing power too rapidly.",
    question: "What is a direct consequence of inflation?",
    options: [
      "A) The value of money decreases.",
      "B) Goods and services become cheaper.",
      "C) Consumers can buy more with the same amount of money.",
      "D) Central banks stop printing money."
    ],
    correctAnswer: "A"
  },
  {
    id: 9,
    topic: "Xã hội học (Sociology)",
    passage: "Urbanization—the population shift from rural to urban areas—has accelerated globally since the Industrial Revolution. People often migrate to cities in search of better employment opportunities, education, and healthcare. However, rapid urbanization can also lead to significant challenges, including the rise of slums, severe traffic congestion, and increased pollution due to inadequate infrastructure.",
    question: "According to the text, what is one negative outcome of rapid urbanization?",
    options: [
      "A) A lack of employment opportunities in cities.",
      "B) The improvement of rural healthcare.",
      "C) Environmental pollution and strained infrastructure.",
      "D) A decrease in global population."
    ],
    correctAnswer: "C"
  },
  {
    id: 10,
    topic: "Ngôn ngữ học (Linguistics)",
    passage: "Linguists estimate that a language dies out roughly every two weeks. Language extinction happens when a community gradually shifts to using a more dominant language, often for economic or social reasons. When a language is lost, humanity loses not just a system of communication, but also the unique cultural history, indigenous knowledge, and worldview embedded within that language.",
    question: "What is lost alongside a language when it goes extinct?",
    options: [
      "A) The dominant language of the region.",
      "B) Economic opportunities for the speakers.",
      "C) The unique cultural heritage and knowledge of the speakers.",
      "D) The ability of the community to learn a new language."
    ],
    correctAnswer: "C"
  },
  {
    id: 11,
    topic: "Địa chất học (Geology)",
    passage: "The theory of plate tectonics states that the Earth's solid outer crust, the lithosphere, is separated into plates that move over the asthenosphere, the molten upper portion of the mantle. As these massive plates interact at their boundaries, they can cause earthquakes, volcanic activity, and the formation of mountain ranges, fundamentally shaping the planet's surface over millions of years.",
    question: "What causes the formation of mountains and earthquakes?",
    options: [
      "A) The cooling of the Earth's core.",
      "B) The interaction of tectonic plates at their edges.",
      "C) The melting of the Earth's solid outer crust.",
      "D) The stationary nature of the asthenosphere."
    ],
    correctAnswer: "B"
  },
  {
    id: 12,
    topic: "Kiến trúc (Architecture)",
    passage: "Brutalism is an architectural style that emerged in the mid-20th century, characterized by massive, monolithic, and 'blocky' appearances with a rigid geometric style and large-scale use of poured concrete. Although often criticized for being cold and imposing, supporters of Brutalism appreciate its honesty in displaying building materials and structural elements without decorative facades.",
    question: "Why do some people appreciate Brutalist architecture?",
    options: [
      "A) Because of its warm and welcoming appearance.",
      "B) Due to its heavy use of colorful decorations.",
      "C) Because it honestly displays its materials and structure.",
      "D) Because it resembles classical Roman buildings."
    ],
    correctAnswer: "C"
  },
  {
    id: 13,
    topic: "Y học (Medicine)",
    passage: "The discovery of penicillin by Alexander Fleming in 1928 revolutionized modern medicine. Before antibiotics, minor cuts and straightforward bacterial infections were frequently fatal. Fleming accidentally discovered that a mold called Penicillium notatum secreted a substance that killed surrounding bacteria. This serendipitous event paved the way for the mass production of antibiotics during World War II.",
    question: "How did Fleming discover the antibacterial properties of penicillin?",
    options: [
      "A) Through years of targeted, intentional research.",
      "B) By observing the effects of antibiotics in World War II.",
      "C) By accident, when he noticed mold killing bacteria.",
      "D) By testing different chemicals on minor cuts."
    ],
    correctAnswer: "C"
  },
  {
    id: 14,
    topic: "Thực vật học (Botany)",
    passage: "Unlike most plants that draw nutrients entirely from soil, carnivorous plants have adapted to thrive in nutrient-poor environments, like bogs, by trapping and consuming insects. The Venus flytrap, for example, uses modified leaves that snap shut when trigger hairs are touched. Enzymes are then secreted to digest the prey, providing the plant with essential nitrogen and phosphorus.",
    question: "Why do carnivorous plants consume insects?",
    options: [
      "A) To protect themselves from being eaten.",
      "B) To obtain nutrients that are missing from their environment.",
      "C) Because they lack roots to absorb water.",
      "D) To spread their seeds over a wider area."
    ],
    correctAnswer: "B"
  },
  {
    id: 15,
    topic: "Thiên văn học (Astronomy)",
    passage: "A black hole is a region of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it. They are typically formed when massive stars collapse at the end of their life cycle. Because no light can escape, black holes are invisible to the human eye and can only be detected by observing their gravitational effect on nearby matter.",
    question: "How do scientists detect black holes if they are invisible?",
    options: [
      "A) By sending probes into the center of the black hole.",
      "B) By measuring the light emitted from the black hole itself.",
      "C) By observing their gravitational pull on surrounding objects.",
      "D) By looking for stars that are expanding."
    ],
    correctAnswer: "C"
  },
  {
    id: 16,
    topic: "Nhân chủng học (Anthropology)",
    passage: "Studies of modern hunter-gatherer societies suggest that our early human ancestors had diets that were highly diverse and dependent on local geography. While those in colder climates relied heavily on meat and fish, groups in tropical regions consumed a vast array of plant foods, fruits, and nuts. Therefore, the popular concept of a single, universal \"Paleo diet\" heavily skewed towards meat is historically inaccurate.",
    question: "What does the paragraph conclude about the \"Paleo diet\"?",
    options: [
      "A) It was exclusively based on meat and fish.",
      "B) It is a highly accurate representation of early human eating habits.",
      "C) Early humans only ate fruits and nuts.",
      "D) The idea of one universal early human diet is a misconception."
    ],
    correctAnswer: "D"
  },
  {
    id: 17,
    topic: "Âm nhạc (Music)",
    passage: "The \"Mozart effect\" refers to a brief enhancement of spatial-temporal reasoning performance following the listening of Mozart's music. Originally reported in a 1993 study, the media quickly sensationalized the findings, claiming that listening to classical music makes children smarter. However, subsequent psychological research has shown that the effect is temporary and likely due to an overall boost in mood and arousal, rather than a permanent increase in intelligence.",
    question: "What does recent research suggest about the \"Mozart effect\"?",
    options: [
      "A) It permanently increases a child's IQ.",
      "B) It is a temporary result of improved mood, not a sign of increased intelligence.",
      "C) It only works with music composed by Mozart, not other classical composers.",
      "D) It decreases spatial-temporal reasoning."
    ],
    correctAnswer: "B"
  },
  {
    id: 18,
    topic: "Thể thao (Sports)",
    passage: "Many elite endurance athletes utilize altitude training to improve their performance. At high altitudes, the air contains less oxygen. In response, the human body produces more red blood cells to compensate for the oxygen deficit. When the athlete returns to sea level to compete, this increased red blood cell count allows for better oxygen transport to the muscles, significantly enhancing their stamina.",
    question: "How does altitude training benefit athletes?",
    options: [
      "A) It teaches them to breathe less frequently.",
      "B) It decreases their heart rate at sea level.",
      "C) It boosts the production of red blood cells, improving oxygen transport.",
      "D) It makes their muscles larger and physically stronger."
    ],
    correctAnswer: "C"
  },
  {
    id: 19,
    topic: "Kinh doanh (Business)",
    passage: "The rapid growth of e-commerce has fundamentally disrupted the traditional retail landscape. Brick-and-mortar stores are facing intense pressure as consumers increasingly prefer the convenience, broader selection, and often lower prices found online. To survive, many physical retailers are adopting an \"omnichannel\" strategy, seamlessly integrating their physical storefronts with strong digital platforms and delivery services.",
    question: "How are traditional stores attempting to survive the rise of e-commerce?",
    options: [
      "A) By completely shutting down their physical stores.",
      "B) By raising their prices to cover losses.",
      "C) By combining their physical presence with online services.",
      "D) By offering a smaller selection of goods."
    ],
    correctAnswer: "C"
  },
  {
    id: 20,
    topic: "Hóa học (Chemistry)",
    passage: "Graphene is a single layer of carbon atoms arranged in a two-dimensional honeycomb lattice. Despite being only one atom thick, it is incredibly strong—about 200 times stronger than steel—yet highly flexible and exceptionally light. Furthermore, it is an excellent conductor of both heat and electricity, making it a highly sought-after material for the future development of advanced electronics and renewable energy technologies.",
    question: "Which of the following is NOT mentioned as a property of graphene?",
    options: [
      "A) It is thicker than steel.",
      "B) It is extremely flexible.",
      "C) It conducts electricity well.",
      "D) It is very strong."
    ],
    correctAnswer: "A"
  }
];

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(new Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    if (submitted) return;
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setSubmitted(false);
  };

  const calculateScore = () => {
    const correctCount = userAnswers.reduce((count, answer, index) => {
      return answer === questions[index].correctAnswer ? count + 1 : count;
    }, 0);
    return (10 * correctCount) / questions.length;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const score = calculateScore();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-stone-900 flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-emerald-600" />
              IELTS Reading Practice
            </h1>
            <p className="text-stone-500 mt-1">20 Questions • Various Topics</p>
          </div>
          {submitted && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50 border border-emerald-200 rounded-2xl px-6 py-3 flex items-center gap-4"
            >
              <Trophy className="w-6 h-6 text-emerald-600" />
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-emerald-600">Your Score</p>
                <p className="text-2xl font-bold text-emerald-900">{score.toFixed(1)} / 10</p>
              </div>
            </motion.div>
          )}
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Question Navigation Sidebar */}
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-4 sticky top-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-400 mb-4 px-2">Questions</h3>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`
                      w-full aspect-square rounded-lg text-sm font-medium transition-all flex items-center justify-center
                      ${currentQuestionIndex === idx ? 'ring-2 ring-emerald-500 ring-offset-2' : ''}
                      ${submitted 
                        ? userAnswers[idx] === q.correctAnswer 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : userAnswers[idx] === null 
                            ? 'bg-stone-100 text-stone-400'
                            : 'bg-rose-100 text-rose-700'
                        : userAnswers[idx] !== null 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}
                    `}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              {!submitted && (
                <button
                  onClick={handleSubmit}
                  disabled={userAnswers.some(a => a === null)}
                  className="w-full mt-6 bg-stone-900 text-white py-3 rounded-xl font-semibold hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Quiz
                </button>
              )}
              {submitted && (
                <button
                  onClick={resetQuiz}
                  className="w-full mt-6 border border-stone-200 text-stone-600 py-3 rounded-xl font-semibold hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Try Again
                </button>
              )}
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-9 order-1 lg:order-2 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Passage Card */}
                <section className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
                  <div className="bg-stone-50 px-6 py-3 border-b border-stone-200 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">{currentQuestion.topic}</span>
                    <span className="text-xs font-medium text-stone-400">Passage {currentQuestion.id}</span>
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="text-lg leading-relaxed text-stone-700 italic font-serif">
                      "{currentQuestion.passage}"
                    </p>
                  </div>
                </section>

                {/* Question Card */}
                <section className="bg-white rounded-3xl shadow-sm border border-stone-200 p-6 md:p-8 space-y-6">
                  <h2 className="text-xl font-bold text-stone-900">
                    {currentQuestion.question}
                  </h2>

                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => {
                      const optionLetter = option.charAt(0);
                      const isSelected = userAnswers[currentQuestionIndex] === optionLetter;
                      const isCorrect = optionLetter === currentQuestion.correctAnswer;
                      
                      let buttonClass = "w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ";
                      
                      if (submitted) {
                        if (isSelected) {
                          buttonClass += isCorrect 
                            ? "bg-emerald-50 border-emerald-500 text-emerald-900" 
                            : "bg-rose-50 border-rose-500 text-rose-900";
                        } else if (isCorrect) {
                          buttonClass += "bg-emerald-50 border-emerald-200 text-emerald-900";
                        } else {
                          buttonClass += "bg-white border-stone-100 text-stone-400 opacity-50";
                        }
                      } else {
                        buttonClass += isSelected 
                          ? "bg-emerald-50 border-emerald-500 text-emerald-900" 
                          : "bg-white border-stone-100 hover:border-emerald-200 hover:bg-emerald-50/30 text-stone-700";
                      }

                      return (
                        <button
                          key={option}
                          disabled={submitted}
                          onClick={() => handleAnswerSelect(optionLetter)}
                          className={buttonClass}
                        >
                          <span className="flex-1">{option}</span>
                          {submitted && isSelected && (
                            isCorrect 
                              ? <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                              : <XCircle className="w-6 h-6 text-rose-500 flex-shrink-0" />
                          )}
                          {submitted && !isSelected && isCorrect && (
                            <CheckCircle2 className="w-6 h-6 text-emerald-300 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl font-medium text-center ${
                        userAnswers[currentQuestionIndex] === currentQuestion.correctAnswer
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {userAnswers[currentQuestionIndex] === currentQuestion.correctAnswer
                        ? "Correct! Well done."
                        : `Incorrect. The correct answer is ${currentQuestion.correctAnswer}.`}
                    </motion.div>
                  )}
                </section>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-stone-600 hover:bg-stone-100 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
              <div className="text-sm font-bold text-stone-400">
                {currentQuestionIndex + 1} / {questions.length}
              </div>
              <button
                onClick={nextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-stone-600 hover:bg-stone-100 disabled:opacity-30 transition-colors"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
