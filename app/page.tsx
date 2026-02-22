'use client';

import { useState } from 'react';

type Personality = 'bold' | 'sweet' | 'practical' | 'artisan';

interface Option {
  icon: string;
  text: string;
  personality: Personality;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Your ideal weekend morning involves...",
    options: [
      { icon: "⚡", text: "Extreme sports or a challenging hike", personality: "bold" },
      { icon: "🧁", text: "Brunch with mimosas and pastries", personality: "sweet" },
      { icon: "📋", text: "Catching up on errands efficiently", personality: "practical" },
      { icon: "🎨", text: "Farmers market for artisanal finds", personality: "artisan" }
    ]
  },
  {
    id: 2,
    text: "If you were a Netflix show, you'd be...",
    options: [
      { icon: "🔥", text: "Squid Game - intense and bold", personality: "bold" },
      { icon: "💝", text: "Emily in Paris - sweet and indulgent", personality: "sweet" },
      { icon: "📊", text: "Suits - practical and efficient", personality: "practical" },
      { icon: "🍷", text: "Chef's Table - refined and particular", personality: "artisan" }
    ]
  },
  {
    id: 3,
    text: "Your travel style is...",
    options: [
      { icon: "🏔️", text: "Backpacking off the beaten path", personality: "bold" },
      { icon: "🏖️", text: "All-inclusive resort, full relaxation", personality: "sweet" },
      { icon: "✈️", text: "Direct flights, planned itinerary", personality: "practical" },
      { icon: "🗺️", text: "Boutique hotels, local hidden gems", personality: "artisan" }
    ]
  },
  {
    id: 4,
    text: "If you were a dessert, you'd be...",
    options: [
      { icon: "🌶️", text: "Spicy chocolate - bold kick", personality: "bold" },
      { icon: "🍩", text: "Glazed donut - pure sweetness", personality: "sweet" },
      { icon: "🍦", text: "Vanilla - simple, gets the job done", personality: "practical" },
      { icon: "🍰", text: "Handmade tiramisu - crafted perfection", personality: "artisan" }
    ]
  },
  {
    id: 5,
    text: "Your morning alarm strategy...",
    options: [
      { icon: "⏰", text: "One alarm, up immediately", personality: "bold" },
      { icon: "😴", text: "Snooze button enthusiast", personality: "sweet" },
      { icon: "📱", text: "Exactly when needed, no earlier", personality: "practical" },
      { icon: "☕", text: "Wake naturally, perfect routine", personality: "artisan" }
    ]
  },
  {
    id: 6,
    text: "If you could have one superpower...",
    options: [
      { icon: "💪", text: "Super strength - conquer anything", personality: "bold" },
      { icon: "🎁", text: "Make anyone happy instantly", personality: "sweet" },
      { icon: "⚡", text: "Teleportation - save time", personality: "practical" },
      { icon: "🎭", text: "Perfect taste in everything", personality: "artisan" }
    ]
  }
];

const personalityResults = {
  bold: {
    name: "Bold Adventurer",
    coffee: "Double Espresso",
    tagline: "You live for intensity",
    description: "For those who embrace bold experiences and aren't afraid of a caffeine kick"
  },
  sweet: {
    name: "Sweet Enthusiast",
    coffee: "Caramel Latte",
    tagline: "Life's too short for bitter",
    description: "You appreciate the sweeter things in life and believe coffee should be a treat"
  },
  practical: {
    name: "Practical Pragmatist",
    coffee: "Large Drip, Whatever's Fresh",
    tagline: "Just make it work",
    description: "Efficiency is key. You want good coffee that gets the job done"
  },
  artisan: {
    name: "Artisan Snob",
    coffee: "Pour-Over, Single Origin",
    tagline: "You know what you like",
    description: "Sophisticated palate, particular about quality and craft"
  }
};

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Personality[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleAnswer = (personality: Personality) => {
    const newAnswers = [...answers, personality];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const calculateResult = (): Personality => {
    const counts = { bold: 0, sweet: 0, practical: 0, artisan: 0 };
    answers.forEach(answer => counts[answer]++);

    let maxCount = 0;
    let result: Personality = 'bold';

    (Object.keys(counts) as Personality[]).forEach(key => {
      if (counts[key] > maxCount) {
        maxCount = counts[key];
        result = key;
      }
    });

    return result;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsComplete(false);
    setHasStarted(false);
  };

  // Welcome Screen
  if (!hasStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5" style={{
        background: 'linear-gradient(135deg, #d4a574 0%, #c9916b 50%, #a67c52 100%)'
      }}>
        <div className="max-w-xl w-full bg-[#f9f5f0] rounded-2xl p-12 shadow-2xl text-center">
          <h1 className="text-5xl font-normal text-[#5d4037] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            ☕ Your Coffee Journey
          </h1>
          <p className="text-xl text-[#8d6e63] mb-8 italic" style={{ fontFamily: 'Georgia, serif' }}>
            Discover what makes you unique
          </p>
          <p className="text-lg text-[#5d4037] mb-8 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
            Answer 6 quick questions to discover your coffee personality and find your perfect brew.
          </p>
          <button
            onClick={() => setHasStarted(true)}
            className="bg-[#d4a574] text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-[#c9916b] transition-all transform hover:scale-105 shadow-lg"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Results Screen
  if (isComplete) {
    const resultKey = calculateResult();
    const result = personalityResults[resultKey];

    return (
      <div className="min-h-screen flex items-center justify-center p-5" style={{
        background: 'linear-gradient(135deg, #d4a574 0%, #c9916b 50%, #a67c52 100%)'
      }}>
        <div className="max-w-xl w-full bg-[#f9f5f0] rounded-2xl p-12 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-normal text-[#5d4037] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              You're a
            </h2>
            <h1 className="text-5xl font-medium text-[#d4a574] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              {result.name}
            </h1>
            <p className="text-xl text-[#8d6e63] italic mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              {result.tagline}
            </p>
          </div>

          <div className="bg-white border-2 border-[#e6d5c3] rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-normal text-[#5d4037] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              ☕ Your Coffee
            </h3>
            <p className="text-3xl font-medium text-[#d4a574] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              {result.coffee}
            </p>
            <p className="text-lg text-[#5d4037] leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
              {result.description}
            </p>
          </div>

          <button
            onClick={resetQuiz}
            className="w-full bg-[#d4a574] text-white px-6 py-4 rounded-xl text-lg font-medium hover:bg-[#c9916b] transition-all shadow-lg"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  // Question Screen
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen flex items-center justify-center p-5" style={{
      background: 'linear-gradient(135deg, #d4a574 0%, #c9916b 50%, #a67c52 100%)'
    }}>
      <div className="max-w-xl w-full bg-[#f9f5f0] rounded-2xl p-10 shadow-2xl">
        <div className="mb-6">
          <p className="text-sm text-[#8d6e63] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <div className="w-full bg-[#e6d5c3] rounded-full h-2">
            <div
              className="bg-[#d4a574] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <h2 className="text-2xl font-normal text-[#5d4037] mb-8" style={{ fontFamily: 'Georgia, serif' }}>
          {question.text}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.personality)}
              className="w-full bg-white border-2 border-[#d4a574] rounded-xl p-4 text-left hover:bg-[#d4a574] hover:text-white transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg group flex items-center"
            >
              <span className="text-2xl mr-4 flex-shrink-0">{option.icon}</span>
              <span className="text-base text-[#5d4037] group-hover:text-white">
                {option.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
