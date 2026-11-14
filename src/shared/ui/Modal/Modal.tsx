import './Modal.scss'

import type { ReactNode } from 'react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: ReactNode
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
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
            <div className="modal__content">
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
                <div className="modal__body">{children}</div>
            </div>
        </div>
    )
}
