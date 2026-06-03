export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type LevelType = "Primary" | "O-Level" | "A-Level" | "University";
export type CampusType = "General" | "UR" | "ULK" | "RP";
export type ResourceType = "Notes" | "Exercises" | "PastPaper" | "MCQ";

export interface Resource {
  id: string;
  title: string;
  subject: string;
  topic: string;
  level: LevelType;
  campus: CampusType;
  type: ResourceType;
  content: string;
  created_at: string;
}

export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  subject: string;
  topic: string;
  level: LevelType;
  campus: CampusType;
  created_at: string;
}

export interface Subject {
  id: string;
  name: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: "admin" | "student";
}

export interface Database {
  public: {
    Tables: {
      subjects: {
        Row: Subject;
        Insert: Omit<Subject, "id">;
        Update: Partial<Subject>;
      };
      resources: {
        Row: Resource;
        Insert: Omit<Resource, "id" | "created_at">;
        Update: Partial<Resource>;
      };
      mcqs: {
        Row: MCQ;
        Insert: Omit<MCQ, "id" | "created_at">;
        Update: Partial<MCQ>;
      };
      users: {
        Row: UserProfile;
        Insert: Omit<UserProfile, "id">;
        Update: Partial<UserProfile>;
      };
    };
  };
}
