type ParamObject = {[name: string]: any }


export function normalize(parent: ParamObject) {
   if (parent && parent.children) {
      parent.children.forEach((child: any) => {
         if (!child.parentId)
            child.parentId = parent.id

         normalize(child)
      })
   }
}

export function flatten(items: ParamObject[]) {
   const temp: unknown[] = []

   items.forEach(item => {
      normalize(item)
      const { children, ...props } = item 

      temp.push(props)

      if (children && Array.isArray(children)) {
         temp.push(flatten(children))
      }
   })

   return temp.flat()
}

function addLeadingZero(num: number) {
   return num < 9 ? `0${num}` : num
}

export function getFormattedDate(date: Date) {
   const year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate()

   return `${year}-${ addLeadingZero(month) }-${ addLeadingZero(day) }`
}
