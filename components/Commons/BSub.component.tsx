
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const BSub: React.FC<{ title: string }> = ({ title }) => {
    return <Text style={styles.subTitleBOLD}> {title} </Text>
}

const styles = StyleSheet.create({
    subTitleBOLD: { fontSize: hp('2.4%'), textAlign: 'center', fontWeight: '800', color: '#4975be', top: -5 },
});
