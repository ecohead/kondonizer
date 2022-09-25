import type { IWindow } from 'happy-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import '../../lib/marguerite-editor.js'


declare global {
  interface Window extends IWindow {}
}

describe('Button with increment', async() => {
  beforeEach(async() => {
    document.body.innerHTML = '<marguerite-editor name="World"></marguerite-editor>'
    await window.happyDOM.whenAsyncComplete()
    await new Promise(resolve => setTimeout(resolve, 0))
  })

  function getInsideButton(): HTMLElement | null | undefined {
    return document.body.querySelector('marguerite-editor')?.shadowRoot?.querySelector('button')
  }

  it('should increment the count on each click', () => {
    getInsideButton()?.click()
    expect(getInsideButton()?.innerText).toContain('1')
  })

  it('should show name props', () => {
    getInsideButton()
    expect(document.body.querySelector('marguerite-editor')?.shadowRoot?.innerHTML).toContain('World')
  })

  it('should dispatch count event on button click', () => {
    const spyClick = vi.fn()

    document.querySelector('marguerite-editor')!.addEventListener('count', spyClick)

    getInsideButton()?.click()

    expect(spyClick).toHaveBeenCalled()
  })
})