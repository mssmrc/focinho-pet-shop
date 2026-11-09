import { describe, expect, it } from 'vitest'
import { buildMessage, onlyDigits, whatsappLink } from '~/lib/whatsapp'

describe('whatsapp', () => {
  it('limpa o telefone', () => {
    expect(onlyDigits('+55 (11) 99999-0000')).toBe('5511999990000')
  })

  it('monta o link com a mensagem codificada', () => {
    expect(whatsappLink('55 11 99999-0000', 'Olá, tudo bem?')).toBe(
      'https://wa.me/5511999990000?text=Ol%C3%A1%2C%20tudo%20bem%3F',
    )
  })

  it('monta o link sem mensagem', () => {
    expect(whatsappLink('5511999990000')).toBe('https://wa.me/5511999990000')
  })

  it('ignora campos vazios na mensagem', () => {
    const msg = buildMessage('Oi!', [
      ['Nome', 'Ana'],
      ['Telefone', '  '],
      ['Período', undefined],
    ])
    expect(msg).toBe('Oi!\n\n*Nome:* Ana')
  })
})
