import React from 'react';
import { StyleSheet, Text } from 'react-native';

const TextComponent: React.FC<any> = ({ children, style }) => {
  if (style?.fontWeight) return (<Text style={{ ...style, ...styles.fontAllanBold }} >{children}</Text>);
  return (<Text style={{ ...style, ...styles.fontAllanRegular }} >{children}</Text>);
}

export default TextComponent;

const styles = StyleSheet.create({
  fontAllanRegular: { fontFamily: 'Allan-Regular' },
  fontAllanBold: { fontFamily: 'Allan-Bold', fontWeight: "normal" }
});
