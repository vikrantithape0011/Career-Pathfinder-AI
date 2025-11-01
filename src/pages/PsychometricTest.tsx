import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Save, Brain, Target, Layout, Users, Calculator, BookOpen, Palette, HandHeart, Crown, Clock, AlertCircle, Keyboard, Flag } from 'lucide-react';
import { assessment } from '../data/assessment';
import { images } from '../assets/images/index';
import type { TestState, Question, Section } from '../types/assessment';
import TestResults from '../components/TestResults';
import TestNavbar from '../components/TestNavbar';
import { QuestionRandomizer } from '../utils/questionRandomizer';
import { motion } from 'framer-motion';
import { SvgImage } from '../components/SvgImage';
import axios from 'axios';
import { ScoreCalculator, AbilityScores, OrientationScores } from '../utils/ScoreCalculator';
import { tests } from '../services/api';

interface TestResultsState {
  [key: string]: Array<{
    questionId: string;
    selectedOption: string;
    scoreContribution?: {
      abilities?: Record<string, number>;
      orientations?: Record<string, number>;
    };
  }>;
}

interface QuestionStatus {
  isAnswered: boolean;
  isVisited: boolean;
}

const abilities = [
  {
    key: "cognition",
    title: "Cognition",
    description: "Measures how well a student perceives and understands new information.",
    icon: Brain
  },
  {
    key: "reasoning",
    title: "Reasoning",
    description: "Assesses the ability to think logically and solve problems.",
    icon: Target
  },
  {
    key: "figuralMemory",
    title: "Figural Memory",
    description: "Evaluates memory related to shapes and visual patterns.",
    icon: Layout
  },
  {
    key: "spatialAbility",
    title: "Spatial Ability",
    description: "Tests the capacity to understand and manipulate spatial relationships.",
    icon: Layout
  },
  {
    key: "verbalAbility",
    title: "Verbal Ability",
    description: "Measures proficiency in understanding and using language.",
    icon: BookOpen
  },
  {
    key: "socialAbility",
    title: "Social Ability",
    description: "Assesses skills in interacting and understanding social situations.",
    icon: Users
  },
  {
    key: "numericalAbility",
    title: "Numerical Ability",
    description: "Tests mathematical reasoning and computation skills.",
    icon: Calculator
  },
  {
    key: "numericalMemory",
    title: "Numerical Memory",
    description: "Measures the ability to remember and recall numbers.",
    icon: Calculator
  }
];

const orientations = [
  {
    key: "knowledge",
    title: "Knowledge",
    description: "How much value the student places on acquiring and using knowledge.",
    icon: BookOpen
  },
  {
    key: "practical",
    title: "Practical",
    description: "Focus on practical, hands-on work and real-world applications.",
    icon: Target
  },
  {
    key: "artistic",
    title: "Artistic",
    description: "Interest in creative activities and artistic expression.",
    icon: Palette
  },
  {
    key: "social",
    title: "Social",
    description: "Orientation towards helping others and working in social settings.",
    icon: HandHeart
  },
  {
    key: "power",
    title: "Power/Coping Style",
    description: "Evaluates leadership tendencies, decision-making, and how well the student copes with challenges.",
    icon: Crown
  }
];

const TOTAL_TEST_TIME = 3600; // 1 hour in seconds

const PsychometricTest = () => {
  const navigate = useNavigate();
  const [showOverview, setShowOverview] = useState(true);
  const [testTimeRemaining, setTestTimeRemaining] = useState(TOTAL_TEST_TIME);
  const [randomizedAssessment, setRandomizedAssessment] = useState(assessment);
  const [state, setState] = useState<TestState>({
    currentSection: 0,
    currentQuestion: 0,
    answers: {},
    scores: {
      abilities: {},
      orientations: {}
    },
    showTimer: false,
    timeLeft: 0,
    showImage: true,
    showNumber: true
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [testResults, setTestResults] = useState<TestResultsState>({});
  const [isComplete, setIsComplete] = useState(false);
  const [questionStatus, setQuestionStatus] = useState<Record<string, QuestionStatus>>({});
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState(false);

  const currentSection = randomizedAssessment.sections[state.currentSection];
  const currentQuestion = currentSection?.questions[state.currentQuestion];

  // Initialize question status when the test starts
  useEffect(() => {
    if (!showOverview && !isComplete) {
      const initialStatus: Record<string, QuestionStatus> = {};
      randomizedAssessment.sections.forEach(section => {
        section.questions.forEach(question => {
          initialStatus[question.questionId] = {
            isAnswered: false,
            isVisited: false
          };
        });
      });
      setQuestionStatus(initialStatus);
    }
  }, [showOverview, isComplete, randomizedAssessment]);

  // Update question status when navigating
  useEffect(() => {
    if (currentQuestion) {
      setQuestionStatus(prev => ({
        ...prev,
        [currentQuestion.questionId]: {
          isAnswered: !!state.answers[currentQuestion.questionId],
          isVisited: true
        }
      }));
    }
  }, [state.currentSection, state.currentQuestion, currentQuestion, state.answers]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state.showTimer && state.timeLeft > 0) {
      timer = setInterval(() => {
        setState((prev: TestState) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
          showNumber: prev.timeLeft > 1 && currentQuestion.questionType === 'memory_number',
          showImage: prev.timeLeft > 0 || 
                    currentQuestion.questionText.toLowerCase().includes('feeling') ||
                    currentQuestion.questionText.toLowerCase().includes('3d shape') ||
                    currentQuestion.questionText.toLowerCase().includes('folding')
        }));
      }, 1000);
    } else if (state.timeLeft === 0) {
      setState((prev: TestState) => ({
        ...prev,
        showTimer: false,
        showNumber: false,
        showImage: currentQuestion.questionText.toLowerCase().includes('feeling') ||
                  currentQuestion.questionText.toLowerCase().includes('3d shape') ||
                  currentQuestion.questionText.toLowerCase().includes('folding')
      }));
    }
    return () => clearInterval(timer);
  }, [state.showTimer, state.timeLeft, currentQuestion?.questionType, currentQuestion?.questionText]);

  // Add test timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!showOverview && !isComplete && !showSuccessMessage && testTimeRemaining > 0) {
      timer = setInterval(() => {
        setTestTimeRemaining(prev => {
          if (prev <= 1) {
            // Auto-submit the test when time runs out
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showOverview, isComplete, showSuccessMessage, testTimeRemaining]);

  // Hide main footer when test starts
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      if (!showOverview && !isComplete && !showSuccessMessage) {
        footer.style.display = 'none';
      } else {
        footer.style.display = 'block';
      }
    }

    // Cleanup function to show footer when component unmounts
    return () => {
      if (footer) {
        footer.style.display = 'block';
      }
    };
  }, [showOverview, isComplete, showSuccessMessage]);

  const handleAnswer = (optionId: string) => {
    const question = currentSection.questions[state.currentQuestion];
    setQuestionStatus(prev => ({
      ...prev,
      [question.questionId]: {
        isAnswered: true,
        isVisited: true
      }
    }));
    
    setState((prev: TestState) => {
      const newScores = { ...prev.scores };
      const option = question.options.find(opt => opt.optionId === optionId);
      
      if (option?.scoreContribution?.abilities) {
        Object.entries(option.scoreContribution.abilities).forEach(([ability, score]) => {
          newScores.abilities[ability] = (newScores.abilities[ability] || 0) + score;
        });
      }
      
      if (option?.scoreContribution?.orientations) {
        Object.entries(option.scoreContribution.orientations).forEach(([orientation, score]) => {
          newScores.orientations[orientation] = (newScores.orientations[orientation] || 0) + score;
        });
      }

      return {
        ...prev,
        answers: { ...prev.answers, [question.questionId]: optionId },
        scores: newScores
      };
    });
  };

  const needsTimer = (question: Question) => {
    // Skip timer for cube unfolding question
    if (question.questionText.toLowerCase().includes('unfold a cube')) {
      return false;
    }
    
    return question.requiresTimer || 
           (question.imageUrl && 
             question.questionText.toLowerCase().includes('pattern') &&
             !question.questionText.toLowerCase().includes('sequence')
           ) ||
           question.questionType === 'memory_number';
  };

  const getTimerDuration = (question: Question) => {
    if (question.questionText.toLowerCase().includes('sequence')) {
      return 5;
    }
    return 10;
  };

  const startTest = () => {
    setShowOverview(false);
    setTestTimeRemaining(TOTAL_TEST_TIME);
    // Randomize questions when starting the test
    const randomized = QuestionRandomizer.randomizeAssessment(assessment);
    setRandomizedAssessment(randomized);
    const firstQuestion = randomized.sections[0].questions[0];
    setState((prev: TestState) => ({
      ...prev,
      showTimer: needsTimer(firstQuestion),
      timeLeft: needsTimer(firstQuestion) ? getTimerDuration(firstQuestion) : 0,
      showImage: true
    }));
  };

  const handleNext = () => {
    if (state.currentQuestion < currentSection.questions.length - 1) {
      const nextQuestion = currentSection.questions[state.currentQuestion + 1];
      setState((prev: TestState) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        showTimer: needsTimer(nextQuestion),
        timeLeft: needsTimer(nextQuestion) ? getTimerDuration(nextQuestion) : 0,
        showImage: true,
        showNumber: nextQuestion.questionType === 'memory_number'
      }));
    } else if (state.currentSection < randomizedAssessment.sections.length - 1) {
      const firstQuestionOfNextSection = randomizedAssessment.sections[state.currentSection + 1].questions[0];
      setState((prev: TestState) => ({
        ...prev,
        currentSection: prev.currentSection + 1,
        currentQuestion: 0,
        showTimer: needsTimer(firstQuestionOfNextSection),
        timeLeft: needsTimer(firstQuestionOfNextSection) ? getTimerDuration(firstQuestionOfNextSection) : 0,
        showImage: true,
        showNumber: false
      }));
    }
  };

  const handlePrevious = () => {
    if (state.currentQuestion > 0) {
      const prevQuestion = currentSection.questions[state.currentQuestion - 1];
      setState((prev: TestState) => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
        showTimer: needsTimer(prevQuestion),
        timeLeft: needsTimer(prevQuestion) ? getTimerDuration(prevQuestion) : 0,
        showImage: true,
        showNumber: false
      }));
    } else if (state.currentSection > 0) {
      const prevSection = randomizedAssessment.sections[state.currentSection - 1];
      const lastQuestionOfPrevSection = prevSection.questions[prevSection.questions.length - 1];
      setState((prev: TestState) => ({
        ...prev,
        currentSection: prev.currentSection - 1,
        currentQuestion: prevSection.questions.length - 1,
        showTimer: needsTimer(lastQuestionOfPrevSection),
        timeLeft: needsTimer(lastQuestionOfPrevSection) ? getTimerDuration(lastQuestionOfPrevSection) : 0,
        showImage: true,
        showNumber: false
      }));
    }
  };

  const handleSubmit = async () => {
    console.log('--- Starting handleSubmit ---'); // Log start of handleSubmit
    // Store answers for each section
    const allResults: TestResultsState = {};
    randomizedAssessment.sections.forEach(section => {
      const sectionAnswers = section.questions.map(question => {
        const selectedOption = state.answers[question.questionId];
        if (!selectedOption) return null;
        const option = question.options.find(opt => opt.optionId === selectedOption);
        return {
          questionId: question.questionId,
          selectedOption: selectedOption,
          scoreContribution: option?.scoreContribution
        };
      }).filter(answer => answer !== null);
      allResults[section.sectionId] = sectionAnswers;
    });
    setTestResults(allResults);
    setIsComplete(true);

    // Flatten all answers into a single array
    const allAnswers = Object.values(allResults).flat();

    // Aggregate raw scores into the format expected by ScoreCalculator
    const rawAbilityScores: AbilityScores = {
      cognition: 0,
      reasoning: 0,
      figuralMemory: 0,
      spatialAbility: 0,
      verbalAbility: 0,
      numericalAbility: 0,
      numericalMemory: 0,
      socialAbility: 0,
    };
    const rawOrientationScores: OrientationScores = {
      knowledge: 0,
      practical: 0,
      artistic: 0,
      social: 0,
      powerCopingStyle: 0,
    };

    allAnswers.forEach(answer => {
      console.log('Processing answer:', answer); // Log each answer being processed
      if (answer?.scoreContribution?.abilities) {
        console.log('Processing ability scores for answer:', answer.scoreContribution.abilities); // Log ability scores for answer
        Object.entries(answer.scoreContribution.abilities).forEach(([ability, score]) => {
          console.log(`Aggregating ability: ${ability}, score: ${score}`); // Log individual ability score aggregation
          rawAbilityScores[ability as keyof AbilityScores] = (rawAbilityScores[ability as keyof AbilityScores] || 0) + (score as number);
        });
      }
      if (answer?.scoreContribution?.orientations) {
        console.log('Processing orientation scores for answer:', answer.scoreContribution.orientations); // Log orientation scores for answer
        Object.entries(answer.scoreContribution.orientations).forEach(([orientation, score]) => {
          console.log(`Aggregating orientation: ${orientation}, score: ${score}`); // Log individual orientation score aggregation
          rawOrientationScores[orientation as keyof OrientationScores] = (rawOrientationScores[orientation as keyof OrientationScores] || 0) + (score as number);
        });
      }
    });

    console.log('Final aggregated rawAbilityScores before calculation:', rawAbilityScores); // Log final raw ability scores
    console.log('Final aggregated rawOrientationScores before calculation:', rawOrientationScores); // Log final raw orientation scores

    // Calculate scores for abilities and orientations using the aggregated raw scores
    const abilityScores = ScoreCalculator.calculateAbilityScores(rawAbilityScores);
    const maxOrientationScores = ScoreCalculator.computeMaxOrientationScores(assessment);
    const orientationScores = ScoreCalculator.calculateOrientationScores(rawOrientationScores, maxOrientationScores);

    // Ensure all keys are present, even if zero
    const defaultAbilities = {
      cognition: 0,
      reasoning: 0,
      figuralMemory: 0,
      spatialAbility: 0,
      verbalAbility: 0,
      numericalAbility: 0,
      numericalMemory: 0,
      socialAbility: 0
    };
    const defaultOrientations = {
      knowledge: 0,
      practical: 0,
      artistic: 0,
      social: 0,
      powerCopingStyle: 0
    };
    const scoresToSend = {
      abilities: abilityScores, // Send percentage scores
      orientations: orientationScores, // Send percentage scores
    };

    // Debug: Log the scores and send to backend
    console.log('Submitting scores to backend:', scoresToSend);
    try {
      // Update the API call to send the calculated percentage scores
      await tests.submitPsychometric({ scores: scoresToSend });
    } catch (error) {
      alert('Failed to save scores to backend. Please check your network connection or contact support.');
      console.error('Failed to save scores to backend:', error);
    }
  };

  const navigateToRecommendations = () => {
    navigate('/recommendations', { state: { scores: state.scores } });
  };

  const totalQuestions = randomizedAssessment.sections.reduce(
    (total, section) => total + section.questions.length,
    0
  );

  const answeredQuestions = Object.values(questionStatus).filter(
    status => status.isAnswered
  ).length;

  const currentQuestionNumber = randomizedAssessment.sections
    .slice(0, state.currentSection)
    .reduce((total, section) => total + section.questions.length, 0) + state.currentQuestion + 1;

  const handleSubmitSection = () => {
    if (currentSection) {
      // Get all answers for the current section
      const sectionAnswers = currentSection.questions.map(question => {
        const selectedOption = state.answers[question.questionId];
        if (!selectedOption) return null;
        const option = question.options.find(opt => opt.optionId === selectedOption);
        return {
          questionId: question.questionId,
          selectedOption: selectedOption,
          scoreContribution: option?.scoreContribution
        };
      }).filter(answer => answer !== null);
      setTestResults(prevResults => ({
          ...prevResults,
          [currentSection.sectionId]: sectionAnswers
      }));
      // Move to next section or complete the test
      if (state.currentSection < randomizedAssessment.sections.length - 1) {
        const nextSection = randomizedAssessment.sections[state.currentSection + 1];
        setState((prev: TestState) => ({
          ...prev,
          currentSection: prev.currentSection + 1,
          currentQuestion: 0,
          showTimer: needsTimer(nextSection.questions[0]),
          timeLeft: needsTimer(nextSection.questions[0]) ? getTimerDuration(nextSection.questions[0]) : 0,
          showImage: true,
          showNumber: false
        }));
      } else {
        // When completing the test, ensure we have all answers from all sections
        const allAnswers = randomizedAssessment.sections.reduce((acc, section) => {
          const sectionAnswers = section.questions.map(question => {
            const selectedOption = state.answers[question.questionId];
            if (!selectedOption) return null;
            const option = question.options.find(opt => opt.optionId === selectedOption);
            return {
              questionId: question.questionId,
              selectedOption: selectedOption,
              scoreContribution: option?.scoreContribution
            };
          }).filter(answer => answer !== null);
          return {
            ...acc,
            [section.sectionId]: sectionAnswers
          };
        }, {});
        setTestResults(allAnswers);
        setIsComplete(true);
      }
    }
  };

  const jumpToQuestion = (sectionIndex: number, questionIndex: number) => {
    const targetQuestion = randomizedAssessment.sections[sectionIndex].questions[questionIndex];
    
    // Update question status for the current question before jumping
    if (currentQuestion) {
      setQuestionStatus(prev => ({
        ...prev,
        [currentQuestion.questionId]: {
          isAnswered: !!state.answers[currentQuestion.questionId],
          isVisited: true
        }
      }));
    }

    // Set state for the new question
    setState((prev: TestState) => ({
      ...prev,
      currentSection: sectionIndex,
      currentQuestion: questionIndex,
      showTimer: needsTimer(targetQuestion),
      timeLeft: needsTimer(targetQuestion) ? getTimerDuration(targetQuestion) : 0,
      showImage: true,
      showNumber: targetQuestion.questionType === 'memory_number'
    }));

    // Mark the target question as visited
    setQuestionStatus(prev => ({
      ...prev,
      [targetQuestion.questionId]: {
        isAnswered: !!state.answers[targetQuestion.questionId],
        isVisited: true
      }
    }));
  };

  // Keyboard navigation handler
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return;
    }

    switch (event.key) {
      case 'ArrowLeft':
      case 'p':
      case 'P':
        if (!(state.currentSection === 0 && state.currentQuestion === 0)) {
          handlePrevious();
        }
        break;
      case 'ArrowRight':
      case 'n':
      case 'N':
        if (!(state.currentSection === randomizedAssessment.sections.length - 1 &&
            state.currentQuestion === currentSection.questions.length - 1)) {
          handleNext();
        }
        break;
      case 'f':
      case 'F':
        toggleFlagQuestion();
        break;
      case 'h':
      case 'H':
        setShowHint(prev => !prev);
        break;
      case '?':
        setShowKeyboardShortcuts(prev => !prev);
        break;
      case '1':
      case '2':
      case '3':
      case '4':
        if (!state.showTimer || state.timeLeft === 0) {
          const optionIndex = parseInt(event.key) - 1;
          const option = currentQuestion.options[optionIndex];
          if (option) {
            handleAnswer(option.optionId);
          }
        }
        break;
    }
  }, [state.currentSection, state.currentQuestion, currentSection]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const toggleFlagQuestion = () => {
    setFlaggedQuestions(prev => {
      const newFlags = new Set(prev);
      if (newFlags.has(currentQuestion.questionId)) {
        newFlags.delete(currentQuestion.questionId);
      } else {
        newFlags.add(currentQuestion.questionId);
      }
      return newFlags;
    });
  };

  // Modified handleSubmit with confirmation
  const handleSubmitWithConfirmation = () => {
    const unansweredCount = randomizedAssessment.sections.reduce((total, section) => {
      return total + section.questions.filter(q => !state.answers[q.questionId]).length;
    }, 0);

    if (unansweredCount > 0) {
      setShowConfirmSubmit(true);
    } else {
      handleSubmit();
    }
  };

  const handleClearResponse = () => {
    if (currentQuestion) {
      // Remove the answer from state
      setState((prev: TestState) => {
        const newAnswers = { ...prev.answers };
        delete newAnswers[currentQuestion.questionId];
        return {
          ...prev,
          answers: newAnswers
        };
      });

      // Update question status
      setQuestionStatus(prev => ({
        ...prev,
        [currentQuestion.questionId]: {
          isAnswered: false,
          isVisited: true
        }
      }));
    }
  };

  if (isComplete) {
    // Debug: Confirm rendering of results page
    console.log('PsychometricTest - Rendering results page (isComplete)');
    return (
      <div className="min-h-screen bg-gray-50">
        {!showOverview && !isComplete && !showSuccessMessage && (
          <TestNavbar 
            sectionName="Test Complete"
            timeRemaining={testTimeRemaining}
          />
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Assessment Complete</h1>
            <p className="mt-2 text-lg text-gray-600">Thank you for completing the assessment. Here are your results:</p>
          </div>
          
          {/* Render the TestResults component once for overall scores */}
          <div className="mt-8 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
               {/* TestResults now fetches its own data and displays overall scores */}
               <TestResults />
            </div>
          </div>

          <div className="text-center mt-8 pb-8">
            <button
              onClick={navigateToRecommendations}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View Career Recommendations
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showSuccessMessage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-4xl w-full mx-auto p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Test Submitted Successfully!
              </h2>
              <p className="text-gray-600">
                Thank you for completing the assessment. Here is a summary of your results:
              </p>
            </div>
            <div className="text-center">
          <button
            onClick={navigateToRecommendations}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            View Career Recommendations
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showOverview) {
    return (
      <div className="min-h-screen pt-16 pb-12">
        {!showOverview && !isComplete && !showSuccessMessage && (
          <TestNavbar 
            sectionName="Test Overview"
            timeRemaining={testTimeRemaining}
          />
        )}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">{randomizedAssessment.title}</h1>
            <p className="mt-4 text-xl text-gray-600">{randomizedAssessment.description}</p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">8 Abilities Assessed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {abilities.map((ability) => (
                <div key={ability.title} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <ability.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">{ability.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{ability.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">5 Orientations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orientations.map((orientation) => (
                <div key={orientation.title} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <orientation.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">{orientation.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{orientation.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Assessment Structure</h2>
            {randomizedAssessment.sections.map((section, index) => (
              <div key={section.sectionId} className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Section {index + 1}: {section.sectionTitle}
                </h3>
                <p className="text-gray-600 mb-4">{section.sectionDescription}</p>
                <div className="pl-4 border-l-4 border-indigo-200">
                  <p className="text-sm text-gray-500">
                    {section.questions.length} questions • 
                    {section.questions.some(q => q.timeLimit) ? ' Includes timed questions • ' : ' '}
                    {section.questions.some(q => q.imageUrl) ? 'Visual elements' : 'Text-based questions'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={startTest}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Start Assessment
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!showOverview && !isComplete && !showSuccessMessage) {
  return (
      <div className="flex flex-col h-screen bg-gray-50">
        <TestNavbar 
          sectionName={`Section ${state.currentSection + 1}: ${currentSection.sectionTitle}`}
          timeRemaining={testTimeRemaining}
        />

        {/* Keyboard Shortcuts Modal */}
        {showKeyboardShortcuts && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Keyboard className="w-5 h-5 mr-2" />
                Keyboard Shortcuts
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Previous Question</span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">← or P</span>
            </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Question</span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">→ or N</span>
            </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Flag Question</span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">F</span>
          </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Show/Hide Hint</span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">H</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Select Option (1-4)</span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">1-4</span>
                </div>
              </div>
              <button
                onClick={() => setShowKeyboardShortcuts(false)}
                className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Submit Confirmation Modal */}
        {showConfirmSubmit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4 text-red-600">Warning</h3>
              <p className="text-gray-600 mb-6">
                You have unanswered questions. Are you sure you want to submit the test?
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setShowConfirmSubmit(false);
                    handleSubmit();
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Submit Anyway
                </button>
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Review Questions
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden bg-gray-50">
          {/* Question Panel */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-100">
          <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded-lg">
                      Question {state.currentQuestion + 1}
                    </span>
            {state.showTimer && (
                      <div className="flex items-center ml-4 bg-red-50 text-red-600 px-4 py-2 rounded-lg">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="font-mono font-medium">{state.timeLeft}s</span>
              </div>
            )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={toggleFlagQuestion}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        flaggedQuestions.has(currentQuestion.questionId)
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title="Flag for review (F)"
                    >
                      <Flag className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setShowKeyboardShortcuts(true)}
                      className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                      title="Show keyboard shortcuts (?)"
                    >
                      <Keyboard className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Image Display */}
                {currentQuestion.imageUrl && (state.showImage ||
                  currentQuestion.questionText.toLowerCase().includes('feeling') ||
                  currentQuestion.questionText.toLowerCase().includes('3d shape') ||
                  currentQuestion.questionText.toLowerCase().includes('folding') ||
                  currentQuestion.questionText.toLowerCase().includes('identical') ||
                  currentQuestion.questionText.toLowerCase().includes('drawing') ||
                  currentQuestion.questionText.toLowerCase().includes('map') ||
                  currentQuestion.questionText.toLowerCase().includes('budget') ||
                  currentQuestion.questionText.toLowerCase().includes('average') ||
                  currentQuestion.questionText.toLowerCase().includes('profit') ||
                  currentQuestion.questionText.toLowerCase().includes('sequence') ||
                  currentQuestion.questionText.toLowerCase().includes('social')

                ) && (
                  <div className="mb-8">
                    <div className="flex justify-center">
                      <div className="relative border border-gray-100 rounded-xl shadow-sm bg-white overflow-hidden transition-all duration-300 hover:shadow-md w-full max-w-[500px]">
                        <div className="w-full h-full">
                          <SvgImage
                            svg={currentQuestion.imageUrl}
                            alt="Question visual"
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Memory Number Display */}
                {currentQuestion.questionType === 'memory_number' && state.showNumber && state.timeLeft > 1 && currentQuestion.numberToMemorize && (
                  <div className="text-center mb-8">
                    <div className="inline-block bg-gradient-to-r from-blue-50 to-indigo-50 px-12 py-8 rounded-2xl shadow-sm">
                      <p className="text-6xl font-bold text-gray-900 font-mono tracking-wider">{currentQuestion.numberToMemorize}</p>
                    </div>
              </div>
            )}

                {/* Show instruction during timer for memory questions */}
                {state.showTimer && state.timeLeft > 0 && (
                  <div className="text-center mb-8">
                    <p className="text-xl text-gray-600 bg-yellow-50 px-6 py-4 rounded-lg inline-block">
                      {currentQuestion.questionType === 'memory_number' 
                        ? "📝 Memorize it what shown above"
                        : "👀 Study the pattern carefully"}
                    </p>
                  </div>
                )}
                
                {/* Verbal Memory Display */}
                {currentQuestion.questionType === 'verbal-memory' && state.showNumber && state.timeLeft > 1 && (
                  <div className="text-center mb-8">
                    <div className="inline-block bg-gradient-to-r from-blue-50 to-indigo-50 px-12 py-8 rounded-2xl shadow-sm">
                      <p className="text-xl font-medium text-gray-900 whitespace-pre-line">{currentQuestion.questionText}</p>
                    </div>
                  </div>
                )}
                {/* Question Text and Options - Only show after timer ends */}
                {(!state.showTimer || state.timeLeft === 0) && (
                  <>
                    <div className="bg-gray-50 px-6 py-4 rounded-xl mb-8">
                      <p className="text-xl text-gray-800">{currentQuestion.questionText}</p>
                      {currentQuestion.followUpQuestion && (
                        <p className="text-gray-600 mt-3">{currentQuestion.followUpQuestion}</p>
                      )}
                    </div>

                    <div className="space-y-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.optionId}
                          onClick={() => handleAnswer(option.optionId)}
                          className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                      state.answers[currentQuestion.questionId] === option.optionId
                              ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-md'
                              : 'hover:bg-gray-50 hover:border-gray-300 border-gray-200'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className={`w-6 h-6 rounded-full border-2 mr-4 flex-shrink-0 ${
                              state.answers[currentQuestion.questionId] === option.optionId
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}>
                              {state.answers[currentQuestion.questionId] === option.optionId && (
                                <svg className="w-4 h-4 mx-auto mt-0.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className="text-lg">{option.optionText}</span>
                          </div>
                  </button>
                ))}
              </div>
                  </>
                )}

                {/* Hint System */}
                {showHint && currentQuestion.hint && (
                  <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <p className="text-blue-800">
                      <span className="font-semibold">Hint:</span> {currentQuestion.hint}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Question Navigation Panel */}
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-6">
              <h4 className="font-semibold mb-6 text-gray-900 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Question Navigator
              </h4>
              {randomizedAssessment.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-8">
                  <h5 className="text-sm font-medium text-gray-600 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Section {sectionIndex + 1}
                  </h5>
                  <div className="grid grid-cols-5 gap-2">
                    {section.questions.map((question, questionIndex) => {
                      const status = questionStatus[question.questionId];
                      const isCurrentQuestion = state.currentSection === sectionIndex && 
                                             state.currentQuestion === questionIndex;
                      const isFlagged = flaggedQuestions.has(question.questionId);
                      
                      let bgColor = 'bg-gray-100 hover:bg-gray-200';
                      let textColor = 'text-gray-600';
                      
                      if (status?.isAnswered) {
                        bgColor = 'bg-green-500 hover:bg-green-600';
                        textColor = 'text-white';
                      } else if (status?.isVisited) {
                        bgColor = 'bg-yellow-400 hover:bg-yellow-500';
                        textColor = 'text-gray-900';
                      }

                      return (
                        <button
                          key={question.questionId}
                          onClick={() => jumpToQuestion(sectionIndex, questionIndex)}
                          className={`relative w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium
                            transition-all duration-200
                            ${isCurrentQuestion ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                            ${bgColor} ${textColor}
                          `}
                          title={`Question ${questionIndex + 1}${isFlagged ? ' (Flagged for review)' : ''}`}
                        >
                          {questionIndex + 1}
                          {isFlagged && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex space-x-4">
            <button
              onClick={handlePrevious}
              disabled={state.currentSection === 0 && state.currentQuestion === 0}
                className="flex items-center px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </button>
              <button
                onClick={handleNext}
                disabled={
                  state.currentSection === randomizedAssessment.sections.length - 1 &&
                  state.currentQuestion === currentSection.questions.length - 1
                }
                className="flex items-center px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
              {state.answers[currentQuestion.questionId] && (
                <button
                  onClick={handleClearResponse}
                  className="flex items-center px-5 py-2.5 text-sm font-medium text-red-600 bg-white border-2 border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Response
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-6">
              {currentQuestion.followUpQuestion && (!state.showTimer || state.timeLeft === 0) && (
                <div className="flex items-center text-sm bg-yellow-50 px-4 py-2 rounded-lg">
                  <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
                  <span className="text-gray-600">{currentQuestion.followUpQuestion}</span>
                </div>
              )}
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <TestNavbar 
        sectionName={`Section ${state.currentSection + 1}: ${currentSection.sectionTitle}`}
        timeRemaining={testTimeRemaining}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden bg-gray-50">
        {/* Question Panel */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-100">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <span className="bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded-lg">
                    Question {state.currentQuestion + 1}
                  </span>
                  {state.showTimer && (
                    <div className="flex items-center ml-4 bg-red-50 text-red-600 px-4 py-2 rounded-lg">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="font-mono font-medium">{state.timeLeft}s</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={toggleFlagQuestion}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      flaggedQuestions.has(currentQuestion.questionId)
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title="Flag for review (F)"
                  >
                    <Flag className="w-5 h-5" />
              </button>
                  <button
                    onClick={() => setShowKeyboardShortcuts(true)}
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                    title="Show keyboard shortcuts (?)"
                  >
                    <Keyboard className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Image Display */}
              {currentQuestion.imageUrl && (state.showImage ||
                currentQuestion.questionText.toLowerCase().includes('feeling') ||
                currentQuestion.questionText.toLowerCase().includes('3d shape') ||
                currentQuestion.questionText.toLowerCase().includes('folding') 
              ) && (
                <div className="mb-8">
                  <div className="flex justify-center">
                    <div className="relative border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden transition-all duration-300 hover:shadow-md w-full max-w-[400px]">
                      <div className="w-full h-full">
                        <SvgImage
                          svg={currentQuestion.imageUrl}
                          alt="Question visual"
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Memory Number Display */}
              {currentQuestion.questionType === 'memory_number' && state.showNumber && state.timeLeft > 1 && currentQuestion.numberToMemorize && (
                <div className="text-center mb-8">
                  <div className="inline-block bg-gradient-to-r from-blue-50 to-indigo-50 px-12 py-8 rounded-2xl shadow-sm">
                    <p className="text-6xl font-bold text-gray-900 font-mono tracking-wider">{currentQuestion.numberToMemorize}</p>
                  </div>
                </div>
              )}

              {/* Show instruction during timer for memory questions */}
              {state.showTimer && state.timeLeft > 0 && (
                <div className="text-center mb-8">
                  <p className="text-xl text-gray-600 bg-yellow-50 px-6 py-4 rounded-lg inline-block">
                    {currentQuestion.questionType === 'memory_number' 
                      ? "📝 Memorize it what shown above"
                      : "👀 Study the pattern carefully"}
                  </p>
                </div>
              )}

              {/* Question Text and Options - Only show after timer ends */}
              {(!state.showTimer || state.timeLeft === 0) && (
                <>
                  <div className="bg-gray-50 px-6 py-4 rounded-xl mb-8">
                    <p className="text-xl text-gray-800">{currentQuestion.questionText}</p>
                    {currentQuestion.followUpQuestion && (
                      <p className="text-gray-600 mt-3">{currentQuestion.followUpQuestion}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    {currentQuestion.options.map((option) => (
              <button
                        key={option.optionId}
                        onClick={() => handleAnswer(option.optionId)}
                        className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                          state.answers[currentQuestion.questionId] === option.optionId
                            ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-md'
                            : 'hover:bg-gray-50 hover:border-gray-300 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full border-2 mr-4 flex-shrink-0 ${
                            state.answers[currentQuestion.questionId] === option.optionId
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}>
                            {state.answers[currentQuestion.questionId] === option.optionId && (
                              <svg className="w-4 h-4 mx-auto mt-0.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-lg">{option.optionText}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Question Navigation Panel */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-6">
            <h4 className="font-semibold mb-6 text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Question Navigator
            </h4>
            {randomizedAssessment.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8">
                <h5 className="text-sm font-medium text-gray-600 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Section {sectionIndex + 1}
                </h5>
                <div className="grid grid-cols-5 gap-2">
                  {section.questions.map((question, questionIndex) => {
                    const status = questionStatus[question.questionId];
                    const isCurrentQuestion = state.currentSection === sectionIndex && 
                                           state.currentQuestion === questionIndex;
                    let bgColor = 'bg-gray-100 hover:bg-gray-200'; // not visited
                    let textColor = 'text-gray-600';
                    
                    if (status?.isAnswered) {
                      bgColor = 'bg-green-500 hover:bg-green-600';
                      textColor = 'text-white';
                    } else if (status?.isVisited) {
                      bgColor = 'bg-yellow-400 hover:bg-yellow-500';
                      textColor = 'text-gray-900';
                    }

                    return (
                      <button
                        key={question.questionId}
                        onClick={() => jumpToQuestion(sectionIndex, questionIndex)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium
                          transition-all duration-200
                          ${isCurrentQuestion ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                          ${bgColor} ${textColor}
                        `}
                      >
                        {questionIndex + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            
            <div className="mt-6 space-y-3 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-sm">
                <div className="w-4 h-4 bg-green-500 rounded-md mr-2" />
                <span className="text-gray-700">Answered</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-4 h-4 bg-yellow-400 rounded-md mr-2" />
                <span className="text-gray-700">Visited</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-4 h-4 bg-gray-100 rounded-md mr-2" />
                <span className="text-gray-700">Not Visited</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={handlePrevious}
              disabled={state.currentSection === 0 && state.currentQuestion === 0}
              className="flex items-center px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={
                state.currentSection === randomizedAssessment.sections.length - 1 &&
                state.currentQuestion === currentSection.questions.length - 1
              }
              className="flex items-center px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200"
              >
                Next
              <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            {state.answers[currentQuestion.questionId] && (
              <button
                onClick={handleClearResponse}
                className="flex items-center px-5 py-2.5 text-sm font-medium text-red-600 bg-white border-2 border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Response
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-6">
            {currentQuestion.followUpQuestion && (!state.showTimer || state.timeLeft === 0) && (
              <div className="flex items-center text-sm bg-yellow-50 px-4 py-2 rounded-lg">
                <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
                <span className="text-gray-600">{currentQuestion.followUpQuestion}</span>
              </div>
            )}
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychometricTest;