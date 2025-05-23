/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import startFartScroll from '../src'

// A tiny Audio‐fake that lets us inspect `.preload`, `.src`, and spy on `.play()`.
class MockAudio {
  static instances: MockAudio[] = []
  preload = ''
  src = ''
  play = vi.fn().mockResolvedValue(undefined)

  constructor() {
    MockAudio.instances.push(this)
  }
}

describe('startFartScroll', () => {
  beforeEach(() => {
    MockAudio.instances = []

    // install MockAudio into the JSDOM window
    ;(globalThis as any).Audio = MockAudio

    // make RAF run callbacks immediately
    ;(globalThis as any).requestAnimationFrame = (cb: FrameRequestCallback) => {
      cb(0)
      return 0
    }

    // ensure scrollY is writable
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('plays a fart sound when scrolling beyond threshold', () => {
    const threshold = 10
    const cleanup = startFartScroll(threshold)

    // check that an Audio was created and set to preload.
    expect(MockAudio.instances).toHaveLength(1)
    const audio = MockAudio.instances[0]
    expect(audio.preload).toBe('auto')

    // scroll past the threshold
    window.scrollY = threshold + 5
    window.dispatchEvent(new Event('scroll'))

    // Audio.src should begin with the data‐URI prefix…
    expect(audio.src.startsWith('data:audio/mp3;base64,')).toBe(true)
    // …and play() should have been called exactly once.
    expect(audio.play).toHaveBeenCalledTimes(1)

    cleanup()
  })

  it('does not play after cleanup is called', () => {
    const threshold = 0
    const cleanup = startFartScroll(threshold)

    // remove the listener immediately
    cleanup()

    // any subsequent scroll should not trigger play
    window.scrollY = threshold + 100
    window.dispatchEvent(new Event('scroll'))

    const [audio] = MockAudio.instances
    expect(audio.play).not.toHaveBeenCalled()
  })
})
