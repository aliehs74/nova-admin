import styled from 'styled-components'

export const Shell = styled.div`
  min-height: 100dvh;
  padding-left: 16rem;
  aside { position: fixed; inset: 0 auto 0 0; width: 16rem; background: #192b43; color: white; padding: 2rem 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
  aside a { color: white; text-decoration: none; padding: .75rem 1rem; border-radius: .6rem; }
  aside a.active { background: #1763da; }
  aside nav { display: grid; gap: .5rem; }
  header { min-height: 5rem; background: ${({ theme }) => theme.colors.surface}; border-bottom: 1px solid ${({ theme }) => theme.colors.border}; padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 1; }
  main { width: 100%; max-width: none; padding: 2rem; }
  h1 { font-size: 1.4rem; margin: 0; }
  button { flex-shrink: 0; }
  table img { width: 4rem; height: 4rem; object-fit: contain; background: white; border-radius: .5rem; }
  td { max-width: 24rem; }
  table caption { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  table thead { background: #f7f7f7; color: #192b43; }
  table { border-collapse: separate; border-spacing: 0; }
  table thead th:first-child { border-start-start-radius: ${({ theme }) => theme.radius.card}; }
  table thead th:last-child { border-start-end-radius: ${({ theme }) => theme.radius.card}; }
  aside a.sidebar-brand, aside a.sidebar-brand.active, aside a.sidebar-brand:hover { background: transparent; }
  &.sidebar-closed { padding-left: 0; }
  aside > div > div:first-child { display: grid; justify-items: start; }
  .products-toolbar { display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem; }
  .product-search { display: flex; align-items: center; flex: 1; gap: .75rem; padding-inline: 1rem; border: 1px solid #60728a; border-radius: .5rem; background: #25364c; color: white; }
  .product-search input { min-width: 0; width: 100%; min-height: 48px; border: 0; background: transparent; color: white; }
  .product-search input::placeholder { color: #c3cedd; }
  .product-search:focus-within { border-color: #1763da; }
  .add-product { display: flex; align-items: center; gap: .75rem; background: #1763da; border-color: #1763da; }
  .back-products { display: grid; place-items: center; margin-left: auto; margin-bottom: 1rem; background: transparent; border: 0; color: inherit; width: 44px; height: 44px; cursor: pointer; }
  .admin-header { direction: rtl; }
  .admin-greeting, .header-controls { display: flex; align-items: center; gap: 1rem; }
  .header-controls button { display: grid; place-items: center; width: 44px; height: 44px; background: transparent; color: inherit; border: 0; border-radius: .5rem; cursor: pointer; }
  .notifications { position: relative; }
  .notification-list { position: absolute; left: 0; top: 3rem; width: 20rem; padding: 1rem; background: ${({ theme }) => theme.colors.surface}; border: 1px solid ${({ theme }) => theme.colors.border}; border-radius: .75rem; box-shadow: ${({ theme }) => theme.shadow}; }
  .notification-list p { padding-block: .75rem; margin: 0; border-bottom: 1px solid ${({ theme }) => theme.colors.border}; }
  .sidebar-brand { display: flex; justify-content: center; align-items: center; gap: .5rem; font-size: 2rem; }
  aside nav a { gap: .75rem; }
  .active-badge { display: inline-block; padding: .25rem 1rem; border-radius: 999px; background: #dcf2dc; color: #245c32; white-space: nowrap; }
  .display-action { width: 34px; height: 34px; display: grid; place-items: center; border: 1px solid ${({ theme }) => theme.colors.border}; border-radius: .4rem; background: ${({ theme }) => theme.colors.surface}; color: #22549a; }
  .delete-action { color: #d74949; }
  .form-actions { direction: ltr; justify-content: flex-start; }
  .form-actions button { min-width: 9rem; }
  .form-actions button[type='submit'] { background: #1763da; border-color: #1763da; }
  .form-actions button[type='button'] { background: #f7f7f7; color: #192b43; }
  .theme-switch { display: inline-flex; padding: 3px; border: 1px solid ${({ theme }) => theme.colors.border}; border-radius: 999px; background: ${({ theme }) => theme.colors.background}; }
  .theme-switch button { display: inline-grid; place-items: center; width: 34px; height: 34px; padding: 0; border: 0; border-radius: 50%; color: ${({ theme }) => theme.colors.text}; background: transparent; cursor: pointer; }
  .theme-switch button[aria-pressed='true'] { color: white; background: #14243a; }
  .language-switch { display: inline-flex; align-items: center; }
  .language-switch button { min-height: 44px; padding-inline: 4px; border: 0; background: transparent; color: #b5c1d1; font: 600 .75rem/1 Arial, sans-serif; cursor: pointer; }
  .language-switch button[aria-pressed='true'] { color: white; }
  .language-switch span { color: #60728a; margin-inline: 3px; }
`

export const SidebarBottom = styled.div`
  margin-top: auto;
  display: grid;
  gap: 1rem;
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(15rem, 1fr) minmax(20rem, 2fr);
  gap: 2rem;
  img { width: 100%; height: 20rem; object-fit: contain; background: white; border-radius: .75rem; }
  textarea { min-height: 7rem; width: 100%; background: ${({ theme }) => theme.colors.surface}; color: inherit; border: 1px solid ${({ theme }) => theme.colors.border}; border-radius: .5rem; padding: .75rem; }
`
