// @source home-assistant/frontend/src/panels/lovelace/common/validate-condition.ts
// @synced 2026-06-08 @ SHA 1cca5f3
// TYPE DEFINITIONS ONLY — runtime validation functions (checkConditions,
// validateCondition) excluded. Our cards don't evaluate conditions at runtime.

export type Condition =
  | ViewColumnsCondition
  | LocationCondition
  | NumericStateCondition
  | StateCondition
  | ScreenCondition
  | TimeCondition
  | UserCondition
  | OrCondition
  | AndCondition
  | NotCondition;

// Legacy conditional card condition
export interface LegacyCondition {
  entity?: string;
  state?: string | string[];
  state_not?: string | string[];
}

interface BaseCondition {
  condition: string;
}

export interface ConditionContext {
  max_columns?: number;
  entity_id?: string;
}

export interface ViewColumnsCondition extends BaseCondition {
  condition: "view_columns";
  min?: number;
  max?: number;
}

export interface LocationCondition extends BaseCondition {
  condition: "location";
  locations?: string[];
}

export interface NumericStateCondition extends BaseCondition {
  condition: "numeric_state";
  entity?: string;
  attribute?: string;
  below?: string | number;
  above?: string | number;
}

export interface StateCondition extends BaseCondition {
  condition: "state";
  entity?: string;
  attribute?: string;
  state?: string | string[];
  state_not?: string | string[];
}

export interface ScreenCondition extends BaseCondition {
  condition: "screen";
  media_query?: string;
}

export interface TimeCondition extends BaseCondition {
  condition: "time";
  after?: string;
  before?: string;
  weekdays?: WeekdayShort[];
}

export interface UserCondition extends BaseCondition {
  condition: "user";
  users?: string[];
}

export interface OrCondition extends BaseCondition {
  condition: "or";
  conditions?: Condition[];
}

export interface AndCondition extends BaseCondition {
  condition: "and";
  conditions?: Condition[];
}

export interface NotCondition extends BaseCondition {
  condition: "not";
  conditions?: Condition[];
}

type WeekdayShort = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
