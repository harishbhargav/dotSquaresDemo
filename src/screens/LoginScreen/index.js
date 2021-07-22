import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Image
} from 'react-native';

import {emailIDRegex, showPassword, hidePassword} from '../../utils/utils'


const Login = (props) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const colors = {
    textGreen: 'green',
    text: 'black',
    background: 'white'
  }

  const textInputChange = (val) => {
    const isEmail = emailIDRegex.test(val);

    if (isEmail) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };


  const togglePassword = () => setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Image
          style={{height: 200, width: '100%'}}
          source={require('../../assets/header.png')}
        />
        <View style={{position: 'absolute', bottom: 30, paddingLeft: 20}}>
          <Text style={{color: 'green', fontSize: 20}}>Sign In</Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{color: 'white', fontSize: 13}}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('RegistrationScreen')}>
              <Text style={{color: 'green', fontSize: 13}}>Create account</Text>
            </TouchableOpacity>
          </View>
          <Text style={{color: 'white', fontSize: 13, marginTop: 4}}>This only takes two minutes :)</Text>
        </View>
      </View>
      <View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.textGreen,
            },
          ]}>
          Enter Email Address
        </Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Your Username"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
        </View>
        {data.isValidUser ? null : (
          <View>
            <Text style={styles.errorMsg}>
              Invalid Email Address
            </Text>
          </View>
        )}


        <Text
          style={[
            styles.text_footer,
            {
              color: colors.textGreen,
              marginTop: 35,
            },
          ]}>
          Password
        </Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />

            <TouchableOpacity onPress={togglePassword} style={{position: 'absolute', right: 20}}>
              <Image
                style={{height: 20, width: 20}}
                source={data.secureTextEntry ?  hidePassword : showPassword}
              />
            </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <View>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </View>
        )}
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {}}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#FFF',
                  },
                ]}>
                Sign In
              </Text>
          </TouchableOpacity>
       <TouchableOpacity>
          <Text style={{color: 'green', marginTop: 40}}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    height: 200
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 14,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: 'green'
  },
  textSign: {
    fontSize: 18
  },
});
