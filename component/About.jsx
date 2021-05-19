import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";

export const About = () => {
  const modalizeRef = useRef < Modalize > null;
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={onOpen}>
        <Text>Open the modal</Text>
      </TouchableOpacity>

      {isOpen ? (
        <Modalize>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
        </Modalize>
      ) : null}
    </View>
  );
};
