export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type Topic = 'variables' | 'loops' | 'conditionals' | 'functions' | 'oop'

export interface TestCase {
  call: string
  expected: string
}

export interface Problem {
  id: string
  title: string
  difficulty: Difficulty
  topics: Topic[]
  prompt: string
  starterCode: string
  testCases: TestCase[]
  hint: string
}

export interface ScheduleMeeting {
  date: string
  label?: string
}

export interface ScheduleSemester {
  name: string
  year: number
  meetings: ScheduleMeeting[]
}

export interface CurriculumProject {
  title: string
  description: string
}

export interface CurriculumUnit {
  id: string
  title: string
  summary: string
  concepts: string[]
  projects: CurriculumProject[]
  lessonNotes: string
}
