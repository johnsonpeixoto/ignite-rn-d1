import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png';
import penIcon from '../assets/icons/pen/pen.png';

import { Task } from './TasksList';

interface TasksItemProps {
    item: Task;
    index: number;
    removeTask: (id: number) => void;
    toggleTaskDone: (id: number) => void;
    editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({ item, index, removeTask, toggleTaskDone, editTask }: TasksItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(item.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setTitle(item.title);
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        editTask(item.id, title);
        setIsEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();

            }
        }
    }, [isEditing]);

    return (
        <>
            <View style={{padding: 5}}>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(item.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {item.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        onChange={() => setTitle}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        style={item.done ? styles.taskTextDone : styles.taskText}
                        ref={textInputRef}
                    >
                        {item.title}
                    </TextInput>
                </TouchableOpacity>
            </View>
            <View style={styles.iconsContainer}>
                {
                    isEditing ? (
                        <TouchableOpacity
                            onPress={handleCancelEditing}
                        >
                            <Icon name="x" size={24} color="#b2b2b2" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={handleStartEditing}
                        >
                            <Image source={penIcon} />
                        </TouchableOpacity>
                    )
                }
                <View style={styles.iconsDivider} />

                <TouchableOpacity
                    testID={`trash-${index}`}
                    style={{ opacity: isEditing ? 0.2 : 1 }}
                    onPress={() => removeTask(item.id)}
                    disabled={isEditing}
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>
            </View>

        </>
    )
}


const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        paddingHorizontal: 24,
        flexDirection: 'row',
    },
    iconsDivider: {
        marginHorizontal: 6,
        width: 1,
        height: 26,
        backgroundColor: "rgba(196, 196, 196, 0.24)"
    },


})