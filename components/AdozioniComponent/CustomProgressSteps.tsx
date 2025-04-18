import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

interface CustomProgressStepsProps {
    children: React.ReactElement[];
    state: any
}

export const CustomProgressSteps: React.FC<CustomProgressStepsProps> = ({ children, state}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [props, setProps] = useState({
        label : "",
        onNext : null,
        onPrevious : null,
        nextBtnText : '',
        previousBtnText : '',
        nextBtnDisabled : false,
        previousBtnDisabled : false,

    });

    const goToNextStep = () => {
        if (currentStep < children.length - 1) {
            setCurrentStep(currentStep + 1);
        }
        if(props.onNext) (props as any).onNext()
    };

    const goToPreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
        if(props.onPrevious) (props as any).onPrevious()
    };

    useEffect(() => {
        setProps(children[currentStep].props)
    },[currentStep, state])

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
                onNext: props.onNext && goToNextStep,
                onPrevious: props.onPrevious && goToPreviousStep,
                nextBtnDisabled: currentStep === children.length - 1 || props.nextBtnDisabled,
                previousBtnDisabled: currentStep === 0 || props.previousBtnDisabled ,
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
        justifyContent: 'center',
        marginBottom: 20,
    },
    stepIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#CCCCCC',
        marginHorizontal: 20,
    },
    activeStepIndicator: {
        backgroundColor: '#007AFF',
    },
});