import React, { useState, useEffect } from 'react';
import Wrapper from './style';

const API_URL = 'http://localhost:5000/tasks';

const TaskManager = () => {
    const [taskInput, setTaskInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [toast, setToast] = useState({ message: '', type: '', visible: false });
    const [deletedTask, setDeletedTask] = useState(null);
    const [undoTimer, setUndoTimer] = useState(null);
    const [editId, setEditId] = useState(null);
    const [selected, setSelected] = useState({});


    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(setTasks)
            .catch(() => showToast('Failed to load tasks', 'warning'));
    }, []);

    const showToast = (message, type = 'success') => {
        setToast({ message, type, visible: true });
        setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
    };


    const saveTask = async () => {
        const text = taskInput.trim();
        if (!text) return alert('Please enter a task.');

        try {
            if (editId) {
        
                const res = await fetch(`${API_URL}/${editId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text }),
                });
                if (!res.ok) throw new Error('Update failed');
                const updated = await res.json();
                setTasks(tasks.map(t => (t.id === editId ? updated : t)));
                setEditId(null);
                showToast('Task updated');
            } else {

                const res = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text }),
                });
                if (!res.ok) throw new Error('Add failed');
                const newTask = await res.json();
                setTasks([...tasks, newTask]);
                showToast('Task added');
            }
            setTaskInput('');
        } catch (err) {
            showToast(err.message, 'warning');
        }
    };


    const deleteTask = async (id) => {
        const taskToDelete = tasks.find(t => t.id === id);
        if (!taskToDelete) return;

        setTasks(tasks.filter(t => t.id !== id));
        setDeletedTask(taskToDelete);
        showToast('Task deleted. Undo available for 5 seconds', 'warning');

        try {
            const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');
        } catch {
            showToast('Delete failed', 'warning');
        }

        if (undoTimer) clearTimeout(undoTimer);
        setUndoTimer(setTimeout(() => setDeletedTask(null), 5000));
    };


    const undoDelete = async () => {
        if (!deletedTask) return;
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: deletedTask.text }),
            });
            if (!res.ok) throw new Error('Undo failed');
            const restored = await res.json();
            setTasks([...tasks, restored]);
            setDeletedTask(null);
            if (undoTimer) clearTimeout(undoTimer);
            showToast('Task restored');
        } catch {
            showToast('Undo failed', 'warning');
        }
    };

    const startEdit = (task) => {
        setTaskInput(task.text);
        setEditId(task.id);
    };


    const toggleSelect = (id) => {
        setSelected(prev => {
            const copy = { ...prev };
            if (copy[id]) {
                delete copy[id];
            } else {
                copy[id] = true;
            }
            return copy;
        });
    };


    const massDelete = async () => {
        const ids = Object.keys(selected).map(Number);
        if (ids.length < 1) return;
        if (ids.length > 1 && !window.confirm(`Delete ${ids.length} tasks?`)) return;

    
        setTasks(tasks.filter(t => !ids.includes(t.id)));
        setSelected({});
        if (editId && ids.includes(editId)) {
            setEditId(null);
            setTaskInput('');
        }


        try {
            await Promise.all(ids.map(id => fetch(`${API_URL}/${id}`, { method: 'DELETE' })));
            showToast(`${ids.length} task(s) deleted`, 'warning');
        } catch {
            showToast('Failed to delete tasks', 'warning');
        }
    };

    const selectedCount = Object.keys(selected).length;

    return (
        <Wrapper>
            <div className="container">
                <h2 className='headingName'>Task Manager</h2>
                <div className='task-container'>
                    <div className="input-section">
                        <input
                            type="text"
                            value={taskInput}
                            onChange={e => setTaskInput(e.target.value)}
                            placeholder="Enter task"
                            className="task-input"
                        />
                        <button onClick={saveTask} className="add-button">
                            {editId ? 'Update Task' : 'Add Task'}
                        </button>
                    </div>

                    {selectedCount > 1 && (
                        <button onClick={massDelete} className="delete-button" style={{ marginBottom: '12px' }}>
                            Delete Selected ({selectedCount})
                        </button>
                    )}

                    <ul className="task-list">
                        {tasks.map(task => (
                            <li key={task.id} className="task-item">
                                <input
                                    type="checkbox"
                                    checked={!!selected[task.id]}
                                    onChange={() => toggleSelect(task.id)}
                                    style={{ marginRight: '10px' }}
                                />
                                <span style={{ flex: 1 }}>{task.text}</span>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => startEdit(task)} className="add-button" style={{ backgroundColor: '#ffc107' }}>
                                        Edit
                                    </button>
                                    <button onClick={() => deleteTask(task.id)} className="delete-button">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {deletedTask && (
                        <div className="undo-container">
                            <button onClick={undoDelete} className="undo-button">Undo Delete</button>
                        </div>
                    )}

                    {toast.visible && (
                        <div className={`toast ${toast.type}`}>
                            {toast.message}
                        </div>
                    )}
                </div>
            </div>
        </Wrapper>
    );
};

export default TaskManager;
