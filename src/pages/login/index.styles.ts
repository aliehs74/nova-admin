import styled from 'styled-components'

export const Backdrop = styled.main`
  width: 100%;
  max-width: none;
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 4rem 1.5rem;
  background: #192b43;
  background-image: radial-gradient(circle at 100% 0%, #ed6c18 0 5rem, transparent 5.1rem), radial-gradient(circle at 0% 100%, #ed6c18 0 6rem, transparent 6.1rem);
`

export const Card = styled.section`
  width: min(100%, 27rem);
  padding: 2.5rem 2rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  box-shadow: 0 16px 48px rgb(0 0 0 / 18%);
  button[type='submit'] { background: #1763da; border-color: #1763da; }
  button[type='submit']:hover:not(:disabled) { background: #104dad; }
  form span:empty { display: none; }
`

export const Brand = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  font-size: 2.75rem;
  font-weight: 700;
`

export const LoginTitle = styled.h1`
  margin: 0 0 1.5rem;
  text-align: center;
  font-size: 1.25rem;
`
