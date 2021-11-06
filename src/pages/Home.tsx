import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find(t => t.title === newTaskTitle)) {
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome");
    } else {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
      setTasks([...tasks, newTask]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => (task.id === id ? { ...task, done: !task.done } : task));
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            const updatedTasks = tasks.filter(task => task.id !== id);
            setTasks(updatedTasks);
          }
        },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map(task => (task.id === taskId ? { ...task, title: taskNewTitle} : task));
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})