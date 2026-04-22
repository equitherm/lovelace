import { css } from "lit";

export const cardStyle = css`
  :host {
    --eq-flow-color: var(--gradient-hot, var(--warning-color, #ff9800));
  }
  ha-card {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 0;
    overflow: hidden;
    container-type: inline-size;
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
  .footer-meta {
    display: flex;
    justify-content: center;
    padding: 4px 10px 10px;
    font-size: var(--ha-font-size-xs, 0.68rem);
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }
  .unavailable {
    --main-color: rgb(var(--rgb-warning));
  }
  .not-found {
    --main-color: rgb(var(--rgb-danger));
  }
`;

export const kpiFooterStyles = css`
  .kpi-footer {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr;
    align-items: center;
    gap: 8px;
    padding: 0 10px var(--eq-kpi-padding-bottom, 8px);
    flex-shrink: 0;
  }
  .kpi-block {
    text-align: center;
    cursor: pointer;
    padding: 4px;
    border-radius: 8px;
    transition: background 0.2s;
  }
  .kpi-block:hover { background: var(--secondary-background-color, rgba(0,0,0,0.04)); }
  .kpi-block.missing { opacity: 0.4; cursor: default; }
  .kpi-block.missing:hover { background: transparent; }
  .kpi-value {
    font-size: var(--eq-kpi-font-size, var(--ha-font-size-xl, 1.4rem));
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    line-height: 1;
    color: var(--primary-text-color);
    white-space: nowrap;
  }
  .kpi-value.flow { color: var(--eq-flow-color); }
  .kpi-label {
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
    margin-top: 4px;
    white-space: nowrap;
  }
  .kpi-divider { width: 1px; background: var(--divider-color, rgba(0,0,0,0.12)); height: 32px; }
  .kpi-dual { display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .kpi-target {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .kpi-target ha-icon {
    --mdc-icon-size: 12px;
    color: var(--eq-flow-color);
  }
  @container (max-width: 260px) {
    .kpi-footer {
      grid-template-columns: 1fr;
      gap: 12px;
    }
    .kpi-footer .kpi-divider {
      display: none;
    }
  }
`;

export const paramsFooterStyles = css`
  .params-footer {
    display: flex;
    align-items: stretch;
    gap: 4px;
    padding: var(--eq-params-padding, 8px 12px);
    border-top: 1px solid var(--divider-color, rgba(0,0,0,0.1));
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }
  .params-footer .param-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    flex: 1;
    min-width: 0;
    cursor: pointer;
    border-radius: 8px;
    padding: 4px 6px;
    transition: background 0.2s;
  }
  .params-footer .param-item:hover {
    background: var(--secondary-background-color, rgba(0,0,0,0.04));
  }
  .params-footer .param-label {
    font-size: 10px;
    font-weight: var(--ha-font-weight-medium, 500);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
    line-height: 1;
  }
  .params-footer .param-value {
    font-size: var(--ha-font-size-s, 0.85rem);
    font-weight: 600;
    color: var(--primary-text-color);
    line-height: 1;
  }
  .params-footer .param-value.positive { color: var(--success-color, #4caf50); }
  .params-footer .param-value.negative { color: var(--error-color, #e53935); }
`;
