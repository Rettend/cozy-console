import { type BuildConfig, defineBuildConfig } from 'unbuild'

const packages = [
  'cozy-console',
  'mini',
]

const common = {
  declaration: true,
  rollup: {
    emitCJS: true,
    esbuild: {
      minify: true,
    },
  },
}

export default defineBuildConfig(packages.map(pkg => ({
  entries: [
    'src/index',
  ],
  rootDir: `packages/${pkg}`,
  outDir: `dist`,
  ...common,
} satisfies BuildConfig)))
