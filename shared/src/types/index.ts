export type UnwrapArray<T> = T extends (infer U)[] ? U : T;

type FixArr<T> = T extends readonly any[] ? Omit<T, Exclude<keyof any[], number>> : T;
type _DeepKeys<T> = T extends object ? (
    { [K in (string | number) & keyof T]:
        `${(
            `.${K}` | (`${K}` extends `${number}` ? `[${K}]` : never)
        )}${"" | _DeepKeys<FixArr<T[K]>>}` }[
    (string | number) & keyof T]
) : never

type DropInitDot<T> = T extends `.${infer U}` ? U : T;
export type Path<T> = DropInitDot<_DeepKeys<FixArr<T>>>

export enum Action {
  VISIT = "visit",
  CLICK = "click",
  OTHER = "other",
}
