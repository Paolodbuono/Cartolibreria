import React from 'react';
import { StyleSheet, Text } from 'react-native';

const TextComponent: React.FC<any> = ({ children, style, ...rest }) => {
  const flat = StyleSheet.flatten(style);
  if (flat?.fontWeight) return (<Text style={{ ...flat, ...styles.fontAllanBold }} {...rest}>{children}</Text>);
  return (<Text style={{ ...flat, ...styles.fontAllanRegular }} {...rest}>{children}</Text>);
}

export default TextComponent;

const styles = StyleSheet.create({
  fontAllanRegular: { fontFamily: 'Allan-Regular' },
  fontAllanBold: { fontFamily: 'Allan-Bold', fontWeight: "normal" }
});
