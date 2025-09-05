import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Share,
  StatusBar,
  Dimensions
} from 'react-native';
import MyFeedItem from './MyFeedItem';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const demoData = [
    {
      id: 1,
      sourceUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
      poster: 'https://images.pexels.com/photos/1558732/pexels-photo-1558732.jpeg',
      description: 'Ocean vibes and sunny skies 🌊',
      user: 'oceanic',
      likes: 120,
    },
    {
      id: 2,
      sourceUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      poster: 'https://images.pexels.com/photos/290470/pexels-photo-290470.jpeg',
      description: 'City night timelapse ✨',
      user: 'cityscape',
      likes: 980,
    },
    {
      id: 3,
      sourceUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      poster: 'https://images.pexels.com/photos/290470/pexels-photo-290470.jpeg',
      description: 'Animated ✨',
      user: 'Mixed',
      likes: 380,
    },
    {
      id: 4,
      sourceUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      poster: 'https://images.pexels.com/photos/290470/pexels-photo-290470.jpeg',
      description: 'Animated ✨',
      user: 'Mixed',
      likes: 120,
    },
    {
      id: 5,
      sourceUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      poster: 'https://images.pexels.com/photos/290470/pexels-photo-290470.jpeg',
      description: 'Animated ✨',
      user: 'Mixed',
      likes: 98,
    },
    {
      id: 6,
      sourceUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      poster: 'https://images.pexels.com/photos/290470/pexels-photo-290470.jpeg',
      description: 'Animated ✨',
      user: 'Mixed',
      likes: 130,
    },
  ];
export default function MyFeedScreen ({ data, initialIndex = 0, renderPlayer }) {

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [paused, setPaused] = useState(false);
  const [likedMap, setLikedMap] = useState(() => new Map());

  const viewabilityConfig = useMemo(() => ({
    itemVisiblePercentThreshold: 80,
  }), []);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    const first = viewableItems?.[0];
    if (first?.index !== undefined && first?.isViewable) {
      setCurrentIndex(first.index);
      // When swiping, resume play for new item if previously playing
      setPaused(false);
    }
  }).current;

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const togglePlay = useCallback(() => {
    setPaused(p => !p);
  }, []);

  const onLike = useCallback((id) => {
    setLikedMap(prev => new Map(prev).set(id, true));
  }, []);

  const onShare = useCallback(async (item) => {
    try {
      await Share.share({
        message: item?.sourceUrl || 'Check this out!',
        url: item?.sourceUrl,
        title: 'Share Video',
      });
    } catch (e) {
      // no-op
    }
  }, []);

  const renderItem = useCallback(({ item, index }) => {
    const isActive = index === currentIndex;
    const liked = likedMap.get(item.id) === true;
    return (
      <MyFeedItem
        key={String(item.id)}
        item={item}
        isActive={isActive}
        paused={paused}
        onTogglePlay={togglePlay}
        onLike={() => onLike(item.id)}
        liked={liked}
        onShare={() => onShare(item)}
        renderPlayer={renderPlayer}
      />
    );
  }, [currentIndex, likedMap, paused, togglePlay, onLike, onShare, renderPlayer]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        data={demoData}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={SCREEN_HEIGHT}
        getItemLayout={(_, index) => ({ length: SCREEN_HEIGHT, offset: SCREEN_HEIGHT * index, index })}
        initialScrollIndex={initialIndex}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        windowSize={3}
        removeClippedSubviews
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  player: {
    height: '100%',
    width: '100%',
    backgroundColor: '#111',
  },
});
