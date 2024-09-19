import type { ComponentType } from 'react';
import { Pressable } from 'react-native';

const withPressable = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ComponentWithPressable = (props: P & { onPress: VoidFunction }) => (
    <Pressable onPress={props.onPress} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
      <WrappedComponent {...props} />
    </Pressable>
  );

  ComponentWithPressable.displayName = `WithPressable(${WrappedComponent.displayName || WrappedComponent.name})`;

  return ComponentWithPressable;
};

export default withPressable;
