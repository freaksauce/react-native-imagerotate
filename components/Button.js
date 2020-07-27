import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import buttons from './Button.styles'

const Button = props => {
  const { children, onPress } = props
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={buttons.button}
      >
        <Text style={buttons.text}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Button