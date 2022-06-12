import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
    name:'itemFilter'
})

export class ItemsFilterPipe implements PipeTransform{
    transform(itemsArr?: any, cate?:any) {
        return itemsArr.filter((elm:any) => elm.RootCatID == cate)
    }
}