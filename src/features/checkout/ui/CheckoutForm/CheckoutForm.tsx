import './CheckoutForm.scss'

import type { FormEvent } from 'react'
import { useState } from 'react'

import { formatPhoneMask } from '../../../../shared/lib'
import { Button } from '../../../../shared/ui/Button'
import { Input } from '../../../../shared/ui/Input'
import type { CheckoutFormData, DeliveryMethod } from '../../model/checkout.types'
import { DELIVERY_METHODS } from '../../model/checkoutData'

interface CheckoutFormProps {
    onSubmit: (data: CheckoutFormData) => void
}

type FormErrors = Partial<Record<keyof CheckoutFormData, string>>

const INITIAL_FORM: CheckoutFormData = {
    fullName: '',
    phone: '',
    email: '',
    city: '',
    deliveryMethod: 'nova-poshta',
    address: '',
    comment: '',
}

const PHONE_DIGITS_LENGTH = 12
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = (form: CheckoutFormData): FormErrors => {
    const errors: FormErrors = {}

    if (!form.fullName.trim()) {
        errors.fullName = 'Вкажіть прізвище та ім’я'
    }
    if (form.phone.replace(/\D/g, '').length !== PHONE_DIGITS_LENGTH) {
        errors.phone = 'Введіть коректний номер телефону'
    }
    if (form.email.trim() && !EMAIL_PATTERN.test(form.email.trim())) {
        errors.email = 'Введіть коректний email'
    }
    if (!form.city.trim()) {
        errors.city = 'Вкажіть місто'
    }
    if (!form.deliveryMethod) {
        errors.deliveryMethod = 'Оберіть спосіб доставки'
    }
    if (form.deliveryMethod !== 'pickup' && !form.address.trim()) {
        errors.address = 'Вкажіть відділення або адресу доставки'
    }

    return errors
}

export const CheckoutForm = ({ onSubmit }: CheckoutFormProps) => {
    const [form, setForm] = useState<CheckoutFormData>(INITIAL_FORM)
    const [errors, setErrors] = useState<FormErrors>({})

    const isPickup = form.deliveryMethod === 'pickup'

    const updateField = <K extends keyof CheckoutFormData>(
        field: K,
        value: CheckoutFormData[K],
    ) => {
        setForm((prev) => ({ ...prev, [field]: value }))
        setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const nextErrors = validate(form)
        setErrors(nextErrors)
        if (Object.keys(nextErrors).length === 0) {
            onSubmit(form)
        }
    }

    return (
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
            <div className="checkout-form__row">
                <label className="checkout-form__field">
                    <span className="checkout-form__label">
                        Прізвище та ім’я <span aria-hidden="true">*</span>
                    </span>
                    <Input
                        value={form.fullName}
                        onChange={(value) => updateField('fullName', value)}
                        placeholder="Іваненко Олена"
                        ariaLabel="Прізвище та ім’я"
                    />
                    {errors.fullName && (
                        <span className="checkout-form__error">{errors.fullName}</span>
                    )}
                </label>
                <label className="checkout-form__field">
                    <span className="checkout-form__label">
                        Телефон <span aria-hidden="true">*</span>
                    </span>
                    <Input
                        type="tel"
                        value={form.phone}
                        onChange={(value) => updateField('phone', formatPhoneMask(value))}
                        placeholder="+380 (67) 123-45-67"
                        ariaLabel="Номер телефону"
                    />
                    {errors.phone && <span className="checkout-form__error">{errors.phone}</span>}
                </label>
            </div>

            <div className="checkout-form__row">
                <label className="checkout-form__field">
                    <span className="checkout-form__label">Email</span>
                    <Input
                        type="email"
                        value={form.email}
                        onChange={(value) => updateField('email', value)}
                        placeholder="you@example.com"
                        ariaLabel="Email"
                    />
                    {errors.email && <span className="checkout-form__error">{errors.email}</span>}
                </label>
                <label className="checkout-form__field">
                    <span className="checkout-form__label">
                        Місто <span aria-hidden="true">*</span>
                    </span>
                    <Input
                        value={form.city}
                        onChange={(value) => updateField('city', value)}
                        placeholder="Київ"
                        ariaLabel="Місто"
                    />
                    {errors.city && <span className="checkout-form__error">{errors.city}</span>}
                </label>
            </div>

            <label className="checkout-form__field">
                <span className="checkout-form__label">
                    Спосіб доставки <span aria-hidden="true">*</span>
                </span>
                <select
                    className="input checkout-form__select"
                    value={form.deliveryMethod}
                    onChange={(event) =>
                        updateField('deliveryMethod', event.target.value as DeliveryMethod)
                    }
                    aria-label="Спосіб доставки"
                >
                    {DELIVERY_METHODS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {errors.deliveryMethod && (
                    <span className="checkout-form__error">{errors.deliveryMethod}</span>
                )}
            </label>

            {!isPickup && (
                <label className="checkout-form__field">
                    <span className="checkout-form__label">
                        Відділення або адреса <span aria-hidden="true">*</span>
                    </span>
                    <Input
                        value={form.address}
                        onChange={(value) => updateField('address', value)}
                        placeholder="Відділення №1, вул. Хрещатик, 1"
                        ariaLabel="Відділення або адреса доставки"
                    />
                    {errors.address && (
                        <span className="checkout-form__error">{errors.address}</span>
                    )}
                </label>
            )}

            <label className="checkout-form__field">
                <span className="checkout-form__label">Коментар до замовлення</span>
                <textarea
                    className="input checkout-form__textarea"
                    value={form.comment}
                    onChange={(event) => updateField('comment', event.target.value)}
                    placeholder="Побажання щодо доставки або товару"
                    rows={3}
                    aria-label="Коментар до замовлення"
                />
            </label>

            <Button type="submit" className="checkout-form__submit">
                Підтвердити замовлення
            </Button>
        </form>
    )
}
