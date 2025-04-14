import { createContext, useContext, useState, ReactNode } from "react";

export interface Appointment {
  id: number;
  title: string;
  startTime: string; // e.g., "13:00"
  endTime: string;   // e.g., "14:30"
  date: string;      // YYYY-MM-DD
  color: string;     // e.g., "blue", "red", etc.
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

const DemoAppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function DemoAppDataProvider({ children }: { children: ReactNode }) {
	const habitData: Habit[] = [
		{
			id: 0,
			name: "get up early",
			log: {[getStringDate(0)]: false},
			type: "good"
		},
		{
			id: 1,
			name: "less screen time",
			log: { [getStringDate(-4)]: true },
			type: "bad"
		},
		{
			id: 2,
			name: "exercise",
			log: { [getStringDate(-1)]: true },
			type: "good"
		},
	];

	const goalData: Goal[] = [
		{
			id: 0,
			name: "get to class on time",
			log: {[getStringDate(-1)]: true}
		},
		{
			id: 1,
			name: "get outside",
			log: { [getStringDate(-3)]: true }
		},
		{
			id: 2,
			name: "exercise",
			log: { [getStringDate(-1)]: true }
		},
	];

	const taskData: Task[] = [
		{
			id: 0,
			text: "Do dishes",
			completed: false,
			today: true
		},
		{
			id: 1,
			text: "Math homework",
			completed: false,
			today: false
		},
		{
			id: 2,
			text: "Grocery shopping",
			completed: true,
			today: true
		},
		{
			id: 3,
			text: "Laundry",
			completed: false,
			today: false
		},
	];

	const apptData: Appointment[] = [
		{
			id: 0,
			title: "Lunch with mom",
			startTime: "11:00",
			endTime: "14:00",
			date: getStringDate(0),
			color: "green"
		},
		{
			id: 1,
			title: "Work meeting",
			startTime: "13:00",
			endTime: "15:00",
			date: getStringDate(0),
			color: "green"
		},
		{
			id: 2,
			title: "Pizza party",
			startTime: "18:00",
			endTime: "19:00",
			date: getStringDate(0),
			color: "green"
		},
		{
			id: 3,
			title: "Meet with CS group",
			startTime: "10:00",
			endTime: "12:00",
			date: getStringDate(1),
			color: "green"
		},
		{
			id: 4,
			title: "Dentist",
			startTime: "13:00",
			endTime: "14:00",
			date: getStringDate(1),
			color: "green"
		},
		{
			id: 5,
			title: "Nap",
			startTime: "16:00",
			endTime: "16:30",
			date: getStringDate(-1),
			color: "green"
		},
		{
			id: 6,
			title: "Gaming",
			startTime: "22:00",
			endTime: "23:00",
			date: getStringDate(2),
			color: "green"
		},
	];

	const [appointments, setAppointments] = useState<Appointment[]>(apptData);
	const [tasks, setTasks] = useState<Task[]>(taskData);
	const [goals, setGoals] = useState<Goal[]>(goalData);
	const [habits, setHabits] = useState<Habit[]>(habitData);

	return (
		<DemoAppDataContext.Provider
			value={{ appointments, setAppointments, tasks, setTasks, goals, setGoals, habits, setHabits }}
		>
			{children}
		</DemoAppDataContext.Provider>
	);
}

export function useDemoAppData() {
	const context = useContext(DemoAppDataContext);
	if (!context) {
		throw new Error("useAppData must be used within an AppDataProvider");
	}
	return context;
}

function getStringDate(daysFromToday: number) {
	const today = new Date();
	const date = new Date(today);
	date.setDate(today.getDate() + daysFromToday);
	return date.toISOString().split("T")[0];
}