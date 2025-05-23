'use strict'

import { farts } from './sounds'

/**
 * Defines the structure of the sound data.
 */
type SoundData = {
  prefix: string
  sound: string[]
}

/**
 * Fart sound data containing the prefix and sound array.
 */
const fartSounds: SoundData = {
  prefix: 'data:audio/mp3;base64,',
  sound: farts,
}

/**
 * Creates a single reusable audio player.
 * @param {SoundData} soundData - The sound data containing the prefix and sound array.
 * @returns {Object} - An object containing the audio element and a function to play a random fart sound.
 */
const createAudioPlayer = (soundData: SoundData) => {
  const audio = new Audio()
  audio.preload = 'auto'

  /**
   * Plays a random fart sound.
   */
  const playRandomFart = () => {
    const randomIndex = Math.floor(Math.random() * soundData.sound.length)
    audio.src = soundData.prefix + soundData.sound[randomIndex]
    audio.currentTime = 0
    audio.play().catch((error) => console.error('Audio playback error:', error))
  }

  return { audio, playRandomFart }
}

/**
 * Optimized fart scrolling using requestAnimationFrame and debouncing.
 * @param {number} threshold - The scroll distance threshold to trigger a fart sound.
 * @returns {Function} - A function to stop the fart scrolling.
 */
const startFartScroll = (threshold: number = 400): (() => void) => {
  let lastScrollY = window.scrollY
  let ticking = false
  const { playRandomFart } = createAudioPlayer(fartSounds)

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        if (Math.abs(currentScrollY - lastScrollY) >= threshold) {
          playRandomFart()
          lastScrollY = currentScrollY
        }
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', onScroll)

  // a cleanup function to stop fart scrolling
  return () => window.removeEventListener('scroll', onScroll)
}

export default startFartScroll
