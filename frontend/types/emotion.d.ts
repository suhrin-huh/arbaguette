import '@emotion/react';

import type GlobalStyle from '@/styles/Theme';

type GlobalStyleType = typeof GlobalStyle;

declare module '@emotion/react' {
  export interface Theme extends GlobalStyleType {}
}
