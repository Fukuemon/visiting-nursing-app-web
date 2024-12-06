import type { FC } from 'react'

import classNames from 'classnames'

import styles from './style.module.css'

export type LoadingProps = {
  noLayout?: boolean
}

export const Loading: FC<LoadingProps> = ({ noLayout = false }) => {
  return (
    <div
      className={classNames(styles.loading, {
        [styles._noLayout]: noLayout,
      })}
    >
      <div className={styles.content}></div>
    </div>
  )
}
