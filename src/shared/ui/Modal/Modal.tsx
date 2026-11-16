import './Modal.scss'

import type { ReactNode } from 'react'
import { useEffect, useId, useRef } from 'react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    wide?: boolean
    fit?: boolean
    children: ReactNode
}

const FOCUSABLE_SELECTOR =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export const Modal = ({
    isOpen,
    onClose,
    title,
    wide = false,
    fit = false,
    children,
}: ModalProps) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const onCloseRef = useRef(onClose)
    const titleId = useId()

    useEffect(() => {
        onCloseRef.current = onClose
    })

    useEffect(() => {
        if (!isOpen) {
            return
        }

        const previousFocus = document.activeElement as HTMLElement | null
        document.body.style.overflow = 'hidden'

        const focusables = () =>
            Array.from(
                contentRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [],
            ).filter((el) => !el.hasAttribute('disabled'))

        const first = focusables()[0]
        const content = contentRef.current
        ;(first ?? content)?.focus()

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onCloseRef.current()
                return
            }
            if (event.key !== 'Tab') {
                return
            }
            const items = focusables()
            if (items.length === 0) {
                event.preventDefault()
                content?.focus()
                return
            }
            const firstItem = items[0]
            const lastItem = items[items.length - 1]
            if (event.shiftKey && document.activeElement === firstItem) {
                event.preventDefault()
                lastItem.focus()
            } else if (!event.shiftKey && document.activeElement === lastItem) {
                event.preventDefault()
                firstItem.focus()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
            previousFocus?.focus()
        }
    }, [isOpen])

    if (!isOpen) {
        return null
    }

    return (
        <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
        >
            <button
                type="button"
                className="modal__overlay"
                onClick={onClose}
                aria-label="Закрити діалог"
            />
            <div
                ref={contentRef}
                tabIndex={-1}
                className={`modal__content${wide ? ' modal__content--wide' : ''}${fit ? ' modal__content--fit' : ''}`}
            >
                <div className="modal__header">
                    {title && (
                        <h2 id={titleId} className="modal__title">
                            {title}
                        </h2>
                    )}
                    <button
                        type="button"
                        className="modal__close"
                        onClick={onClose}
                        aria-label="Закрити"
                    >
                        ✕
                    </button>
                </div>
                <div className={`modal__body${fit ? ' modal__body--fit' : ''}`}>{children}</div>
            </div>
        </div>
    )
}
