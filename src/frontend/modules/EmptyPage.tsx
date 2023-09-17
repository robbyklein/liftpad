import React from 'react'
import Button from '../components/Button'
import Width from '../components/Width'

interface IProps {
  heading: string
  description: string
  actionText?: string
  actionTo?: string
  actionOnClick?(): void
}

export default function EmptyPage({
  heading,
  description,
  actionText,
  actionTo,
  actionOnClick,
}: IProps) {
  return (
    <div className="empty-page">
      <Width>
        <h2 className="empty-page__heading">{heading}</h2>
        <p className="empty-page__description">{description}</p>
        {actionTo && (
          <Button small to={actionTo}>
            {actionText}
          </Button>
        )}
        {actionOnClick && (
          <Button small onClick={actionOnClick} type="button">
            {actionText}
          </Button>
        )}
      </Width>
    </div>
  )
}
