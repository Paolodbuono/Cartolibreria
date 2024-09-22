import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

interface CustomProgressStepsProps {
    children: React.ReactElement[];
}

export const CustomProgressSteps: React.FC<CustomProgressStepsProps> = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const goToNextStep = () => {
        if (currentStep < children.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.stepIndicatorContainer}>
                {children.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.stepIndicator,
                            index <= currentStep ? styles.activeStepIndicator : null,
                        ]}
                    />
                ))}
            </View>
            {React.cloneElement(children[currentStep], {
                onNext: goToNextStep,
                onPrevious: goToPreviousStep,
                nextBtnDisabled: currentStep === children.length - 1,
                previousBtnDisabled: currentStep === 0,
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    stepIndicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    stepIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#CCCCCC',
    },
    activeStepIndicator: {
        backgroundColor: '#007AFF',
    },
});
