// converts an object containing refs to a flat, reactive object

import type { AnyObject } from '@daria/shared';

// used when passing props to a slot, for convenience (the consumer doesn't need to use .value in the template)
export const useSlotProps = <T extends AnyObject>(obj: T) => reactive(obj);
