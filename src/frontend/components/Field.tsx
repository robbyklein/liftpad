import React from 'react'
import classNames from 'classnames'

interface IProps {
  label?: string
  type?: string
  name: string
  value: string
  placeholder?: string
  disabled?: boolean
  onChange(key: string, value: string): void
}

export default function Field({
  label,
  type = 'text',
  onChange,
  name,
  value,
  placeholder,
  disabled,
}: IProps) {
  const handleChange = (e: any) => {
    const { value } = e.target
    onChange(name, value)
  }

  return (
    <div className="field">
      {label && <label htmlFor={name}>{label}</label>}

      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        disabled={disabled}
      />
    </div>
  )
}
