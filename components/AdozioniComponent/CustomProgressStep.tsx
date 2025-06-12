import { bg, md, sm } from '@/constants/FontSize';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const isTablet = wp('100%') > 600; // Condizione per determinare se è tablet

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
                {!onPrevious && (<View></View>)}
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
        ...(isTablet && {
            width: wp("100%"),
            alignItems: "center",
        })
    },
    label: {
        fontSize: isTablet ? bg : sm,
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
        ...(isTablet && {
            alignSelf: "end",
            marginRight: "100px",
        })
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 25,
        ...(isTablet && {
            margin: "40px",
        })
    },
    disabledButton: {
        backgroundColor: '#CCCCCC',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: isTablet ? md : sm,
        padding: isTablet ? 20 : 5,
    },
});
