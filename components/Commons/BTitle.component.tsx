
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextComponent from './Text.component';
import { bg } from '@/constants/FontSize';

export const BTitle: React.FC<{ title: string }> = ({ title }) => {
    return <TextComponent style={styles.titleBOLD}> {title} </TextComponent>
}

const styles = StyleSheet.create({
    titleBOLD: { fontSize: bg, padding: 10, fontWeight: '800', color: '#EB5F19' },
});
