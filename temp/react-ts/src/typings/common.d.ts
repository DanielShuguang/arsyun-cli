/** 公共类型集 */
declare namespace Utils {
  /** 字典类型 */
  type Dict<T = any> = Record<string, T>

  /** 分页器 */
  interface IPageVO {
    page: number
    page_size: number
    total: number
  }

  type SearchVO = {
    page: number
    page_size: number
  }

  /** 响应体 */
  interface IResult<T = null> {
    code: number // 0 为成功，否则为失败
    description: string // 错误信息
    data: T | null
  }

  type ActionType<T> = {
    type: string
    payload: T
  }

  type NoPager<T extends SearchVO> = Omit<T, keyof SearchVO>

  /** 表格的 column 类型约束 */
  interface ColumnField<T = string> {
    title: string
    dataIndex: T extends string ? T : keyof T
    width?: number | string
    sorter?: import('antd/lib/table/interface').CompareFn<T>
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PUBLIC_URL: string
  }
}
