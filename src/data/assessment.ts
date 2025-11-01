import { Assessment } from '../types/assessment';
import patternTriangles from '../assets/images/pattern-triangles.svg';
import facialExpression from '../assets/images/Happines.png';
import cubeFold from '../assets/images/Cube fold.png';
import Triangle from '../assets/images/Triangle.png';
import FigureMemory from '../assets/images/Figure memory.jpg';
import Sequence from '../assets/images/Sequence.png';
import Pair from '../assets/images/Pairs.png'
import XO from '../assets/images/XO.png'
import Add from '../assets/images/Add.png'
import simi from '../assets/images/similar.png'
import simi2 from '../assets/images/similar2.png'
import cut from '../assets/images/cut.png'
import map from '../assets/images/map.png'
import num from '../assets/images/num.png'
import avg from '../assets/images/avg.png'
import perc from '../assets/images/percentage.png'
import seq from '../assets/images/seq.png'
import match from '../assets/images/comm_match.png'

export const assessment: Assessment = {
  "assessmentId": "comprehensive-assessment",
  "title": "Career Aptitude and Orientation Assessment",
  "description": "This assessment evaluates your abilities and personal orientations to help identify suitable career paths.",
  "sections": [
    {
      "sectionId": "abilities-assessment",
      "sectionTitle": "Ability Assessment",
      "sectionDescription": "This section assesses various abilities including reasoning, memory, and processing speed.",
      "questions": [
        // ============= GROUP: MEMORY SKILLS (10/10) =============
        // Figural Memory + Numerical Memory
        // All memory questions: visual-memory-1/2/3/4/5/6/7, numMemory-1/2/3, 
        {
          "questionId": "visual-memory-1",
          "questionText": "Study this pattern for 10 seconds, then it will disappear. You'll be asked to recall specific details.",
          "questionType": "visual-memory",
          "timeLimit": 10,
          "imageUrl": patternTriangles,
          "followUpQuestion": "How many triangles were in the pattern?",
          "options": [
            {
              "optionId": "vm1-a",
              "optionText": "5",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            },
            {
              "optionId": "vm1-b",
              "optionText": "7",
              "scoreContribution": {
                "abilities": {"figuralMemory": 2}
              }
            },
            {
              "optionId": "vm1-c",
              "optionText": "9",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            },
            {
              "optionId": "vm1-d",
              "optionText": "11",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            }
          ],
          "correctAnswer": "vm1-b"
        },
        {
          "questionId": "visual-memory-2",
          "questionText": "Study this pattern for 10 seconds, then it will disappear. You'll be asked to recall specific details.",
          "questionType": "visual-memory",
          "timeLimit": 10,
          "imageUrl": Triangle,
          "followUpQuestion": "How many colors were used ?",
          "options": [
            {
              "optionId": "vm2-a",
              "optionText": "1",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            },
            {
              "optionId": "vm2-b",
              "optionText": "3",
              "scoreContribution": {
                "abilities": {"figuralMemory": 2}
              }
            },
            {
              "optionId": "vm2-c",
              "optionText": "5",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            },
            {
              "optionId": "vm2-d",
              "optionText": "7",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            }
          ],
          "correctAnswer": "vm2-b"
        },
        {
          "questionId": "visual-memory-3",
          "questionText": "Study this pattern for 20 seconds, then it will disappear. You'll be asked to recall specific details.",
          "questionType": "visual-memory",
          "timeLimit": 20,
          "imageUrl": FigureMemory,
          "followUpQuestion": "Which figure was below cat?",
          "options": [
            {
              "optionId": "vm3-a",
              "optionText": "Books",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            },
            {
              "optionId": "vm3-b",
              "optionText": "Pen",
              "scoreContribution": {
                "abilities": {"figuralMemory": 2}
              }
            },
            {
              "optionId": "vm3-c",
              "optionText": "Banana",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            },
            {
              "optionId": "vm3-d",
              "optionText": "Headphone",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            }
          ],
          "correctAnswer": "vm3-b"
        },
        {
          "questionId": "visual-memory-4",
          "questionText": "Study this pattern for 10 seconds, then it will disappear. You'll be asked to recall specific details.",
          "questionType": "visual-memory",
          "timeLimit": 10,
          "imageUrl": Sequence,
          "followUpQuestion": "What was the 3th shape in the sequence?",
          "options": [
            {
              "optionId": "vm4-a",
              "optionText": "Circle",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            },
            {
              "optionId": "vm4-b",
              "optionText": "Square",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            },
            {
              "optionId": "vm4-c",
              "optionText": "Pentagon", 
              "scoreContribution": {
                "abilities": {"figuralMemory": 1}
              }
            },
            {
              "optionId": "vm4-d",
              "optionText": "Star",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            }
          ],
          "correctAnswer": "vm4-c"
        },
        {
          "questionId": "visual-memory-5",
          "questionText": "Study this pattern for 10 seconds, then it will disappear. You'll be asked to recall specific details.",
          "questionType": "visual-memory",
          "timeLimit": 10,
          "imageUrl": Pair,
          "followUpQuestion": "What word was paired with 'Sun'?",
          "options": [
            {
              "optionId": "vm5-a",
              "optionText": "Star",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            },
            {
              "optionId": "vm5-b",
              "optionText": "Moon",
              "scoreContribution": {
                "abilities": {"figuralMemory": 1}
              }
            },
            {
              "optionId": "vm5-c",
              "optionText": "Sky",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            },
            {
              "optionId": "vm5-d",
              "optionText": "Light",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            }
          ],
          "correctAnswer": "vm5-b"
        },
        {
          "questionId": "visual-memory-6",
          "questionText": "Study this pattern for 10 seconds, then it will disappear. You'll be asked to recall specific details.",
          "questionType": "visual-memory",
          "timeLimit": 10,
          "imageUrl": XO,
          "followUpQuestion": "What symbol was in the center position?",
          "options": [
            {
              "optionId": "vm6-a",
              "optionText": "X",
              "scoreContribution": {
                "abilities": {"figuralMemory": 1}
              }
            },
            {
              "optionId": "vm6-b",
              "optionText": "O",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            },
            {
              "optionId": "vm6-c",
              "optionText": "Empty",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            },
            {
              "optionId": "vm6-d",
              "optionText": "+",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            }
          ],
          "correctAnswer": "vm6-a"
        },
        {
          "questionId": "visual-memory-7",
          "questionText": "Study this pattern for 10 seconds, then it will disappear. You'll be asked to recall specific details.",
          "questionType": "visual-memory",
          "timeLimit": 10,
          "imageUrl": Add,
          "followUpQuestion": "What is the sum of primary diagonal elements?",
          "options": [
            {
              "optionId": "vm7-a",
              "optionText": "2",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            },
            {
              "optionId": "vm7-b",
              "optionText": "9",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            },
            {
              "optionId": "vm7-c",
              "optionText": "6",
              "scoreContribution": {
                "abilities": {"figuralMemory": 0}
              }
            },
            {
              "optionId": "vm7-d",
              "optionText": "5",
              "scoreContribution": {
                "abilities": {"figuralMemory": 1}
              }
            }
          ],
          "correctAnswer": "vm7-4"
        },
        {
          "questionId": "numMemory-1",
          "questionText": "The following number will be shown for 10 seconds, then disappear. Try to memorize it:",
          "questionType": "memory_number",
          "timeLimit": 10,
          "numberToMemorize": "847219365",
          "followUpQuestion": "What was the number shown?",
          "options": [
            {
              "optionId": "numMem1-a",
              "optionText": "847219365",
              "scoreContribution": {
                "abilities": {"numericalMemory": 3}
              }
            },
            {
              "optionId": "numMem1-b",
              "optionText": "847219356",
              "scoreContribution": {
                "abilities": {"numericalMemory": 0}
              }
            },
            {
              "optionId": "numMem1-c",
              "optionText": "847291365",
              "scoreContribution": {
                "abilities": {"numericalMemory": 0}
              }
            },
            {
              "optionId": "numMem1-d",
              "optionText": "847293165",
              "scoreContribution": {
                "abilities": {"numericalMemory": 0}
              }
            }
          ],
          "correctAnswer": "numMem1-a"
        },
        {
          "questionId": "numMemory-2",
          "questionText": "The following number will be shown for 10 seconds, then disappear. Try to memorize it:",
          "questionType": "memory_number",
          "timeLimit": 10,
          "numberToMemorize": "The quick brown fox jumps over the lazy dog while five birds watch from a nearby cypress tree.",
          "followUpQuestion": "How many animals were mentioned in the sentence?",
          "options": [
            {
              "optionId": "numMem2-a",
              "optionText": "1",
              "scoreContribution": {
                "abilities": {"numericalMemory": 0} 
              }
            },
            {
              "optionId": "numMem2-b",
              "optionText": "2",
              "scoreContribution": {
                "abilities": {"numericalMemory": 0} 
              }
            },
            {
              "optionId": "numMem2-c",
              "optionText": "3",
              "scoreContribution": {
                "abilities": {"numericalMemory": 3}  
              }
            },
            {
              "optionId": "numMem2-d",
              "optionText": "4",
              "scoreContribution": {
                "abilities": {"numericalMemory": 0} 
              }
            }
          ],
          "correctAnswer": "numMem2-c"  
        },
        {
          "questionId": "numMemory-3",
          "questionText": "The following number will be shown for 10 seconds, then disappear. Try to memorize it:",
          "questionType": "memory_number",
          "timeLimit": 10,
          "numberToMemorize": "734825",
          "followUpQuestion": "Choose the option having reverse order of shown number?.",
          "options": [
            {
              "optionId": "numMem3-a",
              "optionText": "523487",
              "scoreContribution": {
                "abilities": {"numericalMemory": 0} 
              }
            },
            {
              "optionId": "numMe3-b",
              "optionText": "258347",
              "scoreContribution": {
                "abilities": {"numericalMemory": 0} 
              }
            },
            {
              "optionId": "numMem3-c",
              "optionText": "528437",
              "scoreContribution": {
                "abilities": {"numericalMemory": 4}  
              }
            },
            {
              "optionId": "numMem3-d",
              "optionText": "582473",
              "scoreContribution": {
                "abilities": {"numericalMemory": 0} 
              }
            }
          ],
          "correctAnswer": "numMem3-c"  
        },
        

        // ============= GROUP: LOGICAL THINKING (10/10) =============
        // Cognition + Reasoning
        {
          "questionId": "reasoning-1",
          "questionText": "If all roses are flowers, and some flowers fade quickly, which statement must be true?",
          "questionType": "logical-reasoning",
          "options": [
            {
              "optionId": "reas1-a",
              "optionText": "All roses fade quickly",
              "scoreContribution": {
                "abilities": {"reasoning": 0}
              }
            },
            {
              "optionId": "reas1-b",
              "optionText": "Some roses fade quickly",
              "scoreContribution": {
                "abilities": {"reasoning": 0}
              }
            },
            {
              "optionId": "reas1-c",
              "optionText": "No roses fade quickly",
              "scoreContribution": {
                "abilities": {"reasoning": 0}
              }
            },
            {
              "optionId": "reas1-d",
              "optionText": "Cannot be determined from information given",
              "scoreContribution": {
                "abilities": {"reasoning": 2}
              }
            }
          ],
          "correctAnswer": "reas1-b"
        },
        {
          "questionId": "reasoning-2",
          "questionText": "Pointing towards a person in a photograph, raman said, \"she is the only daughter of the mother of my brother's sister\". how is that person related to Raman?",
          "questionType": "logical-reasoning",
          "options": [
            {
              "optionId": "reas2-a",
              "optionText": "Brother",
              "scoreContribution": {
                "abilities": {"reasoning": 0}
              }
            },
            {
              "optionId": "reas2-b",
              "optionText": "Sister",
              "scoreContribution": {
                "abilities": {"reasoning": 2}
              }
            },
            {
              "optionId": "reas2-c",
              "optionText": "Mother",
              "scoreContribution": {
                "abilities": {"reasoning": 0}
              }
            },
            {
              "optionId": "reas2-d",
              "optionText": "Father",
              "scoreContribution": {
                "abilities": {"reasoning": 0}
              }
            }
          ],
          "correctAnswer": "reas2-b"
        },
        {
          "questionId": "reasoning-3",
          "questionText": "In a science class, all students who completed the lab report received an A. Sarah received an A. Which statement must be true?",
          "questionType": "logical-reasoning",
          "options": [
            {
              "optionId": "reas3-a",
              "optionText": "Sarah completed the lab report",
              "scoreContribution": {
                "abilities": {"reasoning": 0}
              }
            },
            {
              "optionId": "reas3-b",
              "optionText": "Sarah might have completed the lab report",
              "scoreContribution": {
                "abilities": {"reasoning": 0}
              }
            },
            {
              "optionId": "reas3-c",
              "optionText": "Sarah definitely completed the lab report",
              "scoreContribution": {
                "abilities": {"reasoning": 2}
              }
            },
            {
              "optionId": "reas3-d",
              "optionText": "Sarah did not complete the lab report",
              "scoreContribution": {
                "abilities": {"reasoning": 0}
              }
            }
          ],
          "correctAnswer": "reas3-c"
        },
        {
          "questionId": "reasoning-4",
          "questionText": "Which letter comes next in the pattern? A, C, F, J, O, ?",
          "questionType": "logical-reasoning",
          "options": [
            {
              "optionId": "reas4-a",
              "optionText": "U",
              "scoreContribution": {
                "abilities": {"reasoning": 1}
              }
            },
            {
              "optionId": "reas4-b",
              "optionText": "S",
              "scoreContribution": {
                "abilities": {"reasoning": 0}
              }
            },
            {
              "optionId": "reas4-c",
              "optionText": "R",
              "scoreContribution": {
                "abilities": {"reasoning": 0}
              }
            },
            {
              "optionId": "reas4-d",
              "optionText": "T",
              "scoreContribution": {
                "abilities": {"reasoning": 0}
              }
            }
          ],
          "correctAnswer": "reas4-a"
        },
        {
          "questionId": "reasoning-5",
          "questionText": "Arrange the following words in a meaningful sequence: Police, Punishment, Crime, Judge, Judgment",
          "questionType": "logical-reasoning",
          "options": [
            {
              "optionId": "reas5-a",
              "optionText": "3, 1, 2, 4, 5",
              "scoreContribution": {
                "abilities": {"reasoning": 0}
              }
            },
            {
              "optionId": "reas5-b",
              "optionText": "1, 2, 4, 3, 5",
              "scoreContribution": {
                "abilities": {"reasoning": 0}
              }
            },
            {
              "optionId": "reas5-c",
              "optionText": "5, 4, 3, 2, 1",
              "scoreContribution": {
                "abilities": {"reasoning": 0}
              }
            },
            {
              "optionId": "reas5-d",
              "optionText": "3, 1, 4, 5, 2",
              "scoreContribution": {
                "abilities": {"reasoning": 2}
              }
            }
          ],
          "correctAnswer": "reas5-d"
        },
        {
          "questionId": "reasoning-6",
          "questionText": "Sowmya Krishnan walked 20 m towards the north. Then she turned right and walks 30 m. Then she turns right and walks 35 m. Then she turns left and walks 15 m. Finally she turns left and walks 15 m. In which direction and how many meters is she from the starting position?",
          "questionType": "logical-reasoning",
          "options": [
            {
              "optionId": "reas6-a",
              "optionText": "15 m West",
              "scoreContribution": {
                "abilities": {"reasoning": 0}
              }
            },
            {
              "optionId": "reas6-b",
              "optionText": "30 m East",
              "scoreContribution": {
                "abilities": {"reasoning": 0}
              }
            },
            {
              "optionId": "reas6-c",
              "optionText": "30 m West",
              "scoreContribution": {
                "abilities": {"reasoning": 0}
              }
            },
            {
              "optionId": "reas6-d",
              "optionText": "45 m East",
              "scoreContribution": {
                "abilities": {"reasoning": 1}
              }
            }
          ],
          "correctAnswer": "reas6-d"
        },
        {
          "questionId": "cognition-1",
          "questionText": "What number comes next in this sequence: 2, 6, 12, 20, 30, ?",
          "questionType": "logical-reasoning",
          "options": [
            {
              "optionId": "cog1-a",
              "optionText": "36",
              "scoreContribution": {
                "abilities": {"cognition": 0}
              }
            },
            {
              "optionId": "cog1-b",
              "optionText": "42",
              "scoreContribution": {
                "abilities": {"cognition": 2}
              }
            },
            {
              "optionId": "cog1-c",
              "optionText": "40",
              "scoreContribution": {
                "abilities": {"cognition": 0}
              }
            },
            {
              "optionId": "cog1-d",
              "optionText": "44",
              "scoreContribution": {
                "abilities": {"cognition": 0}
              }
            }
          ],
          "correctAnswer": "cog1-b"
        },
        {
          "questionId": "cognition-2",
          "questionText": "Complete this analogy: BOOK is to READING as MICROSCOPE is to:",
          "questionType": "logical-reasoning",
          "options": [
            {
              "optionId": "cog2-a",
              "optionText": "Science",
              "scoreContribution": {
                "abilities": {"cognition": 0}
              }
            },
            {
              "optionId": "cog2-b",
              "optionText": "Observation",
              "scoreContribution": {
                "abilities": {"cognition": 3}
              }
            },
            {
              "optionId": "cog2-c",
              "optionText": "Laboratory",
              "scoreContribution": {
                "abilities": {"cognition": 0}
              }
            },
            {
              "optionId": "cog2-d",
              "optionText": "Biology",
              "scoreContribution": {
                "abilities": {"cognition": 0}
              }
            }
          ],
          "correctAnswer": "cog2-b"
        },
        {
          "questionId": "cognition-3",
          "questionText": "Find the odd one out: Circle, Triangle, Rectangle, Square, Cylinder",
          "questionType": "logical-reasoning",
          "options": [
            {
              "optionId": "cog3-a",
              "optionText": "Circle",
              "scoreContribution": {
                "abilities": {"cognition": 0}
              }
            },
            {
              "optionId": "cog3-b",
              "optionText": "Triangle",
              "scoreContribution": {
                "abilities": {"cognition": 0}
              }
            },
            {
              "optionId": "cog3-c",
              "optionText": "Rectangle",
              "scoreContribution": {
                "abilities": {"cognition": 0}
              }
            },
            {
              "optionId": "cog3-d",
              "optionText": "Cylinder",
              "scoreContribution": {
                "abilities": {"cognition": 2}
              }
            }
          ],
          "correctAnswer": "cog3-d"
        },
        {
          "questionId": "cognition-4",
          "questionText": "In a certain code language:\nMANGO → NCQKT,\nAPPLE → ?",
          "questionType": "logical-reasoning",
          "options": [
            {
              "optionId": "cog4-a",
              "optionText": "BRSPJ",
              "scoreContribution": {
                "abilities": {"cognition": 3}
              }
            },
            {
              "optionId": "cog4-b",
              "optionText": "BQQMG",
              "scoreContribution": {
                "abilities": {"cognition": 0}
              }
            },
            {
              "optionId": "cog4-c",
              "optionText": "BRRMF",
              "scoreContribution": {
                "abilities": {"cognition": 0}
              }
            },
            {
              "optionId": "cog4-d",
              "optionText": "BSRNJ",
              "scoreContribution": {
                "abilities": {"cognition": 0}
              }
            }
          ],
          "correctAnswer": "cog4-a"
        },
        

        // ============= GROUP: ANALYTICAL AND VISUAL (10/10) =============
        // Spatial Ability + Numerical Ability
        {
          "questionId": "spatial-1",
          "questionText": "Which 3D shape would result from folding the following net?",
          "questionType": "spatial-reasoning",
          "imageUrl": cubeFold,
          "options": [
            {
              "optionId": "spat1-a",
              "optionText": "Cube",
              "scoreContribution": {
                "abilities": {"spatialAbility": 2}
              }
            },
            {
              "optionId": "spat1-b",
              "optionText": "Rectangular prism",
              "scoreContribution": {
                "abilities": {"spatialAbility": 0}
              }
            },
            {
              "optionId": "spat1-c",
              "optionText": "Triangular pyramid",
              "scoreContribution": {
                "abilities": {"spatialAbility": 0}
              }
            },
            {
              "optionId": "spat1-d",
              "optionText": "Octahedron",
              "scoreContribution": {
                "abilities": {"spatialAbility": 0}
              }
            }
          ],
          "correctAnswer": "spat1-a"
        },
        {
          "questionId": "spatial-2",
          "questionText": "Which figure is identical to the first?",
          "questionType": "spatial-reasoning",
          "imageUrl": simi,
          "options": [
            {
              "optionId": "spat2-a",
              "optionText": "A",
              "scoreContribution": {
                "abilities": {"spatialAbility": 0}
              }
            },
            {
              "optionId": "spat2-b",
              "optionText": "B",
              "scoreContribution": {
                "abilities": {"spatialAbility": 0}
              }
            },
            {
              "optionId": "spat2-c",
              "optionText": "C",
              "scoreContribution": {
                "abilities": {"spatialAbility": 2}
              }
            },
            {
              "optionId": "spat2-d",
              "optionText": "D",
              "scoreContribution": {
                "abilities": {"spatialAbility": 0}
              }
            }
          ],
          "correctAnswer": "spat2-c"
        },
        {
          "questionId": "spatial-3",
          "questionText": "Which figure is identical to the first?",
          "questionType": "spatial-reasoning",
          "imageUrl": simi2,
          "options": [
            {
              "optionId": "spat3-a",
              "optionText": "A",
              "scoreContribution": {
                "abilities": {"spatialAbility": 2}
              }
            },
            {
              "optionId": "spat3-b",
              "optionText": "B",
              "scoreContribution": {
                "abilities": {"spatialAbility": 0}
              }
            },
            {
              "optionId": "spat3-c",
              "optionText": "C",
              "scoreContribution": {
                "abilities": {"spatialAbility": 0}
              }
            },
            {
              "optionId": "spat3-d",
              "optionText": "D",
              "scoreContribution": {
                "abilities": {"spatialAbility": 0}
              }
            }
          ],
          "correctAnswer": "spat3-a"
        },
        {
          "questionId": "spatial-5",
          "questionText": "The drawing show a sheet of paper which has been folded. The dashed line indicates the whole sheet, each drawing represents a single fold. The Black Square shows where a hole was punched. Where do the hole appear when the sheet is unfolded?",
          "questionType": "spatial-reasoning",
          "imageUrl": cut,
          "options": [
            {
              "optionId": "spat5-a",
              "optionText": "A",
              "scoreContribution": {
                "abilities": {"spatialAbility": 0}
              }
            },
            {
              "optionId": "spat5-b",
              "optionText": "B",
              "scoreContribution": {
                "abilities": {"spatialAbility": 0}
              }
            },
            {
              "optionId": "spat5-c",
              "optionText": "C",
              "scoreContribution": {
                "abilities": {"spatialAbility": 2}
              }
            },
            {
              "optionId": "spat5-d",
              "optionText": "D",
              "scoreContribution": {
                "abilities": {"spatialAbility": 0}
              }
            }
          ],
          "correctAnswer": "spat5-c"
        },
        {
          "questionId": "spatial-4",
          "questionText": "Study the map, Officer Martin starts from location M And proceed as follow: left onto Valencia Av - Heading East, second left - heading North, second right - heading East, second left - heading North, he proceed North, what is his location ?",
          "questionType": "spatial-reasoning",
          "imageUrl": map,
          "options": [
            {
              "optionId": "spat5-a",
              "optionText": "N",
              "scoreContribution": {
                "abilities": {"spatialAbility": 0}
              }
            },
            {
              "optionId": "spat5-b",
              "optionText": "O",
              "scoreContribution": {
                "abilities": {"spatialAbility": 0}
              }
            },
            {
              "optionId": "spat5-c",
              "optionText": "R",
              "scoreContribution": {
                "abilities": {"spatialAbility": 0}
              }
            },
            {
              "optionId": "spat5-d",
              "optionText": "P",
              "scoreContribution": {
                "abilities": {"spatialAbility": 2}
              }
            }
          ],
          "correctAnswer": "spat5-d"
        },
        {
          "questionId": "numerical-1",
          "questionText": "If a shirt normally costs 80 rs and is on sale for 25% off, with an additional 10% discount at checkout, what is the final price?",
          "questionType": "numerical-sequence",
          "options": [
            {
              "optionId": "num1-a",
              "optionText": "54 Rs",
              "scoreContribution": {
                "abilities": {"numericalAbility": 2}
              }
            },
            {
              "optionId": "num1-b",
              "optionText": "52 Rs",
              "scoreContribution": {
                "abilities": {"numericalAbility": 0}
              }
            },
            {
              "optionId": "num1-c",
              "optionText": "56 Rs",
              "scoreContribution": {
                "abilities": {"numericalAbility": 0}
              }
            },
            {
              "optionId": "num1-d",
              "optionText": "58 Rs",
              "scoreContribution": {
                "abilities": {"numericalAbility": 0}
              }
            }
          ],
          "correctAnswer": "num1-a"
        },
        {
          "questionId": "numerical-2",
          "questionText": "A company's annual budget is distributed across five departments: The total budget is ₹2,000,000. What is the budget allocated to the Marketing department?",
          "questionType": "numerical-sequence",
          "imageUrl": num,
          "options": [
            {
              "optionId": "num2-a",
              "optionText": "₹2,00,000",
              "scoreContribution": {
                "abilities": {"numericalAbility": 0}
              }
            },
            {
              "optionId": "num2-b",
              "optionText": "₹3,00,000",
              "scoreContribution": {
                "abilities": {"numericalAbility": 2}
              }
            },
            {
              "optionId": "num2-c",
              "optionText": "₹1,50,000",
              "scoreContribution": {
                "abilities": {"numericalAbility": 0}
              }
            },
            {
              "optionId": "num2-d",
              "optionText": "₹2,50,000",
              "scoreContribution": {
                "abilities": {"numericalAbility": 0}
              }
            }
          ],
          "correctAnswer": "num2-b"
        },
        {
          "questionId": "numerical-3",
          "questionText": "A school's science club has 120 members. 40% are in 9th grade, 30% are in 10th grade, 20% are in 11th grade, and the rest are in 12th grade. How many members are in 12th grade?",
          "questionType": "numerical-sequence",
          "options": [
            {
              "optionId": "num3-a",
              "optionText": "12",
              "scoreContribution": {
                "abilities": {"numericalAbility": 2}
              }
            },
            {
              "optionId": "num3-b",
              "optionText": "15",
              "scoreContribution": {
                "abilities": {"numericalAbility": 0}
              }
            },
            {
              "optionId": "num3-c",
              "optionText": "18",
              "scoreContribution": {
                "abilities": {"numericalAbility": 0}
              }
            },
            {
              "optionId": "num3-d",
              "optionText": "20",
              "scoreContribution": {
                "abilities": {"numericalAbility": 0}
              }
            }
          ],
          "correctAnswer": "num3-a"
        },
        {
          "questionId": "numerical-4",
          "questionText": "The bar graph below shows the production (in tons) of three crops: Wheat, Rice, and Maize over four years. What is the average production of Maize over the four years?",
          "questionType": "numerical-sequence",
          "imageUrl": avg,
          "options": [
            {
              "optionId": "num4-a",
              "optionText": "275 tons",
              "scoreContribution": {
                "abilities": {"numericalAbility": 2}
              }
            },
            {
              "optionId": "num4-b",
              "optionText": "300 tons",
              "scoreContribution": {
                "abilities": {"numericalAbility": 0}
              }
            },
            {
              "optionId": "num4-c",
              "optionText": "325 tons",
              "scoreContribution": {
                "abilities": {"numericalAbility": 0}
              }
            },
            {
              "optionId": "num4-d",
              "optionText": "250 tons",
              "scoreContribution": {
                "abilities": {"numericalAbility": 0}
              }
            }
          ],
          "correctAnswer": "num4-a"
        },
        {
          "questionId": "numerical-5",
          "questionText": "A company's quarterly profits (in Cr) for the years 2022 and 2023 are as follows: What is the percentage increase in total annual profit from 2022 to 2023?",
          "questionType": "numerical-sequence",
          "imageUrl": perc,
          "options": [
            {
              "optionId": "num5-a",
              "optionText": "10%",
              "scoreContribution": {
                "abilities": {"numericalAbility": 0}
              }
            },
            {
              "optionId": "num5-b",
              "optionText": "15%",
              "scoreContribution": {
                "abilities": {"numericalAbility": 2}
              }
            },
            {
              "optionId": "num5-c",
              "optionText": "20%",
              "scoreContribution": {
                "abilities": {"numericalAbility": 0}
              }
            },
            {
              "optionId": "num5-d",
              "optionText": "25%",
              "scoreContribution": {
                "abilities": {"numericalAbility": 0}
              }
            }
          ],
          "correctAnswer": "num5-b"
        },

        // ============= GROUP: LANGUAGE & COMMUNICATION (10/10) =============
        // Verbal Ability + Social Ability
        {
          "questionId": "verbal-1",
          "questionText": "She _____ the book from the library yesterday. ",
          "questionType": "vocabulary",
          "options": [
            {
              "optionId": "verb1-a",
              "optionText": "Borrowed",
              "scoreContribution": {
                "abilities": {"verbalAbility": 2}
              }
            },
            {
              "optionId": "verb1-b",
              "optionText": "lent",
              "scoreContribution": {
                "abilities": {"verbalAbility": 0}
              }
            },
            {
              "optionId": "verb1-c",
              "optionText": "Bought ",
              "scoreContribution": {
                "abilities": {"verbalAbility": 0}
              }
            },
            {
              "optionId": "verb1-d",
              "optionText": "Gave ",
              "scoreContribution": {
                "abilities": {"verbalAbility": 0}
              }
            }
          ],
          "correctAnswer": "verb1-a"
        },
        {
          "questionId": "verbal-2",
          "questionText": "Choose the correctly spelt word.",
          "questionType": "vocabulary",
          "options": [
            {
              "optionId": "verb2-a",
              "optionText": "Hierarchy",
              "scoreContribution": {
                "abilities": {"verbalAbility": 2}
              }
            },
            {
              "optionId": "verb2-b",
              "optionText": "Hieraarchy",
              "scoreContribution": {
                "abilities": {"verbalAbility": 0}
              }
            },
            {
              "optionId": "verb2-c",
              "optionText": "Hieriarchy",
              "scoreContribution": {
                "abilities": {"verbalAbility": 0}
              }
            },
            {
              "optionId": "verb2-d",
              "optionText": "Herarchy",
              "scoreContribution": {
                "abilities": {"verbalAbility": 0}
              }
            }
          ],
          "correctAnswer": "verb2-a"
        },
        {
          "questionId": "verbal-3",
          "questionText": "The Proper sequence should be:",
          "questionType": "vocabulary",
          "imageUrl": seq,
          "options": [
            {
              "optionId": "verb3-a",
              "optionText": "SRQP",
              "scoreContribution": {
                "abilities": {"verbalAbility": 0}
              }
            },
            {
              "optionId": "verb3-b",
              "optionText": "QSPR",
              "scoreContribution": {
                "abilities": {"verbalAbility": 2}
              }
            },
            {
              "optionId": "verb3-c",
              "optionText": "SQRP",
              "scoreContribution": {
                "abilities": {"verbalAbility": 0}
              }
            },
            {
              "optionId": "verb3-d",
              "optionText": "QPSR",
              "scoreContribution": {
                "abilities": {"verbalAbility": 0}
              }
            }
          ],
          "correctAnswer": "verb3-b"
        },
        {
          "questionId": "verbal-4",
          "questionText": "Mike and Morris lived in the same village. While Morris owned the largest jewelry shop in the village, Mike was a poor farmer. Both had large families with many sons, daughters-in-law and grandchildren. One fine day, Mike, tired of not being able to feed his family, decided to leave the village and move to the city where he was certain to earn enough to feed everyone. Along with his family, he left the village for the city. At night, they stopped under a large tree. There was a stream running nearby where they could freshen up themselves. He told his sons to clear the area below the tree, he told his wife to fetch water and he instructed his daughters-in-law to make up the fire and started cutting wood from the tree himself. They didn't know that in the branches of the tree, there was a thief hiding. He watched as Mike's family worked together and also noticed that they had nothing to cook. Mike's wife also thought the same and asked her husband ' Everything is ready but what shall we eat?'. Mike raised his hands to heaven and said '' Don't worry. He is watching all of this from above. He will help us.'' The thief got worried as he had seen that the family was large and worked well together. Taking advantage of the fact that they did not know he was hiding in the branches, he decided to make a quick escape. He climbed down safely when they were not looking and ran for his life. But, he left behind the bundle of stolen jewels and money which dropped into Mike's lap. Mike opened it and jumped with joy when he saw the contents. The family gathered all their belongings and returned to the village. There was great excitement when they told everyone how they got rich. Morris thought that the tree was miraculous and this was a nice and quick way to earn some money. He ordered his family to pack some clothes and they set off as if on a journey. They also stopped under the same tree and Morris started commanding everyone as Mike had done. But no one in his family was willing to obey his orders. Being a rich family, they were used to having servants all around. So, the one who went to the river to fetch water enjoyed a nice bath. The one who went to get wood for fire went off to sleep. Morris's wife said '' Everything is ready but what shall we eat ?'' Morris raised his hands and said, '' Don't worry. He is watching all of this from above. He will help us.'' As soon as he finished saying, the thief jumped down from the tree with a knife in hand. Seeing him, everyone started running around to save their lives. The thief stole everything they had and Morris and his family had to return to the village empty handed, having lost all their valuables that they had taken with them.",
          "questionType": "vocabulary",
          "followUpQuestion": "Why did Mike and his family decide to rest under the thief's tree?",
          "options": [
            {
              "optionId": "verb4-a",
              "optionText": "Being a large family, they knew that they could easily defeat the thief ",
              "scoreContribution": {
                "abilities": {"verbalAbility": 0}
              }
            },
            {
              "optionId": "verb4-b",
              "optionText": "It was a convenient spot for taking a halt at night ",
              "scoreContribution": {
                "abilities": {"verbalAbility": 2}
              }
            },
            {
              "optionId": "verb4-c",
              "optionText": "There was a stream nearby and wood enough to build a house ",
              "scoreContribution": {
                "abilities": {"verbalAbility": 0}
              }
            },
            {
              "optionId": "verb4-d",
              "optionText": "That was the only large tree that could shelter their large family",
              "scoreContribution": {
                "abilities": {"verbalAbility": 0}
              }
            }
          ],
          "correctAnswer": "verb4-b"
        },
        {
          "questionId": "verbal-5",
          "questionText": "_____ famous poem 'Ode to a Nightingale' is written by _____ Romantic poet John Keats.",
          "questionType": "vocabulary",
          "options": [
            {
              "optionId": "verb5-a",
              "optionText": "The, A",
              "scoreContribution": {
                "abilities": {"verbalAbility": 0}
              }
            },
            {
              "optionId": "verb5-b",
              "optionText": "A, The",
              "scoreContribution": {
                "abilities": {"verbalAbility": 0}
              }
            },
            {
              "optionId": "verb5-c",
              "optionText": "The, The",
              "scoreContribution": {
                "abilities": {"verbalAbility": 2}
              }
            },
            {
              "optionId": "verb5-d",
              "optionText": "An, The",
              "scoreContribution": {
                "abilities": {"verbalAbility": 0}
              }
            }
          ],
          "correctAnswer": "verb5-c"
        },
        {
          "questionId": "social-1",
          "questionText": "In the image, what emotion is the person most likely feeling?",
          "questionType": "emotion-recognition",
          "imageUrl": facialExpression,
          "options": [
            {
              "optionId": "soc1-a",
              "optionText": "Happiness",
              "scoreContribution": {
                "abilities": {"socialAbility": 2}
              }
            },
            {
              "optionId": "soc1-b",
              "optionText": "Surprise",
              "scoreContribution": {
                "abilities": {"socialAbility": 0}
              }
            },
            {
              "optionId": "soc1-c",
              "optionText": "Contempt",
              "scoreContribution": {
                "abilities": {"socialAbility": 0}
              }
            },
            {
              "optionId": "soc1-d",
              "optionText": "Disgust",
              "scoreContribution": {
                "abilities": {"socialAbility": 0}
              }
            }
          ],
          "correctAnswer": "soc1-a"
        },
        {
          "questionId": "social-2",
          "questionText": "Your friend is upset after receiving poor grades. What should you do?",
          "questionType": "emotion-recognition",
          "options": [
            {
              "optionId": "soc2-a",
              "optionText": "Ignore them and give them space",
              "scoreContribution": {
                "abilities": {"socialAbility": 0}
              }
            },
            {
              "optionId": "soc2-b",
              "optionText": "Laugh it off and tell them grades don't matter",
              "scoreContribution": {
                "abilities": {"socialAbility": 0}
              }
            },
            {
              "optionId": "soc2-c",
              "optionText": "Ask what happened and offer help or support",
              "scoreContribution": {
                "abilities": {"socialAbility": 2}
              }
            },
            {
              "optionId": "soc2-d",
              "optionText": "Change the topic to distract them",
              "scoreContribution": {
                "abilities": {"socialAbility": 0}
              }
            }
          ],
          "correctAnswer": "soc2-c"
        },
        {
          "questionId": "social-3",
          "questionText": "Scenario: You accidentally overhear your classmate being blamed for something they didn't do. You know who actually did it.",
          "followUpQuestion": "What is the most responsible action?",
          "questionType": "emotion-recognition",
          "options": [
            {
              "optionId": "soc3-a",
              "optionText": "Stay silent; it's not your issue",
              "scoreContribution": {
                "abilities": {"socialAbility": 0}
              }
            },
            {
              "optionId": "soc3-b",
              "optionText": "Secretly tell the teacher who did it",
              "scoreContribution": {
                "abilities": {"socialAbility": 0}
              }
            },
            {
              "optionId": "soc3-c",
              "optionText": "Confront the real person privately",
              "scoreContribution": {
                "abilities": {"socialAbility": 2}
              }
            },
            {
              "optionId": "soc3-d",
              "optionText": "Publicly accuse the real person during class",
              "scoreContribution": {
                "abilities": {"socialAbility": 0}
              }
            }
          ],
          "correctAnswer": "soc3-c"
        },
        {
          "questionId": "social-4",
          "questionText": "Match the best response to each social scenario.",
          "questionType": "emotion-recognition",
          "imageUrl": match,
          "options": [
            {
              "optionId": "soc4-a",
              "optionText": "A-3, B-1, C-4, D-2",
              "scoreContribution": {
                "abilities": {"socialAbility": 0}
              }
            },
            {
              "optionId": "soc4-b",
              "optionText": "A-2, B-4, C-1, D-3",
              "scoreContribution": {
                "abilities": {"socialAbility": 0}
              }
            },
            {
              "optionId": "soc4-c",
              "optionText": "A-3, B-4, C-1, D-2",
              "scoreContribution": {
                "abilities": {"socialAbility": 2}
              }
            },
            {
              "optionId": "soc4-d",
              "optionText": "A-1, B-4, C-3, D-2",
              "scoreContribution": {
                "abilities": {"socialAbility": 0}
              }
            }
          ],
          "correctAnswer": "soc4-c"
        },
        {
          "questionId": "social-5",
          "questionText": "When someone shares their struggle with you, a good first response is:",
          "followUpQuestion": "I'm really ______ to hear that. Do you want to talk about it?",
          "questionType": "emotion-recognition",
          "options": [
            {
              "optionId": "soc5-a",
              "optionText": "happy",
              "scoreContribution": {
                "abilities": {"socialAbility": 0}
              }
            },
            {
              "optionId": "soc5-b",
              "optionText": "sorry",
              "scoreContribution": {
                "abilities": {"socialAbility": 2}
              }
            },
            {
              "optionId": "soc5-c",
              "optionText": "shocked",
              "scoreContribution": {
                "abilities": {"socialAbility": 0}
              }
            },
            {
              "optionId": "soc5-d",
              "optionText": "confused",
              "scoreContribution": {
                "abilities": {"socialAbility": 0}
              }
            }
          ],
          "correctAnswer": "soc5-b"
        }
      ]
    },
    {
      "sectionId": "orientation-assessment",
      "sectionTitle": "Personal Orientation Assessment",
      "sectionDescription": "This section evaluates your preferences, values, and approaches to work and learning.",
      "questions": [
        // ============= GROUP: PERSONALITY ORIENTATION (10/10) =============
        // Knowledge / Practical / Artistic / Social / Power / Coping
        {
          "questionId": "learning-1",
          "questionText": "When studying for a test, I prefer to:",
          "questionType": "preference",
          "options": [
            {
              "optionId": "learn1-a",
              "optionText": "Create mind maps and visual diagrams",
              "scoreContribution": {
                "orientations": {"artistic": 1, "knowledge": 1}
              }
            },
            {
              "optionId": "learn1-b",
              "optionText": "Discuss concepts with classmates",
              "scoreContribution": {
                "orientations": {"social": 1, "knowledge": 1}
              }
            },
            {
              "optionId": "learn1-c",
              "optionText": "Practice with sample problems",
              "scoreContribution": {
                "orientations": {"practical": 1, "knowledge": 1}
              } 
            },  
            {
              "optionId": "learn1-d",
              "optionText": "Read and take detailed notes",
              "scoreContribution": {
                "orientations": {"knowledge": 1, "practical": 1}
              }
            }
          ]
        },
        {
          "questionId": "power-1",
          "questionText": "When facing a challenging situation, I typically:",
          "questionType": "preference",
          "options": [
            {
              "optionId": "pow1-a",
              "optionText": "Take charge and direct others on what needs to be done",
              "scoreContribution": {
                "orientations": {"powerCopingStyle": 2, "social": 1}
              }
            },
            {
              "optionId": "pow1-b",
              "optionText": "Analyze all aspects of the problem before deciding",
              "scoreContribution": {
                "orientations": {"knowledge": 1, "powerCopingStyle": 2}
              }
            },
            {
              "optionId": "pow1-c",
              "optionText": "Look for creative solutions that others might not see",
              "scoreContribution": {
                "orientations": {"artistic": 1, "powerCopingStyle": 2}
              }
            },
            {
              "optionId": "pow1-d",
              "optionText": "Seek input from everyone involved to find consensus",
              "scoreContribution": {
                "orientations": {"social": 1, "practical": 1}
              }
            }
          ]
        },
        {
          "questionId": "knowledge-2",
          "questionText": "When choosing a project to work on, I prefer:",
          "questionType": "preference",
          "options": [
            {
              "optionId": "know2-a",
              "optionText": "Complex theoretical problems that require deep analysis",
              "scoreContribution": {
                "orientations": {"knowledge": 1, "practical": 1}
              }
            },
            {
              "optionId": "know2-b",
              "optionText": "Hands-on projects with immediate results",
              "scoreContribution": {
                "orientations": {"practical": 1, "knowledge": 1}
              }
            },
            {
              "optionId": "know2-c",
              "optionText": "Projects that allow for creative expression",
              "scoreContribution": {
                "orientations": {"artistic": 1, "knowledge": 1}
              }
            },
            {
              "optionId": "know2-d",
              "optionText": "Group projects that involve collaboration",
              "scoreContribution": {
                "orientations": {"social": 1, "knowledge": 1}
              }
            }
          ]
        },
        {
          "questionId": "practical-2",
          "questionText": "When solving a problem, my first instinct is to:",
          "questionType": "preference",
          "options": [
            {
              "optionId": "pract2-a",
              "optionText": "Break it down into manageable steps",
              "scoreContribution": {
                "orientations": {"practical": 1, "knowledge": 1}
              }
            },
            {
              "optionId": "pract2-b",
              "optionText": "Research similar problems and their solutions",
              "scoreContribution": {
                "orientations": {"knowledge": 1, "practical": 1}
              }
            },
            {
              "optionId": "pract2-c",
              "optionText": "Brainstorm creative alternatives",
              "scoreContribution": {
                "orientations": {"artistic": 1, "practical": 1}
              }
            },
            {
              "optionId": "pract2-d",
              "optionText": "Discuss it with others to get their input",
              "scoreContribution": {
                "orientations": {"social": 1, "practical": 1}
              }
            }
          ]
        },
        {
          "questionId": "power-2",
          "questionText": "In a group project that's falling behind schedule, I would:",
          "questionType": "preference",
          "options": [
            {
              "optionId": "pow2-a",
              "optionText": "Take control and reassign tasks to meet deadlines",
              "scoreContribution": {
                "orientations": {"powerCopingStyle": 2, "practical": 1}
              }
            },
            {
              "optionId": "pow2-b",
              "optionText": "Analyze the workflow to identify bottlenecks",
              "scoreContribution": {
                "orientations": {"knowledge": 1, "powerCopingStyle": 2}
              }
            },
            {
              "optionId": "pow2-c",
              "optionText": "Suggest innovative ways to approach the problem",
              "scoreContribution": {
                "orientations": {"artistic": 1, "powerCopingStyle": 2}
              }
            },
            {
              "optionId": "pow2-d",
              "optionText": "Call a team meeting to boost morale and collaboration",
              "scoreContribution": {
                "orientations": {"powerCopingStyle": 2, "social": 1}
              }
            }
          ]
        },
        {
          "questionId": "project-1",
          "questionText": "For a school science project, I would most enjoy:",
          "questionType": "preference",
          "options": [
            {
              "optionId": "proj1-a",
              "optionText": "Designing and building a working model",
              "scoreContribution": {
                "orientations": {"practical": 1, "artistic": 1}
              }
            },
            {
              "optionId": "proj1-b",
              "optionText": "Researching and analyzing data",
              "scoreContribution": {
                "orientations": {"knowledge": 1, "practical": 1}
              }
            },
            {
              "optionId": "proj1-c",
              "optionText": "Creating an innovative presentation",
              "scoreContribution": {
                "orientations": {"artistic": 1, "social": 1}
              }
            },
            {
              "optionId": "proj1-d",
              "optionText": "Working with a team to solve problems",
              "scoreContribution": {
                "orientations": {"social": 1, "practical": 1}
              }
            }
          ]
        },
        {
          "questionId": "problem-solving-2",
          "questionText": "When working on a difficult math problem, I typically:",
          "questionType": "preference",
          "options": [
            {
              "optionId": "prob2-a",
              "optionText": "Try different approaches until I find one that works",
              "scoreContribution": {
                "orientations": {"practical": 1, "artistic": 1}
              }
            },
            {
              "optionId": "prob2-b",
              "optionText": "Look up similar problems and their solutions",
              "scoreContribution": {
                "orientations": {"knowledge": 1, "practical": 1}
              }
            },
            {
              "optionId": "prob2-c",
              "optionText": "Draw diagrams to visualize the problem",
              "scoreContribution": {
                "orientations": {"artistic": 1, "knowledge": 1}
              }
            },
            {
              "optionId": "prob2-d",
              "optionText": "Ask classmates or teachers for help",
              "scoreContribution": {
                "orientations": {"social": 1, "knowledge": 1}
              }
            }
          ]
        },
        {
          "questionId": "career-1",
          "questionText": "In a school science fair, I would most enjoy:",
          "questionType": "preference",
          "options": [
            {
              "optionId": "career1-a",
              "optionText": "Building and demonstrating a working invention",
              "scoreContribution": {
                "orientations": {"practical": 1, "artistic": 1}
              }
            },
            {
              "optionId": "career1-b",
              "optionText": "Conducting research and analyzing results",
              "scoreContribution": {
                "orientations": {"knowledge": 1, "practical": 1}
              }
            },
            {
              "optionId": "career1-c",
              "optionText": "Creating an artistic display of scientific concepts",
              "scoreContribution": {
                "orientations": {"artistic": 1, "knowledge": 1}
              }
            },
            {
              "optionId": "career1-d",
              "optionText": "Explaining scientific concepts to visitors",
              "scoreContribution": {
                "orientations": {"social": 1, "knowledge": 1}
              }
            }
          ]
        },
        {
          "questionId": "coping-1",
          "questionText": "When you face a setback, what is your usual response?",
          "questionType": "preference",
          "options": [
            {
              "optionId": "cop1-a",
              "optionText": "Reflect on what went wrong and plan how to improve",
              "scoreContribution": {
                "orientations": {"knowledge": 1, "powerCopingStyle": 2}
              }
            },
            {
              "optionId": "cop1-b",
              "optionText": "Talk to friends or family for support",
              "scoreContribution": {
                "orientations": {"social": 1, "powerCopingStyle": 2}
              }
            },
            {
              "optionId": "cop1-c",
              "optionText": "Channel your feelings into creative activities",
              "scoreContribution": {
                "orientations": {"artistic": 1, "powerCopingStyle": 2}
              }
            },
            {
              "optionId": "cop1-d",
              "optionText": "Focus on practical steps to solve the problem",
              "scoreContribution": {
                "orientations": {"practical": 1, "powerCopingStyle": 2}
              }
            }
          ]
        },
        {
          "questionId": "values-1",
          "questionText": "Which value is most important to you in your future career?",
          "questionType": "preference",
          "options": [
            {
              "optionId": "val1-a",
              "optionText": "Helping others and making a difference",
              "scoreContribution": {
                "orientations": {"social": 1, "knowledge": 1}
              }
            },
            {
              "optionId": "val1-b",
              "optionText": "Achieving recognition and leadership",
              "scoreContribution": {
                "orientations": {"powerCopingStyle": 4, "practical": 1}
              }
            },
            {
              "optionId": "val1-c",
              "optionText": "Expressing creativity and originality",
              "scoreContribution": {
                "orientations": {"artistic": 1, "knowledge": 1}
              }
            },
            {
              "optionId": "val1-d",
              "optionText": "Solving complex problems",
              "scoreContribution": {
                "orientations": {"knowledge": 1, "practical": 1}
              }
            }
          ]
        }
      ]
    }
  ]
}; 