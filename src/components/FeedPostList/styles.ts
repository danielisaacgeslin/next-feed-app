import { GAP } from '@/constants';
import { css } from 'styled-components';

export const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    gap: ${GAP.M};
    width: 100%;
    max-width: 900px;
  `,
  division: css`
    border-top: 1px solid #a1a1a1;
  `,
  loading: css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${GAP.L};
  `
};
