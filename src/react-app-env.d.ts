/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PUBLIC_URL: string
  }
}

declare module '*.bmp' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >

  const src: string
  export default src
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module 'json-url/dist/browser/json-url' {
  interface Codec {
    compress: (obj: object) => Promise<string>
    decompress: (str: string) => Promise<object>
    stats: (
      obj: object
    ) => Promise<{ rawencoded: any; compressedencoded: any; compression: any }>
  }

  const jsonurl: (codecName: string) => Codec

  export default jsonurl
}

declare module 'json-url/dist/browser/json-url-vendors~lzma' {}
declare module 'json-url/dist/browser/json-url-msgpack' {}
declare module 'json-url/dist/browser/json-url-vendors~msgpack' {}
declare module 'json-url/dist/browser/json-url-safe64' {}
