import { useAppData } from "../AppDataContext";
import { useState } from "react";
import {
  Container,
  Form,
  Button,
  ListGroup,
  ButtonGroup,
  Modal,
  ToggleButtonGroup,
  ToggleButton,
  Card,
} from "react-bootstrap";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  today: boolean;
}

function Todo() {
  const { tasks, setTasks } = useAppData();
  const [newTask, setNewTask] = useState("");
  const [newTaskToday, setNewTaskToday] = useState(true);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editText, setEditText] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask, completed: false, today: newTaskToday },
    ]);
    setNewTask("");
    setNewTaskToday(true);
    setShowAddModal(false);
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setEditTask(null);
  };

  const toggleToday = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, today: !task.today } : task
      )
    );
  };

  const startEditTask = (task: Task) => {
    setEditTask(task);
    setEditText(task.text);
  };

  const saveEditTask = () => {
    if (editTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editTask.id ? { ...task, text: editText } : task
        )
      );
      setEditTask(null);
      setEditText("");
    }
  };

  const renderTask = (task: Task) => (
    <ListGroup.Item
      key={task.id}
      className="list-item d-flex justify-content-between align-items-center"
      variant={task.completed ? "success" : undefined}
    >
      <span
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.text}
      </span>
      <ButtonGroup>
        <Button
					className="done"
          variant="outline-success"
          size="sm"
          onClick={() => toggleComplete(task.id)}
        >
          {task.completed ? "Undo" : "Done"}
					{task.completed ? (<i className="bi bi-arrow-counterclockwise"></i>) : (<i className="bi bi-check"></i>)}
        </Button>
				<Button
					className="later"
          variant="outline-primary"
          size="sm"
          onClick={() => toggleToday(task.id)}
        >
          {task.today ? "Later" : "Today"}
					{task.today ? (<i className="bi bi-arrow-right-short"></i>) : (<i className="bi bi-arrow-left-short"></i>)}
        </Button>
        
        <Button
					className="edit"
          variant="outline-secondary"
          size="sm"
          onClick={() => startEditTask(task)}
        >
          Edit <i className="bi bi-pencil-fill"></i>
        </Button>
      </ButtonGroup>
    </ListGroup.Item>
  );

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>To-Do List</h1>
        <Button onClick={() => setShowAddModal(true)}>Add Task</Button>
      </div>

      <Container className="m-0 p-0 d-flex justify-content-between">
        <Card className="todo-list today">
          <Card.Header>Today</Card.Header>
          <ListGroup variant="flush">
            {incompleteTasks.filter((task) => task.today).map(renderTask)}
          </ListGroup>
        </Card>
        <Card className="todo-list later">
          <Card.Header>Later</Card.Header>
          <ListGroup variant="flush">
            {incompleteTasks.filter((task) => !task.today).map(renderTask)}
          </ListGroup>
        </Card>
      </Container>

      {completedTasks.length > 0 && (
        <div className="mt-5">
          <h5>Completed</h5>
          <ListGroup>{completedTasks.map(renderTask)}</ListGroup>
        </div>
      )}

      {/* Edit Task Modal */}
      <Modal show={!!editTask} onHide={() => setEditTask(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => editTask && deleteTask(editTask.id)}
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={() => setEditTask(null)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveEditTask}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Task Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Task name"
            className="mb-3"
          />
          <ToggleButtonGroup
            type="radio"
            name="taskTiming"
            value={newTaskToday ? 1 : 0}
            onChange={(val) => setNewTaskToday(val === 1)}
          >
            <ToggleButton id="today-btn" value={1} variant="outline-success">
              Today
            </ToggleButton>
            <ToggleButton id="later-btn" value={0} variant="outline-secondary">
              Later
            </ToggleButton>
          </ToggleButtonGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addTask}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Todo;
