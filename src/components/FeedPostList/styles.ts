import { GAP } from '@/app/constants';
import { css } from 'styled-components';

export const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    gap: ${GAP.M};
  `,
  loading: css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${GAP.L};
  `
};
