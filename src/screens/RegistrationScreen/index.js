import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Image
} from 'react-native';
import { registerData,showPassword,hidePassword, mobileRegex, emailIDRegex} from "../../utils/utils";

const Registration = (props) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        loader: false,
        isValidMobile: true,
        isValidEmail: true
    });

    const textInputChange = (val, id) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }

        if (id === 'email') {
          const isEmail = emailIDRegex.test(val);
          if (isEmail) {
            setData({
              ...data,
              isValidEmail: true
          });
          } else {
            {
              setData({
                ...data,
                isValidEmail: false
            });
            }
          }
        } 

        if (id === 'mobile') {
          const isMobile = mobileRegex.test(val);
          if (isMobile) {
            setData({
              ...data,
              isValidMobile: true
          });
          } else {
            {
              setData({
                ...data,
                isValidMobile: false
            });
            }
          }
        }

    }
    
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
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image
                style={{height: 20, width: 20}}
                source={require('../../assets/back.png')}
            />
          </TouchableOpacity>
            <Text style={{color: 'green', fontSize: 20, marginTop: 20}}>Create an account</Text>
            <Text style={{color: 'white', fontSize: 13, marginTop: 10}}>
                This only takes two minutes :)
             </Text>
            <View style={{flexDirection: 'row', marginTop: 4}}>  
              <Text style={{color: 'white', fontSize: 13}}>
                Already have an account?{'  '}
              </Text>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Text style={{color: 'green', fontSize: 13}}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <ScrollView>
            {registerData.map((item, index) => {
                return (
                    <>
                    <Text style={styles.text_footer}>{item?.title}</Text>
                    <View style={styles.action}>
                    <TextInput
                        placeholder={item?.title}
                        style={styles.textInput}
                        secureTextEntry={ (item?.id === 'password' ||  item?.id === 'confirmPassword') && data.secureTextEntry ? true : false}
                        autoCapitalize="none"
                        keyboardType={item?.id === 'mobile' && 'number-pad'}
                        onChangeText={val => textInputChange(val, item?.id)}
                    />
                    {(item?.id === 'password' || item?.id === 'confirmPassword') &&
                        <TouchableOpacity onPress={togglePassword} style={{position: 'absolute', right: 20}}>
                        <Image
                            style={{height: 20, width: 20}}
                            source={data.secureTextEntry ?  hidePassword : showPassword}
                        />
                        </TouchableOpacity>
                    }
                    </View>
                    {item?.id === 'mobile' && !data.isValidMobile ? (
                      <View>
                        <Text style={styles.errorMsg}>
                          Invalid Mobile
                        </Text>
                      </View>
                    ) : null
                    }

                    {item?.id === 'email' && !data.isValidEmail ? (
                      <View>
                        <Text style={styles.errorMsg}>
                          Invalid Email Address
                        </Text>
                      </View>
                    ) : null
                    }
                    </>
                )
            })}
            <View style={styles.textPrivate}>
              <Text style={styles.color_textPrivate}>
                By signing up you agree to our
              </Text>
              <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                {' '}
                Terms of service
              </Text>
              <Text style={styles.color_textPrivate}> and</Text>
              <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                {' '}
                Privacy policy
              </Text>
            </View>
            <View style={styles.button}>
              <TouchableOpacity style={styles.signIn} onPress={() => {}}>
                <Text
                  style={styles.textSign}>
                  Create my account
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
};

export default Registration;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: 'black'
    },
    header: {
        height: 200
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: 'green',
        fontSize: 14,
        marginTop: 12
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
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
        fontSize: 16,
        color: '#FFF'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    errorMsg: {
      color: '#FF0000',
      fontSize: 14,
    },
  });