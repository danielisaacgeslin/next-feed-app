import { GAP } from '@/app/constants';
import { css } from 'styled-components';

export const styles = {
  container: css`
    background: blue;
    padding: ${GAP.M};
    display: flex;
    gap: ${GAP.S};
  `,
  content: css`
    flex-direction: column;
    display: flex;
    gap: ${GAP.S};
  `
};
