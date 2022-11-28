import { createContext } from "preact";
import { useSyncExternalStore } from "preact/compat";
import { useRef, useCallback, useContext } from "preact/hooks";

export function createStore<Store>(init: Store) {
    function storeData(): {
        get: () => Store;
        set: (value: Partial<Store>) => void;
        subscribe: (callback: () => void) => () => void;
    } {
        const store = useRef(init);

        const get = useCallback(() => store.current, []);

        const subscribers = useRef(new Set<() => void>());

        const set = useCallback((value: Partial<Store>) => {
            store.current = { ...store.current, ...value };
            subscribers.current.forEach((callback) => callback());
        }, []);

        const subscribe = useCallback((callback: () => void) => {
            subscribers.current.add(callback);
            return () => subscribers.current.delete(callback);
        }, []);

        return {
            get,
            set,
            subscribe,
        };
    }

    const StoreContext = createContext<ReturnType<typeof storeData> | null>(null);

    function Provider({ children }: React.HTMLAttributes<Element>) {
        return (
            <StoreContext.Provider value={storeData()}>
                {children}
            </StoreContext.Provider>
        );
    }

    function useStore<T>(selector: (store: Store) => T) {
        const store = useContext(StoreContext);
        if (!store) {
            throw new Error("Store not found");
        }

        const state = useSyncExternalStore(store.subscribe, () => selector(store.get()));

        return [state, store.set] as const;
    }

    function valueOf(selector: keyof Store) {
        return useStore(store => store[selector])[0];
    }

    return { Provider, useStore, valueOf };
}
