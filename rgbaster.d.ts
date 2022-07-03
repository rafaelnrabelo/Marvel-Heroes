interface ColorResult {
  color: string;
}

interface Opts {
  ignore?: string[]
  scale?: number
  skipTransparentPixels?: boolean
}

declare function analyze(src: string, opts: Opts): Promise<ColorResult[]>;

declare module 'rgbaster' {
  export default analyze;
}