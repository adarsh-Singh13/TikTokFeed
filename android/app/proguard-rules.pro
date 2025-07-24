# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# ---------- React Native Core ----------
-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.react.**

# ---------- Hermes JS Engine ----------
-keep class com.facebook.hermes.** { *; }
-dontwarn com.facebook.hermes.**

# ---------- Reanimated (react-native-reanimated) ----------
-keep class com.swmansion.reanimated.** { *; }
-dontwarn com.swmansion.reanimated.**

# Worklets (needed for proper inlining)
-keepclassmembers class * {
  @com.swmansion.reanimated.annotation.ReanimatedClass <fields>;
}
-keepclassmembers class * {
  @com.swmansion.reanimated.annotation.ReanimatedProp <methods>;
}

# ---------- Gesture Handler ----------
-keep class com.swmansion.gesturehandler.** { *; }
-dontwarn com.swmansion.gesturehandler.**

# ---------- JavaScript Interface (JSI) ----------
-keep class com.facebook.jni.** { *; }
-dontwarn com.facebook.jni.**

# ---------- TurboModules & Fabric ----------
-keep class com.facebook.react.turbomodule.** { *; }
-dontwarn com.facebook.react.turbomodule.**

# ---------- Miscellaneous ----------
# Keep native modules and methods for reflection
-keepclassmembers class * {
  @com.facebook.react.bridge.ReactMethod <methods>;
}

-keepclassmembers class * {
  @com.facebook.react.uimanager.ReactProp <methods>;
}

-keepclassmembers class * {
  @com.facebook.react.uimanager.ReactPropGroup <methods>;
}

# Don't strip lambda (for RN libraries using Java 8 lambdas)
-dontwarn java.lang.invoke.*

# Keep annotations
-keepattributes *Annotation*

# Prevent warnings related to dynamic class loading
-dontwarn javax.annotation.**

