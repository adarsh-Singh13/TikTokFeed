import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../../utility/Colors';
import auth from '@react-native-firebase/auth';
import GooglSignInConfig from '../../../config/GooglSignInConfig';
import { loggedOut, loginLoading, loginSuccess } from '../../../redux/authSlice/authSlice';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from './LoginStyles';
import CustomToastMessage from '../../../components/customToast/CustomToastMessage';

export default function LoginScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.common.isDark);
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: GooglSignInConfig.webClientId,
        });
    }, []);

    const signInWithGoogle = async () => {
        dispatch(loginLoading());
        setIsSigningIn(true);

        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            console.log("Google SignIn Response:", response);

            const LogInIdData = response?.data;
            const idToken = LogInIdData?.idToken;
            if (!idToken) {
                throw new Error("No idToken returned");
            }

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const userInfo = await auth().signInWithCredential(googleCredential);
            console.log(userInfo.user._user, "SIGN_IN_SUCCESS_True");
             setToastMessage('Google Sign-In Successful');
            if (userInfo) {
                const userData = {
                    uid: userInfo.user.uid,
                    name: userInfo.user.displayName,
                    email: userInfo.user.email,
                    photoURL: userInfo.user.photoURL,
                };

                console.log("SIGN_IN_SUCCESS", userData);
                dispatch(loginSuccess(userData));
            }
        } catch (error) {
            console.log("Google Sign-In error:", error);
            setToastMessage("Google Sign-In failed");
            dispatch(loginFailure(error.message || "Google Sign-In failed"));
        } finally {
            setIsSigningIn(false);
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
                <View
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
                </View>
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
            <CustomToastMessage
                visible={toastVisible}
                message={toastMessage}
                backgroundColorDynamic={isDarkMode ? '#3d3b3b' : '#4cd251'}
                position="bottom"
                duration={3000}
                onHide={() => setToastVisible(false)}
                mode={isDarkMode}
                emojiFront={''}
            />
        </View>
    );
}

