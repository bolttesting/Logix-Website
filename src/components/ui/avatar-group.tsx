import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import './avatar-group.css'

export interface AvatarItem {
  id: number
  name: string
  designation: string
  image: string
}

export interface AvatarGroupProps {
  items: AvatarItem[]
  className?: string
  maxVisible?: number
  size?: 'sm' | 'md' | 'lg'
}

function AvatarSlot({
  item,
  index,
  totalItems,
  isHovered,
  onHover,
  onLeave,
}: {
  item: AvatarItem
  index: number
  totalItems: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const z = totalItems - index

  return (
    <div
      className={cn('avatar-group__slot', index > 0 && 'avatar-group__slot--offset')}
      style={{ zIndex: z }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <AnimatePresence mode="popLayout">
        {isHovered ? (
          <motion.div
            key="tip"
            role="tooltip"
            className="avatar-group__tooltip"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: 'spring', stiffness: 200, damping: 20 },
            }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
          >
            <span className="avatar-group__tooltip-name">{item.name}</span>
            <span className="avatar-group__tooltip-role">{item.designation}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        style={{ position: 'relative', zIndex: isHovered ? 100 : undefined }}
      >
        <button
          type="button"
          className="avatar-group__trigger"
          aria-label={`${item.name}, ${item.designation}`}
          aria-expanded={isHovered}
          onFocus={onHover}
          onBlur={onLeave}
        >
          <span className="avatar-group__img-wrap">
            <img
              src={item.image}
              alt=""
              className="avatar-group__img"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          </span>
        </button>
      </motion.div>
    </div>
  )
}

/**
 * Overlapping circular avatars with optional +N and hover tooltip.
 * Vite + React port of the shadcn/Next example (plain img + shared CSS, no next/image).
 */
export default function AvatarGroup({
  items = [],
  className,
  maxVisible = 5,
  size = 'md',
}: AvatarGroupProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const visibleItems = items.slice(0, maxVisible)
  const remainingCount = items.length - maxVisible

  return (
    <div className={cn('avatar-group', `avatar-group--${size}`, className)}>
      {visibleItems.map((item, index) => (
        <AvatarSlot
          key={item.id}
          item={item}
          index={index}
          totalItems={visibleItems.length}
          isHovered={hoveredId === item.id}
          onHover={() => setHoveredId(item.id)}
          onLeave={() => {
            setHoveredId((id) => (id === item.id ? null : id))
          }}
        />
      ))}
      {remainingCount > 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="avatar-group__more"
          aria-label={`${remainingCount} more team members`}
        >
          +{remainingCount}
        </motion.div>
      ) : null}
    </div>
  )
}
