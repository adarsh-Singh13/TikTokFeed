import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
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