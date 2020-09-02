import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  repeat,
  sequence,
  delay,
} from 'react-native-reanimated';

const initialAppearDuration = 1600;

const biggerDotMax = 200;
const smallerDotMax = 110;

const LoadingView = () => {
  const biggerDotValue = useSharedValue(0);

  biggerDotValue.value = withTiming(biggerDotMax, {
    duration: initialAppearDuration,
  });

  const smalledDotValue = useSharedValue(0);

  smalledDotValue.value = withTiming(smallerDotMax, {
    duration: initialAppearDuration,
  });

  var bigDotStyle = useAnimatedStyle(() => {
    return {
      width: biggerDotValue.value,
      height: biggerDotValue.value,
      borderRadius: biggerDotValue.value / 2,
    };
  });

  var smallDotStyle = useAnimatedStyle(() => {
    return {
      width: smalledDotValue.value,
      height: smalledDotValue.value,
      borderRadius: smalledDotValue.value / 2,
    };
  });

  const [present, setPresent] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setTimeout(() => {
      if (!cancelled) {
        setPresent(false);
      }
      return () => {
        cancelled = true;
      };
    }, Math.random() * 800);
  }, []);

  if (present) {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.dot, bigDotStyle]} />
        <Animated.View style={[styles.dot, smallDotStyle]} />
        <Text>Test</Text>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  dot: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    height: 200,
    width: 200,
    opacity: 0.6,
  },
});

const screens = ['first', 'second', 'third', 'fourth'];
let current = 0;
const navigate = (navigation) => {
  setTimeout(() => {
    current = (current + 1) % screens.length;
    navigation.navigate(screens[current]);
    navigate(navigation);
  }, Math.random() * 1000);
};

export const FirstScreen = (props) => {
  useEffect(() => {
    navigate(props.navigation);
  }, [props.navigation]);
  return <LoadingView />;
};

export const SecondScreen = (props) => {
  return <LoadingView />;
};

export const ThirdScreen = (props) => {
  return <LoadingView />;
};

export const FourthScreen = (props) => {
  return <LoadingView />;
};
