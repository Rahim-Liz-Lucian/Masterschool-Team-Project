import React, { JSX } from "preact/compat";

export type Props<T extends EventTarget = EventTarget, O = {}> = React.HTMLAttributes<T> & O;

export type Component<T extends EventTarget = EventTarget, O = {}> = (props: Props<T, O>) => JSX.Element;