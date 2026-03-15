import { css } from 'lit';

export const tokens = css`
  :host {
    --eq-gradient-cold: #3b82f6;
    --eq-gradient-hot: #f97316;
    --eq-dot-glow: rgba(249, 115, 22, 0.4);
    --eq-badge-heating-bg: #f97316;
    --eq-badge-heating-color: #ffffff;
    --eq-badge-idle-bg: var(--secondary-background-color, #e5e5e5);
    --eq-badge-idle-color: var(--secondary-text-color, #666);
    --eq-badge-fault-bg: var(--error-color, #db4437);
    --eq-badge-fault-color: #ffffff;
    --eq-card-padding: 16px;
    --eq-font-size-large: 1.8rem;
    --eq-font-size-medium: 1rem;
    --eq-font-size-small: 0.8rem;
  }
`;

export const cardBase = css`
  ha-card {
    padding: var(--eq-card-padding);
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
`;
