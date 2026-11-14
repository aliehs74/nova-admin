import { useId, useRef, useEffect, useState } from 'react'
import type { ReactNode, SelectHTMLAttributes } from 'react'
import styled from 'styled-components'
import Button from '@/components/atoms/button'
import Input from '@/components/atoms/input'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const StackControl = styled.div`
  display: grid;
  gap: 1rem;
`

const RowControl = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
`

const SurfaceControl = styled.section`
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow};
`

const SelectControl = styled.select`
  min-height: 44px;
  padding: .5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.control};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
`

export const Field = ({ label, children, error }: { label: string; children: ReactNode; error?: string }) => (
  <Stack>
    <span>{label}</span>
    {children}
    {error && <span role="alert">{error}</span>}
  </Stack>
)

export const Select = ({ label, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string }) => {
  const id = useId()

  return (
    <Stack>
      <label htmlFor={id}>{label.endsWith(' *') ? <>{label.slice(0, -2)} <span style={{ color: '#c62828' }}>*</span></> : label}</label>
      <SelectControl {...props} id={id}>{children}</SelectControl>
    </Stack>
  )
}

export const PasswordInput = ({ label, showLabel, hideLabel }: { label: string; showLabel: string; hideLabel: string }) => {
  const [visible, setVisible] = useState(false)

  return (
    <Row>
      <Input label={label} type={visible ? 'text' : 'password'} autoComplete="current-password" />
      <Button customVariant="secondary" aria-pressed={visible} onClick={() => setVisible(!visible)}>
        {visible ? hideLabel : showLabel}
      </Button>
    </Row>
  )
}

export const Feedback = ({ children, customVariant = 'status' }: { children: ReactNode; customVariant?: 'status' | 'alert' }) => (
  <p role={customVariant}>{children}</p>
)

const TableControl = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td { padding: 1rem; text-align: start; border-bottom: 1px solid ${({ theme }) => theme.colors.border}; }
  caption { text-align: start; font-weight: 700; padding-block: 1rem; }
`

export const Pagination = ({ page, count, onChange, previous, next, label, locale }: {
  page: number; count: number; onChange: (page: number) => void; previous: string; next: string; label: string; locale: string
}) => (
  <PaginationControl aria-label={label} dir="ltr">
    <button type="button" aria-label={previous} disabled={page <= 1} onClick={() => onChange(page - 1)}><ChevronLeft size={20} aria-hidden="true" /></button>
    {Array.from({ length: count }, (_, index) => index + 1).map(number => <button key={number} type="button" aria-label={`${label} ${new Intl.NumberFormat(locale).format(number)}`} aria-current={number === page ? 'page' : undefined} onClick={() => onChange(number)}>{new Intl.NumberFormat(locale).format(number)}</button>)}
    <button type="button" aria-label={next} disabled={page >= count} onClick={() => onChange(page + 1)}><ChevronRight size={20} aria-hidden="true" /></button>
  </PaginationControl>
)

const PaginationControl = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  padding-top: 1rem;
  button { display: grid; place-items: center; width: 44px; height: 44px; border: 1px solid ${({ theme }) => theme.colors.border}; border-radius: .4rem; background: ${({ theme }) => theme.colors.surface}; color: ${({ theme }) => theme.colors.text}; cursor: pointer; }
  button[aria-current='page'] { background: #1763da; border-color: #1763da; color: white; }
  button:disabled { opacity: .45; cursor: default; }
`

const DialogControl = styled.dialog`
  width: min(32rem, calc(100% - 2rem));
  max-height: 80dvh;
  overflow: auto;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  &::backdrop { background: rgb(0 0 0 / 55%); }
`

export const Dialog = ({ open, onClose, title, closeLabel, children }: {
  open: boolean; onClose: () => void; title: string; closeLabel: string; children: ReactNode
}) => {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    const dialog = ref.current
    dialog?.showModal()
    document.body.style.overflow = 'hidden'

    return () => {
      dialog?.close()
      document.body.style.overflow = overflow
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [open])

  return (
    <DialogControl ref={ref} aria-labelledby={titleId} onCancel={onClose}>
      <Stack>
        <h2 id={titleId}>{title}</h2>
        {children}
        <Button customVariant="secondary" onClick={onClose}>{closeLabel}</Button>
      </Stack>
    </DialogControl>
  )
}

export const Stack = (props: React.ComponentProps<typeof StackControl>) => <StackControl {...props} />
export const Row = (props: React.ComponentProps<typeof RowControl>) => <RowControl {...props} />
export const Surface = (props: React.ComponentProps<typeof SurfaceControl>) => <SurfaceControl {...props} />
export const Table = (props: React.ComponentProps<typeof TableControl>) => <TableControl {...props} />
