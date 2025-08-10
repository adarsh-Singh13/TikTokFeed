import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { BlurView } from '@react-native-community/blur';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../../utility/Colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import GooglSignInConfig from '../../../config/GooglSignInConfig';
import { loggedIn, loggedOut } from '../../../redux/authSlice/authSlice';
import { ActivityIndicator } from 'react-native-paper';

export default function LoginScreen({navigation}) {
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.common.isDark);
    const [isSigningIn, setIsSigningIn] = useState(false);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: GooglSignInConfig.webClientId,
        });
    }, []);

    const signInWithGoogle = async () => {
        setIsSigningIn(true);
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            const idToken = response?.data?.idToken;
            console.log("My Token SignIn", response);
            if (!idToken) {
                console.log('Sign-in was cancelled or no idToken returned');
                return;
            };

            if (response && idToken) {
                const googleCredential = auth.GoogleAuthProvider.credential(idToken);
                const userInfo = await auth().signInWithCredential(googleCredential);
                // console.log("In My SignIn Google", );
                if (userInfo) {
                    // const userRef = firestore().collection('Users').doc(auth().currentUser.uid);
                    // await userRef.set({
                    //     name: userInfo.user.displayName,
                    //     email: userInfo.user.email,
                    //     photoURL: userInfo.user.photoURL,
                    //     coin: '0',
                    // });
                    console.log('User created successfully!', navigation);
                    Alert.alert('Success', `Welcome ${userInfo?.user?.displayName}!`);
                    navigation.navigate('Home')
                    dispatch(loggedIn());
                    console.log('SIGN_IN_SUCCESS');

                } else {
                    console.log('Sign-in was cancelled or no idToken returned');
                }
            }
        } catch (error) {
            dispatch(loggedOut());
            if (error?.code) {
                switch (error.code) {
                    case statusCodes.SIGN_IN_CANCELLED:
                        console.log('SIGN_IN_CANCELLED');
                        break;
                    case statusCodes.IN_PROGRESS:
                        console.log('Sign-in already in progress');
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        console.log('Play Services not available or outdated');
                        break;
                    default:
                        console.log('Google Sign-In error:', error);
                        break;
                }
            } else {
                console.log('An unexpected error occurred:', error);
            }
        } finally {
            setIsSigningIn(false);
            console.log('SignIn False:',);
        }
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    paddingTop: insets.top,
                },
            ]}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={
                        isDarkMode
                            ? require('../../../assets/images/generated-image_light.png')
                            : require('../../../assets/images/generated-image.png')
                    }
                    style={styles.logoImage}
                    resizeMode="contain"
                />
                <BlurView
                    style={styles.blurBox}
                    blurType={isDarkMode ? 'dark' : 'light'}
                    blurAmount={10}
                >
                    <Text
                        style={[
                            styles.glassText,
                            { color: isDarkMode ? Colors.primary : Colors.black },
                        ]}
                    >
                        Welcome to My App
                    </Text>
                </BlurView>
            </View>

            {/* Loader OR Button */}
            {isSigningIn ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={isDarkMode ? Colors.white : Colors.black} />
                </View>
            ) : (
                <TouchableOpacity
                    style={[
                        styles.buttonContainer,
                        { backgroundColor: isDarkMode ? Colors.primary : Colors.black },
                    ]}
                    onPress={signInWithGoogle}
                >
                    <Text
                        style={[
                            styles.signInBtnTxt,
                            { color: isDarkMode ? Colors.white : Colors.white },
                        ]}
                    >
                        Sign in with Google
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 60
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 40,
    },
    logoImage: {
        width: 160,
        height: 160,
    },
    blurBox: {
        marginTop: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        overflow: 'hidden',
    },
    glassText: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 12,
        width: '90%',
        borderRadius: 12,
    },
    signInBtnTxt: {
        fontSize: 18,
        fontWeight: '600',
        alignSelf: 'center',
    },
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 20,
    },
});
