import { createContext, useContext, useState, ReactNode } from "react";

export interface Appointment {
  id: number;
  title: string;
  time: string;
  date: string;
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  today: boolean;
}

export interface Goal {
  id: number;
  name: string;
  log: { [date: string]: boolean };
}

export interface Habit {
  id: number;
  name: string;
  log: { [date: string]: boolean };
  type: "good" | "bad";
}

interface AppDataContextType {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);

  return (
    <AppDataContext.Provider
      value={{ appointments, setAppointments, tasks, setTasks, goals, setGoals, habits, setHabits }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return context;
}