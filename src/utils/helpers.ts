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
