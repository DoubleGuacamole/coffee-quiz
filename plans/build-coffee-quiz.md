---
planStatus:
  planId: plan-coffee-quiz-001
  title: Build Coffee Personality Quiz
  status: draft
  planType: feature
  priority: high
  owner: student
  stakeholders: []
  tags: [quiz, nextjs, frontend]
  created: "2026-02-16"
  updated: "2026-02-16T00:00:00.000Z"
  progress: 0
---

# Build Coffee Personality Quiz

## Overview
Build a complete coffee personality quiz web application based on REQUIREMENTS.md, using Next.js, TypeScript, and Tailwind CSS with the "Warm & Cozy" visual style.

## Components to Create

### 1. Main Quiz Page (`app/page.tsx`)
- Orchestrates the entire quiz flow
- Manages state for:
  - Current question index (0-5)
  - User answers (array tracking personality selections)
  - Quiz completion status
- Shows welcome screen initially
- Displays questions one at a time
- Shows results when complete

### 2. Question Component
- Displays question text
- Shows 4 answer options with icons
- Handles answer selection
- Advances to next question
- Styled with warm coffee tones

### 3. Results Component
- Calculates winning personality based on answer tally
- Displays personality name, tagline, and description
- Shows coffee recommendation
- Styled dramatically to celebrate the result
- Option to restart quiz

## Quiz Logic Implementation

### Answer Tracking
```typescript
// Track answers as personality types
const [answers, setAnswers] = useState<string[]>([]);

// Personality types:
// - "bold" (Bold Adventurer)
// - "sweet" (Sweet Enthusiast)
// - "practical" (Practical Pragmatist)
// - "artisan" (Artisan Snob)
```

### Result Calculation
1. Count occurrences of each personality in answers array
2. Find personality with highest count
3. Handle ties by choosing first occurrence
4. Map personality to coffee recommendation

## Visual Style: Warm & Cozy

### Color Palette
- Primary: `#d4a574` (warm tan/coffee)
- Secondary: `#c9916b` (medium brown)
- Accent: `#a67c52` (rich brown)
- Background: `#f9f5f0` (cream)
- Text: `#5d4037` (dark brown)
- Borders: `#e6d5c3` (light tan)

### Typography
- Font: Georgia, serif (warm, classic feel)
- Headings: 2-2.5rem, medium weight
- Body: 1rem
- Subtle italics for taglines

### Layout
- Rounded corners (12-15px)
- Soft shadows
- Generous padding
- Gradient backgrounds
- Centered layout, max-width 600px

## Files to Create/Modify

1. **`app/page.tsx`** - Main quiz application
2. **`app/globals.css`** - Update with custom color variables
3. **`types/quiz.ts`** - TypeScript interfaces for quiz data

## Quiz Data Structure

```typescript
interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface Option {
  icon: string;
  text: string;
  personality: 'bold' | 'sweet' | 'practical' | 'artisan';
}

interface PersonalityResult {
  name: string;
  coffee: string;
  tagline: string;
  description: string;
}
```

## Implementation Steps

1. Set up quiz data with all 6 questions and options
2. Create personality results mapping
3. Build welcome screen
4. Build question display component
5. Implement answer tracking and progression
6. Build results calculation logic
7. Create results display component
8. Add "Start Over" functionality
9. Apply warm & cozy styling throughout
10. Test all question flows and result calculations

## Edge Cases to Handle

- Tie in personality counts → Choose first occurrence
- User tries to go back → Not needed (linear flow)
- Refresh during quiz → Start over (acceptable for MVP)

## Success Criteria

- [ ] All 6 questions display correctly with icons
- [ ] Answers are tracked properly
- [ ] Result calculation is accurate
- [ ] Visual style matches "Warm & Cozy" spec
- [ ] Responsive on mobile and desktop
- [ ] Quiz can be restarted
- [ ] No TypeScript errors
- [ ] Clean, maintainable code
