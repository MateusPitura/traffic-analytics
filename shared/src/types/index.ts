export type UnwrapArray<T> = T extends (infer U)[] ? U : T;

export enum Action {
  VISIT = "visit",
  CLICK = "click",
  OTHER = "other",
}
