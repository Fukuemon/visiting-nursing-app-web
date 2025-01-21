import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'

import styles from './style.module.css'

import { ServiceCode } from '@/schema/serviceCode'
import { useServiceCodeList } from '@/hooks/api/serviceCode'

export type ServiceCodeEditProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
}

// export const serviceCodeOptions = {
//   [ServiceCode.訪看I2]: {
//     label: ServiceCodeText[ServiceCode.訪看I2],
//   },
//   [ServiceCode.訪看I3]: {
//     label: ServiceCodeText[ServiceCode.訪看I3],
//   },
//   [ServiceCode.訪看I4]: {
//     label: ServiceCodeText[ServiceCode.訪看I4],
//   },
//   [ServiceCode.訪看I5]: {
//     label: ServiceCodeText[ServiceCode.訪看I5],
//   },
//   [ServiceCode.訪看I52超]: {
//     label: ServiceCodeText[ServiceCode.訪看I52超],
//   },
//   [ServiceCode.予防看I2]: {
//     label: ServiceCodeText[ServiceCode.予防看I2],
//   },
//   [ServiceCode.予防看I3]: {
//     label: ServiceCodeText[ServiceCode.予防看I3],
//   },
//   [ServiceCode.予防看I4]: {
//     label: ServiceCodeText[ServiceCode.予防看I4],
//   },
//   [ServiceCode.予防看I5]: {
//     label: ServiceCodeText[ServiceCode.予防看I5],
//   },
//   [ServiceCode.予防看I52超]: {
//     label: ServiceCodeText[ServiceCode.予防看I52超],
//   },
//   [ServiceCode.医療]: {
//     label: ServiceCodeText[ServiceCode.医療],
//   },
// }

export const ServiceCodeEdit = <T extends FieldValues>({
  name,
  control,
}: ServiceCodeEditProps<T>) => {
  const { serviceCodes, error } = useServiceCodeList()
  const { field } = useController({
    control,
    name,
  })
  if (error) {
    return <div>エラーが発生しました</div>
  }

  return (
    <div className={styles.serviceCodeEdit}>
      <h2 className={styles.heading}>サービスコードを選んでください</h2>
      <div className={styles.content}>
        {serviceCodes?.map((serviceCode) => {
          return (
            <label key={serviceCode.id} className={styles.option}>
              <input
                type="radio"
                className={styles.input}
                {...field}
                value={serviceCode.id}
                checked={field.value === serviceCode.id}
              />
              <span className={styles.label}>{serviceCode.code}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
