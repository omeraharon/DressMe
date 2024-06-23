import { makePersistable } from "mobx-persist-store";

export const persistStore = (target: any, properties: string[], persistName: string) => {
    if (target.isPersisting) target.stopPersisting();
    return makePersistable(
        target,
        {
            name: persistName,
            properties,
            storage: localStorage,
        },
        {
            delay: 200,
            fireImmediately: true,
        }
    );
};
