import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  core: {
    builder: {
      name: '@storybook/builder-webpack5',
      options: {
        fsCache: false,
        lazyCompilation: false,
      },
    },
  },
  webpackFinal: async (config) => {
    config?.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    const fileLoaderRule = config?.module?.rules?.find(
      (rule) => rule.test && rule.test.test('.svg'),
    )
    fileLoaderRule.exclude = /\.svg$/

    return config
  },
}
export default config
