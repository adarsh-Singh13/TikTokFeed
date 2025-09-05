import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import Video from 'react-native-video';
import GenericIcon from '../../../components/genericIcon/GenericIcon';
import Colors from '../../../utility/Colors';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

function useDoubleTap(delay = 250) {
  const lastTap = useRef(null);
  return useCallback(() => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < delay) {
      lastTap.current = null;
      return true;
    }
    lastTap.current = now;
    return false;
  }, [delay]);
}

const VideoPlayer = ({ item, shouldPlay }) => (
  <Video
    source={{ uri: item.sourceUrl }}
    style={styles.player}
    resizeMode="cover"
    paused={!shouldPlay}
    repeat
    muted={false}
    poster={item.poster}
    posterResizeMode="cover"
  />
);

/**
 * Right-side vertical actions like TikTok (Like + Share)
 */
function RightActions({ liked, likeCount, onLikePress, onSharePress }) {
  return (
    <View style={styles.actionsContainer}>
      <Pressable onPress={onLikePress} style={styles.actionButton} hitSlop={10}>
        <Text style={[styles.actionIcon, liked && styles.heartActive]}>♥</Text>
        <Text style={styles.actionLabel}>{likeCount}</Text>
      </Pressable>

      <Pressable onPress={onSharePress} style={styles.actionButton} hitSlop={10}>
        <GenericIcon
          name={'share-social-sharp'}
          type="ion"
          size={32}
          color={Colors.white}
        />
        <Text style={styles.actionLabel}>Share</Text>
      </Pressable>
    </View>
  );
}

export default function MyFeedItem({
  item,
  isActive,
  paused,
  onTogglePlay,
  onLike,
  liked,
  onShare,
  renderPlayer,
}) {
  const doubleTap = useDoubleTap();
  const [localLike, setLocalLike] = useState(liked);

  useEffect(() => setLocalLike(liked), [liked]);

  const heartScale = useRef(new Animated.Value(0)).current;

  const bumpHeart = useCallback(() => {
    heartScale.setValue(0);
    Animated.timing(heartScale, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.back(2)),
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(heartScale, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }).start();
    });
  }, [heartScale]);

  const onCardPress = useCallback(() => {
    if (doubleTap()) {
      if (!localLike) {
        setLocalLike(true);
        onLike?.();
        bumpHeart();
      } else {
        bumpHeart();
      }
      return;
    }
    onTogglePlay?.();
  }, [doubleTap, localLike, onLike, bumpHeart, onTogglePlay]);

  const shouldPlay = isActive && !paused;

  return (
    <View style={styles.card}>
      <Pressable style={styles.flex1} onPress={onCardPress}>
        {renderPlayer ? (
          renderPlayer({ item, isActive, shouldPlay })
        ) : (
          <VideoPlayer item={item} shouldPlay={shouldPlay} />
        )}
      </Pressable>

      {/* Bottom overlay */}
      <View style={styles.bottomOverlay} pointerEvents="none">
        <Text style={styles.username}>@{item?.user || 'user'}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item?.description || ''}
        </Text>
      </View>

      {/* Right actions */}
      <RightActions
        liked={localLike}
        likeCount={item?.likes ?? 0}
        onLikePress={() => {
          if (!localLike) bumpHeart();
          setLocalLike(!localLike);
          onLike?.();
        }}
        onSharePress={onShare}
      />

      {/* Big heart animation */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.bigHeart,
          {
            transform: [
              {
                scale: heartScale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
            opacity: heartScale.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
      >
        <Text style={styles.bigHeartText}>♥</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: '#000',
  },
  flex1: { flex: 1 },
  player: {
    height: '100%',
    width: '100%',
    backgroundColor: '#111',
  },
  bottomOverlay: {
    position: 'absolute',
    left: 12,
    right: 84,
    bottom: 28,
  },
  username: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 6,
  },
  description: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  actionsContainer: {
    position: 'absolute',
    right: 12,
    bottom: 132,
    alignItems: 'center',
    gap: 18,
  },
  actionButton: { alignItems: 'center' },
  actionIcon: {
    fontSize: 28,
    color: '#eee',
    textAlign: 'center',
  },
  heartActive: { color: '#ff2b53' },
  actionLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  dummyBanner: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  dummyBannerText: { color: '#fff' },
  bigHeart: {
    position: 'absolute',
    alignSelf: 'center',
    top: SCREEN_HEIGHT * 0.25,
  },
  bigHeartText: {
    fontSize: 96,
    color: 'rgba(255,43,83,0.9)',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowRadius: 8,
  },
});
