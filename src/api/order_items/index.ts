import { supabase } from "@/lib/supabase"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InsertTable } from "@/types/types"
  

export const useInsertOrderItems = () => {
    const queryClient = useQueryClient()

    return useMutation({
        async mutationFn(items: InsertTable<"order_items">[]) {
            const { error, data: newOrder } = await supabase
            .from("order_items")
            .insert(items)
            .select()
            //console.log("inserting new order item")
            //console.log (error)
            if(error){
            throw new Error(error.message)
            }

            return newOrder
        },
        async onError() {
            console.log("may error useInsertOrderItems")
        }
    })
}
