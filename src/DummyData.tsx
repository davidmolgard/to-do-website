import { Appointment, Goal, Habit, Task } from "./AppDataContext";

export const habitData: Habit[] = [
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
  }
];

export const goalData: Goal[] = [
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

export const taskData: Task[] = [
  {
    id: 0,
    text: "Do dishes",
    completed: false,
    dueDate: getStringDate(0),
    priority: 1
  },
  {
    id: 1,
    text: "Math homework",
    completed: false,
    dueDate: getStringDate(0),
    priority: 1
  },
  {
    id: 2,
    text: "Grocery shopping",
    completed: true,
    dueDate: getStringDate(0),
    priority: 2
  },
  {
    id: 3,
    text: "Laundry",
    completed: false,
    dueDate: undefined,
    priority: 3
  },
];

export const apptData: Appointment[] = [
  {
    id: 0,
    title: "Lunch with mom",
    startTime: "11:00",
    endTime: "14:00",
    date: getStringDate(0),
    color: "purple"
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
    color: "orange"
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
    color: "blue"
  },
  {
    id: 5,
    title: "Nap",
    startTime: "16:00",
    endTime: "16:30",
    date: getStringDate(-1),
    color: "purple"
  },
  {
    id: 6,
    title: "Gaming",
    startTime: "22:00",
    endTime: "23:00",
    date: getStringDate(2),
    color: "orange"
  },
  {
    id: 7,
    title: "Lunch with mom",
    startTime: "11:00",
    endTime: "14:00",
    date: getStringDate(7),
    color: "purple"
  },
  {
    id: 8,
    title: "Hiking",
    startTime: "9:00",
    endTime: "10:00",
    date: getStringDate(8),
    color: "green"
  },
  {
    id: 9,
    title: "Gaming",
    startTime: "22:00",
    endTime: "23:00",
    date: getStringDate(9),
    color: "yellow"
  },
];

function getStringDate(daysFromToday: number) {
  let date = new Date();
  date.setDate(date.getDate() + daysFromToday)
  return date.toISOString().split("T")[0];
}
