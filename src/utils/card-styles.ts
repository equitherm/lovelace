import { css } from "lit";

export const cardStyle = css`
  ha-card {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: auto;
    padding: 10px;
    border-radius: var(--ha-card-border-radius, var(--ha-border-radius-lg, 12px));
  }
  ha-card.fill-container {
    height: 100%;
  }
  :host([layout="grid"]) ha-card {
    height: 100%;
  }
  .actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    padding: 12px;
    padding-top: 0;
    box-sizing: border-box;
    gap: 12px;
  }
  .actions::-webkit-scrollbar {
    background: transparent; /* Chrome/Safari/Webkit */
    height: 0px;
  }
  .unavailable {
    --main-color: rgb(var(--rgb-warning));
  }
  .not-found {
    --main-color: rgb(var(--rgb-danger));
  }
`;

export const manualOverlayStyle = css`
  :host([manual-override]) .chart-wrapper,
  :host([manual-override]) .chart-area {
    position: relative;
    opacity: 0.3;
    transition: opacity 300ms ease;
  }
  .manual-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    pointer-events: none;
    z-index: 10;
    color: var(--disabled-text-color);
    font-size: var(--ha-font-size-s, 12px);
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .manual-overlay ha-icon {
    --mdc-icon-size: 24px;
    opacity: 0.6;
  }
`;
