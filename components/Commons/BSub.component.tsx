
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextComponent from './Text.component';
import { bg } from '@/constants/FontSize';

export const BSub: React.FC<{ title: string }> = ({ title }) => {
    return <TextComponent style={styles.subTitleBOLD}> {title} </TextComponent>
}

const styles = StyleSheet.create({
    subTitleBOLD: { fontSize: bg, textAlign: 'center', fontWeight: '800', color: '#4975be', top: -5 },
});
