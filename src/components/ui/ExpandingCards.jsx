import { forwardRef, useEffect, useMemo, useState } from 'react'
import './expanding-cards.css'

/**
 * @typedef {object} CardItem
 * @property {string|number} id
 * @property {string} title
 * @property {string} description
 * @property {string} imgSrc
 * @property {import('react').ReactNode} icon
 */

/**
 * Hover / focus / click expands one column (desktop) or row (mobile).
 */
export const ExpandingCards = forwardRef(function ExpandingCards(
  { className = '', items = [], defaultActiveIndex = 0, ...props },
  ref,
) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex ?? 0)
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true,
  )

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const gridStyle = useMemo(() => {
    if (!items.length) return {}
    const safeIndex = Math.min(Math.max(activeIndex, 0), items.length - 1)

    if (isDesktop) {
      const columns = items.map((_, index) => (index === safeIndex ? '5fr' : '1fr')).join(' ')
      return {
        gridTemplateColumns: columns,
        gridTemplateRows: '1fr',
      }
    }

    const rows = items.map((_, index) => (index === safeIndex ? '5fr' : '1fr')).join(' ')
    return {
      gridTemplateRows: rows,
      gridTemplateColumns: '1fr',
    }
  }, [activeIndex, items.length, isDesktop])

  const handleInteraction = (index) => setActiveIndex(index)

  const rootClass = ['expanding-cards', className].filter(Boolean).join(' ')

  if (!items.length) {
    return null
  }

  return (
    <ul ref={ref} className={rootClass} style={gridStyle} {...props}>
      {items.map((item, index) => {
        const active = activeIndex === index

        return (
          <li
            key={item.id}
            className="expanding-cards__item"
            onMouseEnter={() => handleInteraction(index)}
            onFocus={() => handleInteraction(index)}
            onClick={() => handleInteraction(index)}
            tabIndex={0}
            data-active={active ? 'true' : 'false'}
          >
            <img className="expanding-cards__img" src={item.imgSrc} alt="" loading="lazy" aria-hidden />
            <div className="expanding-cards__overlay" aria-hidden />
            <article className="expanding-cards__article">
              <h3 className="expanding-cards__title--sideways" aria-hidden={active}>
                {item.title}
              </h3>
              <div className="expanding-cards__icon-wrap" aria-hidden>
                {item.icon}
              </div>
              <h3 className="expanding-cards__title">{item.title}</h3>
              <p className="expanding-cards__desc">{item.description}</p>
            </article>
          </li>
        )
      })}
    </ul>
  )
})

ExpandingCards.displayName = 'ExpandingCards'
