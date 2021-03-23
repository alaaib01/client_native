import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native'
import { Form, H2, Icon, Item, Input, Label, Text } from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet'
import { LinearGradient } from 'expo'


export default class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  }

  // stepper approach for above
  // verifyEmail
  // verifyPassword longer than 8 include
  // include terms radio box with privacy modal and link

  submitForm = () => {
    // const { email, password } = this.state
    // this.props.onSubmit({
    //   email,
    //   password
    // })
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <Form>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.formShadow}>
              <View style={styles.inputs}>
                <Item floatingLabel>
                  <Input
                    placeholder={'email'}
                    autoFocus={true}
                    autoCapitalize={'none'}
                    keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}

                    style={styles.formInput}
                  />
                </Item>
                <Item floatingLabel>
                  <Input
                    placeholder={'password'}
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    style={styles.formInput}
                  />
                </Item>
              </View>
              <View>
                <TouchableOpacity onPress={this.submitForm}>
                  <LinearGradient
                    style={styles.button}
                    colors={['#7F00FF', '#E100FF']}
                    start={[0, 1]}
                    end={[1, 0]}
                  >
                    <Text style={styles.actionButtonText}>
                      asdasd
                    </Text>
                    <Icon
                      type="SimpleLineIcons"
                      name="arrow-right"
                      style={styles.icon}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Form>
      </View>
    )
  }
}


const styles = EStyleSheet.create({
  formContainer: {
    paddingHorizontal: 5,
    marginHorizontal: 15
  },
  formShadow: {
    borderRadius: 5,
    padding: 10,
    paddingBottom: 15
  },
  headline: {
    alignSelf: 'center',
    color: '$highlightColor'
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 7,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    margin: 5,
    opacity: 0.85,
    paddingRight: 20,
    paddingBottom: 10,
    borderRadius: 15
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '$deepPurple',
    paddingHorizontal: 30,
    paddingTop: 15,
    marginTop: 15,
    paddingBottom: 15,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowOpacity: 0.25,
    shadowRadius: 7,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    borderRadius: 15
  },
  actionButtonText: {
    color: '$highlightColor',
    backgroundColor: 'transparent',
    fontWeight: 'bold'
  },
  icon: {
    color: '$highlightColor',
    fontSize: 15,
    backgroundColor: 'transparent'
  },
  formInput: {
    color: '$inputColor',
    backgroundColor: '$formInput',
    borderRadius: 15,
    paddingHorizontal: 11
  }
})