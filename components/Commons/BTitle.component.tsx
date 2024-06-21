
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const BTitle: React.FC<{ title: string }> = ({ title }) => {
    return <Text style={styles.titleBOLD}> {title} </Text>
}

const styles = StyleSheet.create({
    titleBOLD: { fontSize: hp('2.6%'), padding: 10, fontWeight: '800', color: '#EB5F19' },
});
