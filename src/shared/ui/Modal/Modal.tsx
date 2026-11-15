import './Modal.scss'

import type { ReactNode } from 'react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    wide?: boolean
    fit?: boolean
    children: ReactNode
}

export const Modal = ({
    isOpen,
    onClose,
    title,
    wide = false,
    fit = false,
    children,
}: ModalProps) => {
    if (!isOpen) {
        return null
    }

    return (
        <div className="modal" role="dialog" aria-modal="true">
            <button
                type="button"
                className="modal__overlay"
                onClick={onClose}
                aria-label="Закрити діалог"
            />
            <div
                className={`modal__content${wide ? ' modal__content--wide' : ''}${fit ? ' modal__content--fit' : ''}`}
            >
                <div className="modal__header">
                    {title && <h2 className="modal__title">{title}</h2>}
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
