import { createRef, Ref } from "preact";
import { useSyncExternalStore } from "preact/compat";
import { MutableRef, useRef } from "preact/hooks";
import { useEffect } from "react";

export const useComputedHeight = (a: MutableRef<HTMLElement>, b: MutableRef<HTMLElement>, ratio = 1) => {
    return useSyncExternalStore((callback) => {
        window.addEventListener("resize", callback);
        return () => window.removeEventListener("resize", callback);
    }, () => ratio * (b.current?.getBoundingClientRect().top - a.current?.getBoundingClientRect().bottom));
};
