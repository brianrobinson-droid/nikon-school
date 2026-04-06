import type {
  GlobalAfterChangeHook,
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateFinancePage: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating /finance-your-training`)
    revalidatePath('/finance-your-training')
  }
  return doc
}

export const revalidateNavigation: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating navigation`)
    revalidateTag('global_navigation', 'max')
    revalidatePath('/finance-your-training')
  }
  return doc
}

export const revalidateFinancePageCollection: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating /finance-your-training (collection change)`)
    revalidatePath('/finance-your-training')
  }
  return doc
}

export const revalidateFinancePageOnDelete: CollectionAfterDeleteHook = ({
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating /finance-your-training (collection delete)`)
    revalidatePath('/finance-your-training')
  }
}
