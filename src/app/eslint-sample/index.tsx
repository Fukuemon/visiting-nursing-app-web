// @typescript-eslint/consistent-type-imports
// 型のインポート時にtype importを強制させる。
import type { User } from '@/app/eslint-sample/type'

const _user: User = {
  id: 1,
  name: 'John Doe',
  email: 'test@example.com',
  avatar: 'https://example.com/avatar.jpg',
}

// @typescript-eslint/no-unused-vars
// 未使用の変数を許可しない。
// _を変数名の先頭につけることで、未使用の変数を許可する。
const _unused = 'unused'
const used = 'used'

// 未使用の関数を許可しない。
function unUseArgFunction(args: string) {
  console.log('unused')
}

// 引数が使われていない関数を許可する。
function arrowUnUseArgFunction(_args: string) {
  console.log('unused')
}

// object-shorthand
// オブジェクトのプロパティの省略記法を強制する。
const x = 1
const y = 2
const _obj = {
  x, // x: x と書くとエラー
  y() {
    return y
  },
  /**
  以下のようにと書くとエラー
  y: function () {
    return y
  }
   */
}

// 'react/jsx-boolean-value': 'error'
// JSXで真偽値を省略する。
// "react/jsx-curly-brace-presence": "error"
// 不要なカーリーブレース（波括弧）の禁止
// "react/self-closing-comp": "error"
// 子要素を持たないコンポーネントの不必要な閉じタグの禁止
const Child = ({ isTrue, title }: { isTrue: boolean; title: string }) => {
  return (
    <div>
      {isTrue}
      {title}
    </div>
  )
}

export const Parent = () => {
  return <Child isTrue title="hoge" /> // isTrue={true title={"hoge"}・ <Child isTrue title="hoge" ></Child> と書くとエラー
}

// @typescript-eslint/strict-boolean-expressions
// boolean型の比較を厳密にする。
const num: number = 0
const str: string = ''
const bool: boolean = false
const obj: object = {}

if (num) {
  console.log('num')
}
