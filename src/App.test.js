import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

test('renders home screen navigation', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )
  expect(screen.getByText('PŘEDŠKOLÁCI')).toBeInTheDocument()
})

test('renders resource page cards', () => {
  render(
    <MemoryRouter initialEntries={['/matematika']}>
      <App />
    </MemoryRouter>
  )
  expect(screen.getByRole('link', { name: /skolakov/i })).toBeInTheDocument()
})

test('renders nav hub submenu in sidebar', () => {
  render(
    <MemoryRouter initialEntries={['/predmety']}>
      <App />
    </MemoryRouter>
  )
  expect(screen.getByRole('button', { name: /školní předměty/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /český jazyk/i })).toBeInTheDocument()
})

test('renders hybrid page header and cards', () => {
  render(
    <MemoryRouter initialEntries={['/devatatrida']}>
      <App />
    </MemoryRouter>
  )
  expect(screen.getByText('PŘIJÍMACÍ ZKOUŠKY NA SŠ')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /onlinecviceni/i })).toBeInTheDocument()
})

test('renders empty stub page message', () => {
  render(
    <MemoryRouter initialEntries={['/anglicky']}>
      <App />
    </MemoryRouter>
  )
  expect(screen.getByText('Obsah bude doplněn.')).toBeInTheDocument()
})
