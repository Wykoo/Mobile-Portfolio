import React, { useEffect } from "react";
import { Animated, Text } from "react-native";

interface TextAnimationProps {
  animatedValue: Animated.Value;
}

const TextAnimation: React.FC<TextAnimationProps> = ({ animatedValue }) => {
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  const textColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", "purple"],
  });

  useEffect(() => {
    const animateText = () => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }).start(() => {
        animatedValue.setValue(0);
        animateText();
      });
    };

    animateText();
  }, [animatedValue]);

  return (
    <Animated.Text
      style={{
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
        transform: [{ translateX }],
        color: textColor,
      }}
    >
      Front-end Developer
    </Animated.Text>
  );
};

export default TextAnimation;
