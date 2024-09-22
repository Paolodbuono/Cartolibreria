import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CustomProgressStepProps {
    label: string;
    onNext?: () => void;
    onPrevious?: () => void;
    nextBtnText?: string;
    previousBtnText?: string;
    nextBtnDisabled?: boolean;
    previousBtnDisabled?: boolean;
    children: React.ReactNode;
}

export const CustomProgressStep: React.FC<CustomProgressStepProps> = ({
    label,
    onNext,
    onPrevious,
    nextBtnText = 'Next',
    previousBtnText = 'Previous',
    nextBtnDisabled = false,
    previousBtnDisabled = false,
    children,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.content}>{children}</View>
            <View style={styles.buttonContainer}>
                {onPrevious && (
                    <TouchableOpacity
                        style={[styles.button, previousBtnDisabled && styles.disabledButton]}
                        onPress={onPrevious}
                        disabled={previousBtnDisabled}
                    >
                        <Text style={styles.buttonText}>{previousBtnText}</Text>
                    </TouchableOpacity>
                )}
                {onNext && (
                    <TouchableOpacity
                        style={[styles.button, nextBtnDisabled && styles.disabledButton]}
                        onPress={onNext}
                        disabled={nextBtnDisabled}
                    >
                        <Text style={styles.buttonText}>{nextBtnText}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    content: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: '#CCCCCC',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
