'use client'

import type { FC } from 'react'

import classNames from 'classnames'
import { motion } from 'framer-motion'

import { useTab } from '@/hooks/useTab'

import styles from './style.module.css'

export type TextTabProps = {
  tabs: readonly {
    id: string
    label: string
    href?: string
  }[]
  options?: {
    key?: string
  }
  defaultTabIndex?: number
  variant?: 'default' | 'white'
}

export const TextTab: FC<TextTabProps> = ({
  tabs,
  options,
  defaultTabIndex,
  variant = 'default',
}) => {
  const { activeTabIndex, handleClickTab } = useTab({
    tabs,
    options,
    defaultTabIndex,
  })

  return (
    <div className={classNames(styles.textTab)}>
      <div
        className={classNames(styles.tabs, variant == 'white' && styles._white)}
      >
        <motion.div
          className={classNames(
            styles.bar,
            variant == 'white' && styles._white,
          )}
          style={{
            width: `calc(${100 / tabs.length}% - 1px)`,
          }}
          transition={{
            duration: 0.2,
          }}
          initial={{
            x: `${100 * (activeTabIndex ?? 0)}%`,
          }}
          animate={{
            x: `${100 * (activeTabIndex ?? 0)}%`,
          }}
        />
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tab} ${
              index === activeTabIndex ? styles.tabActive : ''
            }`}
            onClick={() => handleClickTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
