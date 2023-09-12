import { produce } from "immer";
import deviceInfoModule from "react-native-device-info";
import { MMKV } from "react-native-mmkv";
import { create, StoreApi } from "zustand";
import { createJSONStorage, persist, subscribeWithSelector } from "zustand/middleware";

export type StoreState = {
  theme: "light" | "dark";
  rehydrated: boolean;
  set: (fn: (state: StoreState) => void) => void;
  setStore: StoreApi<StoreState>["setState"];
};
export const MMKVStorage = new MMKV({
  id: "main-mmkv-storage",
  encryptionKey: deviceInfoModule.getUniqueIdSync(),
});

export const initialStore: Omit<StoreState, "set" | "setStore"> = {
  theme: "light",
  rehydrated: false,
};

const getStorage = {
  getItem: (name: string) => MMKVStorage.getString(name) ?? null,
  setItem: (name: string, value: string) => MMKVStorage.set(name, value),
  removeItem: (name: string) => MMKVStorage.delete(name),
};

export const useStore = create<StoreState>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        ...initialStore,
        set: (fn) => set(produce(fn)),
        setStore: set,
      }),
      {
        name: `taxatieweb-storage`,
        storage: createJSONStorage(() => getStorage),
        // do not persist rehydated state
        partialize: ({ rehydrated, ...rest }) => rest,
        onRehydrateStorage: () => async (state) => {
          requestAnimationFrame(() => {
            state?.set((s) => {
              s.rehydrated = true;
            });
          });
        },
      }
    )
  )
);

export function useUpdateStore() {
  return useStore((store) => store.set);
}
